import * as mongoose from 'mongoose';
import Noun from '../models/noun';
import { Observable } from 'rxjs';


export class SocketClass {

  socketInstance: any;
  noun = Noun;
  text: String;
  returnmessage: String;
  io: any;
  lastSpace: boolean;

  init = (io, port) => {
    this.io = io;
    this.io.on('connect', (socket: any) => {

      console.log('connected client on port %s.', port);
      socket.on('text', (text) => {

        this.text = JSON.stringify(text);

        this.compareText(socket);

      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });



    });

  }

  compareText = (socket) => {
    let text = this.text;

    let tokenizer = this.text.split(' ');

    let returnMsg = '';
    let passIo = this.io;
    let arr = [];
    let secondLastWord = tokenizer[tokenizer.length - 2];

    let lastWord = getLastWord(tokenizer);

    if (lastWord == '"') {

      lastWord = secondLastWord + ' ';
    }


    function getLastWord(words) {

      return words[words.length - 1];
    }

    lastWord = lastWord.toLowerCase();

    this.noun.findOne({ "default": lastWord }, (err, docs) => {
      if (err) { return console.error(err); }

    }).then(function(res) {

      if (res) {

        let myword = res["default"];
        let gender = res["gender"];

        let regex = /\b[aeiouAEIOU]/g;
        let removeFadas = cleanUpSpecialChars(myword);
        let vowelCheck = regex.test(removeFadas);

        if (myword == lastWord && vowelCheck && gender == 'masc') {

          secondLastWord = cleanUpSpecialChars(secondLastWord);

          let checkForCapital = /^[A-Z]/.test(secondLastWord);

          if (checkForCapital) {

            var thirdLastWord = tokenizer[tokenizer.length - 3];
            var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');
            if (thirdLastWord == 'an' || thirdLastWord == '"an' || thirdLastWord == '"An' || thirdLastWord == 'An') {

              tokenizer[tokenizer.length - 2] = 't' + tokenizer[tokenizer.length - 2];
              returnMsg = tokenizer.pop();
              returnMsg = tokenizer.join(' ');
              returnMsg = returnMsg.replace(/['"]+/g, '');

              returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
              returnMsg = returnMsg.substr(1);

              let rule = 'masc-noun-vowel';
              let returnObj = { 'text': returnMsg, 'rule': rule };
              socket.emit('returnmessage', returnObj);
            }
          } else {

            var thirdLastWord = tokenizer[tokenizer.length - 3];
            var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');
            if (thirdLastWord == 'an' || thirdLastWord == '"an' || thirdLastWord == '"An' || thirdLastWord == 'An') {

              tokenizer[tokenizer.length - 2] = 't-' + tokenizer[tokenizer.length - 2];
              returnMsg = tokenizer.pop();
              returnMsg = tokenizer.join(' ');
              returnMsg = returnMsg.replace(/['"]+/g, '');

              returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
              returnMsg = returnMsg.substr(1);

              let rule = 'masc-noun-vowel';
              let returnObj = { 'text': returnMsg, 'rule': rule };
              socket.emit('returnmessage', returnObj);

            }
          }
        }
      }

    })
    function cleanUpSpecialChars(str) {
      str = str.replace(/[Á]/g, "A");
      str = str.replace(/[á]/g, "a");
      str = str.replace(/[É]/g, "E");
      str = str.replace(/[Ú]/g, "U");
      str = str.replace(/[ú]/g, "u");
      str = str.replace(/[ú]/g, "u");
      return str;
    }

  }



}

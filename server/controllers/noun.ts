import Noun from '../models/noun';



export default class NounCtrl{
  model = Noun;
  noun = Noun;
  text: String;

  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    })
  }

  insert = (req, res) => {
    let text = req.body.noun;

    let nobreaks = text.replace(/\r?\n|\r/g, ' ');
  //  nobreaks = nobreaks.substr(nobreaks.length/2, nobreaks.length-1);
    let returnMsg = '';

    let tokenizer = text.split(' ');


  if(tokenizer.length > 5){
     tokenizer = tokenizer.slice(Math.max(tokenizer.length - 5, 1));
    }

    //nobreaks = tokenizer.replace(/\r?\n|\r/g, ' ');


    let nobreakstokenizer = nobreaks.split(' ');

    let returnObj = {};

    let secondLastWord = nobreakstokenizer[nobreakstokenizer.length - 2];

    let lastWord = nobreakstokenizer[nobreakstokenizer.length-1];

    if (lastWord == '') {
      lastWord = secondLastWord + ' ';
    }

    lastWord = lastWord.toLowerCase();


    this.noun.findOne({"default":lastWord}, (err, docs) => {
      if (err) { return console.error(err); }
    }).then(function(result) {

      if(result){

        let dflt = result["default"];
        let gender = result["gender"];


        //regex that will test if word begins with a vowel
        let regex = /\b[aeiouAEIOU]/g;
        //get rid of fadas so regex can see if first word is a vowel
        let removeFadas = cleanUpSpecialChars(dflt);

      //  console.log(removeFadas);
        //test word to see if it begins with a vowel
        let vowelCheck = regex.test(removeFadas);
           /*execute when found word matches last typed word,
           starts with vowel, and gender of found word is male*/

        if (dflt == lastWord && vowelCheck && gender === 'masc' ) {

          secondLastWord = cleanUpSpecialChars(secondLastWord);

          let checkForCapital = /^[A-Z]/.test(secondLastWord);

          if(checkForCapital) {
            var thirdLastWord = tokenizer[tokenizer.length - 3];
            var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');
            if (thirdLastWord == 'an' || thirdLastWord == 'An' || thirdLastWord == '\nan' || thirdLastWord === 'an\nan') {

              tokenizer[tokenizer.length - 2] = 't' + tokenizer[tokenizer.length - 2];
              returnMsg = tokenizer.pop();
              returnMsg = tokenizer.join(' ');
              returnMsg = returnMsg.replace(/['"]+/g, '');

              returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
              returnMsg = returnMsg.substr(1);

              let rule = 'masc-noun-vowel';
              let returnObj = { 'text': returnMsg, 'rule': rule };

              res.json(returnObj);
            }
          }else {

            //clear all whitespaces and gaps
            let cleanSpaces = nobreakstokenizer.filter(Boolean);

            let compareWord = cleanSpaces[cleanSpaces.length - 2];

            var thirdLastWord = tokenizer[tokenizer.length - 3];

            var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');

            if (compareWord == 'an'  || compareWord == 'An' || compareWord == 'an') {

              let stringify = JSON.stringify(tokenizer[tokenizer.length-2]);

              //if there is a linebreak
              if(stringify.indexOf('\\') > -1){
              let splitword = stringify.split('\\');
              let deletefirstn = splitword[1].substring(1, splitword[1].length - 1);


              tokenizer[tokenizer.length - 1] = 't-' + deletefirstn;
              tokenizer[tokenizer.length - 2] = splitword[0].substring(1);


              //returnMsg = tokenizer.pop();
              returnMsg = tokenizer.join(' ');
              returnMsg = returnMsg.replace(/['"]+/g, '');
              console.log(returnMsg);

              returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
              returnMsg = returnMsg.substr(1);

              let rule = 'masc-noun-vowel';
              let returnObj = { 'text': returnMsg, 'rule': rule };
              //socket.emit('returnmessage', returnObj);

              res.json(returnObj);
            }else{
              tokenizer[tokenizer.length - 2] = 't-' + tokenizer[tokenizer.length - 2];

              returnMsg = tokenizer.pop();
              returnMsg = tokenizer.join(' ');
              returnMsg = returnMsg.replace(/['"]+/g, '');

              returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
              returnMsg = returnMsg.substr(1);

              let rule = 'masc-noun-vowel';

              let returnObj = { 'text': returnMsg, 'rule': rule };
              //socket.emit('returnmessage', returnObj);

              res.json(returnObj);
            }
            }
          }

        }else if (dflt == lastWord && !vowelCheck && gender === 'fem') {
          secondLastWord = cleanUpSpecialChars(secondLastWord);
          //if gender is female bitchasd

            //var firstLetter = tokenizer.charAt(0);
console.log(result['default'].charAt(0));
            //if gender is female bitchasd

            if(result['default'].charAt(0) !== 's' && result['default'].charAt(0) !== 'S'){
              let cleanSpaces = nobreakstokenizer.filter(Boolean);

              let compareWord = cleanSpaces[cleanSpaces.length - 2];

              var thirdLastWord = tokenizer[tokenizer.length - 3];
              var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');

              if (compareWord == 'an' || compareWord == 'An' || compareWord == '\nan' || compareWord === 'an\nan') {

                tokenizer[tokenizer.length - 2] = [tokenizer[tokenizer.length - 2].slice(0, 1), 'h', tokenizer[tokenizer.length - 2].slice(1)].join('');

                returnMsg = tokenizer.pop();
                returnMsg = tokenizer.join(' ');
                returnMsg = returnMsg.replace(/['"]+/g, '');

                returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
                returnMsg = returnMsg.substr(1);

                let rule = 'female-noun-vowel';
                console.log(returnMsg);
                let returnObj = { 'text': returnMsg, 'rule': rule };

                res.json(returnObj);
            }

          }else if(result['default'].charAt(0) == 's' || result['default'].charAt(0) == 'S'){

            let cleanSpaces = nobreakstokenizer.filter(Boolean);

            let compareWord = cleanSpaces[cleanSpaces.length - 2];

            var thirdLastWord = tokenizer[tokenizer.length - 3];
            var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');

            if (compareWord == 'an' || compareWord == 'An' || compareWord == '\nan' || compareWord === 'an\nan') {
              tokenizer[tokenizer.length - 2] = 't' + [tokenizer[tokenizer.length - 2];

              returnMsg = tokenizer.pop();
              returnMsg = tokenizer.join(' ');
              returnMsg = returnMsg.replace(/['"]+/g, '');

              returnMsg = returnMsg.substring(returnMsg.lastIndexOf(' '));
              returnMsg = returnMsg.substr(1);

              let rule = 'female-noun-vowel';
              console.log(returnMsg);
              let returnObj = { 'text': returnMsg, 'rule': rule };
              res.json(returnObj);
            }else{
              res.json('nothing');
            }

          }else{
            res.json("nothing");
          }


        }

    }else{
      //result is null
      res.json('nothing');
    }

    })

    function cleanUpSpecialChars (str) {

      str = str.replace(/[Á]/g, "A");
      str = str.replace(/[á]/g, "a");
      str = str.replace(/[É]/g, "E");
      str = str.replace(/[Í]/g, "I");
      str = str.replace(/[í]/g, "i");
      str = str.replace(/[Ó]/g, "O");
      str = str.replace(/[Ú]/g, "U");
      str = str.replace(/[ú]/g, "u");

      return str;
    }



  }


  getNounsTest = (req, res) => {
    this.model.find({}, (err, docs) =>{
      if(err) { return console.log(err); }
      //console.log('hello');
      res.json(docs);
    })
  }

//   sendNoun = (req, res) => {
//   console.log('eq');
//
//   // obj.save((err, item) => {
//   //   // 11000 is the code for duplicate key error
//   //   if (err && err.code === 11000) {
//   //     res.sendStatus(400);
//   //   }
//   //   if (err) {
//   //     return console.error(err);
//   //   }
//   //   res.status(200).json(item);
//   // });
// }


//   sendNoun = (req, res) => {
//     console.log(req.body);
//       this.model2.find({}, (err, docs) =>{
//          if(err) { return console.log(err); }
//
//         res.json(docs);
//     //  })
//   })
// }

}

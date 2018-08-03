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

    let returnMsg = '';
    let tokenizer = text.split(' ');

    let returnObj = {};

    let secondLastWord = tokenizer[tokenizer.length - 2];

    let lastWord = tokenizer[tokenizer.length-1];

    if (lastWord == '') {
      lastWord = secondLastWord + ' ';
    }

    lastWord = lastWord.toLowerCase();

    this.noun.findOne({"default": lastWord}, (err, docs) => {
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
            if (thirdLastWord == 'an' || thirdLastWord == 'An' || thirdLastWord == '\nan') {

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
            var thirdLastWord = tokenizer[tokenizer.length - 3];
            var checkthirdlastWord = thirdLastWord.replace(/['"]+/g, '');
            var stripLineBreaks = thirdLastWord.replace(/(?:\r\n|\r|\n)/g, '');

            if (thirdLastWord == 'an'  || thirdLastWord == 'An' || stripLineBreaks == 'an') {

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

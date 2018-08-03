import Verb from '../models/verbs';



export default class VerbCtrl{
  model = Verb;


  getAll = () => {
    this.model.find({}, (err, docs) => {
      console.log(docs);
    //  if (err) { return console.error(err); }
    //  res.json(docs);
    })
  }

  insert = (verb) => {

  //  console.log(req.body);
    const obj = new this.model(verb);
    //console.log(req);
    obj.save((err, item) => {
    //  if(err && err.code === 11000){
      //  res.sendStatus(400);
    //  }
    //  if(err){
    //    return console.error(err);
    //  }
    //  res.status(200).json(item);
    });
    this.getAll();
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

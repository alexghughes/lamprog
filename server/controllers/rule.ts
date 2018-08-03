import Rule from '../models/rule';



export default class RuleCtrl{
  model = Rule;




  getRule = (req, res) => {

    this.model.findOne( { type: req.params.name }, (err, obj) => {
      if (err) { return console.error(err); }
  
      res.json(obj);
    });
  }



}

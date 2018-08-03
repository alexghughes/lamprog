import User from '../models/user';
//import * as config from '../config.json';
import * as Q  from "q";
import * as bcrypt from 'bcryptjs';
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";


export default class UserCtrl {

  model = User;
  secret = 'tameagdeaneamhgomaith'
  register = (req,res) => {
    console.log(req.body);

    let deferred = Q.defer();

    this.model.findOne({
      "username": req.body.username
    }, (err,result) => {
      if(err) deferred.reject(err.name + ': ' + err.message);

      if(result){

        deferred.reject('Username " ' + req.body.username + ' " is already taken')

      }else{

        let user = _.omit(req.body, 'password');

        user.password = bcrypt.hashSync(req.body.password, 10);

        const obj = new this.model(user);



        obj.save((err, item) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          res.sendStatus(400);
        }
        if (err) {
          return console.error(err);
        }

        res.status(200).json(item);
      });
      }
    })


  }


  authenticate = (req,res) => {
  //  let myres = this.getToken(req.body.username, req.body.password);
  //  console.log(myres);


  let deferred = Q.defer();
  let promise = deferred.promise as Q.Promise<string[]>;
  let username = req.body.username;
  let password = req.body.password;

  this.model.findOne({username: username }, (err, user)=>{

    if(err) deferred.reject(err.name + ": " +err.message);

    if(user && bcrypt.compareSync(password, user["password"])){

      let token = jwt.sign({sub: user["id"]}, this.secret);

     deferred.resolve(res.send(token));


    }else{
      deferred.resolve();
    }

  })

  }


}

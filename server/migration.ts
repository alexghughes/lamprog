import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import * as parser from 'xml2json';
import Noun from './models/noun';

export function getMigration() {
  let model = Noun;

  let noun = {
    default: String,
    dec: Number,
    proper:Number,
    definite:Number,
    allowArticledGenitive:Number,
    gen:String,
    voc:String,
    dat:String,
    gender:String,
    plNom: String,
    plGen: String,
  };

  let myPath = '/Users/Alex/Documents/cloichean/server/';
  let myPath2 = '/Users/Alex/Downloads/';
//  let filer = fs.readFileSync('../server/models/rule.ts', 'utf8');
   let arr = [];

fs.readdirSync(myPath2 + 'bunamo/noun').forEach(file =>{

   arr.push(file);

})
//console.log(arr[0]);
var count = 0;
arr.forEach(function(a){

  fs.readFile(myPath2 + 'bunamo/noun/' + a, 'utf8', function(err,data){
 // console.log(data);
 // console.log('****');
    let parseString = xml2js.parseString;
    let xml = data;

    parseString(xml, function(err, result){

      result.noun.$.default = result.noun.$.default + " ";
      noun.default = result.noun.$.default;
      noun.dec = result.noun.$.declension;
      noun.proper = result.noun.$.isProper;
      noun.definite = result.noun.$.isDefinite;
      noun.allowArticledGenitive = result.noun.$.allowArticledGenitive;
      if(result.noun.sgGen){
         noun.gen = result.noun.sgGen[0].$.default;
      }
      if(result.noun.plNom){
         noun.plNom = result.noun.plNom[0].$.default;
      }
      if(result.noun.plGen){
        noun.plGen = result.noun.plGen[0].$.default;
      }
      if(result.noun.sgVoc){
        noun.voc = result.noun.sgVoc[0].$.default;
      }
      if(result.noun.sgDat){
        noun.dat = result.noun.sgDat[0].$.default;
      }
        noun.gender = result.noun.sgNom[0].$.gender;
  // //how to push to mongodb
 let obj = new model(noun);
  //  obj.save((err, item) => {
  //    console.log(item);
  //    console.log(err);
  // });
  //   })

  });

 noun = {
    default: null,
    dec: null,
    proper: null,
    definite: null,
    allowArticledGenitive: null,
    gen:null,
    voc:null,
    dat:null,
    gender:null,
    plNom: null,
    plGen: null,
  };
})

});
}

import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NounService } from './noun.service';
import { interval } from 'rxjs';
import * as Rx from "rxjs";
import { timer } from 'rxjs';

import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {FormControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'nojquery-component',
  templateUrl: './nojquery.component.html',
  styleUrls: ['./nojquery.component.css']

})

export class NojqueryComponent implements OnInit {

  text: string;
  highlightText: any;
  isVisible: boolean = false;
  public top: Number;
  public left: Number;
  public display: string;
  count:number;
  tooltipsource:Subscription;
  public queue = [];
  subscription: Subscription;
  constructor(private nounService: NounService, private rd: Renderer2, private sanitized: DomSanitizer) { }


  ngOnInit() {

 //const source = interval(1000);
 //const example = source.subscribe(t=>  console.log(t));
 //const example2 = example.pipe(takeUntil(this.timer));
  //let timer = Observable.timer(2000,1000);
  }


  sendMessage(event): void {

    this.nounService.send(this.text).subscribe(
       data => this.getResponse(data)
    )
  }

  onKeydown(event) {
    if (event.key === "Backspace") {
        this.highlightText = '';
        this.display = "none";
    }
  }

  getResponse(data): void {

    if(this.subscription !== undefined){
    if(this.subscription.closed === false){
      this.subscription.unsubscribe();
    }
  }
    if (data.text !== 'okay' && data.text !== undefined) {

      this.count = 0;

      this.display = 'none';
      let changedWord = data.text;

      this.text = this.text.slice(0, -1);

      var lastIndex = this.text.lastIndexOf(" ");
      this.text = this.text.substring(0, lastIndex);
      this.text = this.text + " " + changedWord;
      this.text = this.text + " ";

      //if word with fada returns with first vowel appended on and we need to remove that

      if (changedWord.charAt(0) !== 't') {
        this.text = this.text.substr(0, this.text.lastIndexOf(changedWord));
      }

      let textArea = <HTMLInputElement>document.getElementById('txtarea');

      let textAreaValue = textArea.value.substring(textArea.value.lastIndexOf(" ") + 1);

      let spanElmt = <HTMLInputElement>document.getElementById('span');
      let highlights = <HTMLInputElement>document.getElementById('highlights');
      let backSpaceEvent = false;
      let revMark = reverse('<mark id="marky" style="background-color:#FBFF2C; border-radius: 8px; ">&$</mark>');
      this.sanitized.bypassSecurityTrustHtml(this.highlightText);
      console.log(this.sanitized);
      this.highlightText = applyHighlights(this.text, changedWord, revMark);
      console.log(this.highlightText);
      this.isVisible = true;
      let marky = <HTMLInputElement>document.getElementById('marky');

      this.getMarkElementRect();


  let sourcething = timer(
    1000, /* 5 seconds */
    1000 /* 1 second */
     );

      let y = 0;
  this.subscription = sourcething.subscribe(x=>
  {

      if(x == 1){
        this.isVisible = false;
      }

      if(x == 4){
        this.display = "none";

        this.subscription.unsubscribe();
      }
    });

    }

    function reverse(s: string) {
      var o = '';
      for (var i = s.length - 1; i >= 0; i--)
        o += s[i];
      return o;
    }

    function applyHighlights(textareaval: string, changedword: string, revmark: string) {

      let rev = reverse(textareaval);
      rev = rev.substr(1);
      let firstWord = rev.substr(0, rev.indexOf(" "));

      let strngRev = reverse(changedword);

      let getIndex = rev.indexOf(strngRev);

      rev = rev.replace(strngRev, revmark);

      rev = reverse(rev);

      return rev;
    }

    function returnMarkElement(){


    }
  }


  getMarkElementRect(): void {
    setTimeout( () => {

      let mymark = document.getElementsByTagName('MARK');

      console.log(mymark);
      let markRect = mymark[0].getBoundingClientRect();

      let bodyRect = document.body.getBoundingClientRect();

      let myoffsettop = markRect.top - bodyRect.top;
      let myoffsetleft = markRect.left - bodyRect.left;
      myoffsettop = myoffsettop - 40;
      this.top = myoffsettop;
      this.left = myoffsetleft;
      this.display = "block";

    });


  }



}

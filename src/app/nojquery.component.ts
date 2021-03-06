import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild, OnInit, OnChanges, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NounService } from './noun.service';
import { UserService } from './user.service';
import { interval } from 'rxjs';
import * as Rx  from "rxjs";
import { timer } from 'rxjs';
import $ from 'jquery';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//import $ from 'jquery';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'nojquery-component',
  templateUrl: './nojquery.component.html',
  styleUrls: ['./nojquery.component.css']

})

export class NojqueryComponent implements OnInit, DoCheck {

  text: string;
  highlightText: any;
  isVisible: boolean = false;
  public top: Number;
  public left: Number;
  public display: string;
  count: number;
  tooltipsource: Subscription;
  public queue = [];
  subscription: Subscription;
  currentUser: boolean;
  variableno = 100;
  textAreasList: any = [];
  dividers: any = [];
  hrpos: any;

  constructor(private nounService: NounService, private rd: Renderer2, private sanitized: DomSanitizer, private userService: UserService) {
    this.currentUser = this.userService.isLoggedIn();
  }


  ngOnInit() {

    // const source = interval(1000);
    // const example = source.subscribe(t=>  console.log(t));
    // const example2 = example.pipe(takeUntil(this.timer));
    // let timer = Observable.timer(2000,1000);

    this.variableno = 100;
  }

  addTextarea(){

    let boo = 'text_area'+ (this.textAreasList.length + 1);
    this.textAreasList.push('text_area'+ (this.textAreasList.length + 1));
    let textAreaItem = document.getElementsByName('text_area'+ (this.textAreasList.length + 1));

    //this.textAreasList[this.textAreasList.length - 1].style.marginTop = '400px';
  }

  ngDoCheck() {
    let textArea = <HTMLInputElement>document.getElementById('txtarea');

    if(textArea.clientHeight < textArea.scrollHeight - 2){
      let textArea = document.getElementById('txtarea');
      let getBoundingClientRect = textArea.getBoundingClientRect();
      let getBottom = getBoundingClientRect.bottom;
      this.hrpos = getBottom;
      this.variableno = this.variableno + 100;
      this.dividers.push("hr"+ (this.dividers.length + 1));


    }


    let lineNo = textArea.value.substr(0, textArea.selectionStart).split("\n").length;

    // this.variableno = '100';

    // if (lineNo < 6) {
    //   this.variableno = 100;
    // } else if (lineNo > 6) {
    //
    //   this.variableno = 200;
    // }



    // var scrollTop = $textarea.scrollTop();
    //     $backdrop.scrollTop(scrollTop);
    //
    //
    //     var scrollLeft = $textarea.scrollLeft();
    //     $backdrop.scrollLeft(scrollLeft);

    //    this.getMarkElementRect();
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

    if (event.key != 'Enter') {

      let textArea = <HTMLInputElement>document.getElementById('txtarea');

      let backDrop = <HTMLInputElement>document.getElementById('backdrop');
      //textArea.value.getBoundingClientRect();
      backDrop.scrollTop = textArea.scrollTop;
      backDrop.scrollLeft = textArea.scrollLeft;

    }
  }



  getResponse(data): void {

    if (this.subscription !== undefined) {
      if (this.subscription.closed === false) {
        this.subscription.unsubscribe();
      }
    }
    if (data.text !== 'okay' && data.text !== undefined) {

      this.count = 0;

      this.display = 'none';
      let changedWord = data.text;

      this.text = this.text.slice(0, -1);
      let checkforlinebreak = JSON.stringify(this.text.substring(this.text.lastIndexOf(" ")));
      if (checkforlinebreak.includes('\\n')) {
        this.text = this.text.substring(0, this.text.lastIndexOf('\n'));

        this.text = this.text + "\n" + changedWord + ' ';

      } else {
        var lastIndex = this.text.lastIndexOf(" ");
        this.text = this.text.substring(0, lastIndex);

        this.text = this.text + " " + changedWord;
        this.text = this.text + " ";
      }
      //if word with fada returns with first vowel appended on and we need to remove that

      if (changedWord.charAt(0) !== 't'  && data.rule == 'masc-noun-vowel') {
        this.text = this.text.substr(0, this.text.lastIndexOf(changedWord));
      }

      let textArea = <HTMLInputElement>document.getElementById('txtarea');

      let textAreaValue = textArea.value.substring(textArea.value.lastIndexOf(" ") + 1);

      let spanElmt = <HTMLInputElement>document.getElementById('span');
      let highlights = <HTMLInputElement>document.getElementById('highlights');
      let backSpaceEvent = false;
      let revMark = reverse('<mark id="marky" style="background-color:#FBFF2C; border-radius: 8px; ">&$</mark>');


      this.highlightText = applyHighlights(this.text, changedWord, revMark);
      this.highlightText = this.sanitized.bypassSecurityTrustHtml(this.highlightText);

      this.isVisible = true;
      let marky = <HTMLInputElement>document.getElementById('marky');

      this.getMarkElementRect();


      let sourcething = timer(
        1000, /* 5 seconds */
        1000 /* 1 second */
      );

      let y = 0;
      this.subscription = sourcething.subscribe(x => {

        if (x == 1) {
          this.isVisible = false;
        }

        if (x == 4) {
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

    function returnMarkElement() {


    }
  }


  getMarkElementRect(): void {
    setTimeout(() => {

      let mymark = document.getElementsByTagName('MARK');

      let markRect = mymark[0].getBoundingClientRect();

      let bodyRect = document.body.getBoundingClientRect();

      let myoffsettop = markRect.top - bodyRect.top;
      let myoffsetleft = markRect.left - bodyRect.left;
      myoffsettop = myoffsettop - 50;
      this.top = myoffsettop;
      this.left = myoffsetleft;
      this.display = "block";

    });


  }



}

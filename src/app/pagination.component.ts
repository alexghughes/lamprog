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
//import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']

})

export class PaginationComponent implements OnInit, DoCheck {

  text: string;
  textList: any = [];
  highlightText: any;
  isVisible: boolean = false;
  public top: Number;
  public textAreaTop: any = [];
  public left: Number;
  public display: string;
  count: number;
  tooltipsource: Subscription;
  public queue = [];
  subscription: Subscription;
  currentUser: boolean;
  variableno = '0px';
  textAreasList: any = [];
  backDropList: any = [];
  textArea: any;
  counter  = 0;

  constructor(private nounService: NounService, private rd: Renderer2, private sanitized: DomSanitizer, private userService: UserService) {
    this.currentUser = this.userService.isLoggedIn();
  }


  ngOnInit() {
    this.textAreasList.push('text_area'+ (this.textAreasList.length + 1));
    this.backDropList.push('back_drop'+ (this.backDropList.length + 1));

  }

  addTextarea(){
    this.counter++;
    this.textAreasList.push('text_area'+ (this.textAreasList.length + 1));
    this.backDropList.push('back_drop'+ (this.backDropList.length + 1));
    let textAreaBefore = null, textAreaI = null, backDropBefore = null, backDropI = null;


    if(this.textAreasList.length > 2 && this.backDropList.length > 2){
      textAreaBefore = <HTMLInputElement>document.getElementById('textAreasItem'+(this.textAreasList.length-3));
      textAreaI = <HTMLInputElement>document.getElementById('textAreasItem'+(this.textAreasList.length-2));

      backDropBefore = <HTMLInputElement>document.getElementById('backDropItem'+(this.backDropList.length-3));
      backDropI = <HTMLInputElement>document.getElementById('backDropItem'+(this.backDropList.length-2));
    }else{

      textAreaBefore = <HTMLInputElement>document.getElementById('textAreasItem0');
      backDropBefore = <HTMLInputElement>document.getElementById('backDropItem0');

    }


    if(textAreaBefore !== null && textAreaI !== null){

    let textRect = textAreaI.getBoundingClientRect();

    let textAreaBeforeRect = textAreaBefore.getBoundingClientRect();

    let myoffsettop = textRect.top + 200;
    this.textAreaTop[this.counter] = myoffsettop;


  }else{
    let textAreaBeforeRect = textAreaBefore.getBoundingClientRect();
    let myoffsettop = textAreaBeforeRect.top + 200;
    this.textAreaTop[this.counter] = myoffsettop;

  }


  }

  ngDoCheck() {
    let focused  = document.activeElement;
    let index;
    if(focused.id){
      index = focused.id.slice(-1);
    }

    this.text = this.textList[index];

  //let textAreaItem = <HTMLInputElement>document.getElementById('textAreasList'+(this.textAreasList.length));
  //this.textArea = <HTMLInputElement>document.getElementById('textAreasItem'+0);
  //console.log(this.textArea);


  //  let textArea = <HTMLInputElement>document.getElementById('txtarea');
  //  console.log(textArea.clientHeight);
  //  console.log(textArea.scrollHeight);
  //  if(textArea.clientHeight < textArea.scrollHeight - 2){

  //  }


  //  let lineNo = textArea.value.substr(0, textArea.selectionStart).split("\n").length;
  //   this.variableno = '600%';

  //  if (lineNo < 18) {
  //    this.variableno = '600%';
  //  } else if (lineNo > 18) {

  //    this.variableno = '1200%';
  //  }



    // var scrollTop = $textarea.scrollTop();
    //     $backdrop.scrollTop(scrollTop);
    //
    //
    //     var scrollLeft = $textarea.scrollLeft();
    //     $backdrop.scrollLeft(scrollLeft);

    //    this.getMarkElementRect();
  }


  sendMessage(event): void {

    if(this.text){

      this.nounService.send(this.text).subscribe(

        data => this.getResponse(data)
      )
    }

  }

  onKeydown(event) {

    if (event.key === "Backspace") {
      this.highlightText = '';
      this.display = "none";
    }

    if (event.key != 'Enter') {

      let textArea = this.textArea;

      let backDrop = <HTMLInputElement>document.getElementById('backdrop');
      console.log('here');
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

      if (changedWord.charAt(0) !== 't') {
        this.text = this.text.substr(0, this.text.lastIndexOf(changedWord));
      }

      this.textArea = <HTMLInputElement>document.getElementById('textAreasItem'+(this.textAreasList.length-2));


      if(this.textAreasList.length > 2 && this.backDropList.length > 2){

        this.textArea = <HTMLInputElement>document.getElementById('textAreasItem'+(this.textAreasList.length-2));


      }else{

        this.textArea = <HTMLInputElement>document.getElementById('textAreasItem0');

      }
      let textAreaValue = this.textArea.value.substring(this.textArea.value.lastIndexOf(" ") + 1);

      let spanElmt = <HTMLInputElement>document.getElementById('span');
      let highlights = <HTMLInputElement>document.getElementById('highlights');
      let backSpaceEvent = false;
      let revMark = reverse('<mark id="marky" style="background-color:#FBFF2C; border-radius: 8px; ">&$</mark>');
      this.sanitized.bypassSecurityTrustHtml(this.highlightText);

      this.highlightText = applyHighlights(this.text, changedWord, revMark);

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

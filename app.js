
import {notenJson,drawNote} from './noten';
import swal from 'sweetalert';
import { version } from 'punycode';

window.violinChecked = false;
window.bassChecked = false;
var x = document.getElementById('Quiz');
x.style.display = "none";
var versuch = 0;

var z = document.getElementById("violin");
if  (document.getElementById("violin").checked == true){
    console.log("check");
  }else{
    console.log("uncheck");
  }
window.score = 0;
window.questionIndex = 0;
var noten = 0 ;

function Noten(schl, note, choices) {
    this.schl = schl;
    this.note = note;
    this.choices = choices;
}

var ViolinNoten = new Array();
var BassNoten= new Array();
var MixNoten= new Array();
setTimeout(function(){ 
   // console.log(notenJson);
  for (var i = 0;i< notenJson.note.length;i++){
      if (notenJson.note[i].v  ){ //violin
        ViolinNoten.push(new Noten("treble",notenJson.note[i].v,notenJson.note[i].l))
        MixNoten.push(new Noten("treble",notenJson.note[i].v,notenJson.note[i].l))
      }else { //bass
        BassNoten.push(new Noten("bass",notenJson.note[i].b,notenJson.note[i].l))
        MixNoten.push(new Noten("bass",notenJson.note[i].b,notenJson.note[i].l))
      }
        
    }
    randomSort(MixNoten);
  }, 2000);

  function randomSort(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  MixNoten = array;
  displayQuiz();
  return array;
  }

window.displayQuiz = function(){
   console.log("display");
    
    if ((window.violinChecked == true) && (window.bassChecked == false)) { // Violin ONLY
        noten = 6;
        nextQuest(ViolinNoten);
    }
    else if ((window.violinChecked == false) && (window.bassChecked == true)) { // Bass ONLY
        noten = 6;
        nextQuest(BassNoten);
    }
    else if ((window.violinChecked == false) && (window.bassChecked == false)) { //ALL
        noten = 12;
        nextQuest(MixNoten);
    }
}

var ended = false;

  function  isEnded () {
    if(window.questionIndex ===  noten ){
        ended = true;
    }else {
        ended = false;
    }
}



function nextQuest(note) {
    console.log(" nextQuest");
    console.log("index "+ window.questionIndex);
    console.log("noten "+noten);
    isEnded();
    if(ended) {
        showScores();
        console.log("ended");
    }
    else {
        // show question
        versuch = 0;
        console.log("note "+ note[window.questionIndex].note   );
        var element = document.getElementById("noten");
        element.innerHTML = "";
        drawNote(note[window.questionIndex].schl,note[window.questionIndex].note);
        // show options
        var choices =  note[window.questionIndex].choices;
        for(var i = 0; i < 4; i++) {
            document.getElementById("btn"+i).style.backgroundColor = "#778897";
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i,choices[i],note[window.questionIndex].note);
        }

        showProgress();
    }
};


function guess(id, answer,note) {
    
    var button = document.getElementById(id);
    button.onclick = function() {
        versuch ++;
        console.log("versuch"+versuch);

       if(note == (answer+"4")) { //CORRECT
           switch(versuch){
               case 1:score++;
               console.log("correct");
               break;
               default:;
           }
            button.style.backgroundColor = "green";
            window.questionIndex++;
            displayQuiz();
        }else {                 //FALSE
            button.style.backgroundColor = "red";
        }
       
    }
};


function showProgress() {
    var currentQuestionNumber = window.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + noten;
};

function showScores() {
    console.log("show scores");
    swal(
        { 
        title: "Ergebnis",   
        text: "Your scores: "+ score+" von "+noten,   
        icon: "success",
       closeOnClickOutside: false,
       buttons: {
         neu:{
           text: "neues Spiel",
           value: "neu"
         }
       }  
       })

       .then((value) => {
        switch (value) {

         case "neu":
        window.questionIndex = 0;
        score = 0;
         displayQuiz();
         break;
         default:
         swal("default");
       }

    })






};










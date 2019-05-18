


import Question from'./question';
import {notenJson,drawNote} from './noten';

window.violinChecked = false;
window.bassChecked = false;
var x = document.getElementById('Quiz');
x.style.display = "none";

var z = document.getElementById("violin");
//z.checked = true;
if  (document.getElementById("violin").checked == true){
    console.log("check");
  }else{
    console.log("uncheck");
  }
var score = 0;
var questionIndex = 0;
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
 displayQuiz();
  }, 2000);
  

function displayQuiz(){
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


function  isEnded () {
    return questionIndex ===  noten - 1;
}


function nextQuest(note) {
    console.log(" nextQuest ");
    if(isEnded()) {
        showScores();
        console.log("ended");
       // var element = document.getElementById("noten");
      //  element.innerHTML = "";
    }
    else {
        // show question
        console.log("index "+questionIndex);
        console.log("note "+ note[questionIndex].note   );
        var element = document.getElementById("noten");
        element.innerHTML = "";
        drawNote(note[questionIndex].schl,note[questionIndex].note);
        // show options
        var choices =  note[questionIndex].choices;
        for(var i = 0; i < 4; i++) {
            document.getElementById("btn"+i).style.backgroundColor = "#778897";
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i,choices[i],note[questionIndex].note);
        }

        showProgress();
    }
};


function guess(id, answer,note) {
    var button = document.getElementById(id);
    button.onclick = function() {
       if(note == (answer+"4")) { //CORRECT
            score++;
            console.log("correct");
            button.style.backgroundColor = "green";
            questionIndex++;
            displayQuiz();
        }else {                 //FALSE
            button.style.backgroundColor = "red";
        }
       
    }
};


function showProgress() {
    var currentQuestionNumber = questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + noten;
};

function showScores() {
    console.log("show scores");
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + score + "</h2>";
    var element = document.getElementById("Quiz");
    element.innerHTML = gameOverHTML;
};










import  Vex from "./node_modules/vexflow/releases/vexflow-debug"
console.log("init noten.js");

export var notenJson;

  function loadDoc(url) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
   
    if (this.readyState == 4 && this.status == 200) {
    notenJson = JSON.parse(xhttp.responseText);
     }
 
   };
}
const url = 'http://localhost:8080';
loadDoc(url);


export  function drawNote   (schl,note){

console.log(schl);
 var vf = new Vex.Flow.Factory({ 
    renderer: {elementId: 'noten' ,height: "100%",width:"30%" }
  });
  const context = vf.getContext();
  context.setViewBox(0, 25, 50, 90);
  const svg = document.getElementById('noten')
  svg.childNodes[0].style= "padding-left: 30%;";  
  var score = vf.EasyScore();
  var system = vf.System();
  system.addStave({
    voices: [score.voice(score.notes(`${note}/q, B4, A4, G#4`))]
 }).addClef(schl)

  vf.draw();
 
}

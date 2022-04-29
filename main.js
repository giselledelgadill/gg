function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(750,300);
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded(){
  console.log('model is training');
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}
var lastResult='';
function gotResult(error,results){
if(error){
  console.error(error);
}
else{
  if((results[0].confidence>0.5)&&(lastResult !=results[0].label)){
    console.log(results);
    lastResult=results[0].label;
    var synth=window.speechSynthesis;
    speech_data='the object is- '+results[0].label;
    var run=new SpeechSynthesisUtterance(speech_data);
    synth.speak(run);
    document.getElementById("object_name").innerHTML=results[0].label;
    document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(3);
  }
}
}

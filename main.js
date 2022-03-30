img="";
status1 = "";
objects = [];
sound="";
function preload(){
}
function setup(){
sound=new Audio("alert.mp3");
canvas=createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
console.log("Model Loaded!");
}
function gotResult(error, results){
if(error){
console.log(error);
}
console.log(results);
objects = results;
}
function draw(){
image(video, 0, 0, 380, 380);

objectDetector.detect(video, gotResult);
for(i = 0; i < objects.length; i++){
if(objects[i].label == "person"){
sound.stop();
document.getElementById("baby_value").innerHTML="Baby Found";
}
else{
document.getElementById("baby_value").innerHTML="Baby Not Found";
sound.play();
}
fill('red');
percent = floor(objects[i].confidence * 100);
text(objects[i].label + "" + percent + "%", objects[i].x+15, objects[i].y+15);
noFill();
stroke('red')
rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
}
if (objects.length < 0){
document.getElementById("baby_value").innerHTML="Baby Not Found";
sound.play();
}
}
function smn(){
window.location.reload();
}
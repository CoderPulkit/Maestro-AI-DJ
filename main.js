song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function preload(){
 song=loadSound("music.mp3");
}

function setup(){
 canvas=createCanvas(600,470);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 posenet=ml5.poseNet(video,modalLoaded);
 posenet.on('pose',gotPoses);
}

function draw(){
 image(video,0,0,600,470);
 fill("#FF0000");
 stroke("#000000");
 if (scoreleftwrist>0.2){
 circle(leftWristX,leftWristY,20);
 InNoleftwristY=Number(leftWristY);
 remove_decimals=floor(InNoleftwristY);
 volume=remove_decimals/500;
 document.getElementById("volume").innerHTML="Volume: "+volume;
 song.setVolume(volume);
}

 if (scorerightwrist>0.2) {
     circle(rightWristX,rightWristY,20);
     if (rightWristY>0 && rightWristY<=100) {
         document.getElementById('speed').innerHTML="Speed=0.5x";
         song.rate(0.5);
     }
     if (rightWristY>100 && rightWristY<=200) {
        document.getElementById('speed').innerHTML="Speed=1.0x";
        song.rate(1.0);
    }
    if (rightWristY>200 && rightWristY<=300) {
        document.getElementById('speed').innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
    if (rightWristY>200 && rightWristY<=350) {
        document.getElementById('speed').innerHTML="Speed=2.0x";
        song.rate(2.0);
    }
    if (rightWristY>350 && rightWristY<=470) {
        document.getElementById('speed').innerHTML="Speed=2.5x";
        song.rate(2.5);
    }
 }
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1.5);
}

function modalLoaded(){
    console.log("Modal Laoded");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
  scoreleftwrist=results[0].pose.keypoints[9].score;
  scorerightwrist=results[0].pose.keypoints[10].score;
  console.log("Score Left Wrist: "+scoreleftwrist+"Score Right Wrist"+scorerightwrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("Left Wrist X= "+leftWristX+"Left Wrist Y= "+leftWristY);
    console.log("Right Wrist X= "+rightWristX+"Right Wrist Y= "+rightWristY);
    
}
}
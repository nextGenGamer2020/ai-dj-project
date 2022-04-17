rightWristX = 0;
rightWristY = 0;

leftWristX = 0
leftWristY = 0;

scoreRightWrist = 0
scoreLeftWrist = 0
song = ""
song2 = ""
function preload(){
    song = loadSound("music.mp3")
    song2 = loadSound("masked wolf astronaut in the ocean.mp3")
}

function setup(){
    canvas = createCanvas(350,350)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)

}


function gotPoses(result){
    if(result.length > 0){
        
        scoreRightWrist = result[0].pose.keypoints[10].score
        scoreLeftWrist = result[0].pose.keypoints[9].score
        console.log("scoreLeftWrist"+scoreLeftWrist)
        console.log("scoreRightWrist"+scoreRightWrist)


        rightWristX = result[0].pose.rightWrist.x
        rightWristY = result[0].pose.rightWrist.y
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY)


        leftWristX = result[0].pose.leftWrist.x
        leftWristY = result[0].pose.leftWrist.y
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY)
        console.log(result)
    }
}

function draw(){
    image(video, 0,0, 350,350 )
    fill("#063970")
    stroke("#000000")
    if(scoreRightWrist>0.2){

    
    circle(rightWristX, rightWristY, 20)
    if(rightWristY>0 && rightWristY <=90){
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
        song.rate(0.5)
    }
    
    else 

    if(rightWristY>90 && rightWristY <=180){
        document.getElementById("speed").innerHTML = "Speed = 1x"
        song.rate(1)
    }
    else
    if(rightWristY>180 && rightWristY <=270){
        document.getElementById("speed").innerHTML = "Speed = 1.5x"
        song.rate(1.5)
    }
    else
    if(rightWristY>270 && rightWristY <=360){
        document.getElementById("speed").innerHTML = "Speed = 2x"
        song.rate(2)
    }
}


    if(scoreLeftWrist>0.2){

    circle(leftWristX,leftWristY,20)
    InNumberLeftY = Number(leftWristY)
    removeDecimals = floor(InNumberLeftY)
    volume = (removeDecimals/350).toFixed(3)
    document.getElementById("volume").innerHTML = "Volume = "+volume
    song.setVolume(volume)
}


}


function play(){
    song2.play()
}

function modelLoaded(){
    console.log("modelLoaded")
}

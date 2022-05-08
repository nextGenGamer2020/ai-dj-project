rightWristX = 0;
rightWristY = 0;

leftWristX = 0
leftWristY = 0;

scoreRightWrist = 0
scoreLeftWrist = 0

song1Status = ""
song2Status = ""


song1 = ""
song2 = ""
function preload(){
    song1 = loadSound("music.mp3")
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


function modelLoaded(){
    console.log("modelLoaded")
}


function gotPoses(result){
    if(result.length > 0){
        console.log(result)
        
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

    song1Status = song.isPlaying()
    song2Status = song.isPlaying()

    fill("#063970")
    stroke("#000000")
    if(scoreRightWrist>0.2){

    
    circle(rightWristX, rightWristY, 20)

    song2.stop()
    if(song1Status == false){
        song1.play()
        document.getElementById("current_song").innerHTML = "Harry Potter Theme Song"
    }
   

    if(scoreLeftWrist>0.2){

    circle(leftWristX,leftWristY,20)
    song1.stop()
    if(song2Status == false){
        song2.play()
        document.getElementById("current_song").innerHTML = "Astronaut in the Ocean"
    }
    
    }


    }
}


function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}


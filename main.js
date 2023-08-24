previmg=""
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
}
function draw()
{
  image(video , 0,0,300,300);
  classifier.classify(video , gotresult)

}
function modelLoaded()
{
  console.log("The model has been planted");
}
function gotresult(error,result)
{
  if (error)
  {
    console.log(error);
  }
  else 
  {
    if (result[0].confidence> 0.5 && previmg != result[0].label)
    {
      document.getElementById("object").innerHTML=  result[0].label
      document.getElementById("accuracy").innerHTML= result[0].confidence
      speak = window.speechSynthesis
      utterThis = new SpeechSynthesisUtterance("object is"+result[0].label )
      speak.speak(utterThis)
      previmg = result[0].label
    }
  }
}




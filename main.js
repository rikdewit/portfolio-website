let gridFactor = 1;
let locX = 0;
let locY = 0;
let locI = 0;
let bg;
let aspectRatio

function preload(){
    calcGrid();
    bg = loadImages();
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.mouseClicked(click);
    aspectRatio = windowWidth/windowHeight;

}

function draw() {
   
    background(0);
    drawBackground();
    where();


    // drawGrid();
}

function drawBackground(){
    let img = bg[locI]
    let imgAR = img.width/img.height

    if(imgAR > aspectRatio){
        img.resize(windowHeight+75,0);
    }else{
        img.resize(0,windowWidth);
    }

    imageMode(CENTER);
    image(img, windowWidth/2, windowHeight/2);
}

function windowResized() {
    aspectRatio = windowWidth/windowHeight;
    resizeCanvas(windowWidth, windowHeight);
    calcGrid();
    clear();
    // console.log(windowWidth,windowHeight);
}

function calcGrid(){
    aspectRatio = windowWidth/windowHeight;
    if(aspectRatio > 10){
        gridX = 12;
        gridY = 1;
    }else if(aspectRatio > 2){
        gridX = 6;
        gridY = 2;
    }else if(aspectRatio > 1.3){
        gridX = 4;
        gridY = 3;
    }else if(aspectRatio > .65){
        gridX = 3;
        gridY = 4;
    }else if(aspectRatio > .3){
        gridX = 2;
        gridY = 6;
    }else{
        gridX = 1;
        gridY = 12;
    }

    gridX = gridX*gridFactor;
    gridY = gridY*gridFactor;


}

function drawGrid(){
    //crosshair
    stroke(255, 36, 164);
    line(mouseX,0, mouseX, windowHeight);
    line(0, mouseY, windowWidth, mouseY);

    //grid
    stroke(0);

    for (let x = 0; x < windowWidth; x += windowWidth / gridX) {
		for (let y = 0; y < windowHeight; y += windowHeight / gridY) {
			strokeWeight(1);
			line(x, 0, x, windowHeight);
			line(0, y, windowWidth, y);
		}
    }
}

function where(){
    locX = Math.floor(mouseX / (windowWidth / gridX));
    locY = Math.floor(mouseY / (windowHeight / gridY));
    locI = locX + locY * gridX;
    // console.log(locX, locY, locI);
}

function loadImages(){
    let images = [];
    for(let i=0; i<gridX*gridY*gridFactor;i++){
        let image = loadImage('images/'+i+'.png');
        images.push(image);
    }
    return images;

}

function click(){
    
    window.location.href = "images/"+locI+".png";

}
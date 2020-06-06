let gridFactor = 1;
let locX = 0;
let locY = 0;
let locI = 0;
let bg;
let media_urls;
let aspectRatio;
let loaded = false;
let canvasloaded = false;
let media;
let grid = false;
let animated = false;

window.onload = function () {
    const targetElement = document.body;
    bodyScrollLock.disableBodyScroll(targetElement);

}

let displayCanvas = (function () {
    let executed = false;
    return function () {
        if (!executed) {
            executed = true;
            let canvas = document.querySelector("canvas");
            canvas.classList.toggle("visible");
        }
    };
})();






function mediaLoaded(callback) {
    let done = true;
    for (element of media) {
        if (element.elt) {
            if (element.elt.readyState !== 4) {
                done = false;
            }
        }
    }
    if (done) {
        if (typeof callback == "function")

            callback();
        loaded = true;

    }
    return done;
}



async function preload() {

    media_urls = await fetch("/media_urls").then(response => response.json());
    bg = await loadMedia(media_urls);
    canvasloaded = true;
}


async function loadMedia(urls) {
    media = [];
    for (url of urls) {
        let file_ext = url.slice(-3)
        if (file_ext === "jpg") {
            let image = loadImage(url);
            media.push(image);

        } else if (file_ext === "mp4") {
            let video = await loadVideo(url);
            media.push(video)
        }

    }
    return media
}


async function loadVideo(url, i) {
    let vid = await createVideo(url);
    vid.elt.setAttribute('playsinline', '');
    vid.elt.setAttribute('autoplay', '');
    vid.elt.setAttribute("loop", "true");
    vid.volume(0);
    vid.loop();

    video = document.querySelector("video");

    return vid
}


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.mouseClicked(click);
    aspectRatio = windowWidth / windowHeight;
    calcGrid();

}



function draw() {
    if(animated){
    background(255);

    if (canvasloaded) {
        drawBackground();

        if (!loaded) {
            mediaLoaded(displayCanvas);
        }
    }

    where();
    if (grid === true) {
        drawGrid();
    }
}

}

function drawBackground() {
    let img = bg[locI];
    let imgAR = img.width / img.height
    let imgHeight;
    let imgWidth;

    if (imgAR > aspectRatio) {

        imgHeight = windowHeight
        imgWidth = (windowHeight / img.height) * img.width;
    } else {

        imgWidth = windowWidth;
        imgHeight = (windowWidth / img.width) * img.height;
    }

    imageMode(CENTER);
    image(img, windowWidth / 2, windowHeight / 2, imgWidth, imgHeight);
}

function windowResized() {
    aspectRatio = windowWidth / windowHeight;
    resizeCanvas(windowWidth, windowHeight);
    calcGrid();
}

function deviceTurned() {

    windowResized();
}

function calcGrid() {
    aspectRatio = windowWidth / windowHeight;
    if (aspectRatio > 10) {
        gridX = 12;
        gridY = 1;
    } else if (aspectRatio > 2) {
        gridX = 6;
        gridY = 2;
    } else if (aspectRatio > 1.3) {
        gridX = 4;
        gridY = 3;
    } else if (aspectRatio > .65) {
        gridX = 3;
        gridY = 4;
    } else if (aspectRatio > .3) {
        gridX = 2;
        gridY = 6;
    } else {
        gridX = 1;
        gridY = 12;
    }

    gridX = gridX * gridFactor;
    gridY = gridY * gridFactor;
}

function drawGrid() {
    //crosshair
    stroke(255, 36, 164);
    line(mouseX, 0, mouseX, windowHeight);
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

function where() {
    locX = Math.floor(mouseX / (windowWidth / gridX));
    locY = Math.floor(mouseY / (windowHeight / gridY));

    locI = locX + locY * gridX;
    // fix for choosing image when resizing window
    if (locI >= 12 || locI < 0) {
        locX, locY, locI = 0;
    }
}


function click() {

    // window.location.href = media_urls[locI];
    let canvas = document.querySelector("canvas");


    canvas.classList.toggle("visible");

}
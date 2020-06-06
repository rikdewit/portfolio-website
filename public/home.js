

let title = document.querySelector("#titleBox");
let clones = document.querySelectorAll(".bgBox");
let contentDiv = document.querySelector("#content");

title.addEventListener("click", (e) => {
    title.classList.add("clicked");
    setTimeout(launch, 500);
    setTimeout(zoom, 2000);
});

function launch() {
    for (let i = 0; i < clones.length; i++) {

            setTimeout(() => {
                if(i ===3){
                    title.style.visibility = "hidden"
                }
                clones[i].style.visibility = "visible";

            }, i * 150);
        
    }
}


function zoom(){
    contentDiv.classList.add("zoom");
}
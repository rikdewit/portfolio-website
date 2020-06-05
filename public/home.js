

let title = document.querySelector("#titleBox");
let clones = document.querySelectorAll(".bgBox");

title.addEventListener("click", (e) => {
    title.classList.toggle("clicked");
    setTimeout(launch, 500);
});

async function launch() {
    for (let i = 0; i < clones.length; i++) {

            setTimeout(() => {
                if(i ===3){
                    title.style.visibility = "hidden"
                }
                clones[i].style.visibility = "visible";

            }, i * 150);
        
    }
}


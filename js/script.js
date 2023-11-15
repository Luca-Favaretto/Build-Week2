const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7a2d1c8d36mshefbc94c09d4f245p1bbdcajsn7d5390404f7c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
};
const arrayMusic = () => {
  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          "Errore nella richiesta HTTP, stato " + response.status
        );
      }
      return response.json();
    })
    .then(data => {
      console.log("Dati ricevuti con successo:", data);
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};

////per tendina amici

const xAsideLeft = document.getElementById("x-aside-left");
console.log(xAsideLeft);
const contatti = document.getElementById("contatti");
console.log(contatti);
const midRight = document.getElementsByClassName("mid-right")[0];
console.log(midRight);
xAsideLeft.onclick = () => midRight.classList.add("d-none");
contatti.onclick = () => midRight.classList.remove("d-none");

///per controlli media playerd
const audio = document.getElementById("audio");
console.log(audio);
const playBtn = Array.from(document.getElementsByClassName("fa-play"));
console.log(playBtn[0]);
const pausaBtn = document.getElementById("audio");
console.log(pausaBtn);
const nextSongBtn = document.getElementById("audio");
console.log(nextSongBtn);
const previusSongBtn = document.getElementById("audio");
console.log(previusSongBtn);

const playAudio = function playAudio() {
  console.log(playBtn);
  audio.play();
};
const stopAudio = function stopAudio() {
  pausaBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audio.pause();
};
playBtn.forEach(btnPlay => {
  btnPlay.addEventListener("click", function () {
    playAudio();
  });
});

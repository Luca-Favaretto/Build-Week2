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
arrayMusic();
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
console.log(audio.duration);
console.log(audio.currentTime);
const playBtns = Array.from(document.getElementsByClassName("play-btn"));
console.log(playBtns);
const currentTime = document.getElementById("current-time-music");
console.log(currentTime);
const durationTime = document.getElementById("duration-time-music");
console.log(durationTime);
const rangePlayer = document.getElementById("range-player");
console.log(rangePlayer);
const volumePlayer = document.getElementById("volume");
console.log(volume);
// const nextSongBtn = document.getElementById("audio");
// console.log(nextSongBtn);
// const previusSongBtn = document.getElementById("audio");
// console.log(previusSongBtn);

const playAudio = btn => {
  audio.play();
  playBtns.forEach(btn => (btn.innerHTML = ' <i class="fas fa-pause"></i'));
};

const stopAudio = btn => {
  audio.pause();
  audio.currentTime = 0; // Reset the audio to the beginning
  playBtns.forEach(btn => (btn.innerHTML = '<i class="fas fa-play"></i>'));
};

playBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    // Check the inner HTML to determine if it's a play or pause button
    if (btn.innerHTML === '<i class="fas fa-play"></i>') {
      playAudio(btn);
    } else {
      stopAudio(btn);
    }
  });
});
////aggioramento barra audio

const updateMediaPlayer = () => {
  currentTime.innerText = Math.floor(audio.currentTime);
  durationTime.innerText =
    Math.floor(audio.duration) - Math.floor(audio.currentTime);
  rangePlayer.value = (audio.currentTime / audio.duration) * 100;
};
const time = setInterval(updateMediaPlayer, 100);
//// volume

volumePlayer.addEventListener("input", function () {
  audio.volume = volumePlayer.value / 100;
});

////per tendina amici

const xAsideLeft = document.getElementById("x-aside-left");
console.log(xAsideLeft);
const contatti = document.getElementById("contatti");
console.log(contatti);
const midRight = document.getElementsByClassName("mid-right")[0];
console.log(midRight);
xAsideLeft.onclick = () => midRight.classList.remove("d-xl-block");
contatti.onclick = () => midRight.classList.add("d-xl-block");

///per controlli media playerd
const audio = document.getElementById("audio");
console.log(audio);

console.log(audio.duration);
console.log(audio.currentTime);
const playBtns = Array.from(document.getElementsByClassName("fa-play"));
console.log(playBtns[0]);
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

const playAudio = () => {
  audio.play();
  playBtns.forEach(btn => {
    btn.classList.remove("fa-play");
    btn.classList.add("fa-pause");
    console.log(playBtns);
  });
};

const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
  playBtns.forEach(btn => {
    btn.classList.remove("fa-pause");
    btn.classList.add("fa-play");
    console.log(playBtns);
  });
};
const control = () => {
  playBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("fa-play")) {
        playAudio();
      } else {
        stopAudio();
      }
    });
  });
};
////aggioramento barra audio
const minTime = function (seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  return minutes + ":" + remainingSeconds;
};
const updateMediaPlayer = () => {
  currentTime.innerText = minTime(Math.floor(audio.currentTime));
  durationTime.innerText = minTime(
    Math.floor(audio.duration) - Math.floor(audio.currentTime)
  );
  rangePlayer.value = (audio.currentTime / audio.duration) * 100;
};
const time = setInterval(updateMediaPlayer, 100);
//// volume

volumePlayer.addEventListener("input", function () {
  audio.volume = volumePlayer.value / 100;
});
///aquisizione api
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
      const eminem = data.data;
      console.log(eminem);
      console.log(eminem[1].album.title);
      createUl(eminem);
      createCard(eminem);
      createCard2(eminem);
      control();
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};

///aside left with api
const createUl = array => {
  const ulAside = document.getElementById("ul-aside-left");
  console.log(ulAside);
  ulAside.innerText = "";
  array.forEach(elem => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="withe-trasparent text-decoration-none" href="./album.html?id=${elem.id}">${elem.title}
    </a>`;
    ulAside.appendChild(li);
  });
};

window.onload = () => {
  arrayMusic();
};
window.DOMException;

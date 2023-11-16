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
control();
////aggioramento barra audio
const minTime = function (seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
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

///aside left with api
const createUl = array => {
  const ulAside = document.getElementById("ul-aside-left");
  console.log(ulAside);
  ulAside.innerText = "";
  array.forEach(elem => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="withe-trasparent text-decoration-none" href="./album.html?id=${elem.album.id}">${elem.title}
    </a>`;
    ulAside.appendChild(li);
  });
};

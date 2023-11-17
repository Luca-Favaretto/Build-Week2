// aquisizione api
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
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};

/////aquisizione album

const urlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const optionsAlbum = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7a2d1c8d36mshefbc94c09d4f245p1bbdcajsn7d5390404f7c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
};
let params = new URLSearchParams(window.location.search).get("id");

const arrayAlbum = () => {
  fetch(urlAlbum + params, options)
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
      const album = data;
      console.log(album);
      const {
        artist: { name, picture_medium },
        cover_medium,
        duration,
        release_date,
        title,
        tracks
      } = album;
      albumImg.src = cover_medium;
      albumTitle.innerText = title;
      smallImg.src = picture_medium;
      nameArtist.innerText = name;
      date.innerText = release_date + ", ";
      timeSongs.innerText = minTime(duration);
      console.log(tracks);
      containerTrack.innerHTML = "";
      let count = 0;
      tracks.data.forEach(song => {
        count++;
        const {
          artist: { name, id },
          preview,
          title,
          title_short,
          rank,
          duration,
          album: { cover_small }
        } = song;
        const div = document.createElement("div");
        div.classList.add("col-12");
        div.classList.add("d-flex");
        div.classList.add("z-1");

        div.classList.add("align-items-center");
        div.innerHTML = `
       <div class="col-10 col-md-6  d-flex ">
          <div class="align-self-center"><p class="m-0">${count}</p></div>
          <div class="ms-4 mt-4">
            <p class="mb-0" onclick="newSong('${title_short}','${name}','${cover_small}','${preview}')">
            ${title}
            </p>
            <a class="text-secondary text-decoration-none" href="./artist.html?id=${id}">${name}</a>
            </div>
       </div>
      </div>
      <div class="col-4 text-end text-secondary d-none d-md-block">
        <p>${rank}</p>
      </div>
      <div class="col-2 text-end mt text-secondary">
        <p class="d-none d-md-block">${minTime(duration)}</p>
        <div class="dropdown">
          <button
            class="btn btn-transparent dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              class="fas fa-ellipsis-v d-md-none fs-4 withe-trasparent"
            ></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Riproduzione</a></li>
            <li><a class="dropdown-item" href="#">3.42</a></li>
          </ul>
        </div>
      </div>
        `;
        console.log(div);
        containerTrack.appendChild(div);
      });

      control();
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};
const albumImg = document.getElementById("svg-mobile");
console.log(albumImg);
const albumTitle = document.getElementById("fs-mobile");
console.log(albumTitle);
const smallImg = document.getElementById("small");
console.log(smallImg);
const nameArtist = document.getElementById("titolo-mobile");
console.log(nameArtist);
const date = document.getElementById("date");
console.log(date);
const timeSongs = document.getElementById("time");
console.log(timeSongs);
const containerTrack = document.getElementById("container-track");
console.log(containerTrack);

window.onload = () => {
  arrayMusic();
  arrayAlbum();
};

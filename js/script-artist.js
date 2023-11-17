const creation = array => {
  const containerArtist = document.getElementById("container-artist");
  console.log(containerArtist);
  containerArtist.innerHTML = "";
  let count = 0;
  const newArray = array.slice(0, 10);
  newArray.forEach(element => {
    count++;
    const {
      album: { cover_small },
      artist: { name },

      title,
      rank,
      duration,
      preview
    } = element;
    const div = document.createElement("div");
    div.classList.add("mt-3");
    div.classList.add("row");
    div.innerHTML = `
    <div
    class="col-10 col-md-6 d-flex align-items-center gap-2"
  >
    <p class="m-0 text-white">${count}</p>
    <img
      src="${cover_small}"
      alt=""
      width="50px"
    />
    <p class="m-0 text-white" onclick="newSong('${title}','${name}','${preview}')">${title}</p>
  </div>
  <div class="col-4 align-items-center d-none d-md-flex">
    <p class="withe-trasparent m-0">${rank}</p>
  </div>
  <div class="col-2 align-items-center d-flex">
    <p class="m-0 withe-trasparent">${minTime(duration)}</p>
  </div>
    `;
    containerArtist.appendChild(div);
  });
};
const createUlArtist = array => {
  const ulAside = document.getElementById("ul-aside-left");
  console.log(ulAside);
  ulAside.innerText = "";
  const newArray = array.slice(10, 30);
  newArray.forEach(elem => {
    const li = document.createElement("li");
    const {
      album: { cover_small },
      artist: { name },
      title,
      rank,
      duration,
      preview
    } = elem;
    li.innerHTML = `<a class="withe-trasparent text-decoration-none" onclick="newSong('${title}','${name}','${preview}')">${elem.title}
    </a>`;
    ulAside.appendChild(li);
  });
};

///aquisizione api
let params = new URLSearchParams(window.location.search).get("id");
console.log(params);
const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7a2d1c8d36mshefbc94c09d4f245p1bbdcajsn7d5390404f7c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
};

const arrayMusic = () => {
  fetch(url + params, options)
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
      const artist = data;
      console.log(artist);
      artistModification(artist);
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};

const artistModification = date => {
  const headerArtist = document.getElementsByClassName("header-artist")[0];
  console.log(headerArtist);
  const nameArtist = document.getElementById("name-artist");
  console.log(nameArtist);
  const rank = document.getElementById("rank");
  console.log(rank);

  const { name, nb_fan, picture_big, id } = date;
  headerArtist.style.backgroundImage = `url(${picture_big})`;
  nameArtist.innerText = name;
  rank.innerText = nb_fan;

  console.log(id);
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=30`,
    options
  )
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
      const artistTracks = data.data;
      console.log(artistTracks);
      // containerArtist.innerHTML = "";
      creation(artistTracks);
      createUlArtist(artistTracks);

      control();
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};

window.onload = () => {
  arrayMusic();
};

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
window.onload = () => {
  arrayMusic();
};
window.DOMException;

const createCard = array => {
  const containerCard = document.getElementById("firsth-card-container");
  console.log(containerCard);
  containerCard.innerHTML = "";
  const newArray = array.slice(0, 6);

  newArray.forEach(element => {
    const { title, cover, id } = element.album;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-sm-6");
    cardDiv.classList.add("col-lg-4");
    cardDiv.innerHTML = `
    <div class="card mb-3 gray-spoty-bg border border-0">
      <div class="row g-0">
        <div class="col-3">
          <img
            src="${cover}"
            class="img-fluid rounded-start"
            alt="immagine della canzone"
          />
        </div>
        <div class="col-9 d-flex align-items-center">
          <div id="testo" class="card-body p-2">
            <a class="withe-trasparent text-decoration-none" href="./album.html?id=${id}">${title}
            </a>
          </div>
        </div>
      </div>
    </div>
    `;
    containerCard.appendChild(cardDiv);
  });
};
const createCard2 = array => {
  const containerCard = document.getElementById("second-card-container");
  console.log(containerCard);
  containerCard.innerHTML = "";
  //   array.splice(9);

  const newArray = array.slice(6);
  console.log(newArray);
  newArray.forEach(element => {
    const { title, cover_medium, id } = element.album;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-12");
    cardDiv.classList.add("col-lg-4");
    cardDiv.classList.add("mt-4");
    cardDiv.innerHTML = `
    <div class="card p-2 black-spoty-bg">
      <div class="row">
        <div class="col-5 col-lg-12">
          <img
            src="${cover_medium}"
            class="card-img-top"
            alt="..."
          />
        </div>
        <div class="col-7 col-lg-12">
          <div class="card-body text-light">
            <h5 class="card-title">${element.artist.name}</h5>
            <a class="card-text text-decoration-none withe-trasparent" href="./album.html?id=${id}">
            ${title}
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex gap-1 p-2">
        <i class="fas fa-heart withe-trasparent"></i>
        <i class="fas fa-ellipsis-v me-auto withe-trasparent">
          <span>16 brani</span> </i
        ><i class="fas fa-play withe-trasparent"></i>
      </div>
    </div>
    `;
    containerCard.appendChild(cardDiv);
  });
};

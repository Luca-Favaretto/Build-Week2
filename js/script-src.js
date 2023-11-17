const createCardSearch = array => {
  const containerCard = document.getElementById("card-container");
  console.log(containerCard);
  console.log(array);
  containerCard.innerHTML = "";

  array.forEach(element => {
    const {
      album: { title, cover_medium, id },

      artist: { name }
    } = element;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-12");
    cardDiv.classList.add("col-md-6");
    cardDiv.classList.add("col-lg-3");

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
              <h5 class="card-title">${name}</h5>
              <a class="card-text text-decoration-none withe-trasparent no-wrap" href="./album.html?id=${id}">
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
///aquisizione api
const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7a2d1c8d36mshefbc94c09d4f245p1bbdcajsn7d5390404f7c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
  }
};

let params = "eminem";

let input = document.getElementById("input-search");
console.log(input);
let form = document.getElementById("form-search");
console.log(form);

const arrayMusic = params => {
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
      const search = data.data;

      createUl(search);

      createCardSearch(search);
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value !== "") {
    params = input.value;
  }
  console.log(input.value);
  console.log(params);
  arrayMusic(params);
});
window.onload = () => {
  arrayMusic(params);
};

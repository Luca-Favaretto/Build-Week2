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

      control();
    })
    .catch(error => {
      console.error("Si è verificato un errore:", error);
    });
};
window.onload = () => {
  arrayMusic();
};

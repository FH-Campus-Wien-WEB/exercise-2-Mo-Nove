function setMovie(movie) {
  for (const element of document.forms[0].elements) {
    const name = element.id;
    const value = movie[name];

    if (name === "Genres") {
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        option.selected = value.indexOf(option.value) >= 0;
      }
    } else {
      element.value = value;
    }
  }
}

function getMovie() {
  const movie = {};

  const elements = Array.from(document.forms[0].elements).filter(
    (element) => element.id,
  );

  for (const element of elements) {
    const name = element.id;

    let value;

    if (name === "Genres") {
      value = [];
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.selected) {
          value.push(option.value);
        }
      }
    } else if (
      name === "Metascore" ||
      name === "Runtime" ||
      name === "imdbRating"
    ) {
      value = Number(element.value);
    } else if (
      name === "Actors" ||
      name === "Directors" ||
      name === "Writers"
    ) {
      value = element.value.split(",").map((item) => item.trim());
    } else {
      value = element.value;
    }

    movie[name] = value;
  }

  return movie;
}

function putMovie() {
    // 1. Ausgewählte Genres aus dem Dropdown auslesen
    const genreSelect = document.getElementById("Genres");
    const selectedGenres = Array.from(genreSelect.selectedOptions).map(opt => opt.value);

    // 2. HIER WIRD DIE VARIABLE "movie" DEFINIERT!
    // Wir holen uns alle aktuellen Texte direkt aus den Input-Feldern
    const movie = {
        imdbID: document.getElementById("imdbID").value,
        Title: document.getElementById("Title").value,
        Released: document.getElementById("Released").value,
        Runtime: parseInt(document.getElementById("Runtime").value),
        Poster: document.getElementById("Poster").value,
        Metascore: parseInt(document.getElementById("Metascore").value),
        imdbRating: parseFloat(document.getElementById("imdbRating").value),
        
        Directors: document.getElementById("Directors").value.split(",").map(s => s.trim()),
        Writers: document.getElementById("Writers").value.split(",").map(s => s.trim()),
        Actors: document.getElementById("Actors").value.split(",").map(s => s.trim()),
        
        Genres: selectedGenres,
        Plot: document.getElementById("Plot").value
    };

    // 3. Jetzt, wo "movie" existiert, können wir es abschicken
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            location.href = "index.html"; // Erfolg! Zurück zur Startseite
        } else {
            alert("Der Server meldet einen Fehler: Status " + xhr.status);
        }
    };

    // Da "movie" oben definiert wurde, knallt es hier jetzt nicht mehr!
    xhr.open("PUT", "/movies/" + movie.imdbID);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(movie));
}

/** Loading and setting the movie data for the movie with the passed imdbID */
const imdbID = new URLSearchParams(window.location.search).get("imdbID");

const xhr = new XMLHttpRequest();
xhr.open("GET", "/movies/" + imdbID);
xhr.onload = function () {
  if (xhr.status === 200) {
    setMovie(JSON.parse(xhr.responseText));
  } else {
    alert(
      "Loading of movie data failed. Status was " +
        xhr.status +
        " - " +
        xhr.statusText,
    );
  }
};

xhr.send();


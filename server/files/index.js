window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      bodyElement.innerHTML = "";

      for (const movie of movies) {

        const movieContainer = document.createElement('article');

        //imdbID als ID geben
        movieContainer.id = movie.imdbID;

        const titleElement = document.createElement('h1');
        titleElement.textContent = movie.Title;

        const posterElement = document.createElement('img');
        posterElement.src = movie.Poster;

        const hours = Math.floor(movie.Runtime / 60);
        const minutes = movie.Runtime % 60;

        const infoElement = document.createElement('p');
        infoElement.textContent = "Released: " + movie.Released + " | Runtime: " + hours + "h " + minutes + "m";

        const ratingElement = document.createElement('p');
        ratingElement.textContent = "IMDb: " + movie.imdbRating + " | Metascore: " + movie.Metascore;

        const plotElement = document.createElement('p');
        plotElement.style.fontStyle = 'italic';
        plotElement.textContent = movie.Plot;

        const genreContainer = document.createElement('p');
        genreContainer.textContent = "Genres: ";

        movie.Genres.forEach(function (genre) {
          const genreSpan = document.createElement('span');
          genreSpan.textContent = genre;
          genreSpan.className = "genre";
          genreContainer.append(genreSpan);
        });

        const directorElement = document.createElement('h2');
        directorElement.textContent = "Director";
        const directorNames = document.createElement('p');
        directorNames.textContent = movie.Directors.join(', ');

        const writerElement = document.createElement('h2');
        writerElement.textContent = "Writer";
        const writerNames = document.createElement('p');
        writerNames.textContent = movie.Writers.join(', ');

        const actorsElement = document.createElement('h2');
        actorsElement.textContent = "Actors";
        const actorsNames = document.createElement('p');
        actorsNames.textContent = movie.Actors.join(', ');

        //Edit-Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
          location.href = 'edit.html?imdbID=' + movie.imdbID;
        };

        movieContainer.append(posterElement);
        movieContainer.append(titleElement);
        movieContainer.append(infoElement);
        movieContainer.append(genreContainer);
        movieContainer.append(ratingElement);
        movieContainer.append(plotElement);
        movieContainer.append(directorElement);
        movieContainer.append(directorNames);
        movieContainer.append(writerElement);
        movieContainer.append(writerNames);
        movieContainer.append(actorsElement);
        movieContainer.append(actorsNames);

        // Den neuen Button als letztes Element in die Karte hängen
        movieContainer.append(editButton);

        movieContainer.append(document.createElement('br'));

        // Die fertige Karte an die Seite anhängen
        bodyElement.append(movieContainer);
      }
    } else {
      // Fehlerbehandlung aus dem Skeleton-Code
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
        xhr.status +
        " - " +
        xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
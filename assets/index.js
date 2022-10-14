const cards = document.getElementById("cards");

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((data) => {
      let contenuHtml = "<div class='card'>";
      if (window.innerWidth >= 1240) {// ici on test la taille de la fenetre elle est superieur ou égale à 1240px 
        contenuHtml +=
          "<img class='picture' src='" + data.thumbnail.regular.large + "'/>";
      } else if (window.innerWidth >= 769) {// ici on test la taille de la fenetre elle est superieur ou égale à 769px 
        contenuHtml +=
          "<img class='picture' src='" + data.thumbnail.regular.medium + "'/><div class='bookmarked'></div></img>";
      } else {// ici on test la taille de la fenetre c'est l'element par defaut car on change la taille de la photo en fonction de l'element par defaut qui est le smartphone 
        contenuHtml +=
          "<img class='picture' src='" + data.thumbnail.regular.small + "'/>";
      }

      contenuHtml +=
        "<div class='info'><p class='date'>" + data.year + " . " + "</p>";
      contenuHtml +=
        "<p class='" + data.category + "'>" + data.category + " . " + "</p>";// ici on a mis en class les categorie soit serie tv soit film on ;la paramettré dans le css
      contenuHtml += "<p class='public'>" + data.rating + "</p></div>";
      contenuHtml += "<h4 class='title'>" + data.title + "</h4>";

      contenuHtml += "</div>";
      cards.innerHTML += contenuHtml;
    });
  });

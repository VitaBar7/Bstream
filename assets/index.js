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



  //👇search bar

const movieCardTemplate = document.querySelector("[data-movie-template]")
const movieCardContainer = document.querySelector("[data-movie-cards-container]")
const searchInput = document.querySelector("[data-search]")

//"on click" on search input we make our other sections dissapear
function hideCards(){
    document.getElementById("hide-cards").style.display = "none";
    document.getElementById("trending").style.display = "none";
}


searchInput.addEventListener("input", e => { 
  const value = e.target.value.toLowerCase()
    movieCardContainer.innerHTML = "";
    document.getElementById("hide-cards").style.display = "none";
    document.getElementById("trending").style.display = "none";
    if (value != "" && value.length >= 3){   
      fetch("data.json")
      .then(res => res.json())
      .then(data => {
        let movies = data.map(movie => {
          const isVisible = movie.title.toLowerCase().includes(value)
          const card = movieCardTemplate.content.cloneNode(true).children[0]    
          // console.log(card);
          const image = card.querySelector("[data-image]")
          const title = card.querySelector("[data-title]")
          const year = card.querySelector("[data-year]")
          const icon = card.querySelector("[data-icon]")
          const category = card.querySelector("[data-category")
          const rating = card.querySelector("[data-rating]")
          image.src = movie.thumbnail.regular.large
          title.textContent = movie.title
          year.textContent = movie.year
          if(movie.category == "Movie") {
            icon.src = "assets/icon-category-movie.svg"
          } else {
            icon.src = "assets/icon-category-tv.svg"
          }
          category.textContent = movie.category
          rating.textContent = movie.rating
          movieCardContainer.append(card)
            if(!isVisible){
              card.classList.add("hide")
            }
            return { title:movie.title, year:movie.year, category:movie.category, element:card }
            }) 
})  
    }else if(value != "" && value.length < 3){//when we still have something in the input but less than 3 letters, we still don't want to show our sections below
      document.getElementById("hide-cards").style.display = "none";
      document.getElementById("trending").style.display = "none";
    }else{
      document.getElementById("hide-cards").style.display = "block";
      document.getElementById("trending").style.display = "block";
    }// here we make appear our sections again, when searchbar's input is empty
           
}) 


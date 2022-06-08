// // apikey = e8136732e53f44429c42e360cc271087;
// //apikey = 1bccf0f0630442eb81ba208dd39e5040;
// //id= 663136

let searchText = document.getElementById("searchText")
let searchButton = document.getElementById("searchButton")
let listDiv = document.getElementById("listDiv")



fetch(
  "https://api.spoonacular.com/recipes/random?number=50&apiKey=e8136732e53f44429c42e360cc271087"
)
  .then(function (response) {
    return response.json()
  })
  .then(function (total) {
    displayRecipe(total)
  })

searchText.addEventListener("keypress", function (event) {
  let search = searchText.value
  if (event.key === "Enter") {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=?${search}&number=40&addRecipeInformation=true&apiKey=1bccf0f0630442eb81ba208dd39e5040
    `
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (total) {
        let recipesList = total.results.map(function (recipe) {
          return `
        <li class = "listLI">
      <img  class = "previewImage"src="${recipe.image}">
      <a href='recipe.html'target="_blank" onclick="displayDetails('${recipe.id}')">${recipe.title}</a>
      <p class = "previewDetails"> Servings:${recipe.servings}</p>
      <p class = "previewDetails"> Ready in ${recipe.readyInMinutes} minutes</p>
      </li>`
        })
        listDiv.innerHTML = recipesList.join("")
      })
  }
})

function displayDetails(id) {
  let recipeDiv = document.getElementById("recipeDiv")
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=1bccf0f0630442eb81ba208dd39e5040
    `
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (total) {
      recipesList = `
      <li class = "recipeDetails">
      <p>${total.title}</p>
    <p> Servings:${total.servings}</p>
    <p> Servings:${total.summary}</p>
    <p>{${total.analyzedInstructions}
    </li>`

      recipeDiv.innerHTML = recipesList
    })
}

function displayRecipe(total) {
  let randomRecipes = total.recipes.map(function (dishesRandom) {
    return `<li class ="listLI">
  <img class="previewImage"src =${dishesRandom.image}>
  <a href='#' class="previewTitle"onclick="displayDetails('${dishesRandom.id}')">${dishesRandom.title}</a>
  <p class = "previewDetails"> Servings ${dishesRandom.servings}</p>
  <p class = "previewDetails"> Ready in ${dishesRandom.readyInMinutes}</p>
  </li>`
  })
  listDiv.innerHTML = randomRecipes.join("")
}


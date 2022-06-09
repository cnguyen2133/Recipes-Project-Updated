// // &apiKey = e8136732e53f44429c42e360cc271087;
// // &apiKey = 1bccf0f0630442eb81ba208dd39e5040;
// // &apiKey = c4080d70d3b44d10b7ae5ad3c75eac80
// // &apiKey = 0404acd02b6745479df9c27706db69ea
// // &apiKey = dfe9fac191164f7499688809136d862a
// //id= 663136

let searchText = document.getElementById("searchText")
let searchButton = document.getElementById("searchButton")
let listUL = document.getElementById("listUL")
let stepsUL = document.getElementById("stepsUL")
let ingredientsUL = document.getElementById("ingredientsUL")
let recipeDetailsUL = document.getElementById("recipeDetailsUL")
let nutrientsUL = document.getElementById("nutrientsUL")

fetch(
  "https://api.spoonacular.com/recipes/random?number=50&instructionsRequired=true&apiKey=0404acd02b6745479df9c27706db69ea"
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
      `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=40&addRecipeInformation=true&instructionsRequired=true&apiKey=0404acd02b6745479df9c27706db69ea
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
      <a href='#' onclick="displayDetails('${recipe.id}')">${recipe.title}</a>
      <p class = "previewDetails"> Servings:${recipe.servings}</p>
      <p class = "previewDetails"> Ready in ${recipe.readyInMinutes} minutes</p>
      
      </li>`
        })

        listUL.innerHTML = recipesList.join("")
      })
  }
})

function displayDetails(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&instructionsRequired=true&apiKey=0404acd02b6745479df9c27706db69ea
    `
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (total) {
      recipesList = `
        
        <li class="recipeImageLI">
        <img class = "recipeImage"src ="${total.image}">
        </li>
      <li class= recipeDetailsText>
      <h3>${total.title}</h3>
      <p> Servings:${total.servings}</p>
      <p class = recipeSummary>${total.summary}</p>
      </li>
      `
      let recipeSteps = total.analyzedInstructions[0].steps.map(function (
        list
      ) {
        return `<li class ="stepsLI">
      <p>${list.number}</p>
      <p>${list.step}</p>
      </li>`
      })
      let recipeIngredients = total.extendedIngredients.map(function (
        ingredient
      ) {
        return `<li class ="ingredientLI">
          ${ingredient.original}
          </li>`
      })
      let recipeNutrients = total.nutrition.nutrients.map(function (nutrient) {
        return `<li class ="nutrientLI">
          <p> ${nutrient.name}</p>
        <p class ="nutrientText"> ${nutrient.amount} ${nutrient.unit}</p>
        </li>
        `
      })

      stepsUL.innerHTML = recipeSteps.join("")
      ingredientsUL.innerHTML = recipeIngredients.join("")
      nutrientsUL.innerHTML = recipeNutrients.join("")
      listUL.innerHTML = ""
      recipeDetailsUL.innerHTML = recipesList
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

  listUL.innerHTML = randomRecipes.join("")
}

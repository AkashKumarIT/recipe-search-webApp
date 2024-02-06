const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


//fetch function
const fetchRecipes = async(word)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipe...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
    const response = await data.json();
    console.log(response.meals[0]);
    recipeContainer.innerHTML="";

    response.meals.forEach(meal=>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML= `
    <img src="${meal.strMealThumb}" class="meal-thumbnail" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    
    `
    const thumbnail = recipeDiv.querySelector('.meal-thumbnail');
    thumbnail.addEventListener('click', () => {
        openRecipePopup(meal);
    });

    

    recipeContainer.appendChild(recipeDiv);
    })
}

const fetchIngredients = (meal)=>{
    let IngredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            let measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${ingredient} ${measure}</li>`;
        }
        else{
            break;
        }
    }
    return IngredientsList;
}

const openRecipePopup = (meal)=>{
    //alert("akash");
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions: </h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);

    
})


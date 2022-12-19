const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const randomMeal = document.getElementById('random-dish')

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
randomMeal.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});



// random image display

axios.get("https://www.themealdb.com/api/json/v1/1/random.php").then((res)=>{
  console.log(res.data.meals[0])
  let resul = res.data.meals[0];
        let htm = "";
        
            
                htm += `
                    <div class = "meal-item" data-id = "${resul.idMeal}">
                        <div class = "meal-img">
                            <img id="random-dish-image" src = "${resul.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${resul.strMeal}</h3>
                            
                            <a href = "#" class = "recipe-btn">Get Ingredients</a>
                        </div>
                    </div>
                `;
                 document.getElementById('random-dish').innerHTML = htm;})


// search by category

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Ingredients</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, No results found";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}




// ingredients fetching
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}


//  displaying modal 
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let ingredients=[]
    for(let i=1;i<=20;i++){
        let ing=meal[`strIngredient${i}`]
        if(ing!=""){
            ingredients.push(ing)
            
        }
      }
      console.log(ingredients)
      let a = '';
        ingredients.forEach((elt) => {
            ;
            a+= 
            `
            <ul>
            <li>${elt}</li>
            </ul>`
            mealDetailsContent.innerHTML = a;
            document.getElementById('name').innerText = meal.strMeal
           
        });
        
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

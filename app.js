function saveRecipesToLocalStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function getRecipesFromLocalStorage() {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const steps = [];
    document.querySelectorAll('[name="steps"]').forEach((input) => {
        steps.push(input.value);
    });
    const ingredients = [];
    document.querySelectorAll('[name="ingredients"]').forEach((input, index) => {
        ingredients.push({
            name: input.value || ingredients.at(index - 1).name || 'undefined',
            weight: document.querySelector(`[name="weights"]`).value
        });
    });
    const protein = parseFloat(document.getElementById('protein').value);
    const fat = parseFloat(document.getElementById('fat').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!name || !steps.length || isNaN(protein) || isNaN(fat) || isNaN(carbs) || isNaN(calories) || isNaN(weight)) {
        alert('Please fill in all fields');
        return;
    }

    const recipes = getRecipesFromLocalStorage();
    const newRecipe = {
        name,
        steps,
        ingredients,
        nutrition: { protein, fat, carbs, calories, weight }
    };
    recipes.push(newRecipe);
    saveRecipesToLocalStorage(recipes);
    loadRecipes();

    // Clear the form
    document.getElementById('recipe-name').value = '';
    document.querySelectorAll('[name="steps"]').forEach((input) => (input.value = ''));
    document.querySelectorAll('[name="ingredients"]').forEach((input) => (input.value = ''));
    document.getElementById('protein').value = '';
    document.getElementById('fat').value = '';
    document.getElementById('carbs').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('weight').value = '';
}

function loadRecipes() {
    const recipes = getRecipesFromLocalStorage();
    const list = document.getElementById('recipes');
    list.innerHTML = '';
    recipes.forEach((recipe) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Steps:</p>
            <ul>${recipe.steps.map((step) => `<li>${step}</li>`).join('')}</ul>
            <p>Ingredients:</p>
            <ul>${recipe.ingredients.map((ingredient) => `<li>${ingredient.name}: ${ingredient.weight}g</li>`).join('')}</ul>
            <p>Protein: ${recipe.nutrition.protein}g, Fat: ${recipe.nutrition.fat}g, Carbs: ${recipe.nutrition.carbs}g, Calories: ${recipe.nutrition.calories}, Weight: ${recipe.nutrition.weight}g</p>
        `;
        list.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadRecipes);

document.getElementById('add-step').addEventListener('click', () => {
    const stepContainer = document.getElementById('steps-container');
    const stepCount = stepContainer.children.length + 1;
    const newStep = document.createElement('p');
    newStep.innerHTML = `Step ${stepCount}: <input type="text" name="steps" placeholder="Step description">`;
    stepContainer.appendChild(newStep);
});

document.getElementById('add-ingredient').addEventListener('click', () => {
    const ingredientContainer = document.getElementById('ingredients-container');
    const ingredientCount = ingredientContainer.children.length + 1;
    const newIngredient = document.createElement('p');
    newIngredient.innerHTML = `Ingredient ${ingredientCount}: <input type="text" name="ingredients" placeholder="Ingredient name"> Weight: <input type="number" name="weights" placeholder="Weight (in grams)">`;
    ingredientContainer.appendChild(newIngredient);
});

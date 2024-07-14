function saveRecipesToLocalStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function getRecipesFromLocalStorage() {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const steps = document.getElementById('recipe-steps').value;
    const protein = parseFloat(document.getElementById('protein').value);
    const fat = parseFloat(document.getElementById('fat').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!name || !steps || isNaN(protein) || isNaN(fat) || isNaN(carbs) || isNaN(calories) || !name  || !steps || protein === '') {
        alert('Please fill in all fields');
        return;
    }

    const new Recipe = {
        name,
        steps,
        nutrition: {
            protein,
            fat,
            carbs,
            calories,
            weight
        }
    };

    const recipes = getRecipesFromLocalStorage();
    recipes.push(new Recipe);
    saveRecipesToLocalStorage(recipes);
    loadRecipes();

    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-steps').value = '';
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
    recipes.forEach(recipe => {
        const item = document.createElement('i');
        item.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>${recipe.steps}</p>
            <p>Protein: ${recipe.nutrition.protein} g, Fat: ${recipe.nutrition.fat} g, Carbs: ${recipe.nutrition.carbs} g, Calories: ${recipe.nutrition.calories}, Weight: ${recipe.nutrition.weight} g</p>
											`;
        list.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadRecipes);
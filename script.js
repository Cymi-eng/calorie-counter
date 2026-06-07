const foodForm = document.getElementById("foodForm");
const foodName = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");
const fetchBtn = document.getElementById("fetchBtn");

let foods = JSON.parse(localStorage.getItem("foods")) || [];

/* ==========================
   Save to Local Storage
========================== */

function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}

/* ==========================
   Calculate Total Calories
========================== */

function updateTotalCalories() {

    const total = foods.reduce(
        (sum, food) => sum + food.calories,
        0
    );

    totalCalories.textContent = total;
}

/* ==========================
   Render Foods
========================== */

function renderFoods() {

    foodList.innerHTML = "";

    foods.forEach((food, index) => {

        const li = document.createElement("li");

        li.className =
            "flex justify-between items-center bg-gray-100 p-3 rounded";

        li.innerHTML = `
            <span>
                ${food.name} - ${food.calories} cal
            </span>

            <button
                class="bg-red-500 text-white px-3 py-1 rounded"
                onclick="removeFood(${index})"
            >
                Delete
            </button>
        `;

        foodList.appendChild(li);
    });

    updateTotalCalories();
}

/* ==========================
   Add Food
========================== */

foodForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const food = {
        name: foodName.value,
        calories: Number(caloriesInput.value)
    };

    foods.push(food);

    saveFoods();
    renderFoods();

    foodForm.reset();
});

/* ==========================
   Remove Food
========================== */

function removeFood(index) {

    foods.splice(index, 1);

    saveFoods();
    renderFoods();
}

/* ==========================
   Reset Day
========================== */

resetBtn.addEventListener("click", () => {

    foods = [];

    saveFoods();
    renderFoods();
});

/* ==========================
   Fetch API Example
========================== */

fetchBtn.addEventListener("click", async () => {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        const data = await response.json();

        const sampleFood = {
            name: "Sample Food",
            calories: 250
        };

        foods.push(sampleFood);

        saveFoods();
        renderFoods();

        console.log(data);

    } catch (error) {

        console.error("Error fetching data:", error);
    }
});


renderFoods();
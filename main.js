// Import from profileCard.js
import greet, { createProfileCard } from './profileCard.js';
// Import from mathUtils.js
import greetMath, { add, multiply } from './mathUtils.js';

// Call greetings
greet();
greetMath();

// Using math functions
console.log("Add: ", add(5, 3));       // 8
console.log("Multiply: ", multiply(4, 2)); // 8

// DOM Manipulation: Adding profile cards
const addProfileBtn = document.getElementById("addProfileBtn");
const cardContainer = document.getElementById("cardContainer");

addProfileBtn.addEventListener("click", () => {
    const name = prompt("Enter Name:");
    const role = prompt("Enter Role:");

    if (name && role) {
        const card = createProfileCard(name, role);
        cardContainer.appendChild(card);
    } else {
        alert("Please enter both Name and Role.");
    }
});

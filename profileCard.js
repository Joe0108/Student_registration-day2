// Default export function for greeting
export default function greet() {
    console.log("Welcome to the Interactive Profile Cards App!");
}

// Named export: create profile card
export function createProfileCard(name, role) {
    const card = document.createElement("div");
    card.classList.add("profile-card");

    card.innerHTML = `
        <h3>${name}</h3>
        <p>${role}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Delete button functionality
    card.querySelector(".delete-btn").addEventListener("click", () => {
        card.remove();
    });

    return card;
}

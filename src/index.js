let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// render toy card
const toyCollection = document.querySelector("#toy-collection");
function renderToyCard(toy) {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("data-id", toy.id);
  newCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>`
  toyCollection.appendChild(newCard);
}

// fetch Andy's toys & add toy info
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {data.forEach(toy => renderToyCard(toy))});

// add new toy
const newToyForm = document.querySelector(".add-toy-form");
newToyForm.addEventListener("submit", event => {
  event.preventDefault();

  let newToy = {
    name: newToyForm.name.value,
    image: newToyForm.image.value,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(data => renderToyCard(data));
});

// increase likes
toyCollection.addEventListener("click", event => {
  if (event.target.classList.contains("like-btn")) {
    let toyCard = event.target.parentElement;
    let newLikes = parseInt(toyCard.querySelector("p").innerHTML) + 1;
    let configObj2 = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: newLikes})
    }

    fetch(`http://localhost:3000/toys/${toyCard.dataset["id"]}`, configObj2)
      .then(response => response.json())
      .then(data => toyCard.querySelector("p").innerHTML = `${newLikes} Likes`);
  }
});
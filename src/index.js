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
  fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then(function(data) {
    data.map((toy) => makeCard(toy))
  })




  toyFormContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  postToy(e.target.name.value, e.target.image.value)
})


//DOM Loaded
});


//Makes card for toy and sets up event listener
function makeCard(toy) {
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML =
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" id="toy_id">Like <3</button>`
  

  toyCard.querySelector('#toy_id').addEventListener('click', () => {
    
    toy.likes += 1 
    toyCard.querySelector('p').textContent = `${toy.likes} Likes`
    updateLikes(toy)
  })


   document.querySelector('#toy-collection').appendChild(toyCard)

}

function postToy(name, url) {

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
    "name": name,
    "image": url,
    "likes": 0,
    })
  })
  .then((resp) => resp.json())
  .then((resp) => console.log(resp))
  .then((toy) => makeCard(toy))
}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toyObj)
})
  .then(res => res.json())
  .then(res => console.log(res))
  

}


const container = document.querySelector(".container")
const monkeysAndStuff = [
    { name: "Gay Little Monkey", image: "images/GayLittleMonkey.jpg" },
    { name: "Little Man", image: "images/GayLittleMan.jpg" },
    { name: "Holiday Man", image: "images/HoldiayMan.jpg" },
    { name: "Arrow Head", image: "images/arrowonhead.jpg" },
    { name: "Eric", image: "images/Eric.jpg" },
    { name: "Joe Biden Fans", image: "images/JoeBidenFans.jpg" },
    { name: "Lobster", image: "images/Lobster.jpg" },
    { name: "Nice mask speaker", image: "images/nicemaskspeaker.jpg" },
    { name: "Happy Birthday", image: "images/happybirthday.jpg" }
]

function showMonkeys()
{
    let output = ""
    monkeysAndStuff.forEach(
        ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="#">Cheer</a>
              </div>
              `)
    )
    container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showMonkeys)

if ("ServiceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
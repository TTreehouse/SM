const staticSimpWatch = "simp-watch-site-v1"
const assets = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "images/GayLittleMan.jpg",
    "images/HoldiayMan.jpg",
    "images/arrowonhead.jpg",
    "images/Eric.jpg",
    "images/JoeBidenFans.jpg",
    "images/Lobster.jpg",
    "images/nicemaskspeaker.jpg" ,
    "images/happybirthday.jpg",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticSimpWatch).then(cache => {
            cache.addAll(assets)
        })
    )
})
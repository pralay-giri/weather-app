const cloudStatusText = document.querySelector('.main_container .display .display_data .cloud_details p');
const cloudStatusImg = document.querySelector('.main_container .display .display_data .cloud_details img');

const clouds = {
    Clear: "media/clear.png",
    Clouds: "media/clouds.png",
    Drizzle: "media/drizzle.png",
    Mist: "media/mist.png",
    Rain: "media/rain.png",
    Snow: "media/snow.png",
}

for (a in clouds) {
    if (cloudStatusText.innerText == a) {
        cloudStatusImg.setAttribute("src", `${clouds[a]}`);
        break;
    }
}

const main_container = document.querySelector(".main_container")
const hambar = document.querySelector(".main_container .hambar")

hambar.addEventListener('click', ()=>{
    main_container.classList.toggle("ham_bar_active")
})

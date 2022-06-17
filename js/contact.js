if(document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //search form
    document.querySelector("#search-btn").onclick = () => {
        document.querySelector(".search-form").classList.toggle("active");
        navBar.classList.remove("active");
        document.querySelector(".cart-wrapper").classList.remove("active");
    }


    let menu = document.querySelector("#menu-btn");
    let navBar = document.querySelector(".navbar");

    //menu button js
    menu.onclick = () => {
        menu.classList.toggle("fa-times");
        navBar.classList.toggle("active");
        document.querySelector(".search-form").classList.remove("active");
        document.querySelector(".cart-wrapper").classList.remove("active");
    }
    //window ie browser viewport when scrolling
    window.onscroll = () => {
        navBar.classList.remove("active");
        document.querySelector(".search-form").classList.remove("active");
        document.querySelector(".cart-wrapper").classList.remove("active");
    }
}

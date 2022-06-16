document.querySelectorAll(".feature-2").forEach(item =>{
    item.addEventListener("click", () =>{
        let src = item.getAttribute("src");
        document.querySelector(".feature-1").src = src;
    })
})
function showActiveLink(){
    const links = document.querySelectorAll(".nav-links a");

    if(!links.length) return; // doesn't work the below code if links are not there

    const currentLink = window.location.pathname;

    links.forEach((a) => {
        const elementHref = a.getAttribute("href");
        const href = elementHref.toLowerCase();

        if(href === currentLink){
            a.classList.add("active");
        } else {
            a.classList.remove("active");
        }
    })
}

showActiveLink();
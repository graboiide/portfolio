import {hiddenMenu} from "./menu";



let anchors = document.querySelectorAll('.smooth-scroll');

for (let i=0 ; i < anchors.length ; i++){
    anchors[i].addEventListener('click',function (e){
        e.preventDefault();
        const menu = document.getElementById("menu");
        hiddenMenu();
        smoothScroll(document.querySelector(this.dataset.anchor));
    })
}



function smoothScroll(anchor){
    const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;
    anime({
        targets:scrollElement,
        scrollTop: anchor.getBoundingClientRect().top + pageYOffset -90 ,
        duration: 900,
        easing: 'easeInOutQuad'
    })
}

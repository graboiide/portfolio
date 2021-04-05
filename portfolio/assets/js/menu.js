document.getElementById('call-menu').addEventListener('click',function (e){
    e.preventDefault();
    e.stopPropagation();
    const menu = document.getElementById(this.dataset.target);
    menu.classList.toggle('d-none');

})
document.querySelector('body').addEventListener('click',() =>{
    hiddenMenu();
})

export function hiddenMenu(){
    const menu = document.getElementById("menu");
    if(!menu.classList.contains('d-none')){
        menu.classList.toggle('d-none');
    }
}




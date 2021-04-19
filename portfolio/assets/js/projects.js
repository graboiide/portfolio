 const projects = document.querySelectorAll('.project-card__title');

for (let i=0;i<projects.length;i++){
    projects[i].addEventListener('click',function (e){
        e.preventDefault();


        fetch("/ajax/project/"+this.dataset.id).then(response => {
            return response.text();
        }).then(response =>{

            const projectView = document.getElementById('project-view');
            projectView.style.display = "block";
            projectView.style.top = document.querySelector('html,body').clientHeight  + 'px';
            projectView.innerHTML =response;
            anime({
                targets:projectView,
                top:0,
                duration: 300,
                easing:'linear'

            });
            carousel();
            close(projectView);

        })
    })


}
function close(target){
    let close = document.querySelector('.project-view__close');
    close.addEventListener('click',function (){
        anime({
            targets:target,
            top:'100vh',
            duration: 300,
            easing:'linear'

        });
        clearInterval(timer);
    })
}

function carousel(){
    const myCarousel = document.getElementById('my-carousel');
    let index = 0;
    let elms = document.querySelectorAll('.my-carousel__item');
    let nbElms = elms.length;
    myCarousel.addEventListener('click',function (){
        clearInterval(timer);
        
        toggleItem(document.querySelector('[data-index="'+(index)+'"]'));

        index++;
        if(index >= (nbElms))
            index = 0;

        toggleItem(document.querySelector('[data-index="'+(index)+'"]'));


    });
    function toggleItem(target){
        if(target.classList.contains('d-flex')){
            target.classList.remove('d-flex');
            target.classList.add('d-none');
        }else{
            target.classList.remove('d-none');
            target.classList.add('d-flex');
        }
    }
    timer = setInterval(()=> {
        index++;
        if(index >= (nbElms))
            index = 0;
        document.getElementById('my-carousel').click();

    },6000);
}
const formMail = document.getElementById('form-mail');
formMail.addEventListener('submit',function (e){
    e.preventDefault();
    formdata = new FormData(formMail);
    formdata.append('test','tesss')


    fetch("/admin/mail",{
        method:'POST',

        body:formdata
    }).then(response => {return response.text()}).then(response =>{
        console.log(response)
        if(response === "OK"){
            //formMail.style.display = "none";

            anime({
                targets:formMail,
                opacity:0,
                duration: 300,
                easing:'linear',
                complete: function (){
                    formMail.style.display = "none";
                    let message = document.getElementById('mail-message');
                    message.style.opacity = 0;
                    message.style.display="block";
                    anime({
                        targets: message,
                        opacity: 1
                    })
                }

            });

        }
        document.getElementById('reload').addEventListener('click',function (e){
            e.preventDefault();
            document.getElementById('mail-message').style.display = "none";
            formMail.style.display = "block";
            formMail.style.opacity = 1;
            document.getElementById('content').value="";
        })
    })
})






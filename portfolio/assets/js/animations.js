

window.addEventListener("DOMContentLoaded", (event) => {


    //document.getElementById('title-head').style.left = '1000px';
    document.getElementById('title-head').style.opacity = 0;
    const service = document.getElementById('service');
    let elms = document.querySelectorAll('.inViewPort');

    for (i=0;i<elms.length;i++){
        elms[i].dataset.animate = "false";
        if(elms[i].dataset.direction === "right")
            elms[i].style.left = '-500px';
        if(elms[i].dataset.direction === "left")
            elms[i].style.left = '500px';
        elms[i].style.opacity = 0;
    }

    let top = true;
    setInterval(function (){

        for (i=0;i<elms.length;i++){
            let elm = elms[i];
            if(elm.getBoundingClientRect().top + (pageYOffset - window.innerHeight ) <
                pageYOffset &&
                elm.dataset.animate === "false" ) {

                elm.dataset.animate = "true";
                if(elm.dataset.anime === "width"){
                    let width = elm.dataset.width;
                    elm.style.opacity = 1;
                    let color = elm.style.color;
                    elm.style.color = "transparent"
                    anime({
                        targets:elm,
                        width:width,
                        opacity:1,
                        duration: 1500,
                        easing:'linear',
                        complete: function(anim) {

                            elm.style.color = color;
                        }

                    });
                }else if(elm.dataset.anime === "scale"){
                    elm.style.opacity = 1;
                    console.log(elm);
                    anime({
                        targets:elm,
                        scale: [{value:1.6,duration:1,delay:elm.dataset.delay},{value:1,delay: 500}],

                        easing:"linear",
                        duration:1

                    });

                } else{
                    anime({
                        targets:elm,
                        left:0,
                        opacity:1,
                        duration: 300,

                        easing: 'linear'

                    });
                }

            }//detect
        }


        if(pageYOffset <= 430 && !top){
            let navAnime = anime({
                targets: '#nav',
                backgroundColor : '#ffffffa1',
                marginTop: '10px',
                duration: 500
            })
            top = true;
        }

        if(pageYOffset > 430 && top){
            let navAnime = anime({
                targets: '#nav',
                backgroundColor : '#ffffff',
                marginTop: 0,
                duration: 500
            })
            top = false;
        }

    },1)

    let widthBackground;
    let heightBackground;
    let backgroundSize ;
    let backgroundNb = 0
    function initializeBackground(){
        console.log('resize');
        widthBackground = document.getElementById('background').getBoundingClientRect().width;
        heightBackground = document.getElementById('fade').getBoundingClientRect().height;


        if(widthBackground * 0.67  > heightBackground)
            backgroundSize = (widthBackground+100);
        else
            backgroundSize = "auto "+(heightBackground);

        console.log(backgroundSize);
        document.getElementById('background').style.backgroundSize = backgroundSize+'px';
    }

    window.addEventListener('resize',initializeBackground)
    initializeBackground();
    let zoom = Math.random()*300+500;
    let xRandom = Math.random()*100;
    let yRandom = Math.random()*100;



    let background = anime({
        targets:'#background',
        backgroundPositionX:xRandom+"%",
        backgroundPositionY:yRandom+"%",
        backgroundSize:(backgroundSize+zoom)+'px',

        duration: 15000,
        easing:'linear',
        complete: function(anim) {
            xRandom = Math.random()*100;
            yRandom = Math.random()*100;
            zoom = Math.random()*300+500
            anime({
                targets:'#fade',
                backgroundColor: '#333333',
                easing:'linear',
                complete: function (){
                    backgroundNb ++;
                    if(backgroundNb > 1)
                        backgroundNb = 0;
                    document.getElementById('background').style.backgroundPositionY = "100%";
                    document.getElementById('background').style.backgroundPositionX = "100%";
                    document.getElementById('background').style.backgroundImage = "url(/img/background"+backgroundNb+".jpg)"
                    background.play();
                    anime({
                        targets:'#fade',
                        backgroundColor: "rgba(0,0,0,0)",
                        easing:'linear',
                        complete: function () {

                        }
                    });

                }

            })




        }

    })

    let animation = anime({
        targets: '.bloc-title',

        opacity:1,
        duration:3000,
        easing:'linear'

    });
    animation.play()
});

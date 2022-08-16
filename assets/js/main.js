/*---------------- MENU SHOW Y HIDDEN ----------------*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

const themesMenu = document.getElementById('themes-menu'),
      themesToggle = document.getElementById('themes-toggle'),
      themesClose = document.getElementById('themes-close')

/*---- MENU SHOW ----*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', ()=> {
        navMenu.classList.add('show-menu')
    })
}

if(themesToggle){
    themesToggle.addEventListener('click', ()=> {
        themesMenu.classList.add('show-menu')
    })
}

/*---- MENU HIDDEN ----*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', ()=> {
        navMenu.classList.remove('show-menu')
    })
}

if(themesClose){
    themesClose.addEventListener('click', ()=>{
        themesMenu.classList.remove('show-menu')
    })
}

/*---------------- REMOVE MENU MOBILE ----------------*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu= document.getElementById('nav-menu')
    //when we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n=> n.addEventListener('click', linkAction))

/*---------------- SKILLS ----------------*/
const skillsContent = document.getElementsByClassName('skills_content'),
      skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i<skillsContent.length; i++){
        skillsContent[i].className = 'skills_content skills_close'
    if(itemClass === 'skills_content skills_close'){
        this.parentNode.className = 'skills_content skills_open'
    }
    }
}

skillsHeader.forEach((el)=>{
    el.addEventListener('click', toggleSkills)
})

/*---------------- SERVICES MODAL ----------------*/
const modalViews=document.querySelectorAll('.services_model'),
      modalButtons=document.querySelectorAll('.services_button'),
      modalCloses=document.querySelectorAll('.services_model-close')

let modal= function(modalClick){
    modalViews[modalClick].classList.add('active-model')
}

modalButtons.forEach((modalButton, i)=>{
    modalButton.addEventListener('click', ()=>{
        modal(i)
    })
})

modalCloses.forEach((modelClose)=>{
    modelClose.addEventListener('click', ()=>modalViews.forEach((modalView)=>{
        modalView.classList.remove('active-model')
        }
    ))
})


/*---------------- PORTFOLIO SWIPER  ----------------*/

/*---------------- SCROLL SECTIONS ACTIVE LINK ----------------*/
const sections=document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY= window.pageYOffset

    sections.forEach(current=>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        let sectionId=current.getAttribute('id')
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }
        else{
            document.querySelector('.nav_menu a[href*='+sectionId+']').classList.remove('active-link')
        }

    })
}

window.addEventListener('scroll', scrollActive)
/*---------------- CHANGE BACKGROUND HEADER ----------------*/ 
function scrollHeader() {
    const nav = document.getElementById('header')

    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)

/*---------------- SHOW SCROLL UP ----------------*/ 
function scrollUp(){
    scrollUpButton=document.getElementById('scroll-up')
    
    if(this.scrollY >= 560) scrollUpButton.classList.add('scroll-show'); else scrollUpButton.classList.remove('scroll-show')
}

window.addEventListener('scroll', scrollUp)

/*---------------- DARK LIGHT themes ----------------*/ 
/*---------------- DARK LIGHT THEME ----------------*/ const themeButton = document.querySelector(':root') ;
function toggle(){
    let item=document.getElementById(':root')
    item.style.setProperty('--hue-color', '--red')
}

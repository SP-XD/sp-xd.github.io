import projectsData from "./assets/json/projects.json" assert { type: "json" };

const reveal = {
  distance: "30px",
  easing: "ease-in",
  duration: 500,
  delay: 300,
  origin: 'top',
};
ScrollReveal().reveal(".main", reveal);

/*---------------- MENU SHOW Y HIDDEN ----------------*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

const themesMenu = document.getElementById("themes-menu"),
  themesToggle = document.getElementById("themes-menu-toggle"),
  themesClose = document.getElementById("themes-close");

/*---- MENU SHOW ----*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (themesToggle) {
  themesToggle.addEventListener("click", () => {
    themesMenu.classList.add("show-menu");
  });
}

/*---- MENU HIDDEN ----*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

if (themesClose) {
  themesClose.addEventListener("click", () => {
    themesMenu.classList.remove("show-menu");
  });
}

/*---------------- REMOVE MENU MOBILE ----------------*/
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //when we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*---------------- SKILLS ----------------*/
const skillsContent = document.getElementsByClassName("skills_content"),
  skillsHeader = document.querySelectorAll(".skills_header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills_content skills_close";
  }
  if (itemClass === "skills_content skills_close") {
    this.parentNode.className = "skills_content skills_open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*---------------- SERVICES MODAL ----------------*/
const modalViews = document.querySelectorAll(".services_model"),
  modalButtons = document.querySelectorAll(".services_button"),
  modalCloses = document.querySelectorAll(".services_model-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-model");
};

modalButtons.forEach((modalButton, i) => {
  modalButton.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modelClose) => {
  modelClose.addEventListener("click", () =>
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-model");
    })
  );
});

/*-------------------------PROJECTS-------------------- */
console.log(projectsData);
document.getElementById("project-cards").innerHTML = `
   ${projectsData
     .map(function (project) {
       return `
    <!-----------Project Card--------------->
     <div class="project_card card swiper-slide" >

      <img class="project_image" src="${project.image}"/>

      <div class="project_data">
        <h3 class="project_title">${project.title}</h3>

        <p class="project_description">
            ${project.description}
        </p>

        <a href="${project.sourceLink}" target="_blank" class="button button-flex button-small project_button">Checkout<i class="uil uil-external-link-alt button_icon checkout_button_icon"></i></a>

      </div>
    </div> 
    `;
     })
     .join("")} 
`;

/*-------------------- PROJECTS SWIPER  ----------------*/
var swiper = new Swiper(".projects_content", {
  slidesPerView: 2,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: true,
  loop: true,
  fade: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    568: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1366: {
      slidesPerView: 5,
    },
  },
});
/*-------------------------- BLOGS ----------------------------*/
function readingTime(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

// Fetch function
async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}
// Query 
const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "sp-xd") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                    contentMarkdown
                }
            }
        }
    }
`;
// making the call and injecting the articles
gql(GET_USER_ARTICLES, { page: 0 })
    .then(result => {
        const articles = result.data.user.publication.posts;
        let container = document.createElement('div');
        container.classList.add('grid');

        articles.forEach(article => {
            let blog_item = document.createElement('div');
            blog_item.classList.add('blog_item', 'card');

            let title = document.createElement('h3');
            title.classList.add('blog_title');
            title.innerText = article.title;

            let brief = document.createElement('p');
            brief.classList.add('blog_brief');
            brief.innerText = article.brief;

            let reading_time= document.createElement('span');
            reading_time.innerHTML = `&nbsp <i class="uil uil-book-open"></i> ${readingTime(article.contentMarkdown)} min read`;

            blog_item.appendChild(title);
            blog_item.appendChild(brief);
            blog_item.appendChild(link);
            container.appendChild(blog_item);
        })

        document.querySelector('.blogs_container').appendChild(container);
});


/*---------------- SCROLL SECTIONS ACTIVE LINK ----------------*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);
/*---------------- CHANGE BACKGROUND HEADER ----------------*/
function scrollHeader() {
  const nav = document.getElementById("header");

  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*---------------- SHOW SCROLL UP ----------------*/
function scrollUp() {
  const scrollUpButton = document.getElementById("scroll-up");

  if (this.scrollY >= 560) scrollUpButton.classList.add("scroll-show");
  else scrollUpButton.classList.remove("scroll-show");
}

window.addEventListener("scroll", scrollUp);

/*---------------- DARK LIGHT themes ----------------*/
const darkLightThemeButton = document.getElementById("dark_light-theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

//  localStorage theme is being retrieved if the site was previously visited
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  darkLightThemeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  darkLightThemeButton.classList[
    selectedIcon === "uil-moon" ? "add" : "remove"
  ](iconTheme);
}

darkLightThemeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  darkLightThemeButton.classList.toggle(iconTheme);

  // storing current theme to local storage
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*------------------- Color Themes --------------------- */
// const colorThemesButton = document.querySelectorAll('')

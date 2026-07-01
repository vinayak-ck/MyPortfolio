const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      


/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
/*==================== DARK / LIGHT THEME (FIXED) ====================*/

const themeButton = document.getElementById("theme-button");

// Load saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// Handle click
themeButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// Change icon
function updateThemeIcon(theme) {
  themeButton.classList.remove("uil-moon", "uil-sun");
  themeButton.classList.add(theme === "light" ? "uil-moon" : "uil-sun");
}

/* ===== Floating Profile Card Popup ===== */
window.addEventListener('DOMContentLoaded', function () {
  const popupCard = document.getElementById('popup-card');
  const trigger = document.getElementById('popup-trigger');
  const closeBtn = document.getElementById('popup-close');
  let dismissed = false;

  trigger.addEventListener('click', function () {
    if (popupCard.style.display === 'none' || popupCard.style.display === '') {
      popupCard.style.display = 'block';
    } else {
      popupCard.style.display = 'none';
    }
  });

  closeBtn.addEventListener('click', function () {
    popupCard.style.display = 'none';
    dismissed = true;
  });

  // Auto open after 3 seconds
  setTimeout(function () {
    if (!dismissed) {
      popupCard.style.display = 'block';
    }
  }, 3000);

  // Auto close after 10 seconds if ignored
  setTimeout(function () {
    if (!dismissed) {
      popupCard.style.display = 'none';
    }
  }, 10000);
});

const certOverlay = document.getElementById('cert-overlay');
const certBox     = document.getElementById('cert-box');
const certImg     = document.getElementById('cert-img');

function openCert(el) {
  // Get the clicked image origin for transform-origin
  const rect = el.getBoundingClientRect();
  const originX = (rect.left + rect.width  / 2) / window.innerWidth  * 100;
  const originY = (rect.top  + rect.height / 2) / window.innerHeight * 100;

  certBox.style.transformOrigin = `${originX}% ${originY}%`;
  certImg.src = el.src;

  // Remove closing class if present
  certOverlay.classList.remove('closing');

  // Force reflow so transition fires
  void certOverlay.offsetWidth;

  certOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  certOverlay.classList.remove('open');
  certOverlay.classList.add('closing');

  // After animation ends, fully hide
  setTimeout(function () {
    certOverlay.classList.remove('closing');
    certImg.src = '';
    document.body.style.overflow = '';
  }, 400);
}

// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCert();
});

// Prevent click inside box from closing overlay
if (certBox) {
  certBox.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

/* ===== Project Image Lightbox ===== */
window.addEventListener('DOMContentLoaded', function () {
  const projectOverlay = document.getElementById('project-overlay');
  const projectBox     = document.getElementById('project-box');
  const projectImg     = document.getElementById('project-img');
  const projectClose   = document.getElementById('project-close');

  window.openProject = function(el) {
    const rect = el.getBoundingClientRect();
    const ox = (rect.left + rect.width  / 2) / window.innerWidth  * 100;
    const oy = (rect.top  + rect.height / 2) / window.innerHeight * 100;
    projectBox.style.transformOrigin = ox + '% ' + oy + '%';
    projectImg.src = el.src;
    projectOverlay.classList.remove('closing');
    void projectOverlay.offsetWidth;
    projectOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeProject = function() {
    projectOverlay.classList.remove('open');
    projectOverlay.classList.add('closing');
    setTimeout(function() {
      projectOverlay.classList.remove('closing');
      projectImg.src = '';
      document.body.style.overflow = '';
    }, 400);
  };

  if (projectClose) {
    projectClose.addEventListener('click', function(e) {
      e.stopPropagation();
      window.closeProject();
    });
  }

  if (projectBox) {
    projectBox.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.closeProject();
  });
});
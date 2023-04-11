const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav__bottom");
const navLink = document.querySelectorAll(".nav__link");

// form
const form = document.getElementById("contact");
const clientName = document.getElementById("name");
const email = document.getElementById("email");
const msg = document.getElementById("message");
const overlay = document.querySelector(".overlay");
const crossForm = document.querySelector(".cross-form");

// image
const overlayImg = document.querySelectorAll(".overlay--img");
const crossImg = document.querySelectorAll(".cross-img");
const btnImg = document.querySelectorAll(".btn--img");

// card
const btnCard = document.querySelectorAll(".btn--card");

// nav
function toggleNav() {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav__bottom--toggle");
  });
}

function activeLink() {
  navLink.forEach(function (link) {
    link.addEventListener("click", function (e) {
      navLink.forEach(function (l) {
        l.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

// card
function cardOverlay() {
  btnCard.forEach(function (btn, i) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      overlayImg[i].style.display = "flex";
      disableScroll();
    });
  });
}

// img
function imgOverlay() {
  btnImg.forEach(function (btn, i) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      overlayImg[i + 3].style.display = "flex";
      disableScroll();
    });
  });
}

// form
function formSubmit() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(e.target);

    if (!clientName.value) {
      clientName.nextElementSibling.style.display = "inline-block";
    }
    if (!email.value) {
      email.nextElementSibling.style.display = "inline-block";
    }
    else {
      overlay.style.display = "flex";
      disableScroll();
    }

    if (clientName.value && email.value) {
      fetch(e.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
    }

    setTimeout(function () {
      clientName.nextElementSibling.style.display = "none";
      email.nextElementSibling.style.display = "none";
    }, 3000);
  });
}

function disableOverlayForm() {
  crossForm.addEventListener("click", function () {
    overlay.style.display = "none";
    clientName.value = "";
    email.value = "";
    msg.value = "";
    enableScroll();
  });
}

function disableOverlayImg() {
  crossImg.forEach(function (x, i) {
    x.addEventListener("click", function (e) {
      overlayImg[i].style.display = "none";
      enableScroll();
    });
  });
}

function enableScroll() {
  document.body.style.overflow = "visible";
}

function disableScroll() {
  document.body.style.overflow = "hidden";
}

document.addEventListener("DOMContentLoaded", function () {
  toggleNav();
  activeLink();
  formSubmit();
  disableOverlayForm();
  disableOverlayImg();
  imgOverlay();
  cardOverlay();
});

// async function getNavbar() {
//   let response = await fetch("navbar.html");
//   let content = await response.text();
//   document.getElementById("nav").innerHTML = content;
// }
// getNavbar();

async function getFoot() {
  let response = await fetch("footer.html");
  let content = await response.text();
  document.getElementById("footer").innerHTML = content;
}

getFoot();

document.querySelectorAll(".tranlo a").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".tranlo a")
      .forEach((a) => a.classList.remove("acTran"));
    this.classList.add("acTran");
    if (this.textContent === "Login") {
      document.querySelector(".log-container").classList.remove("d-none");
      document.querySelector(".reg-container").classList.add("d-none");
    } else {
      document.querySelector(".reg-container").classList.remove("d-none");
      document.querySelector(".log-container").classList.add("d-none");
    }
  });
});

document.querySelector("#logout").addEventListener("click", function () {
  sessionStorage.setItem("isLogin", JSON.stringify(false));
  sessionStorage.removeItem("currentUser");
  location.reload();
});

var data = JSON.parse(localStorage.getItem("data")) || [];

var isLogin = JSON.parse(sessionStorage.getItem("isLogin")) || false;
var currentEmail = JSON.parse(sessionStorage.getItem("currentUser")) || null;

if (isLogin == true && currentEmail != null) {
  document.querySelector("#logout").classList.remove("d-none");
  var user = data.find((u) => u.email === currentEmail);

  if (user) {
    document.querySelector("#picture").classList.remove("d-none");
    var imgTag = document.querySelector("#picture img");
    imgTag.src = user.image ? `./images/${user.image}` : "./images/default.png";
  }
} else {
  document.querySelector("#userLogin").classList.remove("d-none");
  document.querySelector("#userRegister").classList.remove("d-none");
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    window.location.href = "shop.html";
  });
});



var isOgin = JSON.parse(sessionStorage.getItem("isLogin")) || false;

document.querySelector("#cart-check").addEventListener("click", function (e) {
  e.preventDefault();
  if (isOgin) {
    window.location.href = "cart.html";
  } else {
    window.location.href = "login.html";
  }
});


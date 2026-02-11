var data = [];

if (localStorage.getItem("data") != null) {
  data = JSON.parse(localStorage.getItem("data"));
}

// document.querySelector(".reg-container").addEventListener("click", (e) => {
//   e.preventDefault();
// });

// document.querySelector(".log-container").addEventListener("click", (e) => {
//   e.preventDefault();
// });

document
  .querySelector(".reg-container .btn-container")
  .addEventListener("click", (e) => {
    var obj = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      image:
        document.querySelector("#file").value.split("\\").pop() ||
        "default.png",
    };

    if (validation(obj)) {
      data.push(obj);
      document.querySelector(".log-container").classList.remove("d-none");
      document.querySelector(".reg-container").classList.add("d-none");

      document
        .querySelectorAll(".tranlo a")
        .forEach((a) => a.classList.remove("acTran"));
      document.querySelectorAll(".tranlo a")[0].classList.add("acTran");

      localStorage.setItem("data", JSON.stringify(data));
      data = JSON.parse(localStorage.getItem("data"));
    }
  });

var validateLogin = function (obj) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].email == obj.email && data[i].password == obj.password) {
      return true;
    }
  }

  return false;
};

document
  .querySelector(".log-container .btn-container")
  .addEventListener("click", (e) => {
    var logobj = {
      email: document.querySelector("#logemail").value,
      password: document.querySelector("#logpass").value,
    };

    if (validateLogin(logobj)) {
      sessionStorage.setItem("isLogin", JSON.stringify(true));
      sessionStorage.setItem("currentUser", JSON.stringify(logobj.email));
      window.location.replace("index.html");
      document.querySelector("#error-message").classList.add("d-none");
    } else {
      document.querySelector("#error-message").classList.remove("d-none");
    }
  });

function validation(obj) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (obj.password.length < 5) {
    document.querySelector("#password").classList.toggle("err");
    return false;
  } else if (!regexEmail.test(obj.email)) {
    document.querySelector("#email").classList.toggle("err");
    return false;
  }
  return true;
}

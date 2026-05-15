let userEmail = document.getElementById("input-email");
let userPass = document.getElementById("input-password");

let users = [
  {
    name: "Mubashir",
    email: "mubashirkhan@gmail.com",
    password: 12345678,
  },
  {
    name: "Mubashir",
    email: "mubashirkhan@gmail.com",
    password: 12345678,
  },
  {
    name: "Mubashir",
    email: "khanmubashir@gmail.com",
    password: 12345678,
  },
];

let user = false;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function loginhandler() {
  userhai = null;
  currtentUser = null;
  if (!userEmail.value || !userPass.value) {
    Swal.fire({
      icon: "error",
      title: "Please",
      text: "Enter your email and password",
    });
    return;
  }

  for (let i = 0; i < users.length; i++) {
    // console.log(i);
    if (users[i].email == userEmail.value) {
      // console.log("user mila");
      userhai = true;

      if (userhai && users[i].password == userPass.value) {
        // console.log("success");
        currtentUser = users[i];
        break;
      }
    }
  }

  // if (!emailRegex.test(users.userEmail)) {
  //   Swal.fire({
  //     title: "@ is missing",
  //     icon: "error",
  //   });
  // }

  if (!userhai || !currtentUser) {
    Swal.fire({
      title: "Invalid User",
      icon: "error",
    });
  }
  if (currtentUser) {
    console.log("Mubshir ==>", currtentUser);
    userEmail.value = ""
    userPass.value = ""
    Swal.fire({
      title: "Login Successfully",
      icon: "success",
    });
    var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
    setTimeout (()=>{
    window.location.href ="./dashboard/index.html"
    },1700)
  }

  // if (userEmail.value && userPass.value) {
  //   user = true;
  //   console.log(user);
  //   console.log("userEmail", userEmail.value);

  // console.log("userPassword", userPass.value);

  // .then(() => {
  //   window.location.href = "./dashboard/index.html";
  // });
  // }
}

let passwordshow = document.getElementById("input-password");
let eyeIcon = document.getElementById("eye-icon");
function togglePassword() {

  if (passwordshow.type === "password") {
    passwordshow.type = "text";
    eyeIcon.innerText = "🙈";
  } else {
    passwordshow.type = "password";
    eyeIcon.innerText = "👁️";
  }
}

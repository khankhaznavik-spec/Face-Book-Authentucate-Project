let fullName = document.getElementById("fullName");
let sirName = document.getElementById("sirName");
let date = document.getElementById("date");
let month = document.getElementById("month");
let year = document.getElementById("year");
let gender = document.getElementsByName("gender");
let email = document.getElementById("email");
let password = document.getElementById("password");

let userData = [];
let user = {};
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function signUpHandler(e) {
  e.preventDefault();

  user.fullName = fullName.value;
  user.sirName = sirName.value;
  user.email = email.value;
  user.password = password.value;
  user.dob = date.value + "-" + month.value + "-" + year.value;

  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      user.gender = gender[i].value;
    }
  }
  if (
    !user.fullName.trim() ||
    !user.sirName.trim() ||
    !user.email.trim() ||
    !user.password.trim() ||
    !user.dob.trim() ||
    !user.gender
  ) {
    return sweetalert("error", "Oops", "Please fill all the fields");
  }

  if (user.password.length < 8) {
    return sweetalert("error", "Oops", "Password at least 8 characters");
  }

  if (!emailRegex.test(user.email)) {
    return sweetalert("error", "Oops", "wrong email");
  }

  userData.push(user);
  console.log(userData);
  Swal.fire({
    title: "SignUp Successfully",
    icon: "success",
  });

  fullName.value = "";
  sirName.value = "";
  email.value = "";
  password.value = "";
 

  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      gender[i].checked = false;
    }
  }
   setTimeout (()=>{
    window.location.href ="../index.html"
    },1700)
}

function sweetalert(icon, title, text) {
  Swal.fire({
    icon,
    title,
    text,
  });
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal from
function closeModal() {
  modalbg.style.display = "none";
}

// close modal event
let fermer = document.getElementById("close");
fermer.addEventListener("click", closeModal);

// verif form

function checkSubmit() {
  let prenom = document.getElementById("prenom");
  let nom = document.getElementById("nom");
  let email = document.getElementById("email");
  let date = document.getElementById("birthdate");
  let quantity = document.getElementById("quantity");
  let checkbox = document.getElementById("checkbox1");
  // let checkbox1 = document.getElementById("location1");
  // let checkbox2 = document.getElementById("location2");
  // let checkbox3 = document.getElementById("location3");
  // let checkbox4 = document.getElementById("location4");
  // let checkbox5 = document.getElementById("location5");
  // let checkbox6 = document.getElementById("location6");
  // let checkboxLocation = [checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6];

  let isEmptyPrenom = checkEmpty(prenom);
  let isEmptyNom = checkEmpty(nom);
  let isValidEmail = checkEmail(email);
  let isValidDate = checkDate(date);
  let isquantity = checkQuantity(quantity);
  let ischeckbox = checkCheckbox(checkbox);

  if (!isEmptyPrenom && !isEmptyNom && isValidEmail && isValidDate && !isquantity && !ischeckbox) {
    let form = {
      prenom: prenom.value,
      nom: nom.value,
      email: email.value,
      date: date.value,
      quantity: quantity.value,
      checkbox: checkbox.value,
    }

    launchModalConfirmation();
    closeModal();

    console.log(form)

    return true
  } else {
    return false
  }
}

// check si l'input n'est pas vide et compte pas les espcaces
function checkQuantity(input) {
  const regex = /\S+/;
  let error = document.getElementById(input.name)
  const errorMessage = document.getElementById("error");
  console.log(input.value);
  if (!regex.test(input.value)) {
    errorMessage.textContent = `veuillez indiquer le nombre de tournois auquel vous avez participé et re cliquer sur le bouton`;
    errorMessage.setAttribute("class", "errorMessage")
    return true
  } else {
    errorMessage.textContent = ``;
    error.setAttribute("class", "border-none text-control")
    return false
  }
}

// check si la checkbox des conditions d'utilisation est check
function checkCheckbox(checkbox) {
  const errorMessage = document.getElementById("error_checked");
  if (!checkbox.checked) {
    errorMessage.textContent = `veuillez cocher les conditions d'utilisation`;
    errorMessage.setAttribute("class", "errorMessage")
    console.log("not checked");
    return true
  } else {
    errorMessage.textContent = ``;
    console.log("checked");
    return false
  }
}


// check si l'input n'est pas vide et compte pas les espcaces
function checkEmpty(input) {
  const regex = /\S+\S+/;
  let error = document.getElementById(input.name)
  const errorMessagePrenom = document.getElementById("errorPrenom");
  const errorMessageNom = document.getElementById("errorNom");
  if (!regex.test(input.value)) {
    if (input.name === "prenom") {
      errorMessagePrenom.textContent = `veuillez entrer 2 caractéres ou plus`;
      errorMessagePrenom.setAttribute("class", "errorMessage")
    } else {
      errorMessageNom.textContent = `veuillez entrer 2 caractéres ou plus`;
      errorMessageNom.setAttribute("class", "errorMessage")
    }
    error.setAttribute("class", "border text-control")
    return true
  } else {
    errorMessagePrenom.textContent = ``;
    errorMessageNom.textContent = ``;
    error.setAttribute("class", "border-none text-control")
    return false
  }
}

// check si le format de l'email est correct Ex: n@hotmail.fr
function checkEmail(input) {
  const regex = /\S+@\S+\.\S+/;
  let error = document.getElementById(input.name)
  const errorMessage = document.getElementById("errorEmail");
  if (!regex.test(input.value)) {
    errorMessage.textContent = `le format de l'email n'est pas correct`;
    errorMessage.setAttribute("class", "errorMessage")
    error.setAttribute("class", "border text-control")
    return false
  } else {
    errorMessage.textContent = ``;
    error.setAttribute("class", "border-none text-control")
    return true
  }
}

//check si la date de naissance n'est pas vide et si elle correspond au bon format
function checkDate(input) {
  console.log(input.value);
  const regexVide = /\S+\S+/;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const regexUs = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;
  let error = document.getElementById(input.name)
  const errorMessage = document.getElementById("errorDate");
  if ((!regex.test(input.value) && !regexUs.test(input.value)) || !regexVide.test(input.value)) {
    errorMessage.textContent = `le format de la date de naissance n'est pas correct`;
    errorMessage.setAttribute("class", "errorMessage")
    error.setAttribute("class", "border text-control")
    return false
  } else {
    errorMessage.textContent = ``;
    error.setAttribute("class", "border-none text-control")
    return true
  }
}

// launch modal confirmation
function launchModalConfirmation() {
  const confirmation = document.getElementById("confirmation");
  confirmation.style.display = "block";
}


// ecoute du button "c'est parti"
let button = document.getElementById("btn-submit");
button.addEventListener("click", function (e) {
  e.preventDefault();

  checkSubmit()

  checkForm()

  // function qui permet de re actualiser les inputs
  function checkForm() {
    document.getElementById("prenom").addEventListener('keyup', (e) => {
      checkEmpty(e.target);
    })
    document.getElementById("nom").addEventListener('keyup', (e) => {
      checkEmpty(e.target);
    })
    document.getElementById("email").addEventListener('keyup', (e) => {
      checkEmail(e.target);
    })
    document.getElementById("birthdate").addEventListener('keyup', (e) => {
      checkDate(e.target);
    })
    document.getElementById("quantity").addEventListener('keyup', (e) => {
      checkQuantity(e.target);
    })
  }

  // close modal confirmation
  function closeModalConfirmation() {
    confirmation.style.display = "none";
  }

  // close modal event
  let fermerConfirmation = document.getElementById("closeConfirmation");
  fermerConfirmation.addEventListener("click", closeModalConfirmation);
})
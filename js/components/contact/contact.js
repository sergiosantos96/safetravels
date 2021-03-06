import Toast from "../toast/toast";

const form = document.querySelector(".contact__form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const tel = document.getElementById("phone");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  // Get the value from the inputs
  const nameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = tel.value.trim();
  const messageValue = message.value.trim();

  if (nameValue === "") {
    // Show error
    // Add error class
    setErrorFor(fullName, "Name cannot be blank");
  } else {
    // Add sucess class
    setSucessFor(fullName);
  }

  // Email validation
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    fullName;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSucessFor(email);
  }

  // Phone number validation
  if (phoneValue.length < 9 && phoneValue !== "") {
    setErrorFor(tel, "Phone number must have 9 numbers");
  } else if (phoneValue.length >= 12 && phoneValue !== "") {
    setErrorFor(tel, "Phone number must have less than 12 numbers");
  } else if (phoneValue !== "") {
    setSucessFor(tel);
  } else {
    setDefaultFor(tel);
  }

  // Message/text are validation
  if (messageValue === "") {
    setErrorFor(message, "Message cannot be blank");
  } else {
    setSucessFor(message);
  }

  // If required inputs are empty, show gray toast
  if (nameValue === "" || emailValue === "" || messageValue === "") {
    new Toast("Please fill in the required fields", "empty");
  }

  // If required inputs are filled, show sucess toast
  if (nameValue !== "" && emailValue !== "" && isEmail(emailValue) && messageValue !== "") {
    new Toast("Form submited sucessfully!", "sucess");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector(".contact__error");

  // Add error message
  errorMessage.innerText = message;

  // Add error class
  formControl.className = "form__control shake error";
}

setTimeout((input) => {
  const formControl = input.parentElement;
  formControl.classList.remove("shake");
}, 2000);

function setSucessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form__control success";
}

function setDefaultFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form__control default";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

const textArea = document.querySelector(".contact__textarea");
const remainingChars = document.querySelector(".textarea__characters");
const errorMessage = document.querySelector('.message__error');
const maxChars = 200;

textArea.addEventListener("input", () => {
  // Check for the remaining characters
  const remaining = maxChars - textArea.value.length;
  const color = remaining < maxChars * 0.1 ? "red" : "gray";

  if (remaining > 0) {
    remainingChars.style.visibility = "visible";
    errorMessage.style.visibility = "hidden";
  }

  if (textArea.value.length === 0) {
    remainingChars.style.visibility = "hidden";
    errorMessage.style.visibility= "visible";
  }

  remainingChars.textContent = `${remaining} characters remaining`;
  remainingChars.style.color = color;
});

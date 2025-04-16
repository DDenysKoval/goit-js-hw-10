let formData = {
  email: "",
  message: "",
}

const form = document.querySelector(".feedback-form");

form.addEventListener("input", function () {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
})

const savedData = localStorage.getItem("feedback-form-state");
if (savedData) {
  const parsedData = JSON.parse(savedData);
  formData = parsedData;
  form.elements.email.value = parsedData.email;
  form.elements.message.value = parsedData.message;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formData.email === "" || formData.message  === "") {
    alert("Fill please all fields");
    return;
  }
  console.log(formData);
  
  localStorage.removeItem("feedback-form-state");
  form.reset();
  formData = {
  email: "",
  message: "",
  }
})

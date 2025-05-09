import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const delay = e.target.elements.delay.value;
  const state = e.target.elements.state.value === "fulfilled";
  const promise = createPromise(delay, state, delay);
  
  promise
    .then(() => {
      iziToast.success({
      title: 'OK',
      message: `✅ Fulfilled promise in ${delay}ms`,
  });
  }).catch(() => {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
  });
  });
})

function createPromise(value, isActive, delay) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (isActive) {
        res(value);
      } else {
        rej(value);
      }
    }, delay)
  })
  return promise;
}
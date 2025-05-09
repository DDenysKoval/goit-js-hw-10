import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let intervalId = null;

const startBtn = document.querySelector("button");
const input = document.querySelector("input");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    const rightNow = new Date();

    if (pickedDate <= rightNow) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
});
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      startBtn.classList.add("is-active");
      startBtn.classList.remove("is-disabled");
      userSelectedDate = pickedDate;
    }
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;
  intervalId = setInterval(counter, 1000);
  startBtn.classList.add("is-disabled");
  startBtn.classList.remove("is-active");
  input.disabled = true;
  input.classList.remove("js-input");
})

function counter() {
  const currentTime = new Date();
  const difference = userSelectedDate - currentTime;
  timeToStr(difference);
  
  if (difference < 1000) {
    clearInterval(intervalId);
  }

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timeToStr(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}
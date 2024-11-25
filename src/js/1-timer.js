import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputData = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

startButton.disabled = true;

let userSelectedDate;

startButton.addEventListener("click", timerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0]
      startButton.disabled = false;
      updateCountdown();
    } else {
      startButton.disabled = true;
      iziToast.show({
        position: 'topRight',
        color: 'red', 
        message: "Please choose a date in the future",
      });
    }  
  },
};

flatpickr(inputData, options);

let countdownInterval;

function timerStart() {
  countdownInterval = setInterval(updateCountdown, 1000);
  startButton.disabled = true;
  inputData.disabled = true;
};

function timerStop() {
  clearInterval(countdownInterval);
  
  daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  inputData.disabled = false;
}

function updateCountdown() {
  const differenceDate = userSelectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(differenceDate);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  if (differenceDate <= 0) {
    timerStop();
  } 
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
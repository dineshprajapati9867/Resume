const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const recordsList = document.getElementById("recordsList");

let hour = 0;
let minute = 0;
let second = 0;
let milliSecond = 0;
let timer = false;
let interval;
let previousRecords = [];

startBtn.addEventListener("click", function () {
  if (!timer) {
    timer = true;
    interval = setInterval(stopWatch, 10);
  }
  console.log("start");
});

stopBtn.addEventListener("click", function () {
  timer = false;
  clearInterval(interval);
  saveRecord();
  console.log("stop");
});

resetBtn.addEventListener("click", function () {
  timer = false;
  clearInterval(interval);
  hour = 0;
  minute = 0;
  second = 0;
  milliSecond = 0;
  previousRecords = [];
  recordsList.innerHTML = "";
  updateDisplay();
  console.log("reset");
});

function stopWatch() {
  if (timer) {
    milliSecond += 10;

    if (milliSecond === 1000) {
      second++;
      milliSecond = 0;
    }
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    updateDisplay();
  }
}

function updateDisplay() {
  let hrString = hour < 10 ? "0" + hour : hour;
  let minString = minute < 10 ? "0" + minute : minute;
  let secString = second < 10 ? "0" + second : second;
  let milliString = milliSecond < 100 ? "0" + milliSecond : milliSecond;

  document.getElementById("hour").innerHTML = hrString;
  document.getElementById("minute").innerHTML = minString;
  document.getElementById("second").innerHTML = secString;
  document.getElementById("milliSecond").innerHTML = milliString;
}

function saveRecord() {
  let hrString = hour < 10 ? "0" + hour : hour;
  let minString = minute < 10 ? "0" + minute : minute;
  let secString = second < 10 ? "0" + second : second;
  let milliString = milliSecond < 100 ? "0" + milliSecond : milliSecond;

  let record = `${hrString}:${minString}:${secString}:${milliString}`;

  if (!previousRecords.includes(record)) {
    previousRecords.push(record);
    displayRecords();
  } else {
    alert("Record already exists, not added.");
  }
}

function displayRecords() {
  recordsList.innerHTML = "";

  previousRecords.forEach((record, index) => {
    let listItem = document.createElement("li");
    listItem.textContent = `Record ${index + 1}: ${record}`;
    recordsList.appendChild(listItem);
  });
}

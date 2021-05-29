//====================
// Setup variables
//====================
var records: TimeRecord[] = [];
var currentRecord: TimeRecord = {};
// var lastTimePoint: number;
var runningTotal: TimeDifference;

//=======================
// Setup Time logic fns
//=======================
const getTimeElapsed = (): TimeDifference => {
  if (currentRecord['start']) {
    // Find the distance between now and the count down date
    var distance = now() - currentRecord['start'];

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  } else {
    return {};
  }
};


const getPlural = (num: number, word: string) =>
  num === 1 ? ` ${word} ` : ` ${word}s `;


const prettyOutput = (timeDifference: TimeDifference): string =>
  (timeDifference.days
    ? timeDifference.days + getPlural(timeDifference.days, "day")
    : ""
  ).concat(
    (timeDifference.hours
      ? timeDifference.hours + getPlural(timeDifference.hours, "hour")
      : ""
    ).concat(
      (timeDifference.minutes
        ? timeDifference.minutes + getPlural(timeDifference.minutes, "minute")
        : ""
      ).concat(
        timeDifference.seconds
          ? timeDifference.seconds + getPlural(timeDifference.seconds, "second")
          : "0 seconds"
      )
    )
  );

//====================
// Button press fns
//====================
const clockInButtonPress = () => {
  currentRecord['start'] = now();
  // console.log(lastTimePoint);
  currentRecordStartDateLabel.innerHTML = new Date().toDateString();
  // localStorage.setItem('test', 'Matt');
};

const clockOutButtonPress = () => {
  if (currentRecord['start']) {
    runningTotal = getTimeElapsed();
    currentRecord['end'] = now();
    records.push(currentRecord);
    currentRecord = {};
    currentRecordTimeElapsedLabel.innerHTML = "";
  }
  // alert(localStorage.getItem('test'));
};

const resetButtonPress = () => {
  currentRecord['start'] = undefined;
  currentRecordTimeElapsedLabel.innerHTML = "";
};

//=======================================
// On second update fn
// Update the count down every 1 second
//=======================================
// update in near real time
setInterval(() => {
    if (currentRecord['start']) {
        currentRecordTimeElapsedLabel.innerHTML = prettyOutput(getTimeElapsed());
      }
    if (runningTotal) {
        runningTimeLabel.innerHTML = prettyOutput(runningTotal);
    }
    if (records) {
        recordsLabel.innerHTML = JSON.stringify(records);
    }
}, 1);

//=======================================
// Connect html elements to vars and fns
//=======================================
document.getElementById("clockInButton").onclick = clockInButtonPress;
document.getElementById("clockOutButton").onclick = clockOutButtonPress;
document.getElementById("resetButton").onclick = resetButtonPress;

const currentRecordStartDateLabel = document.getElementById("currentRecordStartDateLabel");
const currentRecordTimeElapsedLabel = document.getElementById("currentRecordTimeElapsedLabel");

const runningTimeLabel = document.getElementById("runningTimeLabel");
const recordsLabel = document.getElementById("recordsLabel");

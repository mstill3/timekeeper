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

//====================
// Button press fns
//====================
const clockInButtonPress = () => {
  currentRecord['start'] = now();
  // console.log(lastTimePoint);

  currentRecordStartDateLabel.innerHTML = new Date().toDateString();
  statusIcon.innerHTML = '<i class="fas fa-play"></i>';
  // localStorage.setItem('test', 'Matt');
};

const clockBreakInButtonPress = () => {
  statusIcon.innerHTML = '<i class="fas fa-pause"></i>';
};

const clockBreakOutButtonPress = () => {
  statusIcon.innerHTML = '<i class="fas fa-play"></i>';
};

const clockOutButtonPress = () => {
  if (currentRecord['start']) {
    runningTotal = getTimeElapsed();
    currentRecord['end'] = now();
    records.unshift(currentRecord);
    currentRecord = {};

    statusIcon.innerHTML = '';

    currentRecordStartDateLabel.innerHTML = "---";
    currentRecordTimeElapsedLabel.innerHTML = "---";

    document.querySelector('#timeTable').innerHTML = records.reduce((html, record) => {
      html += `<tr> <td> ${new Date(record.start).toDateString()} </td> <td> ${prettyOutput(getTimeElapsed1(record.start, record.end))} </td> </tr>`;
      return html;
    }, `<tr> <th>StartDate</th> <th>Elapsed Time</th> </tr>`);

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
$("clockInButton").onclick = clockInButtonPress;
$("clockBreakInButton").onclick = clockBreakInButtonPress;
$("clockBreakOutButton").onclick = clockBreakOutButtonPress;
$("clockOutButton").onclick = clockOutButtonPress;
$("resetButton").onclick = resetButtonPress;

const statusIcon = $("status");

const currentRecordStartDateLabel = $("currentRecordStartDateLabel");
const currentRecordTimeElapsedLabel = $("currentRecordTimeElapsedLabel");

const runningTimeLabel = $("runningTimeLabel");
const recordsLabel = $("recordsLabel");

// Setup variables
var lastTimePoint: number;
var runningTotal: TimeDifference;


interface TimeDifference {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}


// Setup logic fns
const getTimeElapsed = (): TimeDifference => {
    if (lastTimePoint) {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - lastTimePoint;
  
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {days, hours, minutes, seconds};
    } else {
        return {};
    }
}

const getPlural = (num: number, word: string) => {
    return num === 1 ? ` ${word} ` : ` ${word}s `;
}

const prettyOutput = (timeDifference: TimeDifference): string => {
    return (
        (timeDifference.days ? timeDifference.days + getPlural(timeDifference.days, 'day') : '').concat(
            (timeDifference.hours ? timeDifference.hours + getPlural(timeDifference.hours, 'hour') : '').concat(
                (timeDifference.minutes ? timeDifference.minutes + getPlural(timeDifference.minutes, 'minute') : '').concat(
                    (timeDifference.seconds ? timeDifference.seconds + getPlural(timeDifference.seconds, 'second') : '0 seconds')
                )
            )
        )
    );
};


// Button press fns
const clockInButtonPress = () => {
    lastTimePoint = new Date().getTime();
    // console.log(lastTimePoint);
    startTimeLabel.innerHTML = new Date().toDateString();
};

const clockOutButtonPress = () => {
    runningTotal = getTimeElapsed();
    lastTimePoint = 0;
};

const resetButtonPress = () => {
    lastTimePoint = 0;
    timeLabel.innerHTML = "";
};

// On second update fn
// Update the count down every 1 second
setInterval(() => {
    // alert(lastTimePoint)
    if (lastTimePoint) {
        timeLabel.innerHTML = prettyOutput(getTimeElapsed());
    }
    if (runningTotal) {
        runningTimeLabel.innerHTML = prettyOutput(runningTotal);
    }
  }, 1000);


  // 
// Connect html elements to vars and fns
document.getElementById("clockInButton").onclick = clockInButtonPress;
document.getElementById("clockOutButton").onclick = clockOutButtonPress;
document.getElementById("resetButton").onclick = resetButtonPress;

var startTimeLabel = document.getElementById("startTimeLabel");
var timeLabel = document.getElementById("timeLabel");
var runningTimeLabel = document.getElementById("runningTimeLabel");

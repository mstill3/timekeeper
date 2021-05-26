
// Connect html elements to vars and fns
document.getElementById("clockInButton").onclick = clockInButtonPress;
document.getElementById("clockOutButton").onclick = clockOutButtonPress;
document.getElementById("resetButton").onclick = resetButtonPress;

var timeLabel = document.getElementById("timeLabel");


// Setup variables
var lastTimePoint;

// Setup logic fns
function getTimeElapsed() {
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

function getPlural(number, string) {
    return number === 1 ? ` ${string} ` : ` ${string}s `;
}

function prettyOutput(timeDifference) {
    return (
        (timeDifference.days ? timeDifference.days + getPlural(timeDifference.days, 'day') : '').concat(
            (timeDifference.hours ? timeDifference.hours + getPlural(timeDifference.hours, 'hour') : '').concat(
                (timeDifference.minutes ? timeDifference.minutes + getPlural(timeDifference.minutes, 'minute') : '').concat(
                    (timeDifference.seconds ? timeDifference.seconds + getPlural(timeDifference.seconds, 'second') : '')
                )
            )
        )
    );
}


// Button press fns
function clockInButtonPress() {
    lastTimePoint = new Date().getTime();
    console.log(lastTimePoint)
    timeLabel.innerHTML = prettyOutput(getTimeElapsed());
}

function clockOutButtonPress() {
    timeLabel.innerHTML = prettyOutput(getTimeElapsed());
}

function resetButtonPress() {
    timeLabel.innerHTML = "";
}

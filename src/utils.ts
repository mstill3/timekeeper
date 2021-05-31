const now = (): number => new Date().getTime();

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

//=======================
// Setup Time logic fns
//=======================
const getTimeElapsed1 = (dateTime1: number, dateTime2: number): TimeDifference => {
    // Find the distance between now and the count down date
    var distance = Math.abs(dateTime1 - dateTime2);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

const $ = (id: string) => document.getElementById(id);
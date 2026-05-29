const timerCard = document.querySelector(".timer-card");

if (timerCard) {
  const anniversaryDateValue = timerCard.dataset.anniversaryDate;
  const anniversaryDate = new Date(anniversaryDateValue);

  function getMonthDifference(startDate, endDate) {
    let months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (endDate.getDate() < startDate.getDate()) {
      months--;
    }

    return Math.max(months, 0);
  }

  function updateLoveTimer() {
    const now = new Date();

    const totalMonths = getMonthDifference(anniversaryDate, now);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const lastMonthAnniversary = new Date(anniversaryDate);
    lastMonthAnniversary.setMonth(anniversaryDate.getMonth() + totalMonths);

    const diff = Math.max(now - lastMonthAnniversary, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("yearsTogether").textContent = years;
    document.getElementById("monthsTogether").textContent = months;
    document.getElementById("daysTogether").textContent = days;
    document.getElementById("hoursTogether").textContent = hours;
    document.getElementById("minutesTogether").textContent = minutes;
    document.getElementById("secondsTogether").textContent = seconds;

    updateNextAnniversary(now);
    updateLiveClock(now);
  }

  function updateNextAnniversary(now) {
    let nextAnniversary = new Date(anniversaryDate);
    nextAnniversary.setFullYear(now.getFullYear());

    if (nextAnniversary < now) {
      nextAnniversary.setFullYear(now.getFullYear() + 1);
    }

    const distance = Math.max(nextAnniversary - now, 0);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(distance / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(distance / (1000 * 60)) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    document.getElementById("nextAnniversaryCountdown").textContent =
      `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  function updateLiveClock(now) {
    document.getElementById("liveClock").textContent =
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
  }

  updateLoveTimer();
  setInterval(updateLoveTimer, 1000);
}
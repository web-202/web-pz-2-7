$(document).ready(function () {
  const winners = JSON.parse(localStorage.getItem("winers"));
  if (winners) {
    for (let win of winners) {
      $("#table").append(
        `<tr><th>${win.seconds}</th><th>${win.game}</th></tr>`
      );
    }
  }
});

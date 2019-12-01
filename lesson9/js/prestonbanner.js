// Don't hide the banner on Fridays
function showBanner() {
  var weekday = currentDate.toLocaleDateString('en-US', weekdayOption);
  if (weekday == 'Friday') {
    document
      .getElementsByClassName("hidebanner")[0]
      .classList.toggle("hidebanner");
  }
}
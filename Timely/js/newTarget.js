document.addEventListener('DOMContentLoaded', () => {
    // loadTimeFromLocalStorage();
});
// function loadTimeFromLocalStorage() {
//     // Check if the dailyfixTime variable exists in localStorage
//     var dailyfixTime = localStorage.getItem('dailyfixTime') || 1440;
// }

function addNewTarget() {
    let activityName = document.getElementById('activityName').value;
    let goalTime = document.getElementById('goalTime').value;
    let startDate = document.getElementById('startDate').value;
    let dueDate = document.getElementById('dueDate').value;
    let completedHours = 0;
    let flag = false;
    let count = parseInt(localStorage.getItem('localCount')) || 0;

    // Split the goal time input to extract hours and minutes
    let [hours, minutes] = goalTime.split(':').map(Number);
    // Convert goal time to total minutes
    goalTime = (hours * 60 + minutes) * 60;

    // Create the new dailySchedule object
    let newObject = new dailySchedule(activityName, goalTime, completedHours, startDate, dueDate, flag);

    // Store the new object in local storage
    localStorage.setItem('object' + count, JSON.stringify(newObject));
    localStorage.setItem('localCount', count + 1);

    alert("Activity is generated");

    // Redirect to the index.html page
    window.location.href = "/index.html";
}


function dailySchedule(activityName, totleHours, completedHours, startDate, dueDate, flag) {
    this.activityName = activityName;
    this.totleHours = totleHours;
    this.completedHours = completedHours;
    this.completedPercentage = (completedHours / totleHours) * 100 || 0;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.flag = flag;
}

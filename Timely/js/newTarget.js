document.addEventListener('DOMContentLoaded', () => {
    // loadTimeFromLocalStorage();
});

function addNewTarget() {
    let activityName = document.getElementById('activityName').value;
    let goalTime = document.getElementById('goalTime').value;
    let startDate = document.getElementById('startDate').value;
    let dueDate = document.getElementById('dueDate').value;
    let completedHours = 0;
    let flag = true;
    let count = parseInt(localStorage.getItem('localCount')) || 0;

    let [hours, minutes] = goalTime.split(':').map(Number);
    goalTime = hours * 3600 + minutes * 60;

    let newObject = new dailySchedule(activityName, goalTime, completedHours, startDate, dueDate, flag);

    localStorage.setItem('object' + count, JSON.stringify(newObject));

    localStorage.setItem('localCount', count + 1);

    alert("Activity is generated");

    let storedSchedule = localStorage.getItem('object' + (count-1));

    let retrievedSchedule = JSON.parse(storedSchedule);

    console.log(retrievedSchedule);

    window.location.href = "/Timely/index.html";
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

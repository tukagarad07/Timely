
function addNewTarget() {
    let activityName = document.getElementById('activityName').value;
    let goalTime = document.getElementById('goalTime').value;
    let startDate = document.getElementById('startDate').value;
    let dueDate = document.getElementById('dueDate').value;
    let completedHours = 0;
    let flag = true;
    let count = parseInt(localStorage.getItem('localCount')) || 0;
    let dailyfixTime = localStorage.getItem('dailyfixTime') || 1440*60;

    let [hours, minutes] = goalTime.split(':').map(Number);
    goalTime = (hours * 60 + minutes) * 60;


    if (goalTime > dailyfixTime) { 
        const convertedTime = `${Math.floor(dailyfixTime / 3600)} hours and ${(dailyfixTime % 3600)/60} minutes.`;
        alert("Daily Schedule is already scheduled and your remaining time of the day is : "+convertedTime);
        return; 
    }
    dailyfixTime-=goalTime;
    localStorage.setItem("dailyfixTime", dailyfixTime);
    let newObject = new dailySchedule(activityName, goalTime, completedHours, startDate, dueDate, flag);

    localStorage.setItem('object' + count, JSON.stringify(newObject));
    localStorage.setItem('localCount', count + 1);

    alert("Activity is generated");
    window.location.href = "/index.html";
}


function dailySchedule(activityName, totalHours, completedHours, startDate, dueDate, flag) {
    this.activityName = activityName;
    this.totalHours = totalHours;
    this.completedHours = completedHours;
    this.completedPercentage = (completedHours / totalHours) * 100 || 0;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.flag = flag;
}

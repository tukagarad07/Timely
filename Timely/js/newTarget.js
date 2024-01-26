document.addEventListener('DOMContentLoaded', () => {
    loadTimeFromLocalStorage();
});

function addNewTarget() {
    let activityName = document.getElementById('activityName').value;
    let goalTime = document.getElementById('goalTime').value;
    let startDate = document.getElementById('startDate').value;
    let dueDate = document.getElementById('dueDate').value;
    let completedHours = 0;
    let flag = true;
    let count = parseInt(localStorage.getItem('localCount')) || 0;

    // Create an instance of dailySchedule
    let newObject = new dailySchedule(activityName, goalTime, completedHours, startDate, dueDate, flag);

    // Store the instance in local storage with a unique key
    localStorage.setItem('object' + count, JSON.stringify(newObject));

    // Update the count in local storage
    localStorage.setItem('localCount', count + 1);

    // Assuming you want to show a simple alert as a popup
    alert("Activity is generated");

    // Retrieve the instance from local storage
    let storedSchedule = localStorage.getItem('object' + (count-1));

    // Parse the JSON string back to an object
    let retrievedSchedule = JSON.parse(storedSchedule);

    // Log the retrieved schedule to the console (or use it as needed)
    console.log(retrievedSchedule);

    // Redirect to index.html
     window.location.href = "/Timely/index.html";
}

// Constructor function for dailySchedule
function dailySchedule(activityName, totleHours, completedHours, startDate, dueDate, flag) {
    this.activityName = activityName;
    this.totleHours = totleHours;
    this.completedHours = completedHours;
    this.completedPercentage = (completedHours / totleHours) * 100 || 0;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.flag = flag;
}

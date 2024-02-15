let objNumber = parseInt(localStorage.getItem('objCount'));
const object = JSON.parse(localStorage.getItem('object'+objNumber));
document.addEventListener("DOMContentLoaded", function() {

    
    if (object) {
        document.getElementById("activityName").value = object.activityName;
        document.getElementById("totalHours").value = secondsToHoursMinutes(object.totalHours);
        document.getElementById("completedHours").value = secondsToHoursMinutes(object.completedHours);
        document.getElementById("startDate").value = object.startDate;
        document.getElementById("dueDate").value = object.dueDate;
        document.getElementById("flag").checked = object.flag;
    }
    document.querySelector(".resetBtn").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("completedHours").value = '00:00';
    });
    
    document.getElementById("editForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        object.activityName = document.getElementById("activityName").value;
        object.totalHours = hoursToSeconds(document.getElementById("totalHours"));
        object.completedHours = hoursToSeconds(document.getElementById("completedHours"));
        object.startDate = document.getElementById("startDate").value;
        object.dueDate = document.getElementById("dueDate").value;
        object.flag = document.getElementById("flag").checked;
        
        localStorage.setItem('object' + objNumber, JSON.stringify(object));
        
        alert("Schedule updated successfully!");
        window.location.href = '/Timely/html/home.html';
    });

    document.querySelector(".deleteBtn").addEventListener("click", function(event) {
        event.preventDefault();
        if(object){
            if(object.flag) {
                let dailyfixTime= parseInt(localStorage.getItem('dailyfixTime'));
                dailyfixTime+=object.totalHours;
                localStorage.setItem('dailyfixTime', dailyfixTime);
                console.log("done");
            }
            let localCount = localStorage.getItem("localCount");
            localStorage.removeItem('object'+objNumber);
            for (let i = objNumber+1; i < localCount; i++) {
                let objectName = "object" + i;
                let storedObject = JSON.parse(localStorage.getItem(objectName));
                if (storedObject) {
                    localStorage.setItem('object' + (i-1), JSON.stringify(storedObject));
                }
            }
            localCount -= 1;
            localStorage.setItem("localCount",localCount);
            document.getElementById("activityName").value = "";
            document.getElementById("totalHours").value = "";
            document.getElementById("completedHours").value = "";
            document.getElementById("startDate").value = "";
            document.getElementById("dueDate").value = "";
            document.getElementById("flag").checked = false;
            alert("Schedule deleted successfully!");
            window.location.href = '/index.html';
        }
    });
    
});
function secondsToHoursMinutes(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    return hours+ ":" + minutes;
}
function hoursToSeconds(goalTime) {
    let [hours, minutes] = goalTime.value.split(':').map(Number);
    let goalSeconds = (hours * 3600) + (minutes * 60);
    return goalSeconds;
}

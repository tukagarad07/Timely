var count = parseInt(localStorage.getItem('localCount'))|0; // Replace with your actual count
var objects = [];

for (var i = 0; i < count; i++) {
    var objectName = "object" + i;
    var storedObject = JSON.parse(localStorage.getItem(objectName));
    if (storedObject) {
        objects.push(storedObject);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayObjectsInTable(objects);
    var objectElements = document.querySelectorAll('.object');
    objectElements.forEach(function (objectElement) {
        objectElement.addEventListener('click', function() {
            var originalIndex = parseInt(objectElement.getAttribute('data-original-index'));
            redirectToIndex(originalIndex);
        });
    });
});

function displayObjectsInTable(objectList) {
    var schedule = document.querySelector('.schedule');
    var goal = document.querySelector('.goal');
    objectList.forEach(function(object, index) {
        var objectDiv = document.createElement('div');
        objectDiv.className = 'object tableElement';
        objectDiv.setAttribute('data-original-index', index); 
        var backgroundColor = '#006400';

        if (object.completedPercentage < 1) {
            backgroundColor = '#FFFFFF';
        }else if (object.completedPercentage < 20) {
            backgroundColor = '#CCFF33';
        } else if (object.completedPercentage < 35) {
            backgroundColor = '#9EF01A';
        } else if (object.completedPercentage < 45) {
            backgroundColor = '#70E000';
        } else if (object.completedPercentage < 65) {
            backgroundColor = '#38B000';
        } else if (object.completedPercentage < 75) {
            backgroundColor = '#008000';
        } else if (object.completedPercentage < 90) {
            backgroundColor = '#007200';
        }
        objectDiv.style.backgroundColor = backgroundColor;
        var htmlContent = `
            <div class="left">${object.activityName}</div>
            <div class="right">${object.completedPercentage}%</div>
            <!-- Add other properties as needed -->
        `;

        objectDiv.innerHTML = htmlContent;

        if (!object.flag) {
            goal.appendChild(objectDiv);
        } else {
            schedule.appendChild(objectDiv);
        }
    });
}



var dropdownContent;

function showOptions() {

    if (dropdownContent) {
        return;
    }
    dropdownContent = document.createElement("div");
    dropdownContent.id = "dropdown-content";
    dropdownContent.className = "dropdown-content";

    addOption(dropdownContent, "Add new Schedule", "/Timely/html/newSchedule.html");
    addOption(dropdownContent, "Add new Target", "/Timely/html/newTarget.html");


    document.body.appendChild(dropdownContent);


    document.addEventListener('click', closeDropdown);
}

function closeDropdown(event) {

    if (!dropdownContent.contains(event.target) && event.target.className !== 'addButton') {

        document.body.removeChild(dropdownContent);

        dropdownContent = null;

        document.removeEventListener('click', closeDropdown);
    }
}

function addOption(container, text, destination) {
    var option = document.createElement("div");
    option.className = "dropdown-option";
    option.textContent = text;
    option.addEventListener("click", function() {
        window.location.href = destination;
    });

    container.appendChild(option);
}

function redirectToIndex(objCount) {
    localStorage.setItem('objCount',objCount)
    window.location.href = '/Timely/html/home.html';
}

// Assuming count is a local variable indicating the number of objects
var count = parseInt(localStorage.getItem('localCount'))|0; // Replace with your actual count
var objects = [];

// Load objects from local storage
for (var i = 0; i < count; i++) {
    var objectName = "object" + i;
    var storedObject = JSON.parse(localStorage.getItem(objectName));
    if (storedObject) {
        objects.push(storedObject);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayObjectsInTable(objects);
    var scheduleElement = document.querySelector('.schedule');
    var goalElement = document.querySelector('.goal');

//new
    var objectElements = document.querySelectorAll('.object');
    objectElements.forEach(function (objectElement, index) {
        objectElement.addEventListener('click', function() {
            redirectToIndex(index);
        });
    });

    // Add click event listener to "goal"
    goalElement.addEventListener('click', function() {
        redirectToIndex();
    });
});

function displayObjectsInTable(objectList) {
    // Get the "table" element
    var table = document.querySelector('.schedule');

    // Iterate through the list of objects and create a div for each
    objectList.forEach(function(object, index) {
        // Create a new div element for each object
        var objectDiv = document.createElement('div');
        objectDiv.className = 'object tableElement';

        // Create and append HTML content based on object properties
        objectDiv.innerHTML = `
            <div class="left">${object.activityName}</div>
            <div class="right">${object.completedPercentage}%</div>
            <!-- Add other properties as needed -->
        `;

        // Append the objectDiv to the "table" element
        table.appendChild(objectDiv);
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

    // Add click event listener to navigate to the specified destination
    option.addEventListener("click", function() {
        window.location.href = destination;
    });

    container.appendChild(option);
}

// function redirectToIndex() {
//     window.location.href = '/Timely/index.html'; // Adjust the path accordingly
// }

function redirectToIndex(objCount) {
    localStorage.setItem('objCount',objCount)
    window.location.href = '/Timely/html/home.html';
}

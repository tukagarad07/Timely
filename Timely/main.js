var dropdownContent;

function showOptions() {

    if (dropdownContent) {
        return;
    }
    dropdownContent = document.createElement("div");
    dropdownContent.id = "dropdown-content";
    dropdownContent.className = "dropdown-content";

    addOption(dropdownContent, "Add new Schedule", "addschedule.html");
    addOption(dropdownContent, "Add new Target", "addtarget.html");


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

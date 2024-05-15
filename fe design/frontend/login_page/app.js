const customSelect = document.querySelector(".form__month");
const selectBtn = document.querySelector(".form__month--button");

const selectedValue = document.querySelector(".form__month--selected-value");
const optionsList = document.querySelectorAll(".form__month--dropdown li");

// add click event to select button
selectBtn.addEventListener("click", () => {
    // add/remove active class on the container element
    customSelect.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtn.setAttribute(
        "aria-expanded",
        selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
});

optionsList.forEach((option) => {
    function handler(e) {
        // Click Events
        if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
            selectedValue.textContent = this.children[1].textContent;
            customSelect.classList.remove("active");
        }
        // Key Events
        if (e.key === "Enter") {
            selectedValue.textContent = this.textContent;
            customSelect.classList.remove("active");
        }
    }

    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
});




const customSelecttt = document.querySelector(".form__year");
const selectBtnnn = document.querySelector(".form__year--button");

const selectedValueee = document.querySelector(".form__year--selected-value");
const optionsListtt = document.querySelectorAll(".form__year--dropdown li");

// add click event to select button
selectBtnnn.addEventListener("click", () => {
    // add/remove active class on the container element
    customSelecttt.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtnnn.setAttribute(
        "aria-expanded",
        selectBtnnn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
});

let selectedYear = new Date().getFullYear(); // Default to the current year

optionsListtt.forEach((option) => {
    option.addEventListener("click", (e) => {
        e.preventDefault();
        selectedValueee.textContent = option.querySelector("label").textContent;
        selectedYear = parseInt(option.querySelector("label").textContent, 10);
        customSelecttt.classList.remove("active");
        // If February is currently selected, update the date options
        if (selectedValueMonth.textContent.trim() === "Feb") {
            updateDateOptions("Feb");
        }
    });
});




const customSelectt = document.querySelector(".form__date");
const selectBtnn = document.querySelector(".form__date--button");

const selectedValuee = document.querySelector(".form__date--selected-value");
const optionsListt = document.querySelectorAll(".form__date--dropdown li");

// add click event to select button
selectBtnn.addEventListener("click", () => {
    // add/remove active class on the container element
    customSelectt.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtnn.setAttribute(
        "aria-expanded",
        selectBtnn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
});

optionsListt.forEach((option) => {
    function handler(e) {
        // Click Events
        if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
            selectedValuee.textContent = this.children[1].textContent;
            customSelectt.classList.remove("active");
        }
        // Key Events
        if (e.key === "Enter") {
            selectedValuee.textContent = this.textContent;
            customSelectt.classList.remove("active");
        }
    }

    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
});

// JavaScript code to dynamically update date options based on selected month
const customSelectMonth = document.querySelector(".form__month");
const customSelectDate = document.querySelector(".form__date");
const optionsListMonth = customSelectMonth.querySelectorAll(".form__month--dropdown li");
const dateDropdown = customSelectDate.querySelector(".form__date--dropdown");
const selectedValueMonth = customSelectMonth.querySelector(".form__month--selected-value");

// Function to clear existing date options
function clearDateOptions() {
    while (dateDropdown.firstChild) {
        dateDropdown.removeChild(dateDropdown.firstChild);
    }
}

let currentDateSelection = 1

// Function to create new date options
function createDateOptions(numberOfDays) {
    clearDateOptions(); // First, clear existing options
    for (let day = 1; day <= numberOfDays; day++) {
        const li = document.createElement("li");
        li.setAttribute("role", "option");
        const input = document.createElement("input");
        input.type = "radio";
        input.id = "day" + day;
        input.name = "date";
        const label = document.createElement("label");
        label.htmlFor = "day" + day;
        label.textContent = day + (day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th");
        li.appendChild(input);
        li.appendChild(label);
        dateDropdown.appendChild(li);

        // Add click event listener to the newly created date option
        li.addEventListener("click", function (e) {
            e.preventDefault()
            selectedValuee.textContent = label.textContent; // Update selected date text
            customSelectDate.classList.remove("active"); // Hide the dropdown
            currentDateSelection = day
        });
    }
}

// Function to determine the number of days based on the selected month
function updateDateOptions(selectedMonth) {
    const monthDays = {
        Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30,
        Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31
    };
    // Check if the selected year is a leap year for February
    const isLeapYear = (selectedYear % 4 === 0 && selectedYear % 100 !== 0) || (selectedYear % 400 === 0);
    const daysInMonth = selectedMonth === "Feb" && isLeapYear ? 29 : monthDays[selectedMonth];

    createDateOptions(daysInMonth);

    // Adjust the selected date if it's greater than the new number of days in the selected month
    if (currentDateSelection > daysInMonth) {
        selectedValuee.textContent = `${daysInMonth}${getOrdinalIndicator(daysInMonth)}`;
        currentDateSelection = daysInMonth;
    }
}

function getOrdinalIndicator(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}
// Add click event listener to each month option
optionsListMonth.forEach(option => {
    option.addEventListener("click", function (e) {
        e.preventDefault()
        const selectedMonth = this.textContent.trim(); // Get the selected month text
        updateDateOptions(selectedMonth); // Update date options based on the selected month
    });
});




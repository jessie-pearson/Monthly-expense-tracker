const yearField = document.querySelector("#year");
const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('default', {month: "long"});

function getYearsSince(startYear, currentYear) {
    const years = [];
    for(let year = startYear; year <= currentYear; year++){
        years.push(year);
    }
    return years;
}

function createYearElements() {
    const startYear = 1980;
    const yearElements = [];
    const years = getYearsSince(startYear, currentYear);
    
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.appendChild(document.createTextNode(year));
        yearElements.unshift(option);
    });
    yearField.append(...yearElements);
}

function autoSetDateFields() {
    const monthElement = document.querySelector(`#month option[value="${currentMonth}"`);
    const yearElement = document.querySelector(`#year option[value="${currentYear}"]`);
    
    if (monthElement != null) {
        monthElement.selected = true;
    }
    if (yearElement != null) {
        yearElement.selected = true;
    }
}

createYearElements();
autoSetDateFields();

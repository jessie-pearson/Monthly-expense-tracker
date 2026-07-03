const yearField = document.querySelector("#year");

function getYearsSince(startYear, currentYear) {
    const years = [];
    for(let year = startYear; year <= currentYear; year++){
        years.push(year);
    }
    return years;
}a

function createYearElements() {
    const startYear = 1980;
    const currentYear = new Date().getFullYear();
    const yearElements = [];
    const years = getYearsSince(startYear, currentYear);
    
    years.forEach(year => {
        const option = document.createElement("option");
        option.setAttribute("value", year);
        option.appendChild(document.createTextNode(year));
        yearElements.unshift(option);
    });
    yearField.append(...yearElements);
}

createYearElements();
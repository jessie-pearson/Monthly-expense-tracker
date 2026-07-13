import * as Expense from './expense.js';
import { resizeChart } from "./expense-chart.js"

const elements = {
    monthSelect     :document.getElementById("month"),
    yearSelect      :document.getElementById("year"),
    categorySelect  :document.getElementById("category"),
    amountInput     :document.getElementById("amount"),
    addBtn          :document.getElementById("addExpense"),
    
};

const categories = [...elements.categorySelect.children].map(x => x.value);

(function load() {
    const startYear = 2010;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', {month: "long"});
    createYearElements(startYear, currentYear);
    elements.monthSelect.value = currentMonth;
    elements.yearSelect.value = currentYear;
    drawChart(categories, currentMonth, currentYear);
})()

function createYearElements(startYear, currentYear) {
    const yearElements = [];
    for(let year = startYear; year <= currentYear; year++){
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearElements.unshift(option);
    }
    try {
        elements.yearSelect.append(...yearElements);
    } catch (err) {
        console.error(err);
        return;
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const { monthSelect, yearSelect, categorySelect, amountInput } = elements;

    if (amountInput.value === "") {
        alert("Amount input cannot be empty");
        categorySelect.value = "";
        return;
    }

    let amount = Number(amountInput.value);
    if (Number.isNaN(amount)){
        alert("Amount input is invalid.");
        categorySelect.value = "";
        amountInput.value = "";
        return;
    }
    
    try {
        const err = Expense.add(categorySelect.value, monthSelect.value, yearSelect.value, amount);
        err != null ? alert(err.message) : drawChart(categories, monthSelect.value, yearSelect.value);
    } catch (err) {
        console.error(err);
    }
    categorySelect.value = "";
    amountInput.value = "";
}

elements.addBtn.addEventListener("click", handleFormSubmit);
window.addEventListener("resize", resizeChart);

import * as Expense from './expense.js';
import Chart from 'chart.js/auto';

const elements = {
    monthSelect:    document.getElementById("month"),
    yearSelect:     document.getElementById("year"),
    categorySelect: document.getElementById("category"),
    amountInput:    document.getElementById("amount"),
    addBtn:         document.getElementById("addExpense"),
    chart:          document.getElementById("expense-chart"),
};

const chart = {
    active:     null,
    categories: [...elements.categorySelect.children].map(x => x.value),
};

(function load() {
    const startYear = 2010;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', {month: "long"});
    createYearElements(startYear, currentYear);
    elements.monthSelect.value = currentMonth;
    elements.yearSelect.value = currentYear;
    drawChart(chart.categories, currentMonth, currentYear);
})()

function drawChart(categories, month, year) {
    if (chart.active) {
        chart.active.destroy();
    }
    const expenses = Expense.getMonthly(categories, month, year);
    chart.active = new Chart(elements.chart, {
        type: "pie",
        data: {
            labels: expenses.map(expense=>expense.category),
            datasets: [
                {
                    label: "Expenses",
                    data: expenses.map(expense=>expense.value)
                }
            ]
        },
    });   
}

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
        err != null ? alert(err.message) : drawChart(chart.categories, monthSelect.value, yearSelect.value);
    } catch (err) {
        console.error(err);
    }
    
    categorySelect.value = "";
    amountInput.value = "";
}

elements.addBtn.addEventListener("click", handleFormSubmit);
window.addEventListener("resize", () => chart.active.resize());

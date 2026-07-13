import Chart from 'chart.js/auto';

const ctx = document.getElementById("expense-chart"),

export function drawChart(categories, month, year) {
    const chart = Chart.getChart(elements.ctx);
    if (chart) chart.destroy();

    const expenses = Expense.getMonthly(categories, month, year);
    new Chart(elements.ctx, {
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

export function resizeChart() {
	const chart = Chart.getChart(elements.ctx);
    chart.resize();
}
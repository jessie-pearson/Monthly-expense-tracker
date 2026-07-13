import * as Expense from './expense.js';
import Chart from 'chart.js/auto';

const ctx = document.getElementById("expense-chart");

export function drawChart(categories, month, year) {
    const chart = Chart.getChart(ctx);
    if (chart) chart.destroy();
  
    const expenses = Expense.getMonthly(categories, month, year);
    new Chart(ctx, {
    	type: "pie",
        data: {
            labels: expenses.map(expense=>expense.category),
            datasets: [{
                label: "Expenses",
                data: expenses.map(expense=>expense.value)
            }]
        },
        options: {
        	plugins: {
        		colors: {
        			forceOverride: true
        		}
        	}
        }
    });   	
}

export function updateChart(category, amount) {
	const chart = Chart.getChart(ctx)
	if (!chart) {
		new Error("Chart is undefined");
	}

	const i = chart.data.labels.indexOf(category);
	if (i === -1 && amount > 0) {
		chart.data.labels.push(category);
		chart.data.datasets[0].data.push(amount);
	} else if (amount > 0) {
		chart.data.datasets[0].data[i] = amount;
	} else {
		chart.data.labels.splice(i, 1);
		chart.data.datasets[0].data.splice(i, 1);
	}

	chart.update();
	return null;
}

export function resizeChart() {
	const chart = Chart.getChart(ctx);
    chart.resize();
}
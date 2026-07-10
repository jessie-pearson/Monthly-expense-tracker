export function add(category, month, year, amount) {
    const key = `${category}-${month}-${year}`;
    
    const expense = getExpense(key) ?? {category, month, year, value: 0};

    if (expense.value + amount < 0) {
        return new Error("Expense can't be below 0");
    } 
    expense.value += amount;

    localStorage.setItem(key, JSON.stringify(expense));
    return null;
}

export function getMonthly(categories, month, year) {
    const expenses = categories.map(category => getExpense(`${category}-${month}-${year}`));
    return expenses.filter(expense => expense);
}

export function getMonthTotal(expenses) {
    return expenses.reduce((acc, expense) => acc + expense.value, 0);
}

function getExpense(key) {
    try{
        const expense = localStorage.getItem(key);
        return expense ? JSON.parse(expense) : null;
    } catch (err) {
        console.warn(err);
        localStorage.removeItem(key);
        return null;
    } 
}

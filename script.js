const monthField = document.getElementById("month");
const yearField = document.getElementById("year");
const categoryField = document.getElementById("category");
const amountField = document.getElementById("amount");
const addExpenseBtn = document.getElementById("addExpense");

const currentYear = new Date().getFullYear();
const currentMonth = new Date().toLocaleString('default', {month: "long"});

const accountStorage = {
    get(key) {
        try{
            const account = localStorage.getItem(key);
            return account ? JSON.parse(account) : null;
        } catch (err) {
            console.error(`storage read failed: ${err}`);
            this.remove(name);
            return null;
        }
    },
    save(key, account) {
        try {
            localStorage.setItem(key, JSON.stringify(account));
            return true;
        } catch (err) {
            console.error(`storage write failed ${err}`);
            return false;
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}

function getYearsSince(startYear, currentYear) {
    const years = [];
    for(let year = startYear; year <= currentYear; year++){
        years.push(year);
    }
    return years;
}

function createYearElements() {
    const startYear = 2010;
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
    monthField.value = currentMonth;
    yearField.value = currentYear;
}

function addExpense(e) {
    e.preventDefault();

    if (amountField.value.trim() === "") {
        alert("Amount input cannot be empty");
        categoryField.value = "";
        return;
    }

    const key = `${categoryField.value}-${monthField.value}-${yearField.value}`;

    let value = Number(amountField.value);
    if (Number.isNaN(value)){
        alert("Amount input is invalid.");
        categoryField.value = "";
        amountField.value = "";
        return;
    }

    let account = accountStorage.get(key);
    if (account === null) {
        account = {
             name: categoryField.value, 
             month: monthField.value, 
             year: yearField.value,
             value: value < 0 ? 0 : value,
         }; 
    } else {
        if (account.value + value < 0) {
            alert("Expense can't be below 0");
            categoryField.value = "";
            amountField.value = "";
            return;
        }
        account.value += value;
     }

     if (!accountStorage.save(key, account)){
         alert("Couldn't save expense.");
     }
     categoryField.value = "";
     amountField.value = "";
}

createYearElements();
autoSetDateFields();
addExpenseBtn.addEventListener("click", addExpense);

let price = 19.5;
let cid =[["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]

const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const disChangeHTML = document.getElementById('change-due');

const checkChange = () => {
    if (!cash.value) {
        return;
    }
    //element is less than price
    if (Number(cash.value) < price) {
        alert("Customer does not have enough money to purchase the item");
        cash.value = '';
        return;
    }

    //element is equal to price
    if (Number(cash.value) === price) {
        disChangeHTML.innerHTML = `<p>No change due - customer paid with exact cash</p>`
        cash.value = '';
        return;
    }
    let change = Number(cash.value) - price;
    let total = parseFloat(cid.map(element => element[1]).reduce((el, acc) => el + acc, 0).toFixed(2));
    let result = { status: "OPEN", changeArr: [] }
    let units = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["ONE HUNDRED", 100]
    ];

if(total === change){
    result.status = 'CLOSED';
}
    for (let i = units.length-1; i >= 0; i--) {
        let unitValue = units[i][1];
        let unitName = units[i][0];
        let availableAmount = cid[i][1];
        let unitCount = availableAmount / unitValue;
        let returnedCount = 0;

        while (change >= unitValue && unitCount > 0) {
            change = (change - unitValue).toFixed(2);
            unitCount--;
            returnedCount++;
        }

        if (returnedCount > 0) {
            result.changeArr.push([unitName, returnedCount * unitValue]);
        }
    }
    // Check if change cannot be returned exactly
    if (change > 0) {
        result.status = disChangeHTML.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>'
        return;
    }

    disChangeHTML.innerHTML = `<p>Status: ${result.status}</p>`
    result.changeArr.map(
        money => (disChangeHTML.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
    );



}

purchaseBtn.addEventListener('click',checkChange);
cash.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        checkChange();
    }
});
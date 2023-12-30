const checkboxCreate = document.querySelectorAll('.checkout__checkbox-create div');
const checkedCreate = document.querySelectorAll('.checkout__checkbox-create input');

checkboxCreate.forEach((checked,index) => {
    checked.addEventListener('click', () => {
        console.log(checkedCreate[index]);
        checkedCreate[index].checked = !checkedCreate[index].checked;
    })
});

// const checkboxPayment = document.querySelectorAll('.checkout__checkbox-payment div');
// const checkedPayment = document.querySelectorAll('.checkout__checkbox-payment input');

// checkboxPayment.forEach((checked,index) => {
//     checked.addEventListener('click', () => {
//         console.log(checkedPayment[index]);
//         checkedPayment[index].checked = !checkedPayment[index].checked;
//     })
// });
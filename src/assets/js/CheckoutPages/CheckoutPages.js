const checkboxCreate = document.querySelectorAll('.checkout__checkbox-create div');
const checkboxChecked = document.querySelectorAll('.checkout__checkbox-create input');

checkboxCreate.forEach((checked,index) => {
    checked.addEventListener('click', () => {
        checkboxChecked[index].checked = !checkboxChecked[index].checked;
    })
});


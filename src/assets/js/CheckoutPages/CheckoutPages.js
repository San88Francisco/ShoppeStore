const checkboxCreate = document.querySelectorAll('.checkout__checkbox-create div');
const checkboxChecked = document.querySelectorAll('.checkout__checkbox-create input');
console.log("checkboxChecked:", checkboxChecked)


checkboxCreate.forEach((checked,index) => {
    checked.addEventListener('click', () => {
        console.log(checkboxChecked[index]);
        checkboxChecked[index].checked = !checkboxChecked[index].checked;
    })
});


const input = document.querySelector('.input')
const dropdownMenu = document.querySelector('.dropdown')
const repoDiv = document.querySelector('.repositories')

function errorResponse() {
    const errorDiv = createElement('div')
    errorDiv.classList.add('error')
    errorDiv.textContent = 'Ошибка сервера: "Превышен лимит запросов"'
    dropdownMenu.append(errorDiv)
    setTimeout(()=>{
        errorDiv.remove()
    }, 2000)
}



const debounce = (fn, debounceTime) => {
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            fn.apply(this, args);
        }, debounceTime);
    }
};

function createElement(name) {
    return document.createElement(name)
}

function clearDropdown() {
    dropdownMenu.innerHTML = ''
}

input.addEventListener('keyup', (e) => {
    if (e.target.value) debounce(getRepo, 1000)(e.target.value)
    else clearDropdown()
})

function view(el) {
    const item = document.createElement('div')
    item.classList.add('dropdown-item')
    item.innerHTML = `<div>${el.full_name}</div>`

    item.addEventListener('click', () => {
        const addedItem = createElement('div')
        input.value = ''
        clearDropdown()

        const fullname = createElement('div')
        const name = createElement('div')
        const star = createElement('div')
        const btn = createElement('button')

        name.classList.add('name')
        star.classList.add('star')
        btn.classList.add('btn-del')

        fullname.textContent = `Full name: ${el.full_name}`
        name.textContent = `Author: ${el.owner.login}`
        star.textContent = `Stars: ${el.stargazers_count}`
        btn.textContent = `Delete`

        addedItem.append(fullname, name, star, btn)

        addedItem.classList.add('added')
        repoDiv.append(addedItem)
        clickBtnDel()
    })
    dropdownMenu.append(item)
}

function clickBtnDel() {
    const btnDel = document.querySelectorAll('.btn-del')
    btnDel.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', removeElement)
        }
    })
}

function removeElement(e) {
    const div = e.target.parentElement
    div.remove()
}
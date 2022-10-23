function errorResponse(response){
    const errorDiv = createElement('div')
        errorDiv.classList.add('error')
        errorDiv.innerHTML = `Ошибка HTTP: ${response.status}`
        dropdownMenu.append(errorDiv)
        setTimeout(()=>{
        errorDiv.remove()
        }, 2000)
}

const input = document.querySelector('.input')
const dropdownMenu = document.querySelector('.dropdown')

function enumerationElem(res){
    res.forEach((el) => {
        createDomElem(el)
    })
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

function createDomElem(el) {
    const item = document.createElement('li')
    item.classList.add('dropdown-item')
    item.innerHTML = `<button class="btn-item">${el.full_name}</button>`

    item.addEventListener('click', () => {
        const addedItem = createElement('ul') 
        input.value = ''
        clearDropdown()

        addedItem.innerHTML = `
            <li>Full name: ${el.full_name}</li>
            <li class='name'>Author: ${el.owner.login}</li>
            <li class='star'>Stars: ${el.stargazers_count}</li>
            <button class='btn-del'>Delete</button>
        `

        addedItem.classList.add('added')
        dropdownMenu.insertAdjacentElement('afterend', addedItem)
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
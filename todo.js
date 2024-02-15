const unorderedList = document.querySelector('#ulList')
const startButton = document.querySelector('#startButton')
const listInput = document.querySelector('#listInput')
const formInput = document.querySelector('#formInput')
const createButton = document.querySelector('.createButton')
const myInput = document.getElementById('myInput')
const noList = document.querySelector('.noList')

const unorderedListLength = document.querySelector('#ulList').getElementsByTagName('li')


async function acquireList() {
    const listGrab = await fetch('http://localhost:3000/list')
    const listResults = await listGrab.json()
    return listResults
}

async function postItem() {
    let todo = { "item": `${listInput.value}`};
    await fetch ("http://localhost:3000/list", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    listInput.value = ''
}

async function removeListItem(id) {
    await fetch(`http://localhost:3000/list/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getTodo()
}

async function editListItem(id) {
    let userInput = prompt("What do you want to change this to?")
    if(userInput.length > 1){
        let todo = { "item": `${userInput}`}
        console.log(todo)
        await fetch(`http://localhost:3000/list/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        getTodo()
    } else {
        alert("Type something in order to change this item")
    }
    
}

async function getTodo() {
    const listData = await acquireList()
    clearTodo()
    listData.forEach((obj) => {
        
        //create the list item
        const listItem = document.createElement('li')
        listItem.className = "listItem"
        listItem.id = obj.id
        listItem.textContent = obj.item
        unorderedList.appendChild(listItem)
        
        //create box for the buttons for flex
        const buttonBox = document.createElement('div')
        buttonBox.className = 'buttonBox'
        listItem.appendChild(buttonBox)
        
        //edit list item
        const editButton = document.createElement('button')
        editButton.className = "editButton"
        editButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.3785 8.44972L8.9636 17.8647C8.6844 18.1439 8.3288 18.3342 7.94161 18.4117L4.99988 19L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62129M18.3785 8.44972L19.7927 7.0355C20.1832 6.64498 20.1832 6.01181 19.7927 5.62129L18.3785 4.20708C17.988 3.81655 17.3548 3.81655 16.9643 4.20708L15.5501 5.62129M18.3785 8.44972L15.5501 5.62129" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `
        editButton.onclick = () => editListItem(obj.id)
        buttonBox.appendChild(editButton)

        //create buttons to remove the list item
        const removeButton = document.createElement('button')
        removeButton.className = "removeButton"
        removeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11V17" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 7H20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `
        removeButton.addEventListener('click', async () => {
                await removeListItem(obj.id)
                empty();
        })
        buttonBox.appendChild(removeButton)

    })
}

function list() {
    console.log(unorderedListLength.length)
}

function clearTodo() {
 unorderedList.innerHTML = '';
}

function empty() {
    if(unorderedListLength.length == 1){
        noList.style.display = "flex"
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    getTodo()
})

createButton.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})

startButton.addEventListener('click', async () => {
    if(listInput.value.length > 1){
        await postItem()
        await getTodo()
        
    }
    if(unorderedListLength.length >= 1){
        noList.style.display = "none"
    }
    
})

formInput.addEventListener('submit', async (event) => {
    event.preventDefault()
    if(listInput.value.length > 1){
        await postItem()
        await getTodo()
        
    }
    if(unorderedListLength.length >= 1){
        noList.style.display = "none"
    }
})

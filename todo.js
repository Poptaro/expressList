const unorderedList = document.querySelector('#ulList')
const startButton = document.querySelector('#startButton')
const listInput = document.querySelector('#listInput')
const formInput = document.querySelector('#formInput')



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
    console.log(id)
    let userInput = prompt("What do you want to change this to?")
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
}

async function getTodo() {
    const listData = await acquireList()
    clearTodo()
    listData.forEach((obj) => {
        //create the list item
        const listItem = document.createElement('li')
        listItem.className = "listItem"
        listItem.textContent = obj.item
        unorderedList.appendChild(listItem)
        
        //create buttons to remove the list item
        const removeButton = document.createElement('button')
        removeButton.className = "btn btn-danger btn-sm"
        removeButton.innerHTML = 'REMOVE'
        removeButton.onclick = () => removeListItem(obj.id)
        listItem.appendChild(removeButton)

        //edit list item
        const editButton = document.createElement('button')
        editButton.className = "btn btn-info btn-sm"
        editButton.innerHTML = 'EDIT'
        editButton.onclick = () => editListItem(obj.id)
        listItem.appendChild(editButton)


    })
}

function clearTodo() {
 unorderedList.innerHTML = '';
}



document.addEventListener('DOMContentLoaded', async () => {
    getTodo()
})

startButton.addEventListener('click', () => {
    if(listInput.value.length > 1){
        postItem()
        getTodo()
    }
    
})

formInput.addEventListener('submit', (event) => {
    event.preventDefault()
    if(listInput.value.length > 1){
        postItem()
        getTodo()
    }
})

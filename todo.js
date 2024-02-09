const unorderedList = document.querySelector('.ulList')
const startButton = document.querySelector('.startButton')


async function acquireList() {
    const listGrab = await fetch('http://localhost:3000/list')
    const listResults = await listGrab.json()
    return listResults
}

startButton.addEventListener('click', async () => {
    const listData = await acquireList()
    listData.forEach((obj) => {
        const listItem = document.createElement('li')
        listItem.textContent = obj.item
        unorderedList.appendChild(listItem)
    })
})


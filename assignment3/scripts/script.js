let tasks = []

let add_notes_button = document.querySelector("#add-notes-button")
let targetElement = document.querySelector(".add-notes-pop-up")
let closeButton = document.querySelector('#close-pop-up')
let taskForm = document.querySelector("#task-form")
let addNotesFormContainer = document.querySelector(".add-notes-form")
let searchInput = document.querySelector(".search-bar input")
let currentEditIndex = null;

add_notes_button.addEventListener('click', (event) => {
    targetElement.classList.add("active")
})

closeButton.addEventListener('click', () => {
    targetElement.classList.remove("active")
    resetForm()
})

addNotesFormContainer.addEventListener("mouseleave", () => {
    document.getElementById("formSubmitButton").click()
})

taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    try {
        if (!event.target["title"].value || !event.target["description"].value) {
            throw ("empty fields !")
        }

        const newTask = {
            title: event.target["title"].value,
            description: event.target["description"].value,
            timeStamp: `T: ${new Date().toLocaleTimeString()} D: ${new Date().toLocaleDateString()}`
        }

        if (currentEditIndex !== null) {
            tasks[currentEditIndex] = newTask
            currentEditIndex = null
        } else {
            tasks.push(newTask)
        }

        event.target["title"].value = ""
        event.target["description"].value = ""

        closeButton.click()
        displayTask()

    } catch (err) {
        console.log("Please add task data before submitting! : ", err)
    }
})

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim()
    if (query === "") {
        displayTask()
    } else {
        const regex = new RegExp(query, "i")
        const filteredTasks = tasks.filter(task => regex.test(task.title))
        displayTask(filteredTasks)
    }
})

function displayTask(filteredTasks = null) {
    const container = document.querySelector('.tasks-container')
    container.innerHTML = ""
    const tasksToShow = filteredTasks || tasks
    tasksToShow.forEach((task, index) => {
        let singleTask = document.createElement("div")
        singleTask.classList.value = "task border p-4"
        singleTask.innerHTML = `
            <h4 class="title">${task.title}</h4>
            <p class="description">${task.description}</p>
            <span class="timeStamp">${task.timeStamp}</span>
            <button onClick='deleteTask(${index})'>delete</button>
            <button onClick='editTask(${index})'>Edit</button>
        `
        container.appendChild(singleTask)
    })
}

function deleteTask(deleteIndex) {
    tasks = tasks.filter((task, index) => index !== deleteIndex)
    displayTask()
}

function editTask(editIndex) {
    targetElement.classList.add("active")
    currentEditIndex = editIndex
    const task = tasks[editIndex]
    taskForm["title"].value = task.title
    taskForm["description"].value = task.description
}

function resetForm() {
    taskForm["title"].value = ""
    taskForm["description"].value = ""
    currentEditIndex = null
}

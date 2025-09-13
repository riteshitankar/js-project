// store tasks as objects with text and checked properties
let tasks = [];

function renderTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        let taskDiv = document.createElement('div');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'taskid' + index;
        checkbox.checked = task.checked;
        // checkbox.classList = 'form-check-input'




        // if the checkbox is checked then only the css will apply
        checkbox.addEventListener('input', () => {
            task.checked = checkbox.checked;
            
        });

        let label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = task.text;
        
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);
        editBtn.classList = 'btn btn-warning ';
        
        
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeTask(index);
        removeBtn.classList = 'btn btn-danger'
        // removeBtn.classList = "i"

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(removeBtn);
        taskList.appendChild(taskDiv);
    });
}

function editTask(index) {
    let task = tasks[index];
    let taskList = document.getElementById('taskList');
    let taskDivs = taskList.children;
    let taskDiv = taskDivs[index];
    taskDiv.innerHTML = '';

    let input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;

    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList = 'btn btn-warning'
    saveBtn.onclick = () => {
        let newTask = input.value.trim();
        if (newTask) {
            task.text = newTask;
            renderTasks();
        }
    };

    taskDiv.appendChild(input);
    taskDiv.appendChild(saveBtn);
}




function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function addTaskup() {
    let taskInput = document.getElementById('taskInput');
    let text = taskInput.value.trim();
    if (text) {
        tasks.unshift({ text, checked: false });
        taskInput.value = '';
        renderTasks();
    }
}

function addTaskdown() {
    let taskInput = document.getElementById('taskInput');
    let text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, checked: false });
        taskInput.value = '';
        renderTasks();
    }
}


// Store tasks as objects with text and checked properties
let tasks = [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'taskid' + index;
        checkbox.checked = task.checked;

        // Update the checked state in tasks when checkbox changes
        checkbox.addEventListener('change', () => {
            task.checked = checkbox.checked;
        });

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = task.text;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);
        editBtn.classList = 'ed'

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeTask(index);
        removeBtn.classList = 'rem'

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(removeBtn);

        taskList.appendChild(taskDiv);
    });
}

function editTask(index) {
    const task = tasks[index];
    const taskList = document.getElementById('taskList');
    const taskDivs = taskList.children;
    const taskDiv = taskDivs[index];
    taskDiv.innerHTML = '';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => {
        const newTask = input.value.trim();
        if (newTask) {
            task.text = newTask;
            renderTasks();
        }
    };

    taskDiv.appendChild(input);
    taskDiv.appendChild(saveBtn);
}

function addTaskup() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.unshift({ text, checked: false });
        taskInput.value = '';
        renderTasks();
    }
}

function addTaskdown() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, checked: false });
        taskInput.value = '';
        renderTasks();
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

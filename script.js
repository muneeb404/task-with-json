let inputText = document.getElementById('inputText');
let taskContainer = document.getElementById('taskContainer');
let btn = document.getElementById('btn');

const addTask = () => {
    let task = inputText.value.trim();

    if (task) {
        createTaskElement(task, false);
        inputText.value = "";
        saveTasks();
    } else {
        alert('Please enter a task.');
    }
}

btn.addEventListener('click', addTask);

const createTaskElement = (task, isChecked) => {
    const listItem = document.createElement('li');
    listItem.style.listStyle = 'none'

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;

    const taskText = document.createElement('span');
    taskText.textContent = task;

    taskText.style.textDecoration = isChecked?'line-through':'none';

    checkbox.addEventListener('change', () => {
        taskText.style.textDecoration = checkbox.checked?'line-through':'none';
        saveTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        taskContainer.removeChild(listItem);
        saveTasks();
    });

    taskContainer.appendChild(listItem);
}

const saveTasks = () => {
    let tasks = [];
    taskContainer.querySelectorAll('li').forEach((item) => {
        const taskText = item.querySelector('span').textContent;
        const isChecked = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ task: taskText, isChecked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(({ task, isChecked }) => createTaskElement(task, isChecked));
}

loadData();

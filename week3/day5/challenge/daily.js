const tasks = [];

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const listTasks = document.querySelector('.listTasks');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

function addTask() {
    if (taskInput.value.trim() === '') {
        return;
    }
    
    const taskObj = {
        task_id: tasks.length,
        text: taskInput.value.trim(),
        done: false
    };
    
    tasks.push(taskObj);
    renderTask(taskObj);
    taskInput.value = '';
    taskInput.focus();
}

function renderTask(taskObj) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.setAttribute('data-task-id', taskObj.task_id);
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.addEventListener('click', function() {
        deleteTask(taskObj.task_id);
    });
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${taskObj.task_id}`;
    checkbox.checked = taskObj.done;
    checkbox.addEventListener('change', function() {
        doneTask(taskObj.task_id);
    });
    
    const label = document.createElement('label');
    label.htmlFor = `task-${taskObj.task_id}`;
    label.textContent = taskObj.text;
    
    if (taskObj.done) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#f44336';
    }
    
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);
    
    listTasks.appendChild(taskElement);
}

function doneTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.task_id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const label = taskElement.querySelector('label');
        
        if (tasks[taskIndex].done) {
            label.style.textDecoration = 'line-through';
            label.style.color = '#f44336';
        } else {
            label.style.textDecoration = 'none';
            label.style.color = 'black';
        }
    }
}

function deleteTask(taskId) {
    // Find the task in the array
    const taskIndex = tasks.findIndex(task => task.task_id === taskId);
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        listTasks.removeChild(taskElement);
    }
}
// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load Todos from localStorage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add a new task
addBtn.addEventListener('click', addTask);

// Functions
function addTask() {
    const task = todoInput.value.trim();
    if (task !== '') {
        const todoItem = createTodoItem(task);
        todoList.appendChild(todoItem);
        saveToLocalStorage(task, false);
        todoInput.value = '';
    }
}

function createTodoItem(taskText, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');
    
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);
    
    const actions = document.createElement('div');
    
    // Mark as complete/incomplete
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });
    
    // Edit task
    const editBtn = document.createElement('button');
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
    editBtn.addEventListener('click', () => editTask(li));
    
    // Delete task
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });
    
    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    
    return li;
}

function editTask(li) {
    const newTaskText = prompt('Edit task', li.firstChild.textContent);
    if (newTaskText !== null) {
        li.firstChild.textContent = newTaskText.trim();
        updateLocalStorage();
    }
}

// Save the task to localStorage
function saveToLocalStorage(taskText, isCompleted) {
    const todos = getTodosFromLocalStorage();
    todos.push({ task: taskText, completed: isCompleted });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get tasks from localStorage
function getTodosFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
}

// Update localStorage when changes occur
function updateLocalStorage() {
    const todoItems = todoList.querySelectorAll('li');
    const todos = Array.from(todoItems).map(li => ({
        task: li.firstChild.textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
    const todos = getTodosFromLocalStorage();
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo.task, todo.completed);
        todoList.appendChild(todoItem);
    });
}

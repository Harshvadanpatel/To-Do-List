const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

const addtodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert('Please enter some text');
        return;
    }

    if (addBtn.value === "Edit") {
        const oldText = editTodo.previousElementSibling.innerText;
        editTodo.previousElementSibling.innerText = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
        editLocalTodos(oldText, inputText);
        editTodo = null;
    } else {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerText = inputText;
        li.appendChild(p);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = '';

        // Save to local storage
        saveLocalTodos(inputText);
    }
}

const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        const todoItem = e.target.parentElement;
        todoList.removeChild(todoItem);
        deleteLocalTodos(todoItem);
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerText;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e.target;
    }
}

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    // Log the contents of localStorage
    console.log('Saved todos:', localStorage.getItem("todos"));
}

const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerText = todo;
        li.appendChild(p);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

const deleteLocalTodos = (todoItem) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoText = todoItem.querySelector('p').innerText;
    const todoIndex = todos.indexOf(todoText);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));

    // Log the contents of localStorage
    console.log('Updated todos:', localStorage.getItem("todos"));
}

const editLocalTodos = (oldText, newText) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todos.indexOf(oldText);
    if (todoIndex > -1) {
        todos[todoIndex] = newText;
    }
    localStorage.setItem("todos", JSON.stringify(todos));

    // Log the contents of localStorage
    console.log('Edited todos:', localStorage.getItem("todos"));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);   // Get todos from local storage
addBtn.addEventListener('click', addtodo);
todoList.addEventListener('click', updateTodo);
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const themeToggle = document.getElementById("theme-toggle");

let todos = [];

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
    todos = JSON.parse(savedTodos);
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";
    localStorage.setItem("theme", theme);
});

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = input.value.trim();
    if (text === "") return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
    };

    todos.push(todo);
    saveTodos();
    renderTodos();

    input.value = "";
});

function renderTodos() {
    list.innerHTML = "";

    todos.forEach(function (todo) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completed");
        }
        span.addEventListener("click", function () {
            console.log("KLIK", todo.id);
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos()
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}
renderTodos();

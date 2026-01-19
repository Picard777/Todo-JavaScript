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

function createTodos(title) {
    return {
        id: crypto.randomUUID(),
        title,
        completed: false,
        priority: 'medium',
        createdAt: Date.now()
    };
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = input.value.trim();
    if (title === "") return;
    const todo = createTodos(title);
    todos.push(todo);
    saveTodos();
    renderTodos();

    input.value = "";
});
function toggleTodo(id) {
    todos = todos.map(function (todo) {
        if (todo.id === id)
            return { ...todo, completed: !todo.completed };
        else return todo;
    })
    saveTodos();
    renderTodos();
};

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}
function renderTodos() {
    list.innerHTML = "";

    todos.forEach(function (todo) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todo.title;

        if (todo.completed) {
            span.classList.add("completed");
        }
        span.addEventListener("click", function () {
            toggleTodo(todo.id);
            console.log("KLIK", todo.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteTodo(todo.id);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
};
renderTodos();

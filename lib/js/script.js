const appForm = document.querySelector('form');
const appInput = document.getElementById('input');
const appListUl = document.getElementById('list');
// array
let all = getTodos();
console.log(all);
updateTodoList();
// fängt eingabe ab
appForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})


function addTodo(){
    const todoText = appInput.value.trim();
    if(todoText.length > 0){
        all.push(todoText);
        createTodoItem(todoText);
        updateTodoList();
        saveTodos(); 
        appInput.value = "";
    }
}
function updateTodoList(){
    appListUl.innerHTML = "";
    all.forEach( (todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        appListUl.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex){
    const todoID = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todos";
    todoLI.innerHTML = `
        <input type="checkbox"id="${todoID}">
        <label for="${todoID}" class="checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoID}" class="todo-text">${todo}
        </label>
        <button class="delete">
            <svg fill="var(--svg-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-200q-20 0-37.5-9T294-234L120-480l174-246q11-16 28.5-25t37.5-9h400q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H360Zm400-80v-400 400Zm-400 0h400v-400H360L218-480l142 200Zm96-40 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z"/></svg>
        </button>
    `
    return todoLI;
}

function saveTodos(){
    const todosJson = JSON.stringify(all);
    localStorage.setItem("todos", all)
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

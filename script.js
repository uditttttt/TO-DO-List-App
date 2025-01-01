const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editToDo = null;

// Function to add to do
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to do");
    return false;
  }

  if (addBtn.value === "Edit") {
    // Passing the original text to editLocalTodos function before edit it in the todoList t00find its index for manipulation
    editLocalTodos(editToDo.target.previousElementSibling.innerHTML);
    editToDo.target.previousElementSibling.innerHTML = inputText; // editToDo.target = EEdit button
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    // Dynamically Creating a list item tag
    const li = document.createElement("li");
    // Dynamically creating a p tag
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // creating edit btn
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn"); // adding multiple classes to button
    li.appendChild(editBtn);

    // Dynamically creating delete btn
    const deleteBtn = document.createElement("button");
    // Dynamically adding text to delete btn
    deleteBtn.innerText = "Remove";
    // Dynamically adding class to delete btn
    deleteBtn.classList.add("btn", "deleteBtn");
    // deleteBtn.onclick.classList.add("btn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

// Function to update :(Edit/Delete) to do
const updateToDO = (e) => {
  // console.log(e);
  // it will access the inner text of clicked element
  // console.log(e.target.innerHTML);
  // it will access the parent element of clicked element
  // console.log(e.target.parentElement);
  if (e.target.innerHTML === "Remove") {
    // it will remove the li element(parent) as clicked on remove btn(child)
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement); // passing li element
    
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus(); // Saves the user the step of clicking on the input box manually.
    addBtn.value = "Edit";
    editToDo = e;
  }
};

// Function to save local todo
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get local to do
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      // Dynamically Creating a list item tag
      const li = document.createElement("li");
      // Dynamically creating a p tag
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // creating edit btn
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      // Dynamically creating delete btn
      const deleteBtn = document.createElement("button");
      // Dynamically adding text to delete btn
      deleteBtn.innerText = "Remove";
      // Dynamically adding class to delete btn
      deleteBtn.classList.add("btn", "deleteBtn");
      // deleteBtn.onclick.classList.add("btn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

// Function to delete local to do
const deleteLocalTodos = (todo)=>{
  let todos;
  // below line is not necessary but for defensive programming it has used
  if(localStorage.getItem("todos") === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML; // it retireve the text of Ist child of li (p tag)
  let todoIndex = todos.indexOf(todoText);
  // Array functions : slice / splice 
  // splics : make changes in original array also
  todos.splice(todoIndex , 1); // remove only 1 element from array starting from todoIndex
  localStorage.setItem("todos" , JSON.stringify(todos)); 

}

// Function to edit local to do
const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos" , JSON.stringify(todos));
};

// whenever a refresh occur then this executed
document.addEventListener("DOMContentLoaded" , getLocalTodos)
todoList.addEventListener("click", updateToDO);
addBtn.addEventListener("click", addTodo);

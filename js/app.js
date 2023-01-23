const taskInput = document.getElementById("task");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const category = document.getElementById("category");   

addButton.addEventListener("click", addTask);

//funcion agregar proposito o tarea y guardarlo en localstorage
function addTask(){
    if (taskInput.value === "") {
        alert("Por favor ingrese un proposito");
        return;
      }
      if  (category.value === ""){
        alert("No ha ingresado caterogia");
        category.value = "proposito"
      }
      tasks.push({name: taskInput.value, completed: false, categoria: category.value});
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = "";
      category.value = "";
}


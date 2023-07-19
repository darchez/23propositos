/*
                           /\
                          //\\
                         //  \\
                       _//    \\_
                       //Alfonso Darchez
                      //23 propositos
                      \\
*/
const taskInput = document.getElementById("task")
const addButton = document.getElementById("add-btn")
const taskList = document.getElementById("task-list")
const category = document.getElementById("category")

//traigo los datos y creo task
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

addButton.addEventListener("click", addTask)

//funcion agregar proposito o tarea y guardarlo en localstorage ->addTaks()
function addTask(){
    if (taskInput.value === "") {
        alert("Por favor ingrese un proposito")
        return;
      }
      if  (category.value === ""){
        alert("No ha ingresado caterogia")
        category.value = "Sin categoría"
      }
      tasks.push({name: taskInput.value, completed: false, categoria: category.value})
      localStorage.setItem('tasks', JSON.stringify(tasks))
      render()
      taskInput.value = ""
      category.value = ""

}

//renderizar los datos -> render()
function render() {
    taskList.innerHTML = ''
    tasks.forEach((task, index) => {
      const taskEl = document.createElement("li")
      //muestro prop y categoria juntos
      taskEl.innerText = task.name + " (" + task.categoria +")"
      taskEl.setAttribute("data-index", index)
      if (task.completed) {
          taskEl.classList.add("completed")
      }
      //botonera
      const buttonsContainer = document.createElement("div")
      buttonsContainer.classList.add("buttons-container")
      
      //boton eliminar
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Eliminar"
      deleteButton.classList.add("delete-btn")
      deleteButton.addEventListener("click", () => {
        deleteTask(index)
      })
      buttonsContainer.appendChild(deleteButton)
      //boton editar
      const editButton = document.createElement("button")
      editButton.innerText = "Editar"
      editButton.classList.add("edit-btn")
      editButton.addEventListener("click", () => {
        editTask(index);
      });
      buttonsContainer.appendChild(editButton);
      //label sucess
      const label1 = document.createElement("label")
      label1.innerText="Sucess"
      label1.style.color="gray"
      //check completo
      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.checked = task.completed
      checkbox.addEventListener("change", function() {
        tasks[index].completed = this.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks))
        if (this.checked) {
            taskEl.classList.add("completed")
            label1.style.color="green"
        } else {
            taskEl.classList.remove("completed")
            label1.style.color="gray"
        }
      });
      
      buttonsContainer.appendChild(label1)
      buttonsContainer.appendChild(checkbox)
      taskEl.appendChild(buttonsContainer)
      taskList.appendChild(taskEl)
    });
  }

//funcion delete prop
function deleteTask(index) {
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    //renderizo
    render();
  }
  //funcion editar prop y categoria
  function editTask(index) {
    const newTask = prompt("Nuevo titulo...:", tasks[index].name)
    const newTask2 = prompt("Ingrese la nueva categoria:", tasks[index].categoria)
    if (newTask) {
      tasks[index].name = newTask
      if (!newTask2) {
        tasks[index].categoria = "Sin categoría"; //por defecto
      } else {
        tasks[index].categoria = newTask2
      }
      localStorage.setItem('tasks', JSON.stringify(tasks))
      //renderizo
      render()
    }
  }
  //renderizoooOOOOooOOooOOOoOOOoOOOo
  render();
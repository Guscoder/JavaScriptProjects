// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks); // when DOM is loaded get tasks list from storage
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask); // Uses event delegation top-down
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) { // if there is nothing in storage then create the array 'tasks'
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // make tasks equal to what is in storage
  }
  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}


// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fas fa-times"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) { // if there is nothing in storage then create the array 'tasks'
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // make tasks equal to what is in storage
  }

  tasks.push(task); // add task into tasks array

  localStorage.setItem('tasks', JSON.stringify(tasks)); // converts tasks array to sting and saves in local storage
}


// Remove Task

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();      

    // Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement); // passing in the actual li element
    }
  } 
}

// Remove from local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) { // if there is nothing in storage then create the array 'tasks'
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // make tasks equal to what is in storage
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) { // if the content matches the task
      tasks.splice(index, 1); // delete the matching task item
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks)); // resets the LS after deleting a task item
}



// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  //Faster way
  while(taskList.firstChild) { //meaning while there is still something in the list
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from LS
  clearTasksFromLocalStorage();
}


// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task) {   
    const item = task.firstChild.textContent; // stores what is being typed into input
    if(item.toLowerCase().indexOf(text) != -1){ //checks to see if there is a match to the input in the task list
      task.style.display = 'block';
    }  else {
      task.style.display = 'none';
    }
  }); // querySelector returns a nodelist which is iterable upon


}




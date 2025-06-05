let tasks = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
    { id: 3, title: 'Go for a run', completed: false }, 
]


let currentFilter = 'all';

const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const noTasksMessage = document.getElementById('noTasksMessage');

const filterAllButton = document.getElementById('filterAll');
const filterActiveButton = document.getElementById('filterActive');
const filterCompletedButton = document.getElementById('filterCompleted');




function renderTasks() {
    taskList.innerHTML = ''; 

    let filteredTasks = [];
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks; 
    }

    if (filteredTasks.length === 0) {
        noTasksMessage.classList.remove('hidden');
    } else {
        noTasksMessage.classList.add('hidden');
    }

    filteredTasks.forEach(task => {
        
        const listItem = document.createElement('li');
        listItem.id = `task-${task.id}`; 
        listItem.className = `flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out
                              ${task.completed ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-50 border-l-4 border-blue-200'}
                              task-item`; 

        
        const taskTitleDiv = document.createElement('div');
        taskTitleDiv.className = `flex-grow text-lg cursor-pointer
                                  ${task.completed ? 'line-through text-gray-500 italic' : 'text-gray-800 font-medium'}
                                  task-title`; 
        taskTitleDiv.textContent = task.title;
        taskTitleDiv.addEventListener('click', () => toggleComplete(task.id)); 

        
        const actionButtonsDiv = document.createElement('div');
        actionButtonsDiv.className = 'flex items-center space-x-3';

        
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.checked = task.completed;
        checkboxInput.className = 'form-checkbox h-6 w-6 text-green-600 rounded-full border-gray-300 focus:ring-green-500 hidden sm:block checkbox-hidden-sm-block-md';
        checkboxInput.addEventListener('change', () => toggleComplete(task.id));
        actionButtonsDiv.appendChild(checkboxInput);

        
        const toggleButton = document.createElement('button');
        toggleButton.className = `p-2 rounded-full text-white shadow-md transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95
                                  ${task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`;
        toggleButton.setAttribute('aria-label', task.completed ? 'Mark as incomplete' : 'Mark as complete');
        toggleButton.innerHTML = task.completed
            ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L9.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L10.414 10l2.293-2.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293z" clipRule="evenodd" />
               </svg>`;
        toggleButton.addEventListener('click', () => toggleComplete(task.id));
        actionButtonsDiv.appendChild(toggleButton);


        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95';
        deleteButton.setAttribute('aria-label', 'Delete task');
        deleteButton.innerHTML = `<svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                                      clipRule="evenodd"
                                    />
                                  </svg>`;
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        actionButtonsDiv.appendChild(deleteButton);

    
        listItem.appendChild(taskTitleDiv);
        listItem.appendChild(actionButtonsDiv);

        
        taskList.appendChild(listItem);
    });

    
    updateFilterButtonStyles();
}

 
function addTask() {
    const title = newTaskInput.value.trim();
    if (title === '') {
    
        newTaskInput.classList.add('border-red-500', 'ring-red-500'); 
        newTaskInput.placeholder = 'Task title cannot be empty!';
        setTimeout(() => {
            newTaskInput.classList.remove('border-red-500', 'ring-red-500');
            newTaskInput.placeholder = 'Add a new task...';
        }, 2000); 
        return;
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    const newTask = {
        id: newId,
        title: title,
        completed: false,
    };
    tasks.push(newTask);
    newTaskInput.value = ''; 
    currentFilter = 'all'; 
    renderTasks(); 
}

/**
 * 
 * @param {number} id 
 */
function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks(); 
}

/**
 * 
 * @param {number} id - 
 */
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(); 
}

/**
 
 * @param {string} filterType 
 */
function setFilter(filterType) {
    currentFilter = filterType;
    renderTasks();
}


 
 
function updateFilterButtonStyles() {
    // Remove active styles from all buttons
    filterAllButton.classList.remove('bg-blue-600', 'text-white');
    filterActiveButton.classList.remove('bg-blue-600', 'text-white');
    filterCompletedButton.classList.remove('bg-blue-600', 'text-white');

    
    if (currentFilter === 'all') {
        filterAllButton.classList.add('bg-blue-600', 'text-white');
    } else if (currentFilter === 'active') {
        filterActiveButton.classList.add('bg-blue-600', 'text-white');
    } else if (currentFilter === 'completed') {
        filterCompletedButton.classList.add('bg-blue-600', 'text-white');
    }
}



addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterAllButton.addEventListener('click', () => setFilter('all'));
filterActiveButton.addEventListener('click', () => setFilter('active'));
filterCompletedButton.addEventListener('click', () => setFilter('completed'));



document.addEventListener('DOMContentLoaded', renderTasks);

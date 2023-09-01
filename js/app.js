/*const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
'November', 'December'];

/*const todoCountEl = document.querySelector('#todoCountEl');
const uncompletedListEl = document.querySelector('#uncompletedTasks');
const completedTasksEl = document.querySelector('#completedTasks');

const addTaskButtonEl = document.querySelector('#addBtn');
const addNewTaskBtnEl = document.querySelector('#addTask');
const modalNewTaskEl = document.querySelector('#modalNewTask');
const modalBGElement = document.querySelector('.modalBG');

const modalEditTaskEl = document.querySelector('#modalEditTask');
const modalSaveTaskEl = document.querySelector('#editTask');
const downloadEl = document.querySelector('#downloadTasks');
const uploadTasksEl = document.querySelector('#uploadTasks');
const fileInputEl = document.querySelector('#fileInput');
*/

/*uploadTasksEl.addEventListener('click', () => {

    fileInputEl.click();
    fileInputEl.addEventListener('change', () => uploadTasks());
});*/
//downloadTasks.addEventListener('click', () => saveTasks());
//addNewTaskBtnEl.addEventListener('click', () => addNewTask());
//addTaskButtonEl.addEventListener('click', () => openModal("addTask"));

//modalSaveTaskEl.addEventListener('click', () => saveTask());
/*
function openModal(modalName) {

    switch(modalName) {

        case "addTask":
            addTaskButtonEl.style.display="none";
            modalBGElement.style.display="block";
            modalNewTaskEl.style.display="block";   
            break;
    
        case "editTask":
            addTaskButtonEl.style.display="none";
            modalBGElement.style.display="block";
            modalEditTaskEl.style.display="block";  
            break;
    }
}

function closeModal(modalName) {

    switch(modalName) {

        case "addTask":
            addTaskButtonEl.style.display="block";
            modalBGElement.style.display="none";
            modalNewTaskEl.style.display="none";
            break;

        case "editTask":
            addTaskButtonEl.style.display="block";
            modalBGElement.style.display="none";
            modalEditTaskEl.style.display="none";
            break;
    }
}*/

/*function addNewTask() {

    const task = { 
        taskID: tasks.length, 
        taskName: document.querySelector('#taskNameEl').value,
        taskType: document.querySelector('#taskTypeEl').value,
        taskElement: null,
        taskDeleted: false
    };
    
    tasks.push(task);
    
    closeModal("addTask");
    refreshTasks();
}*/

/*function getMonthString(monthIndex) {

    if(monthIndex < 0 || monthIndex >= months.length) 
        return 'No Mounth Found!';
    
    return months[monthIndex];
}*/

/*const currentDate = new Date();
const dateStr = `${getMonthString(currentDate.getMonth())} ${currentDate.getDate().toString()}, 
${currentDate.getFullYear()}`;

const dateEl = document.querySelector('#dateEl');
dateEl.textContent = dateStr;
*/
/*var tasks = [
    { 
        taskID: 0,
        taskName: "Make Projects For My Portfolio 01!",
        taskCompleted: true,
        taskDeleted: false,
        taskType: "Study", 
        taskElement: null
    },
    { 
        taskID: 1,
        taskName: "Make Projects For My Portfolio 02!",
        taskCompleted: false,
        taskDeleted: false,
        taskType: "Study",
        taskElement: null 
    },
    
    { 
        taskID: 2,
        taskName: "Make Projects For My Portfolio 03!",
        taskCompleted: true,
        taskDeleted: false,
        taskType: "Study",
        taskElement: null 
    }
];
*/
/*function saveTasks() {

    const headers = "taskID,taskName,taskType,taskCompleted,taskDeleted,taskElement\n";
    var body = "";

    tasks.forEach(task => {

        body += task.taskID.toString() + "," + task.taskName.toString() + "," + task.taskType.toString() + 
        "," + task.taskCompleted.toString() + "," + task.taskDeleted.toString() + ",null\n";
    });

    const csv = headers + body;
    localStorage.setItem('csvTasks', csv);
}

function exportTasks() {
    
}

function uploadTasks() {

    const csv = localStorage.getItem('csvTasks');
    console.log(csv);

}*/

/*function deleteTaskList() {

    uncompletedListEl.innerHTML = "";
    completedTasksEl.innerHTML = "";
}*/

/*function deleteTask(taskID) {

    tasks[taskID].taskElement.remove();
    tasks.slice(taskID, 1);

    console.log(tasks);
    refreshTasks();
}*/

/*function refreshTasks() {

    deleteTaskList();

    const completedTasks = tasks.filter(task => {
        return task.taskCompleted === true && !task.taskDeleted;
    });

    const inCompletedTasks = tasks.filter(task => {
        return task.taskCompleted !== true && !task.taskDeleted;
    });

    todoCountEl.textContent = `${inCompletedTasks.length.toString()} uncompleted, ${completedTasks.length.toString()} completed`;

    inCompletedTasks.forEach((task) => {
        
        if(!task.taskDeleted){

            const taskElement = document.createElement("li");
            taskElement.innerHTML = `<div class="top"><input type="checkbox" taskID="${task.taskID}"><h1>${task.taskName}</h1><i class="fa fa-pencil fa-lg"></i><i class="fa fa-ban fa-lg"></i></div><div class="bottom"><img src="img/project.png" alt="icon"><p>${task.taskType}</p></div>`;
            
            taskElement.childNodes[0].childNodes[3].addEventListener('click', () => {
    
                getTaskByID(task.taskID).taskDeleted = true;
                refreshTasks();
            });

            taskElement.childNodes[0].childNodes[2].addEventListener('click', () => {
    
                editTask(task.taskID);
            });
    
            task.taskElement = taskElement;
            task.taskCompleted = false;
            task.taskDeleted = false;
            uncompletedListEl.appendChild(task.taskElement);
        }
    });

    completedTasks.forEach((task) => {

        if(!task.taskDeleted) {
            const taskElement = document.createElement("li");
            taskElement.innerHTML = `<input type="checkbox" taskID="${task.taskID}" checked="true">${task.taskName}`;
            task.taskElement = taskElement;
            completedTasksEl.appendChild(task.taskElement);
        }
    });

    onTaskUpdate();

    const warningEl = document.createElement("p");
    warningEl.innerText = "No Tasks!";
        
    if(inCompletedTasks.length === 0) {
        uncompletedListEl.appendChild(warningEl);
    }

    if(completedTasks.length === 0) {
        
        completedTasksEl.appendChild(warningEl);
    }
}*/

 /*function editTask(taskID) {

    openModal("editTask");

    document.querySelector('#editModal_taskNameEl').setAttribute("taskID", taskID);
    document.querySelector('#editModal_taskNameEl').value = tasks[taskID].taskName;
    document.querySelector('#editModal_taskTypeEl').value = tasks[taskID].taskType;
}

function saveTask() {

    const taskID = document.querySelector('#editModal_taskNameEl').getAttribute("taskID");
    tasks[taskID].taskName = document.querySelector('#editModal_taskNameEl').value;
    tasks[taskID].taskType = document.querySelector('#editModal_taskTypeEl').value;
    closeModal("editTask");
    refreshTasks();
}

/*function getTaskByID(taskID) {

    for(let n = 0; n < tasks.length; n++) {

        if(tasks[n].taskID == taskID)
            return tasks[n];
    }
}*/

/*function onTaskUpdate() {

    const checkElements = document.querySelectorAll('input[type=checkbox]');
    
    checkElements.forEach(checkboxEl => {

        checkboxEl.removeEventListener('click', null);
        checkboxEl.addEventListener('click', e => {

            const taskID = e.target.getAttribute("taskID");
            var task = getTaskByID(taskID);
            task.taskCompleted = !task.taskCompleted;

            refreshTasks();
        });
    });
}
*/
/*function addTask() {


}*/

//refreshTasks();

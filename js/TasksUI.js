class TasksUI {

    constructor(taskManager) {

        this.taskManager = taskManager;
        this.dateElement = document.querySelector('#dateEl');
        this.tasksElement = document.querySelector('#completedTasks');
        this.unTasksElement = document.querySelector('#uncompletedTasks');
        this.tasksCountElement = document.querySelector('#tasksCountLabel');

        this.addTaskButton = document.querySelector('#addTaskButton');
        this.exportTaskButton = document.querySelector('#exportTasks');
        this.addTaskConfirmButton = document.querySelector('#addTaskConfirmButton');

        this.modalBG = document.querySelector('#modalBG');
        this.modalAddTask = document.querySelector('#modalAddTask');
        this.modalAddList = document.querySelector('#modalAddList');
        this.modalEditTask = document.querySelector('#modalEditTask');

        this.listsElement = document.querySelector('#taskList');
        this.addMenuElement = document.querySelector('#addMenu');
        this.saveTaskButton = document.querySelector('#saveTaskButton');
        this.optionsMenuButton = document.querySelector('#addMenuButton');
        this.optionsMenuElement = document.querySelector('#addMenu');
        this.addListButton = document.querySelector('#addListButton');
        this.addListConfirmButton = document.querySelector('#addListConfirmButton');

        this.setupEvents();
    }

    setupEvents() {

        this.saveTaskButton.addEventListener('click', () => this.taskManager.saveTask());
        this.addTaskConfirmButton.addEventListener('click', () => this.taskManager.addTask());
        this.addTaskButton.addEventListener('click', () => this.openModal("addTask"));
        this.exportTaskButton.addEventListener('click', () => this.taskManager.exportTasks());
        this.optionsMenuButton.addEventListener('click', () => this.toggleOptionsMenu());
        this.addListButton.addEventListener('click', () => this.openModal("addList"));
        this.addListConfirmButton.addEventListener('click', () => this.taskManager.addList());
        this.listsElement.addEventListener('change', () => this.taskManager.onListChanged());
    }

    loadTaskLists() {

        this.taskManager.taskLists.forEach(list => {

            const option = document.createElement('option');
            option.value = list.listName;
            option.innerText = list.listName;

            this.listsElement.appendChild(option);
        });
    }

    toggleOptionsMenu() {

        if(this.optionsMenuElement.style.display === 'none') {
            this.optionsMenuElement.style.display = 'block';
        }
        else {
            this.optionsMenuElement.style.display = 'none';
        }
    }

    addTask() {

        this.closeModal("addTask");
        this.updateTasksUI();
    }

    deleteTasks() {

        this.unTasksElement.innerHTML = "";
        this.tasksElement.innerHTML = "";
    }

    onTaskChanged() {

        const checkElements = document.querySelectorAll('input[type=checkbox]');
        
        checkElements.forEach(checkboxEl => {

        checkboxEl.removeEventListener('click', null);
        checkboxEl.addEventListener('click', e => {

                const taskID = e.target.getAttribute("taskID");
                this.taskManager.toggle(taskID);
            });
        });
    }

    updateTasksUI() {

        this.deleteTasks();
        this.dateElement.textContent = new DateTime().getDateString();

        this.tasksCountElement.textContent = `${this.taskManager.uncompletedTasks.length.toString()} uncompleted, 
            ${this.taskManager.completedTasks.length.toString()} completed`;

            this.taskManager.uncompletedTasks.forEach((task) => {
    
            const taskElement = document.createElement("li");
            taskElement.innerHTML = `<div class="top"><input type="checkbox" taskID="${task.taskID}">`
            + `<h1>${task.taskName}</h1><i class="fa fa-pencil fa-lg"></i><i class="fa fa-ban fa-lg">` + 
            `</i></div><div class="bottom"><img src="img/project.png" alt="icon"><p>${task.taskType}</p>` + 
            `<p>, overdues on ${task.taskOverdue}</p></div>`;
            
            taskElement.childNodes[0].childNodes[3].addEventListener('click', () => {
    
                this.taskManager.getTaskByID(task.taskID).taskDeleted = true;
                this.taskManager.updateTasks();
            });

            taskElement.childNodes[0].childNodes[2].addEventListener('click', () => {
    
                this.taskManager.editTask(task.taskID);
            });

            task.taskElement = taskElement;
            task.taskCompleted = false;
            task.taskDeleted = false;
            this.unTasksElement.appendChild(task.taskElement);
        });

        this.taskManager.completedTasks.forEach((task) => {

                const taskElement = document.createElement("li");
                taskElement.innerHTML = `<input type="checkbox" taskID="${task.taskID}" checked="true">${task.taskName}` + 
                    `, completed on ${task.taskCompleteDate}`;

                task.taskElement = taskElement;
                this.tasksElement.appendChild(task.taskElement);
        });

        const warningEl = document.createElement("p");
        warningEl.innerText = "No Tasks!";
            
        this.onTaskChanged();

        if(this.taskManager.uncompletedTasks.length === 0) {
            this.unTasksElement.appendChild(warningEl);
        }

        if(this.taskManager.completedTasks.length === 0) {
            
            this.tasksElement.appendChild(warningEl);
        }

    }   

    openModal(modalName) {

        this.toggleOptionsMenu();
        switch(modalName) {
    
            case "addTask":
                this.addTaskButton.style.display="none";
                this.modalBG.style.display="block";
                this.modalAddTask.style.display="block";   
                break;
        
            case "editTask":
                this.modalAddTask.style.display="none";
                this.modalBG.style.display="block";
                this.modalEditTask.style.display="block";  
                break;

            case "addList":
                this.modalAddList.style.display="block";
                this.modalBG.style.display="block";
                break;
        }
    }

    closeModal(modalName) {

        switch(modalName) {
    
            case "addTask":
                this.addTaskButton.style.display="block";
                this.modalBG.style.display="none";
                this.modalAddTask.style.display="none";
                break;
    
            case "editTask":
                this.addTaskButton.style.display="block";
                this.modalBG.style.display="none";
                this.modalEditTask.style.display="none";
                break;

            case "addList":
                this.modalAddList.style.display="none";
                this.modalBG.style.display="none";
                break;
        }
    }
}
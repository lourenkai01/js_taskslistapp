class TasksManager {

    constructor() {
        
        this.tasks = [];
        this.ui = new TasksUI(this);
    }

    loadTasks() {

        const tasksData = localStorage.getItem('tasksData');
        
        var tempTasks = (tasksData === null) ? [] : tasksData.split('\n');
        tempTasks.pop();
        tempTasks.shift();

        tempTasks.forEach(task => {
            
            const taskData = task.split(',');

            const taskObject = {
                taskID: taskData[0],
                taskName: taskData[1],
                taskType: taskData[2],
                taskCompleted: taskData[3] === "true",
                taskDeleted: taskData[4] === "true",
                taskElement: null 
            };

            console.log(taskData[4]);
            this.tasks.push(taskObject);
        });



    };

    saveTasks() {
        
        const headers = "taskID,taskName,taskType,taskCompleted,taskDeleted,taskElement\n";
        var body = "";

        this.tasks.forEach(task => {

            body += task.taskID.toString() + "," + task.taskName.toString() + "," + task.taskType.toString() + 
            "," + task.taskCompleted.toString() + "," + task.taskDeleted.toString() + ",null\n";
        });

        const tasksData = headers + body;
        localStorage.setItem('tasksData', tasksData);

        return tasksData;
    }

    exportTasks () {

        const tasksData = this.saveTasks();
        //Export To CSV File Format.
    }

    addTask() {

        const task = { 
            taskID: this.tasks.length, 
            taskName: document.querySelector('#taskNameEl').value,
            taskType: document.querySelector('#taskTypeEl').value,
            taskElement: null,
            taskDeleted: false
        };
        
        this.tasks.push(task);

        this.ui.addTask();
        this.updateTasks();
    }

    deleteTasks() {

        this.ui.deleteTasks();
    }

    updateTasks() {
        
        this.ui.deleteTasks();

        this.completedTasks = this.tasks.filter(task => {
            return task.taskCompleted === true && !task.taskDeleted;
        });

        this.uncompletedTasks = this.tasks.filter(task => {
            return task.taskCompleted !== true && !task.taskDeleted;
        });

        this.ui.updateTasksUI();
        this.saveTasks();
    }

    toggle(taskID) {

        var idx = this.getTaskByID(taskID).taskID;
        this.tasks[idx].taskCompleted = !this.tasks[idx].taskCompleted;

        this.updateTasks();
    }


    getTaskByID(taskID) {

        for(let n = 0; n < this.tasks.length; n++) {

            if(this.tasks[n].taskID == taskID)
                return this.tasks[n];
        }
    }

    deleteTask(taskID) {

        this.tasks[taskID].taskElement.remove();
        this.tasks.slice(taskID, 1);

        this.updateTasks();
    }

    editTask(taskID) {

        this.ui.openModal("editTask");
    
        document.querySelector('#editModal_taskNameEl').setAttribute("taskID", taskID);
        document.querySelector('#editModal_taskNameEl').value = this.tasks[taskID].taskName;
        document.querySelector('#editModal_taskTypeEl').value = this.tasks[taskID].taskType;
    }
    
    saveTask() {
    
        const taskID = document.querySelector('#editModal_taskNameEl').getAttribute("taskID");
        this.tasks[taskID].taskName = document.querySelector('#editModal_taskNameEl').value;
        this.tasks[taskID].taskType = document.querySelector('#editModal_taskTypeEl').value;
        
        this.ui.closeModal("editTask");
        this.updateTasks();
    }
}
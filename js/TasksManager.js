class TasksManager {

    constructor() {
        
        this.tasks = [];
        this.ui = new TasksUI(this);
        this.refreshRate = 1000;
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
                taskOverdue: taskData[5],
                taskCompleteDate: taskData[6],
                taskElement: null
            };

            this.tasks.push(taskObject);
        });



    };

    saveTasks() {
        
        const headers = "taskID,taskName,taskType,taskCompleted,taskDeleted,taskOverdue,taskElement\n";
        var body = "";

        this.tasks.forEach(task => {

            body += task.taskID.toString() + "," + task.taskName.toString() + "," + task.taskType.toString() + 
            "," + task.taskCompleted.toString() + "," + task.taskDeleted.toString() + "," + task.taskOverdue.toString() + "," + 
            task.taskCompleteDate.toString() + ",null\n";
        });

        const tasksData = headers + body;
        localStorage.setItem('tasksData', tasksData);

        return tasksData;
    }

    exportTasks () {

        const tasksData = this.saveTasks();
        const blob = new Blob([tasksData], { type: 'application/csv'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.download = 'tasks.csv';
        a.href = url;
        a.style.display = 'none';
        
        document.body.append(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    addTask() {

        const taskNameValue = document.querySelector('#taskNameEl').value;
        const taskTypeValue = document.querySelector('#taskTypeEl').value;
        const taskOverdueValue = document.querySelector('#taskOverdueEl').value.toString().replace('T', ' ');
    

        if(taskNameValue == "" || taskNameValue === undefined || taskTypeValue == "" || taskTypeValue == undefined) {
            
            this.ui.closeModal("addTask");
            return;
        }

        if(taskOverdueValue == null || taskOverdueValue == "")
            taskOverdueValue = "null";

        
        const task = { 
            taskID: this.tasks.length, 
            taskName: taskNameValue,
            taskType: taskTypeValue,
            taskCompleted: false,
            taskDeleted: false,
            taskOverdue: taskOverdueValue,
            taskCompleteDate: 'null',
            taskElement: null
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

        if(this.tasks[idx].taskCompleted) {

            const completedDate = new Date();

            const currentMonth = completedDate.getMonth().toString().length === 1 ? "0" + completedDate.getMonth().toString() 
            : completedDate.getMonth().toString();

            const currentDay = completedDate.getDate().toString().length === 1 ? "0" + completedDate.getDate().toString()
            : completedDate.getDate().toString();

            const currentHours = completedDate.getHours().toString().length === 1 ? "0" + completedDate.getHours().toString()
            : completedDate.getHours().toString();

            const currentMinutes = completedDate.getMinutes().toString().length === 1 ? "0" + completedDate.getMinutes().toString()
            : completedDate.getMinutes().toString();

            this.tasks[idx].taskCompleteDate = currentMonth + "-" + currentDay + "-" + completedDate.getFullYear().toString() + " " + 
            currentHours + ":" + currentMinutes;
        }
        else if (!this.tasks[idx].taskCompleted) {

            this.tasks[idx].taskCompleteDate = 'null';
        }

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
        document.querySelector('#editModal_taskOverdueEl').value = this.tasks[taskID].taskOverdue;
    }
    
    saveTask() {
    
        const taskID = document.querySelector('#editModal_taskNameEl').getAttribute("taskID");
        this.tasks[taskID].taskName = document.querySelector('#editModal_taskNameEl').value;
        this.tasks[taskID].taskType = document.querySelector('#editModal_taskTypeEl').value;
        this.tasks[taskID].taskOverdue = document.querySelector('#editModal_taskOverdueEl').value.toString().replace('T', ' ');

        this.ui.closeModal("editTask");
        this.updateTasks();
    }
}
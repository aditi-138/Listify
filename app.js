document.addEventListener("DOMContentLoaded", () => {
    const storedTask = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTask.length) {
        task = storedTask;
        updateTasksList();
        updateStats();
    }
});

let task = [];
const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(task));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        task.push({ text, completed: false });
        taskInput.value = '';
    }
    updateTasksList();
    updateStats();
    saveTask();
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTasksList();
    updateStats();
    saveTask();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTask();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task[index].text;
    deleteTask(index);
};

const updateStats = () => {
    const completeTask = task.filter(task => task.completed).length;
    const totalTask = task.length;
    const progress = totalTask ? (completeTask / totalTask) * 100 : 0;
    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completeTask} / ${totalTask}`;
    if (completeTask === totalTask && totalTask > 0) {
        blastConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    task.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit_icon.png" onclick="editTask(${index})" alt="Edit Task" />
                    <img src="./img/delete_icon.png" onclick="deleteTask(${index})" alt="Delete Task" />
                </div>
            </div>`;
        taskList.appendChild(listItem);
    });
};

document.getElementById('newtask').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

const blastConfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
        });
        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
        });
    };

    shoot();
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
};

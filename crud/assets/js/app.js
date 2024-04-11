import { getAllUsers, createTask, deleteTask, fetchTask, updateTask } from './petitions.js';

document.addEventListener('DOMContentLoaded', async () => {
    const listUsers = document.getElementById('users');
    const listTasks = document.getElementById('tasks');
    const formTask = document.getElementById('form-task');
    const submitButton = document.getElementById('submitBtn');
    const formTitle = document.getElementById('form-title');
    const completedCheckbox = document.getElementById('completed');

    let clickedBtnId;
    let isInsertion = true;

    const refreshTasks = async (userId) => {
        const tasksResponse = await fetch(`api/getTasks.php?userId=${userId}`);
        const tasks = await tasksResponse.json();

        let taskTemplate = '';
        tasks.forEach(task => {
            taskTemplate += `
                <tr>
                    <td>${task.iduser}</td>
                    <td>${task.name}</td>
                    <td>${task.idtask}</td>
                    <td>${task.title}</td> 
                    <td></td>
                    <td>
                        <button class="task-update btn btn-secondary btn-sm" value="${task.idtask}">
                            <span>Update</span> <i class="nf nf-md-pencil"></i>
                        </button>
                        <button class="task-delete btn btn-danger btn-sm" value="${task.idtask}">
                            <span>Delete</span> <i class="nf nf-cod-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        listTasks.innerHTML = taskTemplate;
    };

    listUsers.addEventListener('change', async function() {
        const userId = this.value;
        await refreshTasks(userId);
    });

    listTasks.addEventListener('click', async (event) => {
        if (event.target.classList.contains('task-delete')) {
            const taskId = event.target.value;
            await deleteTask(taskId);

            // Reload tasks list after deleting a task
            const userId = listUsers.value;
            await refreshTasks(userId);
        }
    });

    formTask.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(formTask);
        await createTask(formData);

        // Reload tasks list after creating a new task
        const userId = listUsers.value;
        await refreshTasks(userId);
    });

    const users = await getAllUsers();
    let template = '';
    for (const user of users) {
        template += `<option value="${user.id}">${user.fullname}</option>`;
    }
    listUsers.innerHTML = template;
    const initialUserId = listUsers.value;
    await refreshTasks(initialUserId);

    listTasks.addEventListener('click', async (e) => {
        if (e.target.classList.contains('task-update')) {
            e.preventDefault();
            const button = e.target;
            const taskId = button.value;
            const taskInfo = await fetchTask(taskId);
            let checkedBox;
            clickedBtnId = taskId;
            taskInfo.completed === true ? checkedBox = 'true' : checkedBox = '';
            formTask.children[0].children[0].value = `${taskInfo.title}`;
            formTitle.innerText = "Modify Task";
            completedCheckbox.checked = taskInfo.completed;
            submitButton.innerText = "UPDATE";
            isInsertion = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    formTask.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(formTask);
        const completedValue = completedCheckbox.checked ? 1 : 0;
        formData.append('completed', completedValue);

        if (!isInsertion) {
            try {
                const response = await updateTask(formData, clickedBtnId)
                if (response.success) {
                    // Update the task in the UI
                    const updatedTaskInfo = await fetchTask(clickedBtnId);
                    const updatedRow = document.querySelector(`#tasks tr[data-task-id="${clickedBtnId}"]`);
                    if (updatedRow) {
                        updatedRow.innerHTML = `
                            <td>${updatedTaskInfo.iduser}</td>
                            <td>${updatedTaskInfo.name}</td>
                            <td>${updatedTaskInfo.idtask}</td>
                            <td>${updatedTaskInfo.title}</td> 
                            <td></td>
                            <td>
                                <button class="task-update btn btn-secondary btn-sm" value="${updatedTaskInfo.idtask}">
                                    <span>Update</span> <i class="nf nf-md-pencil"></i>
                                </button>
                                <button class="task-delete btn btn-danger btn-sm" value="${updatedTaskInfo.idtask}">
                                    <span>Delete</span> <i class="nf nf-cod-trash"></i>
                                </button>
                            </td>
                        `;
                    }
                    formTitle.innerText = "Insert Task";
                    submitButton.innerText = "SAVE";
                    isInsertion = true;
                    formTask.reset();
                } else {
                    console.error("Response unsuccessful, failed to update task")
                }
            } catch (error) {
                console.error('Error in UPDATING:', error);
            }
        };
    });
});

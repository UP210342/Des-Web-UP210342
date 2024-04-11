import { getAllUsers, createTask, deleteTask } from './petitions.js';

document.addEventListener('DOMContentLoaded', async () => {
    const listUsers = document.getElementById('users');
    const listTasks = document.getElementById('tasks');
    const formTask = document.getElementById('form-task');

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

            // Recargar la lista de tareas después de eliminar una tarea
            const userId = listUsers.value;
            await refreshTasks(userId);
        }
    });

    formTask.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(formTask);
        await createTask(formData);

        // Recargar la lista de tareas después de crear una nueva tarea
        const userId = listUsers.value;
        await refreshTasks(userId);
    });

    // Cargar usuarios y tareas al iniciar la página
    const users = await getAllUsers();
    let template = '';
    for (const user of users) {
        template += `<option value="${user.id}">${user.fullname}</option>`;
    }
    listUsers.innerHTML = template;
    const initialUserId = listUsers.value;
    await refreshTasks(initialUserId);
});

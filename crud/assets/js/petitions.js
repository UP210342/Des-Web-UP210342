export async function getAllUsers(){
    const resp = await fetch("api/getUsers.php");
    const json = await resp.json(); 

    console.log(json);
    
    return json;
}

export async function fetchTasksByUser(idUser) {
  const response = await fetch(`./api/getTasks.php?id=${idUser}`);
  const json = await response.json();
  return json;
  };

  export async function fetchTask(taskId){
    const response = await fetch(`./api/getTask.php?id=${taskId}`);
    const json = await response.json();
    return json;
  };

export async function getAllTasks(){
    const resp = await fetch("api/getTasks.php");
    const json = await resp.json(); 
    console.log(json);

    return json;
}

export async function createTask(formData) {
    await fetch('api/createTask.php', {
        method: 'POST',
        body: formData
    });

}

export async function deleteTask(taskId) {
    const formData = new FormData();
    formData.append('taskId', taskId);

    try {
        const response = await fetch('api/deleteTask.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la tarea.');
        }

        // Puedes agregar código adicional aquí después de que la tarea se haya eliminado correctamente
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
    }
}


export async function updateTask(formData,id) {
//console.log(formData,id);
await fetch(`api/updateTask.php?id=${id}`, {
     method: 'POST',
    body: formData
});
}


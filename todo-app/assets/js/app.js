// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');
let userData = [];
let tasksData = [];
let id;

const getAllUsers = async () => {
  try {
    const res = await fetch('/todo-app/data/usuarios.json');
    const data = await res.json();
    userData = data;

    userSelect.innerHTML = '';

    data.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = `${user.firstname} ${user.lastname}`;
      userSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTasks = async () => {
  try {
    const res = await fetch('/todo-app/data/tareas.json');
    const data = await res.json();
    tasksData = data;
  } catch (error) {
    console.log(error);
  }
};

const getUserId = () => {
  const selectedId = parseInt(userSelect.value);
  id = selectedId;
};

const showUserInfo = (id) => {
  const selectedUser = userData.find(user => user.id === id);

  if (selectedUser) {
    const userInfoContainer = document.getElementById('user-container');
    userInfoContainer.innerHTML = `
      <h3>${selectedUser.firstname} ${selectedUser.lastname}</h3>
      <p>Email: ${selectedUser.email}</p>
    `;
  } else {
    userContainer.innerHTML = '<h3>Usuario no encontrado</h3>';
  }
};

const showUserTasks = (id) => {
  const userTasks = tasksData.filter(task => task.userId === id);

  if (userTasks.length > 0) {
    const ul = document.createElement('ul');
    userTasks.forEach(task => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      li.textContent = task.title;
      li.prepend(checkbox);
      ul.appendChild(li);
    });
    taskContainer.innerHTML = '';
    taskContainer.appendChild(ul);
  } else {
    taskContainer.innerHTML = '<h3>Aún no tiene tareas</h3>';
  }
};

userSelect.addEventListener('change', () => {
  getUserId();
  showUserInfo(id);
  showUserTasks(id);
});

window.addEventListener('load', () => {
  Promise.all([getAllUsers(), getAllTasks()])
    .then(() => {
      showUserInfo(1);
      showUserTasks(1);
    })
    .catch(error => console.error(error));
});

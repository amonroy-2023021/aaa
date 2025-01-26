document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const toggleMenuButton = document.getElementById('toggleMenu');
    const menu = document.getElementById('menu');

    // Array para almacenar las tareas
    let tasks = [];

    // Función para renderizar la lista de tareas
    const renderTasks = () => {
        // Limpiar la lista antes de volver a renderizar
        taskList.innerHTML = '';

        // Mensaje si no hay tareas
        if (tasks.length === 0) {
            taskList.innerHTML = '<li>No hay tareas pendientes.</li>';
            return;
        }

        // Ordenar tareas según prioridad
        const sortedTasks = tasks.sort((a, b) => {
            const priorityOrder = { alta: 1, media: 2, baja: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        // Renderizar cada tarea
        sortedTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span>${task.text} <strong>${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</strong></span>
                <div>
                    <button class="edit-btn" data-id="${task.id}">Editar</button>
                    <button class="delete-btn" data-id="${task.id}">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Función para agregar una tarea
    const addTask = () => {
        const taskText = taskInput.value.trim(); // Obtener el texto de la tarea
        const taskPriority = priorityInput.value; // Obtener la prioridad

        if (taskText) {
            const newTask = {
                id: Date.now().toString(), // ID único basado en el tiempo
                text: taskText, // Texto de la tarea
                priority: taskPriority // Prioridad
            };
            tasks.push(newTask); // Agregar tarea al array
            taskInput.value = ''; // Limpiar el input
            renderTasks(); // Actualizar la lista de tareas
        }
    };

    // Función para eliminar una tarea
    const deleteTask = (taskId) => {
        tasks = tasks.filter(task => task.id !== taskId); // Filtrar la tarea por ID
        renderTasks(); // Actualizar la lista
    };

    // Función para editar una tarea
    const editTask = (taskId) => {
        const task = tasks.find(t => t.id === taskId); // Buscar la tarea por ID
        if (task) {
            taskInput.value = task.text; // Rellenar el input con el texto de la tarea
            priorityInput.value = task.priority; // Rellenar el input de prioridad
            deleteTask(taskId); // Eliminar la tarea editada
        }
    };

    // Event delegation para manejar los botones de editar y eliminar
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const taskId = event.target.getAttribute('data-id');
            editTask(taskId); // Llamar a la función de edición
        } else if (event.target.classList.contains('delete-btn')) {
            const taskId = event.target.getAttribute('data-id');
            deleteTask(taskId); // Llamar a la función de eliminación
        }
    });

    // Agregar evento al botón de agregar tarea
    addTaskButton.addEventListener('click', addTask);
    
    // Función para mostrar/ocultar el menú
    toggleMenuButton.addEventListener('click', () => {
        if (menu.style.display === 'none') {
            menu.style.display = 'block';
            toggleMenuButton.textContent = 'Ocultar Menú';
        } else {
            menu.style.display = 'none';
            toggleMenuButton.textContent = 'Mostrar Menú';
        }
    });
});
// Sélection des éléments HTML
const taskInput = document.getElementById('taskInput');
const taskCostInput = document.getElementById('taskCostInput');
const taskLinkInput = document.getElementById('taskLinkInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalCostElement = document.getElementById('totalCost');

// Variable pour le total
let totalCost = 0;

// Ajouter une tâche
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
taskCostInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
taskLinkInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();
    const taskCost = parseFloat(taskCostInput.value.trim());
    const taskLink = taskLinkInput.value.trim();

    if (taskText === '' || isNaN(taskCost) || taskCost < 0) {
        alert('Veuillez entrer une tâche et un coût valide.');
        return;
    }

    createTaskElement(taskText, taskCost, taskLink);

    totalCost += taskCost;
    updateTotal();

    taskInput.value = '';
    taskCostInput.value = '';
    taskLinkInput.value = '';
}

// Fonction pour créer un élément de tâche
function createTaskElement(taskText, taskCost, taskLink) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const costElement = document.createElement('span');
    costElement.className = 'task-cost';
    costElement.textContent = `+${taskCost.toFixed(2)} €`;

    if (taskLink) {
        const linkElement = document.createElement('a');
        linkElement.href = taskLink;
        linkElement.target = '_blank';
        linkElement.textContent = 'Voir';
        taskItem.appendChild(linkElement);
    }

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = 'Éditer';
    editBtn.addEventListener('click', () => editTask(taskItem, taskText, taskCost, taskLink));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', () => deleteTask(taskItem, taskCost));

    taskItem.appendChild(taskContent);
    taskItem.appendChild(costElement);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
}

// Fonction pour éditer une tâche
function editTask(taskItem, oldText, oldCost, oldLink) {
    // Retirer l'ancien coût du total
    totalCost -= oldCost;

    // Récupérer les nouvelles informations
    const newText = prompt('Modifier le nom de la tâche:', oldText) || oldText;
    const newCost = parseFloat(prompt('Modifier le coût (€):', oldCost)) || oldCost;
    const newLink = prompt('Modifier le lien (laisser vide pour aucun):', oldLink) || oldLink;

    // Mettre à jour les valeurs
    taskItem.querySelector('span').textContent = newText;
    taskItem.querySelector('.task-cost').textContent = `+${newCost.toFixed(2)} €`;

    if (newLink) {
        let linkElement = taskItem.querySelector('a');
        if (!linkElement) {
            linkElement = document.createElement('a');
            linkElement.textContent = 'Voir';
            linkElement.target = '_blank';
            taskItem.appendChild(linkElement);
        }
        linkElement.href = newLink;
    } else {
        const linkElement = taskItem.querySelector('a');
        if (linkElement) {
            taskItem.removeChild(linkElement);
        }
    }

    // Ajouter le nouveau coût au total
    totalCost += newCost;
    updateTotal();
}

// Fonction pour supprimer une tâche
function deleteTask(taskItem, taskCost) {
    taskItem.classList.add('fadeOut');
    setTimeout(() => {
        taskList.removeChild(taskItem);
        totalCost -= taskCost;
        updateTotal();
    }, 300);
}

// Mettre à jour le total
function updateTotal() {
    totalCostElement.textContent = totalCost.toFixed(2);
}

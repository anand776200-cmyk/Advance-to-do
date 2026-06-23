
let count = 1;
document.getElementById('add-task').addEventListener('click', () => {
    const container = document.getElementById('task-container');

    const div = document.createElement('div');
    div.classList.add('task-group');

    div.innerHTML = `
    <input type="text" name="tasks[${count}][title]" placeholder="Task title">
        <input type="text" name="tasks[${count}][description]" placeholder="Task description">`;

    container.appendChild(div);
    count++;
});


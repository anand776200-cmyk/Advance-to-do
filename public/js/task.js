function openEditModal(btn) {
    // btn === the clicked button

    document.getElementById("taskId").value = btn.dataset.taskid;
    document.getElementById("title").value = btn.dataset.title;
    document.getElementById("date").value = btn.dataset.date;
    document.getElementById("des").value = btn.dataset.des;

    new bootstrap.Modal(
        document.getElementById("addTaskModal")
    ).show();
}
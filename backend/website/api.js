export async function getTasks(filter) {
    const tasksJson = await fetch(`http://localhost:3000/api/tasks?filter=${filter}`);
    return await tasksJson.json();
}

export async function removeTask(id) {
    const res = await fetch(`http://localhost:3000/api/task/${id}`, {method: "DELETE"});
    return await res.json();
}

export async function addTask(task) {
    const res = await fetch("http://localhost:3000/api/task/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    return await res.json();
}

export async function updateTask(id, newTask) {
    const res = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });
    return await res.json();
}

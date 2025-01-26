const api_url = 'http://localhost:3000/api/v1/tasks'

// Function to display all tasks
const displayTasks = async () => {
  try {
    const response = await fetch(api_url)
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    const { task: tasks } = await response.json()
    const taskContainer = document.getElementById('tasks')
    taskContainer.innerHTML = '' // Clear previous tasks

    tasks.forEach((task) => {
      const taskDiv = document.createElement('div')
      taskDiv.className = 'task-item'
      taskDiv.id = task._id

      const taskName = document.createElement('p')
      taskName.textContent = task.name

      const editButton = document.createElement('button')
      editButton.textContent = 'Edit'
      editButton.className = 'edit-button'
      editButton.onclick = () => {
        window.location.href = `./edit.html?id=${task._id}` // Redirect to edit page with ID
      }

      const deleteButton = document.createElement('button')
      deleteButton.className = 'delete-button'
      deleteButton.textContent = 'Delete'
      deleteButton.onclick = () => deleteTask(task._id)

      taskDiv.appendChild(taskName)
      taskDiv.appendChild(editButton)
      taskDiv.appendChild(deleteButton)
      taskContainer.appendChild(taskDiv)
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

// Function to handle form submission
const HandleSubmit = async () => {
  const inputBox = document.getElementById('input-box')
  const taskName = inputBox.value.trim()

  if (taskName === '') {
    alert('Task cannot be empty!')
    return
  }

  try {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: taskName }),
    })

    if (!response.ok) {
      throw new Error('Failed to add task')
    }

    inputBox.value = '' // Clear input field
    displayTasks() // Refresh task list
  } catch (error) {
    console.error('Error adding task:', error)
  }
}

const deleteTask = async (id) => {
  try {
    const response = await fetch(`${api_url}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete task')
    }

    // Remove the task element from the DOM immediately after deletion
    const taskElement = document.getElementById(id)
    if (taskElement) {
      taskElement.remove()
    }
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

// Fetch and display tasks on page load
displayTasks()

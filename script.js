const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const formMessage = document.getElementById('formMessage');

function updateProgress() {
  const tasks = [...taskList.querySelectorAll('.task-item')];
  const completed = tasks.filter(task => task.classList.contains('completed')).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const remaining = total - completed;

  document.getElementById('totalCount').textContent = total;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('progressPercent').textContent = percent + '%';
  document.getElementById('circlePercent').textContent = percent + '%';
  document.getElementById('remainingLabel').textContent = `${remaining} remaining`;
  document.getElementById('progressCircle').style.background =
    `conic-gradient(#7057d9 ${percent}%, #efedf8 ${percent}%)`;
  document.getElementById('progressCaption').textContent =
    total === 0 ? 'Add a task to begin your study journey.' :
    percent === 100 ? 'Amazing! You completed every task. Take a well-earned break!' :
    percent >= 50 ? 'Great progress! Keep going until your list is complete.' :
    'You are off to a great start. Keep going!';
  document.getElementById('emptyMessage').hidden = total !== 0;
}

function attachToggle(button) {
  button.addEventListener('click', () => {
    const task = button.closest('.task-item');
    task.classList.toggle('completed');
    const name = task.querySelector('.task-name').textContent;
    button.textContent = task.classList.contains('completed') ? '✓' : '';
    button.setAttribute('aria-label',
      `Mark ${name} ${task.classList.contains('completed') ? 'incomplete' : 'complete'}`);
    updateProgress();
  });
}

document.querySelectorAll('.check-btn').forEach(attachToggle);

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = taskInput.value.trim();

  if (!name) {
    formMessage.textContent = 'Please enter a task name.';
    taskInput.focus();
    return;
  }

  const item = document.createElement('li');
  item.className = 'task-item';
  item.innerHTML = `
    <button class="check-btn" aria-label="Mark task complete"></button>
    <span class="task-name"></span>
    <span class="task-tag">New task</span>`;
  item.querySelector('.task-name').textContent = name;
  attachToggle(item.querySelector('.check-btn'));
  taskList.appendChild(item);

  taskInput.value = '';
  formMessage.textContent = 'Task added successfully!';
  updateProgress();
  taskInput.focus();
});

updateProgress();

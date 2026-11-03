// Smart Academic Planner Module for AcadAI (Global Scope)
// Feature 4: Academic Task Management, Exam Countdowns, Deadlines, and Priority Scheduling.

class AcademicPlanner {
  constructor() {
    this.container = document.getElementById('planner-tasks-list');
    this.addTaskBtn = document.getElementById('add-task-btn');
    this.filterContainer = document.getElementById('planner-filter-pills');
    this.activeFilter = 'all';

    // Default sample tasks for realistic engineering context
    this.defaultTasks = [
      {
        id: "task_1",
        title: "DBMS Assignment 3: B+ Tree Indexing & SQL Joins",
        course: "CS-302",
        type: "Assignment",
        dueDate: this.getRelativeDate(3),
        priority: "high",
        completed: false
      },
      {
        id: "task_2",
        title: "Data Structures Lab Record 4 (Graph Traversal BFS/DFS)",
        course: "CS-201",
        type: "Lab Report",
        dueDate: this.getRelativeDate(5),
        priority: "high",
        completed: false
      },
      {
        id: "task_3",
        title: "Web App Dev: Frontend Architecture Demo Prototype",
        course: "IT-202",
        type: "Project",
        dueDate: this.getRelativeDate(8),
        priority: "medium",
        completed: false
      },
      {
        id: "task_4",
        title: "Discrete Math Quiz 2: Recurrence Relations",
        course: "MA-202",
        type: "Quiz",
        dueDate: this.getRelativeDate(12),
        priority: "medium",
        completed: false
      },
      {
        id: "task_5",
        title: "Computer Networks: Wireshark Packet Analysis Notes",
        course: "CS-303",
        type: "Assignment",
        dueDate: this.getRelativeDate(14),
        priority: "low",
        completed: true
      }
    ];

    this.tasks = [];
    this.loadData();
    this.init();
  }

  getRelativeDate(daysFromNow) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split('T')[0];
  }

  loadData() {
    const saved = localStorage.getItem('acadai_academic_tasks');
    if (saved) {
      try {
        this.tasks = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse tasks:", e);
        this.tasks = JSON.parse(JSON.stringify(this.defaultTasks));
      }
    } else {
      this.tasks = JSON.parse(JSON.stringify(this.defaultTasks));
    }
  }

  saveData() {
    localStorage.setItem('acadai_academic_tasks', JSON.stringify(this.tasks));
  }

  init() {
    if (this.addTaskBtn) {
      this.addTaskBtn.addEventListener('click', () => this.openTaskModal());
    }

    if (this.filterContainer) {
      const pillBtns = this.filterContainer.querySelectorAll('.filter-pill-btn');
      pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          pillBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeFilter = btn.getAttribute('data-filter') || 'all';
          this.render();
        });
      });
    }

    this.render();
    this.renderCountdowns();
  }

  getStats() {
    const pending = this.tasks.filter(t => !t.completed);
    const completed = this.tasks.filter(t => t.completed);
    const highPriority = pending.filter(t => t.priority === 'high');
    return {
      total: this.tasks.length,
      pendingCount: pending.length,
      completedCount: completed.length,
      highPriorityCount: highPriority.length
    };
  }

  getUpcomingDeadlines(limit = 4) {
    return this.tasks
      .filter(t => !t.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, limit);
  }

  toggleTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    this.saveData();
    this.render();

    if (window.App) {
      if (window.App.renderDashboard) window.App.renderDashboard();
      if (window.App.showToast) {
        window.App.showToast(
          task.completed ? `Task marked completed: "${task.title}"` : `Task restored to pending: "${task.title}"`,
          task.completed ? 'success' : 'info'
        );
      }
    }
  }

  deleteTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (confirm(`Delete task "${task.title}"?`)) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.saveData();
      this.render();
      if (window.App) {
        if (window.App.renderDashboard) window.App.renderDashboard();
        if (window.App.showToast) window.App.showToast("Task deleted", 'info');
      }
    }
  }

  openTaskModal(editTaskId = null) {
    let modal = document.getElementById('planner-task-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'planner-task-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card">
          <button class="btn btn-icon-only close-modal" id="close-planner-modal"><i class="fas fa-times"></i></button>
          <div class="modal-course-title-block">
            <h2 id="planner-modal-title"><i class="fas fa-calendar-plus text-indigo"></i> Add Academic Task</h2>
            <p class="modal-text">Schedule assignments, lab evaluations, semester projects, and exam goals.</p>
          </div>
          <form id="planner-task-form" class="modal-form" style="display:flex; flex-direction:column; gap:16px;">
            <input type="hidden" id="modal-task-id" value="">
            <div class="form-group">
              <label for="modal-task-title">Task Title / Description</label>
              <input type="text" id="modal-task-title" required placeholder="e.g. Chapter 4 Practice Problems & Submission">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="modal-task-course">Course Code / Subject</label>
                <input type="text" id="modal-task-course" required placeholder="CS-302">
              </div>
              <div class="form-group">
                <label for="modal-task-type">Task Category</label>
                <select id="modal-task-type">
                  <option value="Assignment">Assignment</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Quiz">Quiz / Midterm</option>
                  <option value="Project">Project / Viva</option>
                  <option value="Seminar">Seminar / Presentation</option>
                  <option value="General">Study / Revision</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="modal-task-duedate">Due Date</label>
                <input type="date" id="modal-task-duedate" required>
              </div>
              <div class="form-group">
                <label for="modal-task-priority">Priority Level</label>
                <select id="modal-task-priority">
                  <option value="high">High (Urgent)</option>
                  <option value="medium" selected>Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
              <button type="button" class="btn btn-secondary" id="cancel-planner-modal">Cancel</button>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Task</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-planner-modal').addEventListener('click', () => modal.classList.remove('active'));
      modal.querySelector('#cancel-planner-modal').addEventListener('click', () => modal.classList.remove('active'));

      modal.querySelector('#planner-task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const taskId = document.getElementById('modal-task-id').value;
        const title = document.getElementById('modal-task-title').value.trim();
        const course = document.getElementById('modal-task-course').value.trim().toUpperCase();
        const type = document.getElementById('modal-task-type').value;
        const dueDate = document.getElementById('modal-task-duedate').value;
        const priority = document.getElementById('modal-task-priority').value;

        if (taskId) {
          const task = this.tasks.find(t => t.id === taskId);
          if (task) {
            task.title = title;
            task.course = course;
            task.type = type;
            task.dueDate = dueDate;
            task.priority = priority;
            if (window.App && window.App.showToast) window.App.showToast("Task updated!", 'success');
          }
        } else {
          this.tasks.push({
            id: "task_" + Date.now(),
            title,
            course,
            type,
            dueDate,
            priority,
            completed: false
          });
          if (window.App && window.App.showToast) window.App.showToast("New academic task scheduled!", 'success');
        }

        this.saveData();
        this.render();
        if (window.App && window.App.renderDashboard) window.App.renderDashboard();
        modal.classList.remove('active');
      });
    }

    if (editTaskId) {
      const task = this.tasks.find(t => t.id === editTaskId);
      if (task) {
        document.getElementById('planner-modal-title').innerHTML = '<i class="fas fa-edit text-indigo"></i> Edit Task';
        document.getElementById('modal-task-id').value = task.id;
        document.getElementById('modal-task-title').value = task.title;
        document.getElementById('modal-task-course').value = task.course;
        document.getElementById('modal-task-type').value = task.type;
        document.getElementById('modal-task-duedate').value = task.dueDate;
        document.getElementById('modal-task-priority').value = task.priority;
      }
    } else {
      document.getElementById('planner-modal-title').innerHTML = '<i class="fas fa-calendar-plus text-indigo"></i> Add Academic Task';
      document.getElementById('modal-task-id').value = '';
      document.getElementById('modal-task-title').value = '';
      document.getElementById('modal-task-course').value = '';
      document.getElementById('modal-task-type').value = 'Assignment';
      document.getElementById('modal-task-duedate').value = this.getRelativeDate(3);
      document.getElementById('modal-task-priority').value = 'medium';
    }

    modal.classList.add('active');
  }

  addTaskDirectly(taskObj) {
    this.tasks.unshift({
      id: "task_" + Date.now(),
      title: taskObj.title || "Study Session",
      course: taskObj.course || "GEN",
      type: taskObj.type || "General",
      dueDate: taskObj.dueDate || this.getRelativeDate(2),
      priority: taskObj.priority || "medium",
      completed: false
    });
    this.saveData();
    this.render();
    if (window.App && window.App.renderDashboard) window.App.renderDashboard();
    if (window.App && window.App.showToast) {
      window.App.showToast(`Added to Academic Planner: "${taskObj.title}"`, 'success');
    }
  }

  renderCountdowns() {
    const midsemEl = document.getElementById('countdown-midsem');
    const endsemEl = document.getElementById('countdown-endsem');
    const labEl = document.getElementById('countdown-lab');

    // Calculate days from current date
    const today = new Date();
    
    // Midsem: 18 days from now
    const midsemDate = new Date();
    midsemDate.setDate(today.getDate() + 18);
    const midDiff = Math.max(0, Math.ceil((midsemDate - today) / (1000 * 60 * 60 * 24)));
    if (midsemEl) midsemEl.innerText = midDiff;

    // Endsem: 48 days from now
    const endsemDate = new Date();
    endsemDate.setDate(today.getDate() + 48);
    const endDiff = Math.max(0, Math.ceil((endsemDate - today) / (1000 * 60 * 60 * 24)));
    if (endsemEl) endsemEl.innerText = endDiff;

    // Lab Viva: 32 days from now
    const labDate = new Date();
    labDate.setDate(today.getDate() + 32);
    const labDiff = Math.max(0, Math.ceil((labDate - today) / (1000 * 60 * 60 * 24)));
    if (labEl) labEl.innerText = labDiff;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    let filtered = [...this.tasks];
    if (this.activeFilter === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.activeFilter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (this.activeFilter === 'high') {
      filtered = filtered.filter(t => t.priority === 'high');
    }

    // Sort by due date ascending
    filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Update stats counters
    const statPending = document.getElementById('planner-stat-pending');
    const statCompleted = document.getElementById('planner-stat-completed');
    const statHigh = document.getElementById('planner-stat-high');

    const stats = this.getStats();
    if (statPending) statPending.innerText = stats.pendingCount;
    if (statCompleted) statCompleted.innerText = stats.completedCount;
    if (statHigh) statHigh.innerText = stats.highPriorityCount;

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div style="text-align:center; padding:40px; background:var(--bg-secondary); border-radius:12px; border:1px dashed var(--border-color);">
          <i class="fas fa-calendar-check" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:12px;"></i>
          <h4 style="font-size:1.1rem; color:var(--text-primary); margin-bottom:6px;">No tasks in this view</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:16px;">All clear! Stay organized by adding upcoming deadlines or exam milestones.</p>
          <button class="btn btn-primary" onclick="window.App.planner.openTaskModal()"><i class="fas fa-plus"></i> Add New Task</button>
        </div>
      `;
      return;
    }

    filtered.forEach(task => {
      const isOverdue = !task.completed && new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));
      const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const card = document.createElement('div');
      card.className = `task-card-item ${task.completed ? 'completed' : ''}`;
      card.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} title="Mark done">
        <div class="task-info-block">
          <div class="task-title">${task.title}</div>
          <div class="task-meta-row">
            <span class="task-course-tag">${task.course}</span>
            <span class="priority-badge priority-${task.priority}">${task.priority} Priority</span>
            <span><i class="fas fa-tag"></i> ${task.type}</span>
            <span style="${isOverdue ? 'color:#ef4444; font-weight:700;' : ''}">
              <i class="fas fa-clock"></i> Due: ${formattedDate} ${isOverdue ? '(Overdue)' : ''}
            </span>
          </div>
        </div>
        <div class="subject-actions-row" style="margin-top:0;">
          <button class="btn-card-action btn-edit-task" title="Edit Task"><i class="fas fa-edit"></i></button>
          <button class="btn-card-action text-danger btn-del-task" title="Delete Task"><i class="fas fa-trash"></i></button>
        </div>
      `;

      card.querySelector('.task-checkbox').addEventListener('change', () => this.toggleTask(task.id));
      card.querySelector('.btn-edit-task').addEventListener('click', () => this.openTaskModal(task.id));
      card.querySelector('.btn-del-task').addEventListener('click', () => this.deleteTask(task.id));

      this.container.appendChild(card);
    });
  }
}

window.AcademicPlanner = AcademicPlanner;

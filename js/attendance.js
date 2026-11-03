// Attendance Tracker Module for AcadAI (Global Scope)
// Enhanced with Attendance Intelligence: Configurable Target, Bunk Margin,
// Consecutive Recovery, What-if Simulator, and Subject CRUD.

class AttendanceTracker {
  constructor() {
    this.container = document.getElementById('attendance-subjects-list');
    this.resetBtn = document.getElementById('reset-attendance-btn');
    this.addBtn = document.getElementById('add-subject-btn');
    this.targetSelect = document.getElementById('attendance-target-select');
    
    // Load configurable minimum attendance requirement (default 75%)
    this.MIN_ATTENDANCE = parseInt(localStorage.getItem('acadai_attendance_target') || '75', 10);

    // Default initial dataset aligned with MITS Gwalior IT B.Tech Scheme
    this.defaultAttendance = [
      { code: "IT-160501", name: "Operating Systems", attended: 32, total: 40 },
      { code: "IT-160502", name: "Computer Networks & Protocols", attended: 35, total: 42 },
      { code: "IT-160401", name: "Database Management Systems", attended: 30, total: 38 },
      { code: "IT-160301", name: "Data Structures & Algorithms", attended: 26, total: 38 },
      { code: "IT-160601", name: "Internet of Things & Sensors", attended: 21, total: 30 },
      { code: "IT-160402", name: "Object Oriented Java", attended: 22, total: 26 }
    ];

    this.subjects = [];
    this.loadData();
    this.init();
  }

  init() {
    // 1. Setup Target Percentage Selector
    if (this.targetSelect) {
      this.targetSelect.value = this.MIN_ATTENDANCE.toString();
      this.targetSelect.addEventListener('change', (e) => {
        this.MIN_ATTENDANCE = parseInt(e.target.value, 10);
        localStorage.setItem('acadai_attendance_target', this.MIN_ATTENDANCE.toString());
        this.render();
        if (window.App) {
          if (window.App.renderDashboard) window.App.renderDashboard();
          if (window.App.showToast) window.App.showToast(`Minimum attendance threshold updated to ${this.MIN_ATTENDANCE}%`, 'info');
        }
      });
    }

    // 2. Setup Add Subject Button
    if (this.addBtn) {
      this.addBtn.addEventListener('click', () => this.openAddSubjectModal());
    }

    // 3. Setup Reset Button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all attendance trackers? This will restore the default simulation counts.")) {
          this.subjects = JSON.parse(JSON.stringify(this.defaultAttendance));
          this.saveData();
          this.render();
          
          if (window.App) {
            if (window.App.renderDashboard) window.App.renderDashboard();
            if (window.App.showToast) window.App.showToast("Attendance trackers reset to default courses.", 'warning');
          }
        }
      });
    }

    this.render();
  }

  loadData() {
    const saved = localStorage.getItem('acadai_attendance');
    if (saved) {
      try {
        this.subjects = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse attendance data:", e);
        this.subjects = JSON.parse(JSON.stringify(this.defaultAttendance));
      }
    } else {
      this.subjects = JSON.parse(JSON.stringify(this.defaultAttendance));
    }
  }

  saveData() {
    localStorage.setItem('acadai_attendance', JSON.stringify(this.subjects));
  }

  getStats() {
    if (this.subjects.length === 0) {
      return { average: 100, belowThreshold: 0 };
    }
    
    let sumPercentages = 0;
    let belowCount = 0;

    this.subjects.forEach(sub => {
      const pct = sub.total > 0 ? (sub.attended / sub.total) * 100 : 100;
      sumPercentages += pct;
      if (pct < this.MIN_ATTENDANCE) {
        belowCount++;
      }
    });

    return {
      average: sumPercentages / this.subjects.length,
      belowThreshold: belowCount
    };
  }

  // Calculate classes required consecutively to reach target: x = ceil((target * total - 100 * attended) / (100 - target))
  calculateRecovery(attended, total) {
    if (total === 0) return 0;
    const currentPct = (attended / total) * 100;
    if (currentPct >= this.MIN_ATTENDANCE) return 0;
    
    const num = (this.MIN_ATTENDANCE * total) - (100 * attended);
    const den = 100 - this.MIN_ATTENDANCE;
    return Math.max(0, Math.ceil(num / den));
  }

  // Calculate classes a student can safely miss: m = floor((100 * attended - target * total) / target)
  calculateBunkAllowance(attended, total) {
    if (total === 0) return 0;
    const currentPct = (attended / total) * 100;
    if (currentPct < this.MIN_ATTENDANCE) return 0;

    const margin = Math.floor((100 * attended - this.MIN_ATTENDANCE * total) / this.MIN_ATTENDANCE);
    return Math.max(0, margin);
  }

  adjustAttendance(code, type) {
    const sub = this.subjects.find(s => s.code === code);
    if (!sub) return;

    if (type === 'attended') {
      sub.attended++;
      sub.total++;
      if (window.App && window.App.showToast) {
        window.App.showToast(`Marked attended for ${sub.code} (${sub.attended}/${sub.total})`, 'success');
      }
    } else if (type === 'absent') {
      sub.total++;
      if (window.App && window.App.showToast) {
        window.App.showToast(`Marked absent for ${sub.code} (${sub.attended}/${sub.total})`, 'warning');
      }
    }

    this.saveData();
    this.render();
    
    if (window.App && window.App.renderDashboard) {
      window.App.renderDashboard();
    }
  }

  deleteSubject(code) {
    const sub = this.subjects.find(s => s.code === code);
    if (!sub) return;

    if (confirm(`Are you sure you want to delete course "${sub.name}" (${sub.code}) from your tracker?`)) {
      this.subjects = this.subjects.filter(s => s.code !== code);
      this.saveData();
      this.render();
      if (window.App) {
        if (window.App.renderDashboard) window.App.renderDashboard();
        if (window.App.showToast) window.App.showToast(`Deleted subject ${code}`, 'info');
      }
    }
  }

  openAddSubjectModal() {
    let modal = document.getElementById('attendance-subject-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'attendance-subject-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card">
          <button class="btn btn-icon-only close-modal" id="close-add-subject-modal"><i class="fas fa-times"></i></button>
          <div class="modal-course-title-block">
            <h2 id="subject-modal-title"><i class="fas fa-plus-circle text-indigo"></i> Add Course to Tracker</h2>
            <p class="modal-text">Track attendance percentage, bunk allowance, and recovery classes for any registered course.</p>
          </div>
          <form id="attendance-subject-form" class="modal-form" style="display:flex; flex-direction:column; gap:16px;">
            <input type="hidden" id="modal-subject-mode" value="add">
            <input type="hidden" id="modal-subject-old-code" value="">
            <div class="form-group">
              <label for="modal-subject-code">Course Code (e.g. CS-301)</label>
              <input type="text" id="modal-subject-code" required placeholder="CS-301">
            </div>
            <div class="form-group">
              <label for="modal-subject-name">Course Name</label>
              <input type="text" id="modal-subject-name" required placeholder="Software Engineering">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="modal-subject-attended">Classes Attended</label>
                <input type="number" id="modal-subject-attended" min="0" required value="20">
              </div>
              <div class="form-group">
                <label for="modal-subject-total">Total Conducted</label>
                <input type="number" id="modal-subject-total" min="1" required value="25">
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
              <button type="button" class="btn btn-secondary" id="cancel-add-subject-modal">Cancel</button>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Subject</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-add-subject-modal').addEventListener('click', () => modal.classList.remove('active'));
      modal.querySelector('#cancel-add-subject-modal').addEventListener('click', () => modal.classList.remove('active'));

      const form = modal.querySelector('#attendance-subject-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = document.getElementById('modal-subject-mode').value;
        const oldCode = document.getElementById('modal-subject-old-code').value;
        const code = document.getElementById('modal-subject-code').value.trim().toUpperCase();
        const name = document.getElementById('modal-subject-name').value.trim();
        const attended = parseInt(document.getElementById('modal-subject-attended').value, 10);
        const total = parseInt(document.getElementById('modal-subject-total').value, 10);

        if (attended > total) {
          alert("Attended classes cannot exceed total conducted classes!");
          return;
        }

        if (mode === 'add') {
          if (this.subjects.some(s => s.code === code)) {
            alert(`A subject with code ${code} already exists!`);
            return;
          }
          this.subjects.push({ code, name, attended, total });
          if (window.App && window.App.showToast) window.App.showToast(`Added ${code} to attendance tracker!`, 'success');
        } else {
          const index = this.subjects.findIndex(s => s.code === oldCode);
          if (index !== -1) {
            this.subjects[index] = { code, name, attended, total };
            if (window.App && window.App.showToast) window.App.showToast(`Updated ${code} attendance records!`, 'success');
          }
        }

        this.saveData();
        this.render();
        if (window.App && window.App.renderDashboard) window.App.renderDashboard();
        modal.classList.remove('active');
      });
    }

    // Reset form to Add mode
    document.getElementById('subject-modal-title').innerHTML = '<i class="fas fa-plus-circle text-indigo"></i> Add Course to Tracker';
    document.getElementById('modal-subject-mode').value = 'add';
    document.getElementById('modal-subject-old-code').value = '';
    document.getElementById('modal-subject-code').value = '';
    document.getElementById('modal-subject-name').value = '';
    document.getElementById('modal-subject-attended').value = '20';
    document.getElementById('modal-subject-total').value = '25';

    modal.classList.add('active');
  }

  openEditSubjectModal(code) {
    const sub = this.subjects.find(s => s.code === code);
    if (!sub) return;

    this.openAddSubjectModal();
    const modal = document.getElementById('attendance-subject-modal');
    document.getElementById('subject-modal-title').innerHTML = `<i class="fas fa-edit text-indigo"></i> Edit Attendance (${sub.code})`;
    document.getElementById('modal-subject-mode').value = 'edit';
    document.getElementById('modal-subject-old-code').value = sub.code;
    document.getElementById('modal-subject-code').value = sub.code;
    document.getElementById('modal-subject-name').value = sub.name;
    document.getElementById('modal-subject-attended').value = sub.attended;
    document.getElementById('modal-subject-total').value = sub.total;
    modal.classList.add('active');
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    if (this.subjects.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 40px; background:var(--bg-secondary); border-radius:12px; border:1px dashed var(--border-color);">
          <i class="fas fa-clipboard-list" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:12px;"></i>
          <h4 style="font-size:1.1rem; color:var(--text-primary); margin-bottom:6px;">No courses found in tracker</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:16px;">Add your registered courses to calculate attendance percentage, safety margin, and bunk allowance.</p>
          <button class="btn btn-primary" onclick="window.App.attendanceTracker.openAddSubjectModal()"><i class="fas fa-plus"></i> Add First Course</button>
        </div>
      `;
      return;
    }

    this.subjects.forEach(sub => {
      const pct = sub.total > 0 ? (sub.attended / sub.total) * 100 : 100;
      const isSafe = pct >= this.MIN_ATTENDANCE;
      const roundedPct = pct.toFixed(1);
      
      const recoveryCount = this.calculateRecovery(sub.attended, sub.total);
      const bunkAllowance = this.calculateBunkAllowance(sub.attended, sub.total);

      // What-if simulator calculations
      const ifAttendNext = (((sub.attended + 1) / (sub.total + 1)) * 100).toFixed(1);
      const ifMissNext = (((sub.attended) / (sub.total + 1)) * 100).toFixed(1);
      
      const subjectCard = document.createElement('div');
      subjectCard.className = `attendance-subject-card ${isSafe ? 'status-safe' : 'status-low'}`;
      
      subjectCard.innerHTML = `
        <div class="subject-main-info">
          <div class="subject-meta-header">
            <span class="subject-code">${sub.code}</span>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="subject-status-pill ${isSafe ? 'safe' : 'low'}">
                ${isSafe ? '<i class="fas fa-check-circle"></i> SAFE' : '<i class="fas fa-exclamation-triangle"></i> LOW'}
              </span>
              <span class="bunk-margin-pill ${isSafe ? 'bunk-margin-safe' : 'bunk-margin-danger'}">
                ${isSafe ? `<i class="fas fa-umbrella-beach"></i> Bunk: ${bunkAllowance}` : `<i class="fas fa-fire"></i> Deficit`}
              </span>
            </div>
          </div>
          <h4 class="subject-name">${sub.name}</h4>
          
          <div class="attendance-numbers-row">
            <span class="num-stat">Attended: <strong>${sub.attended}</strong></span>
            <span class="num-stat">Absent: <strong>${sub.total - sub.attended}</strong></span>
            <span class="num-stat">Total: <strong>${sub.total}</strong></span>
          </div>

          <!-- Recovery / Bunk Margin Guidance -->
          <div class="attendance-recovery-box">
            ${isSafe 
              ? `<span class="recovery-text-safe"><i class="fas fa-check-circle"></i> On track! You can safely miss <strong>${bunkAllowance}</strong> class${bunkAllowance === 1 ? '' : 'es'} while maintaining &ge; ${this.MIN_ATTENDANCE}%.</span>`
              : `<span class="recovery-text-alert"><i class="fas fa-exclamation-circle"></i> Critical: Attend next <strong>${recoveryCount}</strong> consecutive lecture${recoveryCount === 1 ? '' : 's'} without missing to cross ${this.MIN_ATTENDANCE}%.</span>`
            }
          </div>

          <!-- What-If Quick Simulator Preview -->
          <div class="attendance-sim-box">
            <span><strong>What-If:</strong> Next class attended &rarr; <strong>${ifAttendNext}%</strong> | Next class missed &rarr; <strong>${ifMissNext}%</strong></span>
          </div>

          <!-- Subject Actions Row -->
          <div class="subject-actions-row">
            <button class="btn-card-action btn-edit-sub" data-code="${sub.code}" title="Edit counts">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-card-action text-danger btn-del-sub" data-code="${sub.code}" title="Remove course">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
        
        <div class="subject-visual-controls">
          <!-- Circular Gauge/Progress -->
          <div class="attendance-progress-circle-wrapper">
            <svg class="progress-circle" viewBox="0 0 36 36">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle-fill"
                stroke-dasharray="${roundedPct}, 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div class="percentage-overlay">
              <span class="percent-val">${roundedPct}%</span>
            </div>
          </div>
          
          <!-- Adjust buttons -->
          <div class="attendance-buttons-column">
            <button class="btn btn-attended-plus" data-code="${sub.code}" title="Mark lecture attended (+1)">
              <i class="fas fa-plus"></i> Attended
            </button>
            <button class="btn btn-absent-minus" data-code="${sub.code}" title="Mark lecture missed (+1 total)">
              <i class="fas fa-minus"></i> Absent
            </button>
          </div>
        </div>
      `;

      // Event bindings
      subjectCard.querySelector('.btn-attended-plus').addEventListener('click', () => {
        this.adjustAttendance(sub.code, 'attended');
      });
      subjectCard.querySelector('.btn-absent-minus').addEventListener('click', () => {
        this.adjustAttendance(sub.code, 'absent');
      });
      subjectCard.querySelector('.btn-edit-sub').addEventListener('click', () => {
        this.openEditSubjectModal(sub.code);
      });
      subjectCard.querySelector('.btn-del-sub').addEventListener('click', () => {
        this.deleteSubject(sub.code);
      });

      this.container.appendChild(subjectCard);
    });
  }
}

window.AttendanceTracker = AttendanceTracker;

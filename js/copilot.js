// Academic Copilot & Study Plan Generator Module for AcadAI (Global Scope)
// Feature 8: Goal-based Study Plan Generation, Syllabus Milestones, Daily Revision Breakdown, and Planner Export.

class AcademicCopilot {
  constructor() {
    this.form = document.getElementById('copilot-plan-form');
    this.planOutput = document.getElementById('copilot-plan-output');
    this.savedPlansContainer = document.getElementById('copilot-saved-plans');
    this.subjectSelect = document.getElementById('copilot-subject-select');
    
    this.savedPlans = [];
    this.currentGeneratedPlan = null;

    this.loadSavedPlans();
    this.init();
  }

  init() {
    // Populate subjects from defaultCourses if available
    if (this.subjectSelect && window.defaultCourses) {
      this.subjectSelect.innerHTML = window.defaultCourses.map(c => 
        `<option value="${c.code} - ${c.name}">${c.code}: ${c.name} (${c.department})</option>`
      ).join('');
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.generatePlan();
      });
    }

    this.renderSavedPlans();
  }

  loadSavedPlans() {
    const saved = localStorage.getItem('acadai_saved_study_plans');
    if (saved) {
      try {
        this.savedPlans = JSON.parse(saved);
      } catch (e) {
        this.savedPlans = [];
      }
    }
  }

  saveSavedPlans() {
    localStorage.setItem('acadai_saved_study_plans', JSON.stringify(this.savedPlans));
  }

  generatePlan() {
    const subject = document.getElementById('copilot-subject-select').value;
    const goal = document.getElementById('copilot-goal-select').value;
    const days = parseInt(document.getElementById('copilot-days-input').value, 10);
    const hoursPerDay = parseFloat(document.getElementById('copilot-hours-input').value);
    const focusLevel = document.getElementById('copilot-focus-select').value;

    const [courseCode, courseName] = subject.split(' - ');

    // Generate intelligent syllabus milestones tailored to days
    const daysPlan = [];
    const topicsMap = {
      "CS-101": ["Python Basics & Data Types", "Control Structures & Loops", "Functions & Recursion", "Lists, Tuples & Dicts", "File Handling & Practice Problems"],
      "CS-201": ["Asymptotic Analysis & Arrays", "Linked Lists & Stacks", "Queues & Binary Trees", "BST & Heap Sort", "Graph Traversals (BFS/DFS)", "Dynamic Programming & DP Problems", "Previous Year Papers"],
      "CS-302": ["ER Modeling & Relational Algebra", "SQL Queries & Joins", "Normalization (1NF to BCNF)", "Indexing, B+ Trees & Hashing", "Transactions, ACID & Concurrency", "Crash Recovery & Mock Questions"],
      "CS-303": ["OSI & TCP/IP Protocol Stacks", "Data Link Layer & Framing", "Routing Algorithms (Dijkstra, Bellman-Ford)", "TCP vs UDP & Flow Control", "DNS, HTTP, IP Subnetting", "Network Security Protocols"],
      "MA-202": ["Set Theory & Logic Proofs", "Combinatorics & Permutations", "Recurrence Relations & Generating Functions", "Graph Theory Concepts", "Group Theory & Boolean Algebra"]
    };

    const genericTopics = [
      "Core Concepts & Definitions (Unit 1)",
      "Mathematical Proofs & Architecture (Unit 2)",
      "Algorithms, Flowcharts & Schematics (Unit 3)",
      "Advanced Implementations & Use Cases (Unit 4)",
      "Complex Numerical Problems & Edge Cases",
      "Comprehensive Previous Year Question Papers (PYQ)",
      "Formula Sheet Revision & Active Recall Flashcards"
    ];

    const sourceTopics = topicsMap[courseCode] || genericTopics;

    for (let day = 1; day <= days; day++) {
      const topicIndex = (day - 1) % sourceTopics.length;
      const topicName = sourceTopics[topicIndex];
      const sessionCount = Math.round(hoursPerDay / 1.5);

      let dayFocus = "";
      if (day === days) {
        dayFocus = "Final High-Yield Formula Revision, Mock Test & Sleep Early";
      } else if (day === days - 1 && days > 2) {
        dayFocus = "Previous 5 Years Question Papers (PYQ) & Timed Practice";
      } else {
        dayFocus = `${topicName} (Deep Concept Walkthrough & Notes Review)`;
      }

      daysPlan.push({
        dayNumber: day,
        timeAllotted: `${hoursPerDay}h (${sessionCount} x 45-min Pomodoro cycles)`,
        mainTopic: dayFocus,
        checklist: [
          `45m Concept Study: ${topicName}`,
          `30m Solve 3-5 standard university numericals/problems`,
          `15m Self-quiz & flashcard active recall before sleep`
        ]
      });
    }

    this.currentGeneratedPlan = {
      id: "plan_" + Date.now(),
      createdAt: new Date().toLocaleDateString(),
      courseCode: courseCode || "COURSE",
      courseName: courseName || subject,
      goal,
      days,
      hoursPerDay,
      focusLevel,
      daysPlan
    };

    this.renderPlanOutput();
    if (window.App && window.App.showToast) {
      window.App.showToast(`Personalized study plan created for ${courseName || subject}!`, 'success');
    }
  }

  renderPlanOutput() {
    if (!this.planOutput || !this.currentGeneratedPlan) return;

    const p = this.currentGeneratedPlan;
    this.planOutput.innerHTML = `
      <div class="study-plan-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
          <div>
            <span class="course-code-large">${p.courseCode}</span>
            <h3 style="font-family:var(--font-title); font-size:1.3rem; margin-top:6px;">${p.courseName}</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary);"><i class="fas fa-bullseye text-indigo"></i> Target: <strong>${p.goal}</strong> | <strong>${p.days} Days</strong> Sprint (${p.hoursPerDay} hrs/day)</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button id="copilot-save-plan-btn" class="btn btn-secondary"><i class="fas fa-bookmark"></i> Save Plan</button>
            <button id="copilot-export-planner-btn" class="btn btn-primary"><i class="fas fa-calendar-plus"></i> Export to Planner</button>
          </div>
        </div>

        <div class="generated-plan-timeline">
          ${p.daysPlan.map(d => `
            <div class="plan-day-box">
              <div class="plan-day-header">
                <span class="plan-day-title">Day ${d.dayNumber}: ${d.mainTopic}</span>
                <span class="plan-time-allotment">${d.timeAllotted}</span>
              </div>
              <ul class="plan-topics-list">
                ${d.checklist.map(c => `<li><i class="fas fa-check-circle"></i> ${c}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('copilot-save-plan-btn').addEventListener('click', () => {
      this.saveCurrentPlan();
    });

    document.getElementById('copilot-export-planner-btn').addEventListener('click', () => {
      this.exportToPlanner();
    });
  }

  saveCurrentPlan() {
    if (!this.currentGeneratedPlan) return;
    this.savedPlans.unshift(this.currentGeneratedPlan);
    this.saveSavedPlans();
    this.renderSavedPlans();
    if (window.App && window.App.showToast) {
      window.App.showToast("Study plan saved to your profile library!", 'success');
    }
  }

  exportToPlanner() {
    if (!this.currentGeneratedPlan || !window.App || !window.App.planner) return;

    const p = this.currentGeneratedPlan;
    let count = 0;

    p.daysPlan.forEach((dp, idx) => {
      const d = new Date();
      d.setDate(d.getDate() + idx);
      const dueDate = d.toISOString().split('T')[0];

      window.App.planner.addTaskDirectly({
        title: `[Day ${dp.dayNumber}] ${p.courseCode}: ${dp.mainTopic}`,
        course: p.courseCode,
        type: "Exam Prep",
        dueDate: dueDate,
        priority: idx === 0 ? "high" : "medium"
      });
      count++;
    });

    if (window.App.showToast) {
      window.App.showToast(`Exported ${count} study milestones directly into Academic Planner!`, 'success');
    }
  }

  renderSavedPlans() {
    if (!this.savedPlansContainer) return;

    if (this.savedPlans.length === 0) {
      this.savedPlansContainer.innerHTML = `
        <div style="text-align:center; padding:24px; color:var(--text-muted); font-size:0.85rem;">
          <i class="fas fa-folder-open" style="font-size:1.8rem; margin-bottom:8px; display:block;"></i>
          No saved study roadmaps yet. Generate and save plans above.
        </div>
      `;
      return;
    }

    this.savedPlansContainer.innerHTML = this.savedPlans.map(sp => `
      <div class="today-lecture-item" style="grid-template-columns: 1fr auto auto; margin-bottom:8px;">
        <div>
          <div style="font-weight:600; color:var(--text-primary); font-size:0.9rem;">${sp.courseCode}: ${sp.courseName}</div>
          <div style="font-size:0.75rem; color:var(--text-secondary);">${sp.goal} &bull; ${sp.days} Days &bull; Created ${sp.createdAt}</div>
        </div>
        <button class="btn btn-secondary btn-small view-saved-plan-btn" data-id="${sp.id}" title="Load Plan"><i class="fas fa-eye"></i></button>
        <button class="btn btn-danger-outline btn-small del-saved-plan-btn" data-id="${sp.id}" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    `).join('');

    this.savedPlansContainer.querySelectorAll('.view-saved-plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const plan = this.savedPlans.find(p => p.id === id);
        if (plan) {
          this.currentGeneratedPlan = plan;
          this.renderPlanOutput();
          window.scrollTo({ top: this.planOutput.offsetTop - 100, behavior: 'smooth' });
        }
      });
    });

    this.savedPlansContainer.querySelectorAll('.del-saved-plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.savedPlans = this.savedPlans.filter(p => p.id !== id);
        this.saveSavedPlans();
        this.renderSavedPlans();
      });
    });
  }
}

window.AcademicCopilot = AcademicCopilot;

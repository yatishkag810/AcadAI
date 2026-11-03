// Explain My College Guide Module — MITS Gwalior Autonomous Regulations
// Feature 9: Academic Regulations, Grading Equations, Backlogs, Condonation, and Target CGPA Calculator.
// Fully aligned with MITS Gwalior Autonomous Academic Ordinance & AICTE Model Curriculum.

class CollegeGuide {
  constructor() {
    this.container = document.getElementById('explain-topics-container');
    this.searchInput = document.getElementById('explain-search-input');
    this.categoryPills = document.querySelectorAll('.explain-cat-pill');
    this.activeCategory = 'all';

    this.topics = [
      {
        id: "grading_cgpa",
        category: "academic",
        icon: "fa-graduation-cap",
        title: "MITS Autonomous Grading System, SGPA & CGPA Equations",
        summary: "10-point scale grading metrics, formula derivation, and AICTE percentage conversion.",
        content: `
          <p>Madhav Institute of Technology & Science (MITS), Gwalior adopts the <strong>10-Point Absolute Grading Scale</strong> prescribed under the Autonomous Ordinance (aligned with AICTE and RGPV CBCS norms):</p>
          <div style="overflow-x:auto; margin: 12px 0;">
            <table style="width:100%; border-collapse:collapse; font-size:0.83rem; text-align:left;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-color); color:var(--text-muted);">
                  <th style="padding:6px;">Marks Range</th>
                  <th style="padding:6px;">Letter Grade</th>
                  <th style="padding:6px;">Grade Point ($G_i$)</th>
                  <th style="padding:6px;">Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--border-color);"><td>90% - 100%</td><td><strong style="color:var(--accent-green);">O</strong></td><td>10</td><td>Outstanding</td></tr>
                <tr style="border-bottom:1px solid var(--border-color);"><td>80% - 89%</td><td><strong style="color:var(--accent-green);">A+</strong></td><td>9</td><td>Excellent</td></tr>
                <tr style="border-bottom:1px solid var(--border-color);"><td>70% - 79%</td><td><strong style="color:var(--accent-blue);">A</strong></td><td>8</td><td>Very Good</td></tr>
                <tr style="border-bottom:1px solid var(--border-color);"><td>60% - 69%</td><td><strong style="color:var(--accent-blue);">B+</strong></td><td>7</td><td>Good</td></tr>
                <tr style="border-bottom:1px solid var(--border-color);"><td>55% - 59%</td><td><strong>B</strong></td><td>6</td><td>Above Average</td></tr>
                <tr style="border-bottom:1px solid var(--border-color);"><td>50% - 54%</td><td><strong>C</strong></td><td>5</td><td>Average</td></tr>
                <tr style="border-bottom:1px solid var(--border-color);"><td>40% - 49%</td><td><strong style="color:var(--accent-orange);">P</strong></td><td>4</td><td>Pass</td></tr>
                <tr><td>Below 40%</td><td><strong style="color:#ef4444;">F</strong></td><td>0</td><td>Fail (Active Backlog)</td></tr>
              </tbody>
            </table>
          </div>
          <div class="explain-formula-box">
            <strong>SGPA Calculation Formula:</strong><br>
            SGPA = &Sigma; (Course Credits &times; Grade Points Earned) / &Sigma; (Total Semester Credits)<br><br>
            <strong>CGPA to Percentage Conversion (AICTE / Autonomous Formula):</strong><br>
            Equivalent Percentage (%) = (CGPA - 0.75) &times; 10
          </div>
        `
      },
      {
        id: "attendance_condonation",
        category: "attendance",
        icon: "fa-user-check",
        title: "Mandatory 75% Attendance, Condonation & Detention",
        summary: "Autonomous attendance threshold, Director condonation (65%–74.9%), and exam debarment.",
        content: `
          <p>Under MITS Autonomous Academic Regulations, regular attendance in lectures and practical classes is an essential academic obligation:</p>
          <ul style="margin: 10px 0 10px 20px; line-height:1.6;">
            <li><strong>Safe Threshold (&ge; 75.0%):</strong> Automatic eligibility for End-Semester Theory and Practical Examination admit card generation.</li>
            <li><strong>Condonation Zone (65.0% – 74.9%):</strong> Attendance shortage up to 10% may be condoned solely by the <strong>Director of MITS</strong> on genuine grounds:
              <br>a) Hospitalization / medical illness (duly certified by a registered medical practitioner within 3 working days of rejoining).
              <br>b) Authorized representation of MITS Gwalior in national sports, NCC, technical fests, or paper conferences.</li>
            <li><strong>Detention debatement (&lt; 65.0%):</strong> Any student securing below 65% aggregate attendance is strictly detained in that course and debarred from writing the semester examination. Detained courses must be reregistered.</li>
          </ul>
        `
      },
      {
        id: "backlogs_carryover",
        category: "exams",
        icon: "fa-exclamation-triangle",
        title: "Backlogs, Remedial Exams & Year-Back Ordinances",
        summary: "Autonomous backlog clearance, supplementary attempts, and minimum credit thresholds.",
        content: `
          <p>When an internal + external aggregate score falls below 40% in a theory course, a grade of <strong>F (Fail)</strong> is recorded on the grade card:</p>
          <ul style="margin: 10px 0 10px 20px; line-height:1.6;">
            <li><strong>Remedial / Supplementary Attempts:</strong> Students can appear in the autonomous supplementary examination or register for backlog courses alongside regular end-sem examinations by paying the examination fee.</li>
            <li><strong>Year Promotion Criteria (MITS Autonomous CBCS):</strong> To progress into the 3rd Year (5th Semester), a student must have earned at least 60% of the total 1st-year credits. To enter 4th Year (7th Semester), all 1st-year credits must be cleared and at least 60% of 2nd-year credits completed.</li>
            <li><strong>Maximum Degree Tenure:</strong> As per AICTE / RGPV ordinances, B.Tech must be completed within 6 academic years (N + 2 rule).</li>
          </ul>
        `
      },
      {
        id: "internal_assessment",
        category: "academic",
        icon: "fa-clipboard-check",
        title: "Continuous Internal Assessment (CIA) & Marks Breakdown",
        summary: "Mid-Sem Tests (MST-1 & MST-2), continuous quizzes, lab viva, and semester exam weightages.",
        content: `
          <p>MITS Gwalior employs a balanced continuous evaluation model consisting of <strong>30% Internal Evaluation</strong> and <strong>70% End-Semester Autonomous Examination</strong>:</p>
          <div class="explain-formula-box">
            <strong>Internal Assessment Breakdown (30 Marks):</strong><br>
            • Mid-Semester Test 1 (MST-1): 10 Marks<br>
            • Mid-Semester Test 2 (MST-2): 10 Marks<br>
            • Assignments, Class Quizzes & Seminars: 5 Marks<br>
            • Attendance Regularity Bonus: 5 Marks (&ge;85% = 5 marks, 80-84% = 4 marks, 75-79% = 3 marks)
          </div>
          <p>Practical Laboratory Courses: 50 Marks Continuous Lab Work & Viva + 50 Marks End-Semester Practical Examination.</p>
        `
      },
      {
        id: "hostel_leave",
        category: "campus",
        icon: "fa-hotel",
        title: "MITS Hostel Rules, Curfew & Biometric Verification",
        summary: "Hostel No. 1–4 & Girls Hostel policies, 9:30 PM curfew, gate outpass, and safety guidelines.",
        content: `
          <p>Residential life across Boys Hostels (No. 1, 2, 3, 4) and Girls Hostel is governed by institutional discipline guidelines:</p>
          <ul style="margin: 10px 0 10px 20px; line-height:1.6;">
            <li><strong>Campus Curfew:</strong> Institute gates close at <strong>9:30 PM</strong>. Biometric attendance is recorded in hostel lobbies between 9:30 PM and 10:00 PM.</li>
            <li><strong>Night / Weekend Leave Outpass:</strong> Requires an approved digital leave application verified by hostel wardens and parent communication via the official portal.</li>
            <li><strong>Dispensary & Emergency:</strong> On-campus medical room with resident doctor and emergency vehicle available 24/7.</li>
            <li><strong>Ragging-Free Campus:</strong> Zero-tolerance policy strictly enforced under Supreme Court directives with Anti-Ragging Flying Squads.</li>
          </ul>
        `
      },
      {
        id: "placements_eligibility",
        category: "placement",
        icon: "fa-briefcase",
        title: "Training & Placement (T&P) Policy & Eligibility",
        summary: "Recruitment criteria, CGPA cutoffs, dream offers, and corporate drives at MITS.",
        content: `
          <p>The Training & Placement Cell (Scindia Block, 2nd Floor) coordinates corporate recruitment beginning in the 6th/7th semester:</p>
          <ul style="margin: 10px 0 10px 20px; line-height:1.6;">
            <li><strong>Tier-1 Product / Dream Drives (&ge; ₹10 LPA):</strong> Minimum 7.5 CGPA with zero active backlogs; intensive rounds on Data Structures, Algorithms, and System Design.</li>
            <li><strong>Core Engineering & IT Recruiters (₹5 – ₹9 LPA):</strong> Minimum 6.5 CGPA with consistent academic record across semesters.</li>
            <li><strong>Top Recruiters:</strong> TCS (Digital/Ninja), Infosys, Wipro, Cognizant, L&T Technology Services, Capgemini, Persistent Systems, and Accenture.</li>
            <li><strong>Placement Policy:</strong> Guided by a structured "One Student, One Job" norm with upgrade eligibility for higher-tier dream offers.</li>
          </ul>
        `
      }
    ];

    this.init();
  }

  init() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.render(e.target.value);
      });
    }

    if (this.categoryPills) {
      this.categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.categoryPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeCategory = pill.getAttribute('data-cat') || 'all';
          this.render(this.searchInput ? this.searchInput.value : '');
        });
      });
    }

    this.initCgpaCalculator();
    this.render();
  }

  initCgpaCalculator() {
    const calcBtn = document.getElementById('calc-target-sgpa-btn');
    if (!calcBtn) return;

    calcBtn.addEventListener('click', () => {
      const currentCgpa = parseFloat(document.getElementById('calc-curr-cgpa').value) || 0;
      const completedCredits = parseFloat(document.getElementById('calc-comp-credits').value) || 0;
      const targetCgpa = parseFloat(document.getElementById('calc-target-cgpa').value) || 0;
      const semCredits = parseFloat(document.getElementById('calc-sem-credits').value) || 20;

      const totalCredits = completedCredits + semCredits;
      // targetCgpa = (currentCgpa * completedCredits + reqSgpa * semCredits) / totalCredits
      // reqSgpa = (targetCgpa * totalCredits - currentCgpa * completedCredits) / semCredits
      const reqSgpa = ((targetCgpa * totalCredits) - (currentCgpa * completedCredits)) / semCredits;
      const resEl = document.getElementById('calc-sgpa-result');

      if (reqSgpa > 10.0) {
        resEl.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-exclamation-triangle"></i> Mathematically unreachable in one semester: Requires <strong>${reqSgpa.toFixed(2)} SGPA</strong> (Max scale is 10.0). Aim for a gradual increase across multiple semesters.</span>`;
      } else if (reqSgpa < 4.0) {
        resEl.innerHTML = `<span style="color:var(--accent-green);"><i class="fas fa-check-circle"></i> Very comfortable: Maintaining a passing SGPA of <strong>${Math.max(4.0, reqSgpa).toFixed(2)}</strong> will secure your target CGPA of ${targetCgpa}!</span>`;
      } else {
        resEl.innerHTML = `<span style="color:var(--accent-blue);"><i class="fas fa-bullseye"></i> You need an SGPA of at least <strong>${reqSgpa.toFixed(2)}</strong> in this semester (with ${semCredits} credits) to reach ${targetCgpa} CGPA.</span>`;
      }
    });
  }

  render(searchQuery = '') {
    if (!this.container) return;
    this.container.innerHTML = '';

    const query = searchQuery.toLowerCase().trim();

    const filtered = this.topics.filter(t => {
      const matchCat = this.activeCategory === 'all' || t.category === this.activeCategory;
      const matchSearch = !query || 
        t.title.toLowerCase().includes(query) || 
        t.summary.toLowerCase().includes(query) || 
        t.content.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div style="text-align:center; padding:40px; background:var(--bg-secondary); border-radius:12px; border:1px dashed var(--border-color);">
          <i class="fas fa-search" style="font-size:2rem; color:var(--text-muted); margin-bottom:10px;"></i>
          <h4 style="color:var(--text-primary); margin-bottom:4px;">No college topics match your query</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Try searching for "grading", "attendance", "backlogs", "cgpa", or "hostel".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(topic => {
      const card = document.createElement('div');
      card.className = 'explain-topic-card';
      card.innerHTML = `
        <div class="explain-topic-header">
          <div class="explain-icon-circle">
            <i class="fas ${topic.icon}"></i>
          </div>
          <div>
            <h3 class="explain-topic-title">${topic.title}</h3>
            <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${topic.category}</span>
          </div>
        </div>
        <div class="explain-body">
          ${topic.content}
        </div>
      `;
      this.container.appendChild(card);
    });
  }
}

window.CollegeGuide = CollegeGuide;

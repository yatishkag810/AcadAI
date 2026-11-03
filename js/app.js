// Main Application Controller for AcadAI (Global Scope Version)

class AppController {
  constructor() {
    this.currentTab = 'dashboard';
    this.speechSynthesisActive = false;
    this.synth = window.speechSynthesis;
    this.recognition = null;
    
    // Default App Settings
    this.settings = {
      theme: 'dark',
      sound: true,
      speechEnabled: false,
      speechRate: 1.0,
      speechPitch: 1.0,
      apiConfig: {
        provider: 'local', // local, openai, google
        apiKey: '',
        model: ''
      }
    };
    
    // Load persisted data
    this.loadSettings();
    this.studentProfile = this.loadStudentProfile();
    this.initTheme();
    this.initSpeechRecognition();
    
    // Initialize controllers once DOM is loaded
    document.addEventListener('DOMContentLoaded', () => this.initUI());
  }

  // Toast Notification System
  showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;

    const iconMap = {
      'success': 'fa-check-circle',
      'error': 'fa-exclamation-circle',
      'warning': 'fa-exclamation-triangle',
      'info': 'fa-info-circle'
    };

    const iconClass = iconMap[type] || 'fa-bell';

    toast.innerHTML = `
      <i class="fas ${iconClass} toast-icon"></i>
      <div class="toast-content">${message}</div>
      <button class="toast-close" title="Dismiss">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }

  // Student Profile Management — MITS Gwalior Scholar Profile
  loadStudentProfile() {
    const saved = localStorage.getItem('acadai_student_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate legacy sample profiles to Yatish Kag
        if (parsed.name === 'Arjun Sharma' || parsed.rollNo === '22BCSE042' || parsed.rollNo === '0901IT221042' || !parsed.rollNo) {
          parsed.name = 'Yatish Kag';
          parsed.rollNo = 'BTIT24O1153';
          parsed.branch = 'IT';
          parsed.semester = '5';
          parsed.institute = 'Madhav Institute of Technology & Science, Gwalior';
          localStorage.setItem('acadai_student_profile', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse profile:", e);
      }
    }
    return {
      name: "Yatish Kag",
      rollNo: "BTIT24O1153",
      branch: "IT",
      semester: "5",
      batch: "2024 - 2028",
      section: "A",
      cgpa: "8.42",
      institute: "Madhav Institute of Technology & Science, Gwalior"
    };
  }

  saveStudentProfile(profile) {
    this.studentProfile = profile;
    localStorage.setItem('acadai_student_profile', JSON.stringify(profile));
    this.renderStudentProfile();
  }

  renderStudentProfile() {
    const p = this.studentProfile;
    // Update sidebar profile
    const sidebarName = document.querySelector('.user-profile .user-name');
    const sidebarRole = document.querySelector('.user-profile .user-role');
    if (sidebarName) sidebarName.textContent = p.name;
    if (sidebarRole) sidebarRole.textContent = `B.Tech ${p.branch} Sem ${p.semester}`;

    // Update dashboard profile hero card
    const heroName = document.getElementById('dash-profile-name');
    const heroRoll = document.getElementById('dash-profile-roll');
    const heroBranch = document.getElementById('dash-profile-branch');
    const heroSem = document.getElementById('dash-profile-sem');
    const heroCgpa = document.getElementById('dash-profile-cgpa');

    if (heroName) heroName.textContent = p.name;
    if (heroRoll) heroRoll.textContent = p.rollNo;
    if (heroBranch) heroBranch.textContent = p.branch;
    if (heroSem) heroSem.textContent = `Sem ${p.semester} (Sec ${p.section})`;
    if (heroCgpa) heroCgpa.textContent = p.cgpa;

    // Update status badge based on attendance
    const statusChip = document.getElementById('dash-profile-status-chip');
    if (statusChip && this.attendanceTracker) {
      const stats = this.attendanceTracker.getStats();
      if (stats.belowThreshold === 0) {
        statusChip.className = 'status-chip-safe';
        statusChip.innerHTML = `<i class="fas fa-shield-alt"></i> Attendance Status: Safe (${stats.average.toFixed(1)}%)`;
      } else {
        statusChip.className = 'status-chip-warn';
        statusChip.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${stats.belowThreshold} Low Attendance (${stats.average.toFixed(1)}%)`;
      }
    }
  }

  openProfileEditModal() {
    let modal = document.getElementById('student-profile-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'student-profile-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-card">
          <button class="btn btn-icon-only close-modal" id="close-profile-modal"><i class="fas fa-times"></i></button>
          <div class="modal-course-title-block">
            <h2><i class="fas fa-user-edit text-indigo"></i> Edit Student Profile</h2>
            <p class="modal-text">Personalize your student information, branch, semester, and target CGPA.</p>
          </div>
          <form id="student-profile-form" class="modal-form" style="display:flex; flex-direction:column; gap:16px;">
            <div class="form-row">
              <div class="form-group">
                <label for="edit-profile-name">Full Name</label>
                <input type="text" id="edit-profile-name" required>
              </div>
              <div class="form-group">
                <label for="edit-profile-roll">Roll / Registration Number</label>
                <input type="text" id="edit-profile-roll" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="edit-profile-branch">Department / Branch</label>
                <select id="edit-profile-branch">
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="ME">Mechanical Engineering (ME)</option>
                  <option value="CE">Civil Engineering (CE)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="edit-profile-sem">Current Semester</label>
                <select id="edit-profile-sem">
                  <option value="1">Semester 1 (1st Year)</option>
                  <option value="2">Semester 2 (1st Year)</option>
                  <option value="3">Semester 3 (2nd Year)</option>
                  <option value="4">Semester 4 (2nd Year)</option>
                  <option value="5">Semester 5 (3rd Year)</option>
                  <option value="6">Semester 6 (3rd Year)</option>
                  <option value="7">Semester 7 (4th Year)</option>
                  <option value="8">Semester 8 (4th Year)</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="edit-profile-section">Section / Batch</label>
                <input type="text" id="edit-profile-section" value="A">
              </div>
              <div class="form-group">
                <label for="edit-profile-cgpa">Current CGPA</label>
                <input type="number" step="0.01" min="0" max="10" id="edit-profile-cgpa" value="8.42">
              </div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:10px;">
              <button type="button" class="btn btn-secondary" id="cancel-profile-modal">Cancel</button>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Profile</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-profile-modal').addEventListener('click', () => modal.classList.remove('active'));
      modal.querySelector('#cancel-profile-modal').addEventListener('click', () => modal.classList.remove('active'));

      modal.querySelector('#student-profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          name: document.getElementById('edit-profile-name').value.trim(),
          rollNo: document.getElementById('edit-profile-roll').value.trim(),
          branch: document.getElementById('edit-profile-branch').value,
          semester: document.getElementById('edit-profile-sem').value,
          section: document.getElementById('edit-profile-section').value.trim(),
          cgpa: document.getElementById('edit-profile-cgpa').value.trim(),
          batch: this.studentProfile.batch || "2022 - 2026"
        };
        this.saveStudentProfile(updated);
        modal.classList.remove('active');
        this.showToast("Student profile updated successfully!", 'success');
        this.renderDashboard();
      });
    }

    // Prefill form
    document.getElementById('edit-profile-name').value = this.studentProfile.name;
    document.getElementById('edit-profile-roll').value = this.studentProfile.rollNo;
    document.getElementById('edit-profile-branch').value = this.studentProfile.branch;
    document.getElementById('edit-profile-sem').value = this.studentProfile.semester;
    document.getElementById('edit-profile-section').value = this.studentProfile.section;
    document.getElementById('edit-profile-cgpa').value = this.studentProfile.cgpa;

    modal.classList.add('active');
  }

  // Today's Lectures Extractor
  renderTodaySchedule() {
    const container = document.getElementById('dashboard-today-lectures');
    if (!container || !this.timetable) return;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
    let dayName = days[currentDayIndex];
    if (dayName === 'Saturday' || dayName === 'Sunday') {
      dayName = 'Monday'; // Default to Monday for preview on weekends
    }

    const branch = this.studentProfile ? this.studentProfile.branch : 'CSE';
    const sem = this.studentProfile ? this.studentProfile.semester : '5';
    const schedule = this.timetable.getSchedule(branch, sem);
    const todaySlots = schedule[dayName] || [];

    const activeSlots = todaySlots.filter(s => !s.isLunch && !s.isEmpty);

    if (activeSlots.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:16px; color:var(--text-muted); font-size:0.85rem;">
          No lectures scheduled for today. Enjoy your study / project time!
        </div>
      `;
      return;
    }

    const timeSlots = ['09:00 AM', '10:15 AM', '11:30 AM', '01:30 PM', '02:45 PM'];

    container.innerHTML = activeSlots.map((slot, idx) => `
      <div class="today-lecture-item">
        <span class="lecture-time-badge">${timeSlots[idx] || 'Class'}</span>
        <div>
          <div class="lecture-title">${slot.subject}</div>
          <div class="lecture-room"><i class="fas fa-chalkboard-teacher"></i> ${slot.faculty} &bull; <i class="fas fa-door-open"></i> ${slot.room}</div>
        </div>
        <button class="btn btn-secondary btn-small" onclick="window.App.switchTab('timetable')">View</button>
      </div>
    `).join('');
  }

  // Official College Bulletins & Circulars
  renderNotices() {
    const container = document.getElementById('dashboard-notices-container');
    if (!container) return;

    const notices = [
      {
        tag: 'exam',
        title: 'Mid-Semester Theory & Practical Exam Schedule Released',
        desc: 'Detailed seating arrangement and timetable published on student notice board.',
        date: 'Oct 15, 2026'
      },
      {
        tag: 'placement',
        title: 'T&P Drive: Global Tech Systems Campus Recruitment',
        desc: 'Eligible 7th & 8th sem students (CGPA >= 7.0) must register by Thursday 5 PM.',
        date: 'Oct 14, 2026'
      },
      {
        tag: 'academic',
        title: 'Condonation Application Deadline for Odd Semester',
        desc: 'Medical certificates for 65%-75% attendance shortage must reach Dean Office.',
        date: 'Oct 12, 2026'
      },
      {
        tag: 'event',
        title: 'Annual TechFest "HackMatrix 2026" Registrations Open',
        desc: '36-hour national level hackathon with prizes up to 1.5 Lakhs.',
        date: 'Oct 10, 2026'
      }
    ];

    container.innerHTML = notices.map(n => `
      <div class="notice-item">
        <span class="notice-tag tag-${n.tag}">${n.tag}</span>
        <div class="notice-body">
          <h5>${n.title}</h5>
          <p>${n.desc}</p>
          <div class="notice-date"><i class="fas fa-calendar-alt"></i> ${n.date}</div>
        </div>
      </div>
    `).join('');
  }

  // Dashboard Upcoming Deadlines Widget
  renderPlannerDeadlines() {
    const container = document.getElementById('dashboard-planner-deadlines');
    if (!container || !this.planner) return;

    const deadlines = this.planner.getUpcomingDeadlines(3);

    if (deadlines.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:16px; color:var(--text-muted); font-size:0.85rem;">
          No pending deadlines! You are all caught up.
        </div>
      `;
      return;
    }

    container.innerHTML = deadlines.map(t => `
      <div class="today-lecture-item">
        <span class="task-course-tag">${t.course}</span>
        <div>
          <div class="lecture-title">${t.title}</div>
          <div class="lecture-room"><i class="fas fa-clock"></i> Due: ${t.dueDate} &bull; <span class="priority-badge priority-${t.priority}">${t.priority}</span></div>
        </div>
        <button class="btn btn-secondary btn-small" onclick="window.App.switchTab('planner')">Open</button>
      </div>
    `).join('');
  }

  // Settings & Theme
  loadSettings() {
    const saved = localStorage.getItem('acadai_settings');
    if (saved) {
      try {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to parse settings:", e);
      }
    }
  }

  saveSettings() {
    localStorage.setItem('acadai_settings', JSON.stringify(this.settings));
  }

  initTheme() {
    document.documentElement.setAttribute('data-theme', this.settings.theme);
  }

  toggleTheme() {
    this.settings.theme = this.settings.theme === 'dark' ? 'light' : 'dark';
    this.saveSettings();
    this.initTheme();
    
    // Sync header toggle button icon
    const themeIcon = document.getElementById('theme-toggle-btn').querySelector('i');
    if (this.settings.theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }

  // Web Speech API Initialization
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-IN';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        const micIcon = document.getElementById('chat-mic-btn');
        if (micIcon) {
          micIcon.classList.add('recording');
          micIcon.querySelector('i').className = 'fas fa-microphone-alt animate-pulse';
        }
      };

      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = text;
          chatInput.focus();
        }
      };

      this.recognition.onerror = (e) => {
        console.error("Speech recognition error:", e);
        this.stopSpeechRecognition();
      };

      this.recognition.onend = () => {
        this.stopSpeechRecognition();
      };
    }
  }

  stopSpeechRecognition() {
    const micIcon = document.getElementById('chat-mic-btn');
    if (micIcon) {
      micIcon.classList.remove('recording');
      micIcon.querySelector('i').className = 'fas fa-microphone';
    }
  }

  triggerSpeechToText() {
    if (!this.recognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }
    try {
      this.recognition.start();
    } catch (e) {
      this.recognition.stop();
    }
  }

  speakText(text) {
    if (!this.synth || !this.settings.speechEnabled) return;
    
    // Stop any active speech first
    this.synth.cancel();

    // Strip HTML tags for clean reading
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const cleanText = tempDiv.textContent || tempDiv.innerText || "";

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = this.settings.speechRate || 1.0;
    utterance.pitch = this.settings.speechPitch || 1.0;
    
    utterance.onend = () => {
      this.speechSynthesisActive = false;
      this.updateSpeechButtonsState();
    };

    utterance.onerror = () => {
      this.speechSynthesisActive = false;
      this.updateSpeechButtonsState();
    };

    this.speechSynthesisActive = true;
    this.updateSpeechButtonsState();
    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.speechSynthesisActive = false;
      this.updateSpeechButtonsState();
    }
  }

  updateSpeechButtonsState() {
    const speakBtns = document.querySelectorAll('.speak-response-btn');
    speakBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (this.speechSynthesisActive) {
        icon.className = 'fas fa-volume-mute';
        btn.title = 'Stop reading aloud';
      } else {
        icon.className = 'fas fa-volume-up';
        btn.title = 'Read response aloud';
      }
    });
  }

  // UI Setup & Navigation
  initUI() {
    // 1. Setup Navigation Tabs
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tabName = item.getAttribute('data-tab');
        this.switchTab(tabName);
      });
    });

    // 2. Setup Theme Toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      const themeIcon = themeBtn.querySelector('i');
      themeIcon.className = this.settings.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // 3. Setup Sidebar Collapse Trigger
    const collapseBtn = document.getElementById('collapse-sidebar-btn');
    const sidebar = document.getElementById('app-sidebar');
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const icon = collapseBtn.querySelector('i');
        icon.className = sidebar.classList.contains('collapsed') ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
      });
    }

    // Mobile Hamburger Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Close mobile menu on clicking overlay/nav-item
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-open') && 
          !sidebar.contains(e.target) && 
          e.target !== mobileMenuBtn && 
          !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });

    // 4. Setup Child Controllers (instantiated from global window space)
    if (window.CourseFinder) this.courseFinder = new window.CourseFinder();
    if (window.AdmissionCalculator) this.admissionCalculator = new window.AdmissionCalculator();
    if (window.AcademicCalendar) this.academicCalendar = new window.AcademicCalendar();
    if (window.CampusMap) this.campusMap = new window.CampusMap();
    if (window.ClassTimetable) this.timetable = new window.ClassTimetable();
    if (window.AttendanceTracker) this.attendanceTracker = new window.AttendanceTracker();
    if (window.AcademicPlanner) this.planner = new window.AcademicPlanner();
    if (window.AcademicCopilot) this.copilot = new window.AcademicCopilot();
    if (window.CollegeGuide) this.collegeGuide = new window.CollegeGuide();

    // 5. Setup Profile Edit Button
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => this.openProfileEditModal());
    }

    // 6. Setup chatbot listeners
    this.initChatbotUI();

    // 7. Setup settings panel listeners
    this.initSettingsUI();

    // 8. Setup Knowledge Base manager
    this.initKBManagerUI();

    // 9. Setup Facilities and FAQ interactive search and Chatbot bridges
    this.initFacilitiesAndFAQUI();

    // 10. Render dashboard statistics & recent activities
    this.renderDashboard();
    this.switchTab('dashboard'); // Start on home tab
  }

  initFacilitiesAndFAQUI() {
    // Facility search filter
    const facilitySearch = document.getElementById('facility-search-input');
    const facilityCards = document.querySelectorAll('.facility-card');
    if (facilitySearch && facilityCards.length > 0) {
      facilitySearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        facilityCards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
        });
      });
    }

    // FAQ search filter & auto-open
    const faqSearch = document.getElementById('faq-search-input');
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqSearch && faqItems.length > 0) {
      faqSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        faqItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          const match = !q || text.includes(q);
          item.style.display = match ? 'block' : 'none';
          if (q && match) item.setAttribute('open', '');
        });
      });
    }

    // FAQ bridge to chatbot
    document.querySelectorAll('.ask-faq-in-chat').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        this.switchTab('chatbot');
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = query;
          const sendBtn = document.getElementById('chat-send-btn');
          if (sendBtn) sendBtn.click();
        }
      });
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Remove active states
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-tab') === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
      if (panel.id === `${tabName}-tab`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Sync header title
    const headerTitle = document.getElementById('page-header-title');
    if (headerTitle) {
      const titles = {
        'dashboard': 'Academic Dashboard',
        'planner': 'Smart Academic Planner & Deadlines',
        'copilot': 'Academic Copilot & Study Plan Generator',
        'explain': 'Explain My College (Academic Rules & Regulations)',
        'chatbot': 'AcadAI Virtual Assistant',
        'courses': 'Course Catalog & Finder',
        'admission': 'Admission Eligibility Calculator',
        'timetable': 'Class Timetable Schedule',
        'attendance': 'Class Attendance Tracker',
        'map': 'Interactive Campus Map & Directory',
        'calendar': 'Academic Calendar & Timelines',
        'facilities': 'College Campus & Facilities',
        'faq': 'Frequently Asked Questions (FAQ)',
        'kb': 'Knowledge Base Settings',
        'settings': 'System Settings'
      };
      headerTitle.textContent = titles[tabName] || 'AcadAI';
    }

    // Hide sidebar on mobile click
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    // Trigger tab-specific activation behaviors
    if (tabName === 'dashboard') {
      this.renderDashboard();
    } else if (tabName === 'planner' && this.planner) {
      this.planner.render();
    }
  }

  // Dashboard Tab Logic
  renderDashboard() {
    // 1. Render Student Profile Hero Card
    this.renderStudentProfile();

    // 2. Render Today's Lectures Preview
    this.renderTodaySchedule();

    // 3. Render Official Notices Bulletin
    this.renderNotices();

    // 4. Render Upcoming Tasks & Deadlines
    this.renderPlannerDeadlines();

    // Dynamic Stats calculated from actual modules
    const avgAttendanceVal = document.getElementById('stat-avg-attendance');
    const lowAttendanceVal = document.getElementById('stat-low-attendance');
    const totalCoursesVal = document.getElementById('stat-total-courses');
    const upcomingEventsVal = document.getElementById('stat-upcoming-events');

    // Fetch dynamic state values from modules
    const attendStats = this.attendanceTracker ? this.attendanceTracker.getStats() : { average: 0, belowThreshold: 0 };
    const totalCourses = this.courseFinder ? this.courseFinder.courses.length : 0;
    const upcomingEvents = this.academicCalendar ? this.academicCalendar.events.filter(e => e.status === 'Upcoming').length : 0;

    // Animated counter helper (handles decimal for percentage and integers for counts)
    const animateCounter = (el, targetValue, isDecimal = false) => {
      if (!el) return;
      let start = 0;
      const duration = 600; // ms
      const increment = Math.max(targetValue / (duration / 16), 1);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          el.innerText = isDecimal ? targetValue.toFixed(1) + '%' : Math.round(targetValue);
          clearInterval(timer);
        } else {
          el.innerText = isDecimal ? start.toFixed(1) + '%' : Math.round(start);
        }
      }, 16);
    };

    animateCounter(avgAttendanceVal, attendStats.average, true);
    animateCounter(lowAttendanceVal, attendStats.belowThreshold, false);
    animateCounter(totalCoursesVal, totalCourses, false);
    animateCounter(upcomingEventsVal, upcomingEvents, false);

    // Render Recent Activity (max 5 items)
    const recentActivityContainer = document.getElementById('dashboard-recent-activities');
    if (recentActivityContainer) {
      recentActivityContainer.innerHTML = '';
      const recentQueries = JSON.parse(localStorage.getItem('acadai_recent_queries') || '[]');
      
      if (recentQueries.length === 0) {
        recentActivityContainer.innerHTML = `
          <div class="empty-activity">
            <i class="fas fa-history"></i>
            <p>No recent activity. Start chatting with AcadAI!</p>
          </div>
        `;
      } else {
        recentQueries.slice(0, 5).forEach(query => {
          const item = document.createElement('div');
          item.className = 'activity-item';
          item.innerHTML = `
            <div class="activity-icon">
              <i class="fas fa-comment-dots"></i>
            </div>
            <div class="activity-details">
              <span class="activity-text">"${query.text}"</span>
              <span class="activity-time">${query.time}</span>
            </div>
            <button class="btn btn-icon-only activity-relaunch-btn" title="Ask this again"><i class="fas fa-arrow-right"></i></button>
          `;
          
          item.querySelector('.activity-relaunch-btn').addEventListener('click', () => {
            this.switchTab('chatbot');
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
              chatInput.value = query.text;
              document.getElementById('chat-send-btn').click();
            }
          });
          recentActivityContainer.appendChild(item);
        });
      }
    }

    // Wire Dashboard Quick Action buttons
    const actions = {
      'action-ask': 'chatbot',
      'action-planner': 'planner',
      'action-copilot': 'copilot',
      'action-explain': 'explain',
      'action-find-course': 'courses',
      'action-calc': 'admission',
      'action-timetable': 'timetable',
      'action-attendance': 'attendance',
      'action-calendar': 'calendar',
      'action-map': 'map'
    };
    
    Object.keys(actions).forEach(btnId => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.replaceWith(btn.cloneNode(true));
        document.getElementById(btnId).addEventListener('click', () => {
          this.switchTab(actions[btnId]);
        });
      }
    });
  }

  // Chatbot Tab UI & Interaction
  initChatbotUI() {
    const sendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');
    const micBtn = document.getElementById('chat-mic-btn');
    const clearBtn = document.getElementById('chat-clear-btn');
    this.chatBody = document.getElementById('chat-body');

    if (!sendBtn || !chatInput || !this.chatBody) return;

    // Restore Chat History
    const history = JSON.parse(localStorage.getItem('acadai_chat_history') || '[]');
    if (history.length > 0) {
      this.chatBody.innerHTML = '';
      history.forEach(msg => {
        this.renderMessageBubble(msg.text, msg.sender, msg.timestamp, false);
      });
      this.scrollToBottom();
    } else {
      // Default Greeting bubble
      this.renderMessageBubble(
        "Hi there! 👋 I am <strong>AcadAI</strong>, your digital college guide. Ask me questions about Admissions, Course Fees, Registration Dates, Library rules, Campus buildings, Timetables, and Attendance records! Or pick a quick suggestion below.",
        'bot',
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        false
      );
    }

    // Keyboard handlers
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleUserQuery();
      }
    });

    sendBtn.addEventListener('click', () => this.handleUserQuery());
    
    if (micBtn) {
      micBtn.addEventListener('click', () => this.triggerSpeechToText());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your conversation history?")) {
          this.stopSpeaking();
          localStorage.removeItem('acadai_chat_history');
          this.chatBody.innerHTML = '';
          this.renderMessageBubble(
            "Conversation history cleared. How else can I assist you today?",
            'bot',
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            false
          );
        }
      });
    }

    // Hook Quick-Prompt Chips
    const chips = document.querySelectorAll('.prompt-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chatInput.value = chip.getAttribute('data-query');
        this.handleUserQuery();
      });
    });

    // Chatbot response navigation delegation click handler
    this.chatBody.addEventListener('click', (e) => {
      const navBtn = e.target.closest('.chat-action-nav-btn');
      if (navBtn) {
        const targetTab = navBtn.getAttribute('data-target');
        if (targetTab) {
          this.switchTab(targetTab);
        }
      }
    });
  }

  scrollToBottom() {
    if (this.chatBody) {
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
  }

  renderMessageBubble(text, sender, timestamp, playSound = true) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble-container bubble-${sender} animate-fade-in`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    const isBot = sender === 'bot';
    
    bubble.innerHTML = `
      <div class="chat-avatar">${avatar}</div>
      <div class="chat-message-wrapper">
        <div class="chat-message-content">${text}</div>
        <div class="chat-message-footer">
          <span class="chat-time">${timestamp}</span>
          ${isBot ? `
            <div class="bubble-actions">
              <button class="btn btn-icon-only speak-response-btn" title="Read response aloud"><i class="fas fa-volume-up"></i></button>
              <button class="btn btn-icon-only copy-response-btn" title="Copy text"><i class="fas fa-copy"></i></button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Hook bubble controls
    if (isBot) {
      const speakBtn = bubble.querySelector('.speak-response-btn');
      speakBtn.addEventListener('click', () => {
        if (this.speechSynthesisActive) {
          this.stopSpeaking();
        } else {
          this.speakText(text);
        }
      });

      const copyBtn = bubble.querySelector('.copy-response-btn');
      copyBtn.addEventListener('click', () => {
        // Strip html for clipboard
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const textToCopy = tempDiv.textContent || tempDiv.innerText || "";
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          copyBtn.querySelector('i').className = 'fas fa-check text-success';
          setTimeout(() => {
            copyBtn.querySelector('i').className = 'fas fa-copy';
          }, 1500);
        }).catch(err => {
          console.error("Failed to copy response:", err);
        });
      });
    }

    this.chatBody.appendChild(bubble);
    this.scrollToBottom();

    // Play bubble notification sound if enabled
    if (playSound && this.settings.sound) {
      this.playBubbleSound();
    }
  }

  playBubbleSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.warn("AudioContext notification failed:", e);
    }
  }

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'chat-typing-indicator';
    indicator.className = 'chat-bubble-container bubble-bot animate-fade-in';
    indicator.innerHTML = `
      <div class="chat-avatar">🤖</div>
      <div class="chat-message-wrapper">
        <div class="chat-message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    this.chatBody.appendChild(indicator);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
  }

  async handleUserQuery() {
    const chatInput = document.getElementById('chat-input');
    const query = chatInput.value.trim();
    if (!query) return;

    // Clear input field
    chatInput.value = '';

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Render User Message
    this.renderMessageBubble(query, 'user', timestamp, false);
    
    // Save to chat history
    let history = JSON.parse(localStorage.getItem('acadai_chat_history') || '[]');
    history.push({ text: query, sender: 'user', timestamp: timestamp });
    
    // Save to Recent Activities list
    let recentQueries = JSON.parse(localStorage.getItem('acadai_recent_queries') || '[]');
    recentQueries = recentQueries.filter(q => q.text.toLowerCase() !== query.toLowerCase()); // Avoid duplicates
    recentQueries.unshift({ text: query, time: 'Just now' });
    localStorage.setItem('acadai_recent_queries', JSON.stringify(recentQueries));

    // Show Typing loading indicator
    this.showTypingIndicator();

    // 2. Perform Processing
    let botResponse = '';
    const startProcessing = Date.now();

    try {
      // Find matches locally
      const localResult = window.findBestMatch ? window.findBestMatch(query) : { match: null, answer: null };
      const apiConfig = this.settings.apiConfig;

      // 1. If local verified database has a match (confidence >= threshold)
      if (localResult.match) {
        botResponse = localResult.answer;
      } else if (apiConfig && apiConfig.provider !== 'local' && apiConfig.apiKey && window.queryLLM) {
        // 2. Fallback to external Generative LLM API if configured
        try {
          botResponse = await window.queryLLM(query, apiConfig);
          botResponse += `<br><div class="chat-source-tag"><i class="fas fa-brain"></i> Source: Generative AI (${apiConfig.provider.toUpperCase()})</div>`;
        } catch (apiError) {
          console.warn("External LLM API unavailable, falling back to local recommendations:", apiError);
          botResponse = localResult.answer || (window.getSmartFallbackResponse ? window.getSmartFallbackResponse(query) : "I'm not sure how to answer that.");
        }
      } else {
        // 3. Structured local fallback with category suggestions
        botResponse = localResult.answer || (window.getSmartFallbackResponse ? window.getSmartFallbackResponse(query) : "I'm not sure how to answer that.");
      }
    } catch (e) {
      console.error("NLP processing error:", e);
      botResponse = "Oops, I encountered a computational error analyzing your query. Please rephrase your question.";
    }

    // Delay response slightly to simulate thinking behavior
    const elapsed = Date.now() - startProcessing;
    const delay = Math.max(600 - elapsed, 0);

    setTimeout(() => {
      this.removeTypingIndicator();
      
      const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.renderMessageBubble(botResponse, 'bot', botTimestamp, true);

      // Save bot response to history
      history.push({ text: botResponse, sender: 'bot', timestamp: botTimestamp });
      localStorage.setItem('acadai_chat_history', JSON.stringify(history));

      // Trigger automatic TTS if enabled in settings
      if (this.settings.speechEnabled) {
        this.speakText(botResponse);
      }
    }, delay);
  }

  // System Settings UI Handlers
  initSettingsUI() {
    // Set field values based on state
    const soundToggle = document.getElementById('settings-sound-toggle');
    const speechToggle = document.getElementById('settings-speech-toggle');
    const rateSlider = document.getElementById('settings-speech-rate');
    const pitchSlider = document.getElementById('settings-speech-pitch');
    
    const apiProvider = document.getElementById('settings-api-provider');
    const apiKey = document.getElementById('settings-api-key');
    const apiModel = document.getElementById('settings-api-model');
    
    if (soundToggle) soundToggle.checked = this.settings.sound;
    if (speechToggle) speechToggle.checked = this.settings.speechEnabled;
    if (rateSlider) rateSlider.value = this.settings.speechRate;
    if (pitchSlider) pitchSlider.value = this.settings.speechPitch;
    
    if (apiProvider) apiProvider.value = this.settings.apiConfig.provider;
    if (apiKey) apiKey.value = this.settings.apiConfig.apiKey;
    if (apiModel) apiModel.value = this.settings.apiConfig.model;

    // Show/hide API fields depending on provider
    const toggleApiConfigVisibility = () => {
      const isLocal = apiProvider.value === 'local';
      document.querySelectorAll('.api-credential-row').forEach(row => {
        row.style.display = isLocal ? 'none' : 'flex';
      });
    };
    
    if (apiProvider) {
      apiProvider.addEventListener('change', toggleApiConfigVisibility);
      toggleApiConfigVisibility();
    }

    // Save Settings button
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.settings.sound = soundToggle.checked;
        this.settings.speechEnabled = speechToggle.checked;
        this.settings.speechRate = parseFloat(rateSlider.value);
        this.settings.speechPitch = parseFloat(pitchSlider.value);
        
        this.settings.apiConfig = {
          provider: apiProvider.value,
          apiKey: apiKey.value.trim(),
          model: apiModel.value.trim()
        };

        this.saveSettings();
        alert("Settings saved successfully!");
      });
    }

    // Clear history button
    const clearHistoryBtn = document.getElementById('settings-clear-history');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete all stored chats and statistics?")) {
          localStorage.removeItem('acadai_chat_history');
          localStorage.removeItem('acadai_recent_queries');
          alert("All conversations and activity logs cleared!");
          this.renderDashboard();
        }
      });
    }

    // Reset Knowledge Base button
    const resetKBBtn = document.getElementById('settings-reset-kb');
    if (resetKBBtn) {
      resetKBBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset the entire Knowledge Base back to default settings? Any custom Q&A additions will be lost.")) {
          localStorage.removeItem('acadai_knowledge_base');
          alert("Knowledge Base has been successfully reset!");
          this.renderKBList();
        }
      });
    }
  }

  // Knowledge Base Admin Manager Logic
  initKBManagerUI() {
    this.kbSearch = document.getElementById('kb-admin-search');
    this.kbListContainer = document.getElementById('kb-admin-list');
    this.addKBBtn = document.getElementById('add-kb-entry-btn');
    this.modal = document.getElementById('kb-modal');
    this.modalForm = document.getElementById('kb-entry-form');

    if (!this.kbListContainer || !this.addKBBtn || !this.modal) return;

    this.renderKBList();

    // Search filter
    this.kbSearch.addEventListener('input', () => this.renderKBList());

    // Add Entry Button
    this.addKBBtn.addEventListener('click', () => {
      this.openKBModal();
    });
  }

  getCustomKB() {
    const data = localStorage.getItem('acadai_knowledge_base');
    return data ? JSON.parse(data) : [];
  }

  saveCustomKB(kbArray) {
    localStorage.setItem('acadai_knowledge_base', JSON.stringify(kbArray));
  }

  renderKBList() {
    const fullKB = window.getFullKnowledgeBase ? window.getFullKnowledgeBase() : [];
    const query = this.kbSearch.value.toLowerCase().trim();
    
    this.kbListContainer.innerHTML = '';

    const filtered = fullKB.filter(entry => {
      const matchQuestion = entry.questions.some(q => q.toLowerCase().includes(query));
      const matchAnswer = entry.answer.toLowerCase().includes(query);
      const matchCategory = entry.category && entry.category.toLowerCase().includes(query);
      return matchQuestion || matchAnswer || matchCategory;
    });

    if (filtered.length === 0) {
      this.kbListContainer.innerHTML = `
        <div class="empty-kb-state">
          <i class="fas fa-search-minus"></i>
          <p>No knowledge base records found matching "${query}".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(entry => {
      const row = document.createElement('div');
      row.className = `kb-admin-card ${entry.enabled === false ? 'disabled' : ''}`;
      
      const isCustom = entry.id.startsWith('custom_');
      const questionsText = entry.questions.join(' | ');
      const formattedQuestions = questionsText.length > 90 ? questionsText.substring(0, 90) + '...' : questionsText;
      const formattedAnswer = entry.answer.length > 100 ? entry.answer.substring(0, 100) + '...' : entry.answer;
      
      row.innerHTML = `
        <div class="kb-card-info">
          <div class="kb-meta">
            <span class="kb-badge-category">${entry.category}</span>
            <span class="kb-source-badge ${isCustom ? 'custom' : 'system'}">${isCustom ? 'User Added' : 'Default System'}</span>
          </div>
          <h5 class="kb-questions-title">${formattedQuestions}</h5>
          <p class="kb-answer-preview">${formattedAnswer}</p>
        </div>
        <div class="kb-card-actions">
          <button class="btn btn-icon-only toggle-enable-btn" title="${entry.enabled === false ? 'Enable Q&A' : 'Disable Q&A'}">
            <i class="fas ${entry.enabled === false ? 'fa-toggle-off' : 'fa-toggle-on'}"></i>
          </button>
          ${isCustom ? `
            <button class="btn btn-icon-only edit-entry-btn" title="Edit entry"><i class="fas fa-edit"></i></button>
            <button class="btn btn-icon-only delete-entry-btn text-danger" title="Delete entry"><i class="fas fa-trash-alt"></i></button>
          ` : `<span class="badge-lock" title="System defaults are locked"><i class="fas fa-lock"></i></span>`}
        </div>
      `;

      // Enable/Disable handler
      row.querySelector('.toggle-enable-btn').addEventListener('click', () => {
        this.toggleEntryEnabled(entry.id);
      });

      // Edit Handler
      if (isCustom) {
        row.querySelector('.edit-entry-btn').addEventListener('click', () => {
          this.openKBModal(entry);
        });

        // Delete Handler
        row.querySelector('.delete-entry-btn').addEventListener('click', () => {
          this.deleteKBEntry(entry.id);
        });
      }

      this.kbListContainer.appendChild(row);
    });
  }

  toggleEntryEnabled(id) {
    let customKB = this.getCustomKB();
    const customIndex = customKB.findIndex(e => e.id === id);
    
    if (customIndex !== -1) {
      customKB[customIndex].enabled = customKB[customIndex].enabled === false ? true : false;
      this.saveCustomKB(customKB);
    } else {
      const systemMatch = window.defaultKnowledgeBase.find(e => e.id === id);
      if (systemMatch) {
        const override = { ...systemMatch, id: id, enabled: false };
        customKB.push(override);
        this.saveCustomKB(customKB);
      }
    }

    this.renderKBList();
  }

  deleteKBEntry(id) {
    if (confirm("Are you sure you want to permanently delete this Q&A entry?")) {
      let customKB = this.getCustomKB();
      customKB = customKB.filter(e => e.id !== id);
      this.saveCustomKB(customKB);
      
      this.renderKBList();
    }
  }

  openKBModal(entryToEdit = null) {
    const isEdit = !!entryToEdit;
    const modalTitle = document.getElementById('kb-modal-title');
    modalTitle.textContent = isEdit ? 'Edit Knowledge Base Entry' : 'Add New Q&A Entry';
    
    // Form Inputs
    const categorySelect = document.getElementById('kb-form-category');
    const questionsArea = document.getElementById('kb-form-questions');
    const answerArea = document.getElementById('kb-form-answer');
    
    // Fill fields if editing
    if (isEdit) {
      categorySelect.value = entryToEdit.category;
      questionsArea.value = entryToEdit.questions.join('\n');
      answerArea.value = entryToEdit.answer;
    } else {
      categorySelect.selectedIndex = 0;
      questionsArea.value = '';
      answerArea.value = '';
    }

    this.modal.classList.add('active');

    // Submit handler
    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      const category = categorySelect.value;
      const questionsStr = questionsArea.value.trim();
      const answer = answerArea.value.trim();

      if (!questionsStr || !answer) {
        alert("Please enter both questions and a response.");
        return;
      }

      const questions = questionsStr.split('\n').map(q => q.trim()).filter(q => q.length > 0);

      let customKB = this.getCustomKB();

      if (isEdit) {
        const idx = customKB.findIndex(e => e.id === entryToEdit.id);
        if (idx !== -1) {
          customKB[idx].category = category;
          customKB[idx].questions = questions;
          customKB[idx].answer = answer;
        }
      } else {
        const newEntry = {
          id: 'custom_' + Date.now(),
          category: category,
          questions: questions,
          answer: answer,
          enabled: true
        };
        customKB.unshift(newEntry);
      }

      this.saveCustomKB(customKB);
      
      this.modal.classList.remove('active');
      this.modalForm.removeEventListener('submit', handleFormSubmit);
      
      this.renderKBList();
    };

    this.modalForm.addEventListener('submit', handleFormSubmit);

    // Cancel / Close Modal handlers
    const closeBtn = this.modal.querySelector('.close-modal');
    const cancelBtn = document.getElementById('kb-cancel-btn');
    
    const handleModalClose = () => {
      this.modal.classList.remove('active');
      this.modalForm.removeEventListener('submit', handleFormSubmit);
      closeBtn.removeEventListener('click', handleModalClose);
      cancelBtn.removeEventListener('click', handleModalClose);
    };

    closeBtn.addEventListener('click', handleModalClose);
    cancelBtn.addEventListener('click', handleModalClose);
  }
}

// Instantiate Global Controller
window.App = new AppController();

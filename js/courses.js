// Course Finder Controller (Global Scope Version)

class CourseFinder {
  constructor() {
    this.courses = [...(window.defaultCourses || [])];
    this.filteredCourses = [...this.courses];
    
    // Filters State
    this.filters = {
      search: '',
      department: 'all',
      semester: 'all',
      credits: 'all',
      type: 'all'
    };
    
    this.sortBy = 'code-asc';
    
    // Cache DOM Elements
    this.gridElement = document.getElementById('courses-grid');
    this.searchBar = document.getElementById('course-search');
    this.deptFilter = document.getElementById('filter-dept');
    this.semFilter = document.getElementById('filter-sem');
    this.creditFilter = document.getElementById('filter-credits');
    this.typeFilter = document.getElementById('filter-type');
    this.sortSelect = document.getElementById('course-sort');
    this.resetBtn = document.getElementById('reset-course-filters');
    this.modal = document.getElementById('course-modal');
    
    this.init();
  }

  init() {
    if (!this.gridElement) return; // Prevent errors if tab not initialized
    
    // Bind Event Listeners
    this.searchBar.addEventListener('input', (e) => {
      this.filters.search = e.target.value;
      this.applyFiltersAndSort();
    });
    
    this.deptFilter.addEventListener('change', (e) => {
      this.filters.department = e.target.value;
      this.applyFiltersAndSort();
    });
    
    this.semFilter.addEventListener('change', (e) => {
      this.filters.semester = e.target.value;
      this.applyFiltersAndSort();
    });
    
    this.creditFilter.addEventListener('change', (e) => {
      this.filters.credits = e.target.value;
      this.applyFiltersAndSort();
    });
    
    this.typeFilter.addEventListener('change', (e) => {
      this.filters.type = e.target.value;
      this.applyFiltersAndSort();
    });
    
    this.sortSelect.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.applyFiltersAndSort();
    });
    
    this.resetBtn.addEventListener('click', () => this.resetFilters());
    
    // Initial Render
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    this.filteredCourses = this.courses.filter(course => {
      // Search text match
      const query = this.filters.search.toLowerCase().trim();
      const matchesSearch = !query || 
        course.code.toLowerCase().includes(query) || 
        course.name.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);
        
      // Department filter
      const matchesDept = this.filters.department === 'all' || course.department === this.filters.department;
      
      // Semester filter
      const matchesSem = this.filters.semester === 'all' || course.semester.toString() === this.filters.semester;
      
      // Credits filter
      const matchesCredits = this.filters.credits === 'all' || course.credits.toString() === this.filters.credits;
      
      // Course Type filter
      const matchesType = this.filters.type === 'all' || course.type === this.filters.type;
      
      return matchesSearch && matchesDept && matchesSem && matchesCredits && matchesType;
    });

    // Sort
    this.filteredCourses.sort((a, b) => {
      if (this.sortBy === 'code-asc') return a.code.localeCompare(b.code);
      if (this.sortBy === 'code-desc') return b.code.localeCompare(a.code);
      if (this.sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (this.sortBy === 'credits-desc') return b.credits - a.credits;
      if (this.sortBy === 'sem-asc') return a.semester - b.semester;
      return 0;
    });

    this.render();
  }

  resetFilters() {
    this.filters = {
      search: '',
      department: 'all',
      semester: 'all',
      credits: 'all',
      type: 'all'
    };
    this.sortBy = 'code-asc';
    
    // Sync UI elements
    this.searchBar.value = '';
    this.deptFilter.value = 'all';
    this.semFilter.value = 'all';
    this.creditFilter.value = 'all';
    this.typeFilter.value = 'all';
    this.sortSelect.value = 'code-asc';
    
    this.applyFiltersAndSort();
  }

  render() {
    this.gridElement.innerHTML = '';
    
    if (this.filteredCourses.length === 0) {
      this.gridElement.innerHTML = `
        <div class="no-results-card">
          <i class="fas fa-search"></i>
          <h3>No Courses Found</h3>
          <p>Try resetting filters or adjusting search queries.</p>
        </div>
      `;
      return;
    }
    
    this.filteredCourses.forEach(course => {
      const card = document.createElement('div');
      card.className = `course-card dept-${course.department.toLowerCase()}`;
      card.innerHTML = `
        <div class="course-header">
          <span class="course-code">${course.code}</span>
          <span class="course-type badge-${course.type.toLowerCase()}">${course.type}</span>
        </div>
        <h3 class="course-title">${course.name}</h3>
        <p class="course-desc-short">${course.description.substring(0, 100)}${course.description.length > 100 ? '...' : ''}</p>
        <div class="course-meta">
          <span><i class="fas fa-graduation-cap"></i> ${course.department}</span>
          <span><i class="fas fa-clock"></i> Sem ${course.semester}</span>
          <span><i class="fas fa-star"></i> ${course.credits} Credits</span>
        </div>
        <button class="btn btn-secondary view-course-btn" data-code="${course.code}">View Details</button>
      `;
      
      card.querySelector('.view-course-btn').addEventListener('click', () => {
        this.openDetailsModal(course);
      });
      
      this.gridElement.appendChild(card);
    });
  }

  openDetailsModal(course) {
    if (!this.modal) return;
    
    const content = this.modal.querySelector('.modal-body-content');
    content.innerHTML = `
      <div class="modal-course-title-block">
        <h2>${course.name}</h2>
        <span class="course-code-large">${course.code}</span>
      </div>
      <div class="course-details-pills">
        <span class="pill-badge"><i class="fas fa-university"></i> ${course.department} Department</span>
        <span class="pill-badge"><i class="fas fa-calendar-alt"></i> Semester ${course.semester}</span>
        <span class="pill-badge"><i class="fas fa-bookmark"></i> ${course.credits} Academic Credits</span>
        <span class="pill-badge"><i class="fas fa-tag"></i> ${course.type} Course</span>
      </div>
      <div class="modal-section">
        <h3>Description</h3>
        <p class="modal-text">${course.description}</p>
      </div>
      <div class="modal-section">
        <h3>Prerequisites</h3>
        <p class="modal-text prerequisites-text">${course.prerequisites === 'None' ? 'None' : `<span class="prereq-link" style="cursor:pointer; text-decoration:underline;" title="Click to inspect course details">${course.prerequisites}</span>`}</p>
      </div>
    `;
    
    this.modal.classList.add('active');
    
    // Wire up prerequisite link click
    const prereqLink = content.querySelector('.prereq-link');
    if (prereqLink) {
      prereqLink.addEventListener('click', () => {
        const codes = course.prerequisites.split(',').map(s => s.trim());
        const match = this.courses.find(c => codes.includes(c.code));
        if (match) {
          this.openDetailsModal(match);
        } else {
          alert(`Prerequisite (${course.prerequisites}) belongs to foundational basic sciences.`);
        }
      });
    }
    
    // Add close logic
    const closeBtn = this.modal.querySelector('.close-modal');
    const handleClose = () => {
      this.modal.classList.remove('active');
      closeBtn.removeEventListener('click', handleClose);
    };
    closeBtn.addEventListener('click', handleClose);
  }
}

// Attach to window namespace
window.CourseFinder = CourseFinder;

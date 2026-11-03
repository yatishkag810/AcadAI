// Academic Calendar Controller (Global Scope Version)

class AcademicCalendar {
  constructor() {
    this.events = [...(window.defaultCalendarEvents || [])];
    this.filteredEvents = [...this.events];
    
    this.searchQuery = '';
    this.selectedCategory = 'all';
    
    // DOM Elements
    this.timelineContainer = document.getElementById('calendar-timeline');
    this.searchInput = document.getElementById('calendar-search');
    this.categoryFilters = document.querySelectorAll('.calendar-filter-btn');
    
    this.init();
  }

  init() {
    if (!this.timelineContainer) return;

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.applyFilters();
    });

    // Category filters
    this.categoryFilters.forEach(button => {
      button.addEventListener('click', (e) => {
        // Toggle active class
        this.categoryFilters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.selectedCategory = button.getAttribute('data-category');
        this.applyFilters();
      });
    });

    this.applyFilters();
  }

  applyFilters() {
    const today = new Date();
    
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = !this.searchQuery || 
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        event.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        
      const matchesCategory = this.selectedCategory === 'all' || 
        event.category.toLowerCase() === this.selectedCategory.toLowerCase();
        
      return matchesSearch && matchesCategory;
    });

    // Sort events by date ascending
    this.filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Update statuses dynamically
    this.filteredEvents = this.filteredEvents.map(event => {
      const eventDate = new Date(event.date);
      const isPast = eventDate < today;
      return {
        ...event,
        status: isPast ? "Completed" : "Upcoming"
      };
    });

    this.render();
  }

  render() {
    this.timelineContainer.innerHTML = '';
    
    if (this.filteredEvents.length === 0) {
      this.timelineContainer.innerHTML = `
        <div class="no-results-card">
          <i class="fas fa-calendar-times"></i>
          <h3>No Events Found</h3>
          <p>Try resetting filters or checking your search keywords.</p>
        </div>
      `;
      return;
    }

    this.filteredEvents.forEach(event => {
      const timelineItem = document.createElement('div');
      
      const isUpcoming = event.status === 'Upcoming';
      const statusBadgeClass = isUpcoming ? 'status-upcoming' : 'status-completed';
      const categoryIcon = this.getCategoryIcon(event.category);
      
      const formattedDateRange = this.formatDateRange(event.date, event.endDate);
      
      timelineItem.className = `timeline-item ${isUpcoming ? 'upcoming-highlight' : ''} category-${event.category.toLowerCase()}`;
      timelineItem.innerHTML = `
        <div class="timeline-badge">
          <i class="${categoryIcon}"></i>
        </div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <span class="timeline-category-tag">${event.category}</span>
            <span class="timeline-status-badge ${statusBadgeClass}">${event.status}</span>
            <h4 class="timeline-title">${event.title}</h4>
            <p><small class="text-muted"><i class="fas fa-calendar-alt"></i> ${formattedDateRange}</small></p>
          </div>
          <div class="timeline-body">
            <p>${event.description}</p>
          </div>
        </div>
      `;
      this.timelineContainer.appendChild(timelineItem);
    });
  }

  getCategoryIcon(category) {
    switch (category.toLowerCase()) {
      case 'academic': return 'fas fa-graduation-cap';
      case 'holiday': return 'fas fa-umbrella-beach';
      case 'examination': return 'fas fa-file-signature';
      case 'event': return 'fas fa-trophy';
      default: return 'fas fa-calendar-day';
    }
  }

  formatDateRange(startDateStr, endDateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const start = new Date(startDateStr);
    const formattedStart = start.toLocaleDateString('en-US', options);
    
    if (endDateStr) {
      const end = new Date(endDateStr);
      const formattedEnd = end.toLocaleDateString('en-US', options);
      return `${formattedStart} - ${formattedEnd}`;
    }
    
    return formattedStart;
  }
}

// Attach to window namespace
window.AcademicCalendar = AcademicCalendar;

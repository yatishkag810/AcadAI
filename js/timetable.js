// Class Timetable Module for AcadAI (Global Scope)

class ClassTimetable {
  constructor() {
    this.branchSelect = document.getElementById('timetable-branch');
    this.semesterSelect = document.getElementById('timetable-semester');
    this.gridContainer = document.getElementById('timetable-grid-wrapper');

    // Subjects mapped by Department for schedule simulation (aligned with MITS scheme)
    this.subjectsByDept = {
      'CSE': ['Data Structures', 'Database Systems', 'Algorithms Design', 'Web Programming', 'Operating Systems', 'Machine Learning', 'Computer Networks', 'Software Engineering'],
      'IT': ['Operating Systems', 'Database Systems', 'Data Structures', 'Internet of Things', 'Computer Networks', 'Machine Learning', 'Java Programming', 'Information Security'],
      'ECE': ['Microcontrollers', 'Digital Electronics', 'Signal Processing', 'VLSI Design', 'Control Systems', 'Communication Engineering', 'Electromagnetics', 'Basic Circuit Theory'],
      'EEE': ['Electrical Machines', 'Power Systems', 'Control Theory', 'Power Electronics', 'Renewable Energy', 'High Voltage Engineering', 'Circuit Synthesis', 'Microcontrollers'],
      'ME': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'CAD Modeling', 'Heat Transfer', 'Manufacturing Systems', 'Material Science', 'Kinematics'],
      'CE': ['Structural Analysis', 'Concrete Technology', 'Fluid Mechanics', 'Surveying Methods', 'Soil Mechanics', 'Transportation Design', 'Steel Structures', 'Environmental Eng']
    };

    // Faculty members mapped to subjects (Featuring verified MITS IT/Engineering faculty)
    this.facultyMapping = {
      'Data Structures': { name: 'Dr. Dhananjay Bisen', room: 'IT-Block LH-1' },
      'Database Systems': { name: 'Prof. Neha Bhardwaj', room: 'IT-Block LH-2' },
      'Algorithms Design': { name: 'Dr. Vivek Saxena', room: 'CS-Block LH-3' },
      'Web Programming': { name: 'Prof. Sneha Deshmukh', room: 'CCC Lab-4' },
      'Operating Systems': { name: 'Dr. Punit Kumar Johari (HOD)', room: 'IT-Block LH-3' },
      'Machine Learning': { name: 'Dr. Saumil Maheshwari', room: 'AI & Data Lab' },
      'Computer Networks': { name: 'Prof. Alok Sharma', room: 'Central Computing Lab' },
      'Software Engineering': { name: 'Prof. Priya Sen', room: 'CS-Block LH-4' },
      
      'Internet of Things': { name: 'Dr. Sanjiv Sharma', room: 'IoT & Embedded Lab' },
      'Java Programming': { name: 'Prof. Karan Malhotra', room: 'CCC Lab-2' },
      'Information Security': { name: 'Dr. Devendra Singh', room: 'IT-Block LH-4' },

      'Microcontrollers': { name: 'Dr. Manish Kulkarni', room: 'Lab-ECE1' },
      'Digital Electronics': { name: 'Prof. Shilpa Rao', room: 'Lab-ECE2' },
      'Signal Processing': { name: 'Dr. V. A. Sastry', room: 'LH-101' },
      'VLSI Design': { name: 'Dr. Meenakshi Iyer', room: 'VLSI-Lab' },
      'Control Systems': { name: 'Prof. Sandeep Kumar', room: 'LH-102' },
      'Communication Engineering': { name: 'Dr. R. S. Prasad', room: 'LH-103' },
      'Electromagnetics': { name: 'Prof. H. S. Murthy', room: 'LH-104' },
      'Basic Circuit Theory': { name: 'Prof. Vikram Sen', room: 'LH-105' },

      'Electrical Machines': { name: 'Dr. G. S. Rao', room: 'Machines-Lab' },
      'Power Systems': { name: 'Dr. K. S. Reddy', room: 'LH-EEE1' },
      'Power Electronics': { name: 'Prof. Sunita Pillai', room: 'PE-Lab' },
      'Renewable Energy': { name: 'Prof. Deepak Sen', room: 'LH-EEE2' },
      'High Voltage Engineering': { name: 'Dr. N. L. Sharma', room: 'HV-Lab' },
      'Circuit Synthesis': { name: 'Prof. Rajesh Nair', room: 'LH-EEE3' },

      'Thermodynamics': { name: 'Dr. P. S. Roy', room: 'LH-ME1' },
      'Fluid Mechanics': { name: 'Dr. Ajay Yadav', room: 'Fluid-Lab' },
      'Machine Design': { name: 'Prof. M. K. Bansal', room: 'Drawing-Hall' },
      'CAD Modeling': { name: 'Prof. Vinay Pathak', room: 'CAD-Lab' },
      'Heat Transfer': { name: 'Dr. K. K. Ghosh', room: 'LH-ME2' },
      'Manufacturing Systems': { name: 'Prof. Tarun Gupta', room: 'Workshop-A' },
      'Material Science': { name: 'Dr. Rekha Arya', room: 'LH-ME3' },
      'Kinematics': { name: 'Prof. S. R. Joshi', room: 'LH-ME4' },

      'Structural Analysis': { name: 'Dr. J. C. Bose', room: 'LH-CE1' },
      'Concrete Technology': { name: 'Prof. H. S. Rawat', room: 'Concrete-Lab' },
      'Surveying Methods': { name: 'Prof. R. P. Yadav', room: 'Field-Work' },
      'Soil Mechanics': { name: 'Dr. Abha Mishra', room: 'Soil-Lab' },
      'Transportation Design': { name: 'Prof. P. K. Thakur', room: 'LH-CE2' },
      'Steel Structures': { name: 'Dr. S. K. Mittal', room: 'LH-CE3' },
      'Environmental Eng': { name: 'Prof. Nila Das', room: 'Env-Lab' }
    };

    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.periods = [
      { time: '09:00 AM - 10:00 AM', label: 'Period 1' },
      { time: '10:15 AM - 11:15 AM', label: 'Period 2' },
      { time: '11:30 AM - 12:30 PM', label: 'Period 3' },
      { time: '12:30 PM - 01:30 PM', label: 'Lunch Break' },
      { time: '01:30 PM - 02:30 PM', label: 'Period 4' },
      { time: '02:45 PM - 03:45 PM', label: 'Period 5' }
    ];

    this.init();
  }

  init() {
    if (!this.branchSelect || !this.semesterSelect || !this.gridContainer) return;

    this.branchSelect.addEventListener('change', () => this.render());
    this.semesterSelect.addEventListener('change', () => this.render());

    this.render();
  }

  // Generate deterministic schedule based on branch + semester
  getSchedule(branch, semester) {
    const subjects = this.subjectsByDept[branch] || ['Technical Writing', 'Engineering Maths', 'Physics', 'Chemistry', 'Workshop', 'English Communication'];
    
    // Seed number from branch name letters + semester
    const seedStr = branch + semester;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
      seed += seedStr.charCodeAt(i);
    }

    const schedule = {};
    this.days.forEach((day, dayIndex) => {
      schedule[day] = [];
      this.periods.forEach((period, pIndex) => {
        if (period.label === 'Lunch Break') {
          schedule[day].push({ isLunch: true, subject: 'LUNCH BREAK', faculty: '', room: '' });
          return;
        }

        // Deterministic pseudo-random subject selection
        const subIndex = (seed + dayIndex * 5 + pIndex) % (subjects.length + 2);
        
        // Add empty slots or lab classes
        if (subIndex >= subjects.length) {
          schedule[day].push({ isEmpty: true, subject: 'Free Slot / Library Study', faculty: '', room: '' });
        } else {
          const subject = subjects[subIndex];
          const mapping = this.facultyMapping[subject] || { name: 'Prof. Guest Faculty', room: 'LH-108' };
          schedule[day].push({
            subject: subject,
            faculty: mapping.name,
            room: mapping.room
          });
        }
      });
    });

    return schedule;
  }

  render() {
    const branch = this.branchSelect.value;
    const semester = this.semesterSelect.value;
    const schedule = this.getSchedule(branch, semester);

    this.gridContainer.innerHTML = '';

    // Create desktop timetable container (Grid layout)
    const timetableContainer = document.createElement('div');
    timetableContainer.className = 'timetable-desktop';

    // Desktop Header row (Days)
    let headerHTML = `<div class="timetable-time-header">Time</div>`;
    this.days.forEach(day => {
      headerHTML += `<div class="timetable-day-header">${day}</div>`;
    });
    timetableContainer.innerHTML += `<div class="timetable-row header-row">${headerHTML}</div>`;

    // Period rows
    this.periods.forEach((period, pIndex) => {
      let rowHTML = `
        <div class="time-cell">
          <span class="period-label">${period.label}</span>
          <span class="period-time">${period.time}</span>
        </div>
      `;

      if (period.label === 'Lunch Break') {
        // Render single full row spanning lunch break
        this.days.forEach(() => {
          rowHTML += `<div class="lunch-cell">LUNCH BREAK</div>`;
        });
        timetableContainer.innerHTML += `<div class="timetable-row lunch-row">${rowHTML}</div>`;
        return;
      }

      this.days.forEach(day => {
        const slot = schedule[day][pIndex];
        
        if (slot.isEmpty) {
          rowHTML += `<div class="class-cell class-free"><em>${slot.subject}</em></div>`;
        } else {
          rowHTML += `
            <div class="class-cell class-scheduled">
              <span class="class-subject">${slot.subject}</span>
              <span class="class-room"><i class="fas fa-map-marker-alt"></i> ${slot.room}</span>
              <span class="class-faculty"><i class="fas fa-user-tie"></i> ${slot.faculty}</span>
            </div>
          `;
        }
      });

      timetableContainer.innerHTML += `<div class="timetable-row">${rowHTML}</div>`;
    });

    this.gridContainer.appendChild(timetableContainer);

    // Create Mobile stacked version (Accordion/Cards style per day)
    const mobileContainer = document.createElement('div');
    mobileContainer.className = 'timetable-mobile';

    this.days.forEach(day => {
      const dayCard = document.createElement('div');
      dayCard.className = 'mobile-day-card';
      
      let dayCardHTML = `<div class="mobile-day-title"><h5>${day}</h5></div><div class="mobile-day-slots">`;

      this.periods.forEach((period, pIndex) => {
        const slot = schedule[day][pIndex];
        if (period.label === 'Lunch Break') {
          dayCardHTML += `
            <div class="mobile-slot lunch-slot">
              <span class="time">${period.time}</span>
              <span class="activity">LUNCH BREAK</span>
            </div>
          `;
          return;
        }

        if (slot.isEmpty) {
          dayCardHTML += `
            <div class="mobile-slot free-slot">
              <span class="time">${period.time}</span>
              <span class="activity">Free / Self Study</span>
            </div>
          `;
        } else {
          dayCardHTML += `
            <div class="mobile-slot active-slot">
              <span class="time">${period.time}</span>
              <div class="slot-details">
                <span class="subject">${slot.subject}</span>
                <span class="room"><i class="fas fa-map-marker-alt"></i> ${slot.room}</span>
                <span class="faculty"><i class="fas fa-user-tie"></i> ${slot.faculty}</span>
              </div>
            </div>
          `;
        }
      });

      dayCardHTML += `</div>`;
      dayCard.innerHTML = dayCardHTML;
      mobileContainer.appendChild(dayCard);
    });

    this.gridContainer.appendChild(mobileContainer);

    // Notice info block showing it's sample data
    const disclaimer = document.createElement('div');
    disclaimer.className = 'timetable-disclaimer';
    disclaimer.innerHTML = `<i class="fas fa-info-circle"></i> <span><strong>Note:</strong> This timetable is sample/demo data simulated dynamically based on course profiles and does not constitute official academic scheduling rules.</span>`;
    this.gridContainer.appendChild(disclaimer);
  }
}

window.ClassTimetable = ClassTimetable;

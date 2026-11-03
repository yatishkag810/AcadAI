// Campus Map Controller — Madhav Institute of Technology & Science (MITS), Gwalior
// Interactive SVG Campus Blueprint with authentic buildings, timings, facilities, and contact details.

class CampusMap {
  constructor() {
    this.mapData = {
      'map-admin': {
        name: 'Scindia Administrative Block',
        category: 'admin',
        description: 'The administrative headquarters of MITS Gwalior. Houses the Director\'s Secretariat (Dr. R. K. Pandit), Registrar\'s Office, Dean Academics, Accounts & Fee Section, and the Training & Placement Cell.',
        hours: '09:00 AM - 05:00 PM (Mon-Sat, 2nd & 4th Sat Holiday)',
        facilities: ['Director Secretariat (Room 101)', 'Registrar Office', 'Accounts & Fee Counter', 'Dean Academic Office', 'Training & Placement Cell (2nd Floor)'],
        contact: 'director@mitsgwalior.in | Ph: 0751-2409300'
      },
      'map-academic': {
        name: 'Central Academic Block (Civil & Mechanical)',
        category: 'academic',
        description: 'Houses smart lecture theatres, seminar halls, and departmental faculty cabins for Civil Engineering, Mechanical Engineering, and Applied Sciences & Humanities.',
        hours: '09:00 AM - 04:30 PM (Mon-Fri)',
        facilities: ['Smart Classrooms 101-305', 'Civil Surveying & Concrete Lab', 'Mechanical Dynamics Lab', 'Faculty Cabins', 'Departmental Notice Boards'],
        contact: 'academic@mitsgwalior.in | Extn. 112'
      },
      'map-library': {
        name: 'Central Library & Digital Knowledge Centre',
        category: 'academic',
        description: 'A spacious knowledge repository housing over 1,00,000 physical volumes, reference compendiums, IEEE Xplore, ScienceDirect digital consortium workstations, and quiet study halls.',
        hours: '08:00 AM - 08:00 PM (All Academic Working Days)',
        facilities: ['Circulation & Stack Section', 'Digital Library & DELNET E-Resource Centre', 'Air-Conditioned Reading Hall', 'Current Periodicals & Journals Section', 'Reprography & Photocopying Desk'],
        contact: 'library@mitsgwalior.in | Extn. 200'
      },
      'map-cs': {
        name: 'Department of IT & CSE Complex',
        category: 'academic',
        description: 'Multi-story specialized computing facility housing the Department of Information Technology (HOD: Dr. Punit Kumar Johari) and Computer Science & Engineering.',
        hours: '08:30 AM - 05:30 PM (Mon-Sat)',
        facilities: ['Advanced Software Engineering Lab', 'IoT & Embedded Systems Lab (Dr. Sanjiv Sharma)', 'Machine Learning & AI Center', 'High-Performance Computing Cluster', 'ACM & IEEE Student Chapter Hub'],
        contact: 'it.hod@mitsgwalior.in | cse.hod@mitsgwalior.in'
      },
      'map-labs': {
        name: 'Central Computer Centre & Engineering Workshops',
        category: 'academic',
        description: 'Houses the 150+ seat Central Computer Centre (CCC) on high-speed fiber backbone, alongside mechanical workshops including Smithy, Machine Shop, Carpentry, and Foundry.',
        hours: '09:00 AM - 05:00 PM (Mon-Fri)',
        facilities: ['Central Computer Centre (Workstations 1-150)', 'Machine Tool & Lathe Workshop', 'Foundry & Welding Bay', 'Applied Chemistry & Physics Labs', 'CAD/CAM Design Suite'],
        contact: 'ccc@mitsgwalior.in | workshop@mitsgwalior.in'
      },
      'map-student': {
        name: 'Student Activity Centre & Health Dispensary',
        category: 'amenity',
        description: 'Hub for co-curricular clubs, student council activities, and the on-campus Health Dispensary with resident medical officer and first-aid support.',
        hours: 'Health Centre: 24/7 | Activity Hub: 08:00 AM - 08:30 PM',
        facilities: ['Dispensary & Emergency Medical Room', 'Resident Medical Officer Cabin', 'Cultural Club Rehearsal Room', 'Robotics & Hardware Tinkering Lab', 'Indoor Games Arena'],
        contact: 'dispensary@mitsgwalior.in | sac@mitsgwalior.in'
      },
      'map-hostel': {
        name: 'MITS Residential Hostel Complex',
        category: 'hostel',
        description: 'Residential facilities for undergraduate and postgraduate scholars comprising Boys Hostels (No. 1, 2, 3, 4) and secure Girls Hostel with dining mess and recreation halls.',
        hours: 'Curfew: 09:30 PM (Strict Biometric Attendance)',
        facilities: ['Furnished Student Rooms (Single/Double/Triple)', 'Student Dining Mess', 'Hostel Wi-Fi Network', 'Common Recreation TV Hall', '24/7 Security & Wardens Office'],
        contact: 'hostel@mitsgwalior.in | Chief Warden: 0751-2409354'
      },
      'map-cafeteria': {
        name: 'Campus Canteen & Nescafe Kiosk',
        category: 'amenity',
        description: 'Hygienic campus food court offering freshly prepared vegetarian meals, Indian snacks, beverages, and an adjacent Nescafe coffee kiosk for students and staff.',
        hours: '07:30 AM - 08:30 PM (Daily)',
        facilities: ['Main Vegetarian Food Court', 'Fresh Juice & Milkshake Corner', 'Nescafe Coffee Hub', 'Covered Outdoor Garden Seating'],
        contact: 'canteen@mitsgwalior.in'
      },
      'map-sports': {
        name: 'Sports Ground & Athletic Arena',
        category: 'sports',
        description: 'Expansive outdoor and indoor sports facilities including cricket ground, football turf, volleyball courts, basketball arena, and gymnasium.',
        hours: '06:00 AM - 09:00 AM & 05:00 PM - 08:30 PM',
        facilities: ['Main Cricket Pitch & Turf', 'Synthetic Basketball Court', 'Volleyball & Badminton Courts', 'Athletic Running Track', 'Student Gymnasium'],
        contact: 'sports@mitsgwalior.in | Physical Director'
      },
      'map-gate': {
        name: 'Main Entrance & SBI Branch / ATM',
        category: 'admin',
        description: 'Main campus gate facing Race Course Road, Gola Ka Mandir. Equipped with round-the-clock security post, visitor verification desk, and an on-campus State Bank of India (SBI) branch with 24/7 ATM.',
        hours: 'Gate & ATM: 24/7 | SBI Branch: 10:00 AM - 04:00 PM',
        facilities: ['Security Checkpost & Visitor Registration', 'State Bank of India (SBI) MITS Branch', '24/7 SBI Automated Teller Machine (ATM)', 'Emergency Ambulance Bay'],
        contact: 'security@mitsgwalior.in | Main Gate Extn. 100'
      }
    };

    this.mapContainer = document.getElementById('campus-map-svg-container');
    this.panelElement = document.getElementById('map-details-panel');
    this.searchInput = document.getElementById('map-search-input');
    this.categoryPills = document.querySelectorAll('.map-cat-pill');
    this.activeCategory = 'all';
    
    this.init();
  }

  init() {
    if (!this.mapContainer || !this.panelElement) return;

    // Attach click listeners to all SVG building groups
    const buildingElements = this.mapContainer.querySelectorAll('.map-building');
    buildingElements.forEach(building => {
      building.addEventListener('click', (e) => {
        const id = building.id;
        this.selectBuilding(id);
      });
    });

    // Real-time facility/building search
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filterBuildings(query, this.activeCategory);
      });
    }

    // Category filter pills
    if (this.categoryPills) {
      this.categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.categoryPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeCategory = pill.getAttribute('data-cat') || 'all';
          const query = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';
          this.filterBuildings(query, this.activeCategory);
        });
      });
    }

    // Select Scindia Admin block by default
    this.selectBuilding('map-admin');
  }

  filterBuildings(query, category) {
    const buildingElements = this.mapContainer.querySelectorAll('.map-building');
    let firstMatchedId = null;

    buildingElements.forEach(el => {
      const id = el.id;
      const data = this.mapData[id];
      if (!data) return;

      const matchesCategory = category === 'all' || data.category === category;
      const matchesQuery = !query || 
        data.name.toLowerCase().includes(query) || 
        data.description.toLowerCase().includes(query) ||
        data.facilities.some(f => f.toLowerCase().includes(query));

      if (matchesCategory && matchesQuery) {
        el.style.opacity = '1';
        el.style.filter = 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.6))';
        if (!firstMatchedId) firstMatchedId = id;
      } else {
        el.style.opacity = '0.35';
        el.style.filter = 'none';
      }
    });

    if (firstMatchedId) {
      this.selectBuilding(firstMatchedId, false);
    }
  }

  selectBuilding(id, shouldScroll = false) {
    const data = this.mapData[id];
    if (!data) return;

    // Highlight selected SVG group
    const buildingElements = this.mapContainer.querySelectorAll('.map-building');
    buildingElements.forEach(el => {
      if (el && el.classList) el.classList.remove('active-building');
    });
    
    const activeEl = document.getElementById(id);
    if (activeEl && activeEl.classList) {
      activeEl.classList.add('active-building');
    }

    // Render Details Panel
    this.panelElement.innerHTML = `
      <div class="map-card-expanded animate-fade-in">
        <div class="map-card-header">
          <div class="map-tag-category tag-${data.category}">${data.category.toUpperCase()}</div>
          <h3>${data.name}</h3>
        </div>
        <div class="map-card-body">
          <p class="building-desc">${data.description}</p>
          
          <div class="info-row">
            <i class="fas fa-clock text-indigo"></i>
            <div>
              <strong>Operating Hours</strong>
              <span>${data.hours}</span>
            </div>
          </div>
          
          <div class="info-row">
            <i class="fas fa-phone-alt text-indigo"></i>
            <div>
              <strong>Official Contact</strong>
              <span>${data.contact}</span>
            </div>
          </div>

          <div class="facilities-sublist">
            <strong><i class="fas fa-check-circle text-indigo"></i> Key Facilities & Units:</strong>
            <ul>
              ${data.facilities.map(item => `<li><i class="fas fa-caret-right"></i> ${item}</li>`).join('')}
            </ul>
          </div>

          <button class="btn btn-secondary btn-block ask-map-in-chat" style="margin-top:14px;" data-building="${data.name}">
            <i class="fas fa-comments"></i> Ask AcadAI about this building
          </button>
        </div>
      </div>
    `;

    // Connect chatbot button
    const chatBtn = this.panelElement.querySelector ? this.panelElement.querySelector('.ask-map-in-chat') : null;
    if (chatBtn) {
      chatBtn.addEventListener('click', () => {
        const navChat = document.querySelector('[data-tab="chatbot"]');
        if (navChat) navChat.click();
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = `Where is ${data.name} and what are its timings?`;
          const sendBtn = document.getElementById('send-button');
          if (sendBtn) sendBtn.click();
        }
      });
    }

    if (shouldScroll && window.innerWidth < 992) {
      this.panelElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Attach to window namespace
window.CampusMap = CampusMap;

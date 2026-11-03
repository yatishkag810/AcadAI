// AcadAI Knowledge Base — Madhav Institute of Technology & Science (MITS), Gwalior
// Authentic institutional data verified from web.mitsgwalior.in and MP DTE (dte.mponline.gov.in)
// Covers College Profile, Leadership, IT Department, MP DTE Admissions, CBCS Grading,
// 75% Attendance Rules, Hostels, Fees, Facilities, and common Hinglish student queries.

window.defaultKnowledgeBase = [
  // 1. GENERAL GREETINGS & BOT IDENTITY
  {
    id: "greet_hello",
    category: "general_greeting",
    questions: [
      "hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening",
      "namaste", "hey there", "anyone there", "what's up", "how are you", "hi acadai",
      "hello sir", "namaskar", "ram ram"
    ],
    answer: "Hello! Welcome to <strong>AcadAI</strong>, the campus information assistant for <strong>Madhav Institute of Technology & Science (MITS), Gwalior</strong>. How can I assist you today? You can ask about MP DTE admissions, B.Tech courses, IT department, fees, 75% attendance rules, academic calendar, or campus facilities."
  },
  {
    id: "greet_bye",
    category: "general_greeting",
    questions: ["bye", "goodbye", "see you later", "exit", "quit", "thank you", "thanks", "thanks a lot", "okay bye", "shukriya", "dhanyawad"],
    answer: "You're welcome! If you need any further information regarding MITS Gwalior academics, examinations, or facilities, feel free to ask anytime. Best wishes for your studies at MITS! 🎓"
  },
  {
    id: "bot_identity",
    category: "general_greeting",
    questions: [
      "who are you", "what is your name", "what do you do", "are you an ai", "what is acadai",
      "tell me about yourself", "aap kaun ho", "kya kaam karte ho"
    ],
    answer: "I am <strong>AcadAI</strong>, the dedicated Academic and College Information Assistant for <strong>Madhav Institute of Technology & Science (MITS), Gwalior</strong>. I help students, aspirants, and faculty navigate official academic regulations, MP DTE admissions, B.Tech syllabi, class schedules, attendance thresholds, and campus resources."
  },

  // 2. COLLEGE PROFILE, HISTORY & RECOGNITION
  {
    id: "mits_overview",
    category: "college_overview",
    questions: [
      "tell me about mits", "about mits gwalior", "college overview", "history of mits",
      "establishment year", "who founded mits", "is mits autonomous", "naac grade mits",
      "mits accreditation", "mits gwalior ranking", "mits kaisa college hai", "tell me about this institute"
    ],
    answer: "<strong>Madhav Institute of Technology & Science (MITS), Gwalior</strong> is a premier engineering institution established in <strong>1957</strong> by <strong>Maharaja Sir Jiwaji Rao Scindia</strong> under the Scindia Engineering College Society.<br><br>• <strong>Foundation:</strong> Foundation stone laid on Oct 20, 1956 by Dr. Rajendra Prasad (1st President of India); inaugurated on Dec 11, 1964 by Dr. S. Radhakrishnan.<br>• <strong>Status:</strong> Autonomous institution affiliated with RGPV Bhopal, approved by AICTE, accredited with <strong>NAAC 'A++' Grade</strong>, and recognized as a Deemed-to-be-University.<br>• <strong>Campus:</strong> Spans 44.6 lush acres at Gola Ka Mandir, Gwalior.<br><div class=\"chat-source-tag\"><i class=\"fas fa-university\"></i> Source: web.mitsgwalior.in/about-us</div>"
  },
  {
    id: "mits_location_address",
    category: "contact_information",
    questions: [
      "where is mits located", "mits address", "how to reach mits", "mits location",
      "gola ka mandir", "mits campus address", "nearest railway station", "nearest airport",
      "mits gwalior kahan hai", "mits kaise pahuche"
    ],
    answer: "<strong>MITS Gwalior Campus Address:</strong><br>Madhav Institute of Technology & Science,<br>Race Course Road, Gola Ka Mandir, Gwalior – 474005, Madhya Pradesh, India.<br><br>• <strong>Connectivity:</strong> Located ~3 km from Gwalior Junction Railway Station and ~6 km from Rajmata Vijaya Raje Scindia Gwalior Airport (GWL). Easily accessible via auto-rickshaws, city transit, and e-rickshaws.<br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"map\"><i class=\"fas fa-map-marked-alt\"></i> View Campus Map</button><br><div class=\"chat-source-tag\"><i class=\"fas fa-map-pin\"></i> Source: web.mitsgwalior.in/contact-us</div>"
  },
  {
    id: "mits_administration_director",
    category: "college_overview",
    questions: [
      "who is director of mits", "director name", "mits director", "dr rk pandit",
      "vice chancellor", "registrar of mits", "head of institute", "director kaun hai"
    ],
    answer: "The Director / Vice Chancellor of MITS Gwalior is <strong>Dr. R. K. Pandit</strong>. Under his leadership, MITS achieved autonomous academic status, NAAC A++ accreditation, and modern interdisciplinary AI/IoT programs.<br>• <strong>Office:</strong> Scindia Administrative Block, Ground Floor.<br>• <strong>Email:</strong> director@mitsgwalior.in | Ph: 0751-2409300.<br><div class=\"chat-source-tag\"><i class=\"fas fa-user-tie\"></i> Source: MITS Administration Directory</div>"
  },
  {
    id: "mits_contact_details",
    category: "contact_information",
    questions: [
      "mits phone number", "mits contact number", "helpline number", "contact email",
      "how to contact mits", "mits gwalior phone", "admission enquiry number"
    ],
    answer: "<strong>Official MITS Gwalior Contacts:</strong><br>• <strong>EPABX / Office:</strong> 0751-2409300, 0751-2409354<br>• <strong>Director's Secretariat:</strong> director@mitsgwalior.in<br>• <strong>Registrar Office:</strong> registrar@mitsgwalior.in<br>• <strong>Admissions Helpline:</strong> +91-9343250503, +91-9425460166<br>• <strong>Training & Placement Cell:</strong> tnp@mitsgwalior.in<br>• <strong>Official Website:</strong> <a href=\"https://web.mitsgwalior.in/\" target=\"_blank\">web.mitsgwalior.in</a>"
  },

  // 3. DEPARTMENTS & ENGINEERING BRANCHES
  {
    id: "departments_list",
    category: "departments",
    questions: [
      "what departments are there", "list of departments", "engineering branches available",
      "which branches do you have", "departments in mits", "available streams in mits",
      "courses in mits", "mits me kaun kaun si branch hai"
    ],
    answer: "MITS Gwalior offers Undergraduate B.Tech programs across multiple dynamic engineering departments:<br>1. <strong>Information Technology (IT)</strong> (Intake: 120)<br>2. <strong>Computer Science & Engineering (CSE)</strong> (Intake: 120)<br>3. <strong>Artificial Intelligence & Data Science (AI & DS)</strong> (Intake: 60)<br>4. <strong>Artificial Intelligence & Machine Learning (AI & ML)</strong> (Intake: 60)<br>5. <strong>Computer Science & Design (CSD)</strong> (Intake: 60)<br>6. <strong>Internet of Things (IoT)</strong> (Intake: 60)<br>7. <strong>IT - AI & Robotics</strong> (Intake: 60)<br>8. <strong>Electrical Engineering (EE)</strong> (Intake: 120)<br>9. <strong>Electronics Engineering (ET/ECE)</strong> (Intake: 120)<br>10. <strong>Mechanical Engineering (ME)</strong> (Intake: 120)<br>11. <strong>Civil Engineering (CE)</strong> (Intake: 120)<br>12. <strong>Chemical Engineering (CM)</strong> (Intake: 30)<br>13. <strong>Biotechnology (BT)</strong> (Intake: 30)<br>14. <strong>Mathematics & Computing (MAC)</strong> (Intake: 60)<br>Plus <strong>Bachelor of Architecture (B.Arch)</strong> (Intake: 40).<br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"courses\"><i class=\"fas fa-search\"></i> Explore Course Finder</button>"
  },
  {
    id: "dept_it_details",
    category: "departments",
    questions: [
      "tell me about it department", "information technology branch", "it hod",
      "hod it mits", "dr punit kumar johari", "it department faculty", "it branch in mits",
      "it department kaisa hai", "it hod kaun hai"
    ],
    answer: "The <strong>Department of Information Technology (IT)</strong> at MITS is NBA-accredited and known for strong industry readiness and placements.<br><br>• <strong>Head of Department:</strong> <strong>Dr. Punit Kumar Johari</strong> (Associate Professor & Head)<br>• <strong>Key Faculty:</strong> Prof. Neha Bhardwaj, Dr. Sanjiv Sharma (IoT Specialist), Dr. Saumil Maheshwari, Dr. Dhananjay Bisen.<br>• <strong>Degree Programs:</strong> B.Tech in IT (120 seats), B.Tech IT with AI & Robotics, and B.Tech Internet of Things (IoT).<br>• <strong>Laboratories:</strong> Advanced Software Lab, IoT & Sensor Lab, Cloud & Distributed Systems Lab, and Data Intelligence Lab.<br><div class=\"chat-source-tag\"><i class=\"fas fa-laptop-code\"></i> Source: web.mitsgwalior.in/departments/information-technology</div>"
  },
  {
    id: "dept_cse_details",
    category: "departments",
    questions: [
      "tell me about cse department", "computer science branch mits", "cse intake",
      "cse faculty", "computer science engineering mits", "cse cutoff mits"
    ],
    answer: "The <strong>Department of Computer Science & Engineering (CSE)</strong> is one of the premier branches at MITS with an intake of 120 seats. It offers specialized computing courses, AI/ML research labs, high-performance computing clusters, and active coding chapters. High placement track record with companies like Amazon, TCS Digital, Cognizant, and Infosys."
  },

  // 4. ADMISSIONS & MP DTE COUNSELING
  {
    id: "admission_process_dte",
    category: "admissions",
    questions: [
      "how to get admission in mits", "admission process", "counseling procedure",
      "mp dte counseling", "dte mponline", "how to apply for btech in mits",
      "admission criteria", "mits me admission kaise hota hai", "jee main counseling mits"
    ],
    answer: "Admissions to B.Tech programs at MITS Gwalior are conducted centrally through <strong>MP DTE (Directorate of Technical Education, Madhya Pradesh)</strong> Online Counseling (<a href=\"https://dte.mponline.gov.in\" target=\"_blank\">dte.mponline.gov.in</a>):<br><br>1. <strong>Merit Basis:</strong> All India CRL Rank in <strong>JEE Main</strong> conducted by NTA.<br>2. <strong>MP Domicile Quota (90% seats):</strong> Reserved for bonafide MP residents following state reservation policies (UR, OBC, SC, ST, EWS).<br>3. <strong>All India Quota (10% seats):</strong> Open to candidates across India based on JEE Main CRL rank.<br>4. <strong>Tuition Fee Waiver (TFW - 5% Supernumerary):</strong> Tuition fee exemption for high-merit candidates with family income &lt; ₹8 Lakhs/year.<br>5. <strong>College Level Counseling (CLC):</strong> Conducted at MITS for remaining vacant seats after centralized rounds.<br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"admission\"><i class=\"fas fa-calculator\"></i> Open Admission Calculator</button><br><div class=\"chat-source-tag\"><i class=\"fas fa-university\"></i> Source: MP DTE Guidelines (dte.mponline.gov.in)</div>"
  },
  {
    id: "admission_eligibility_criteria",
    category: "admissions",
    questions: [
      "what is eligibility criteria", "minimum percentage in 12th", "12th board marks required",
      "eligibility for btech in mits", "pcm requirement", "can i get admission with 50 percent",
      "12th me kitne marks chahiye"
    ],
    answer: "<strong>Minimum Academic Eligibility for B.Tech at MITS Gwalior:</strong><br>• Must have passed 10+2 examination conducted by MP Board / CBSE / ICSE or recognized state board.<br>• Compulsory subjects: <strong>Physics and Mathematics</strong> along with Chemistry, Biotechnology, Biology, or Technical Vocational subject.<br>• Minimum qualifying aggregate marks in PCM: <strong>45% for Unreserved (General) / EWS</strong> and <strong>40% for SC / ST / OBC (Non-Creamy Layer)</strong> of Madhya Pradesh domicile.<br>• Valid JEE Main CRL rank is required for DTE counseling participation."
  },
  {
    id: "admission_cutoffs_trend",
    category: "admissions",
    questions: [
      "what is cutoff for mits", "mits jee main cutoff", "cse cutoff rank", "it cutoff rank",
      "what rank needed for mits", "mits closing rank", "cutoff kitna jata hai"
    ],
    answer: "Cutoffs at MITS Gwalior depend on MP DTE counseling round, category, and domicile. Indicative closing CRL ranks (General MP Domicile):<br>• <strong>CSE:</strong> ~35,000 – 60,000<br>• <strong>IT:</strong> ~60,000 – 85,000<br>• <strong>AI & Data Science:</strong> ~65,000 – 90,000<br>• <strong>ECE / ET:</strong> ~90,000 – 1,25,000<br>• <strong>EE / ME / CE:</strong> ~1,30,000 – 2,20,000+<br><em>Note: Cutoffs fluctuate each year. Use our Admission Calculator for a customized evaluation.</em><br><br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"admission\"><i class=\"fas fa-calculator\"></i> Check Your Eligibility</button>"
  },

  // 5. ACADEMIC REGULATIONS, GRADING & ATTENDANCE
  {
    id: "attendance_75_rule",
    category: "attendance",
    questions: [
      "what is attendance rule", "minimum attendance required", "75 percent attendance",
      "is 75 percent compulsory", "attendance rules in mits", "condonation rule",
      "medical leave rule", "can i sit in exam with 70 attendance", "attendance kitni chahiye",
      "detention rule"
    ],
    answer: "<strong>MITS Autonomous Academic Attendance Regulations:</strong><br>• <strong>Mandatory 75% Rule:</strong> Every student must maintain at least <strong>75% attendance</strong> in theory and practical sessions for each registered course to be eligible for End-Semester Examinations.<br>• <strong>Condonation Zone (65.0% – 74.9%):</strong> Shortage up to 10% may be condoned by the Director exclusively on genuine grounds (certified hospitalization within 3 working days or official college representation in national competitions/sports/NCC).<br>• <strong>Strict Detention (&lt; 65%):</strong> Below 65% attendance results in debarment (detention) from semester exams for that course.<br><br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"attendance\"><i class=\"fas fa-user-check\"></i> Open Attendance Tracker</button><br><div class=\"chat-source-tag\"><i class=\"fas fa-balance-scale\"></i> Source: MITS Autonomous Academic Ordinance</div>"
  },
  {
    id: "grading_system_sgpa_cgpa",
    category: "academic",
    questions: [
      "grading system in mits", "how is sgpa calculated", "cgpa formula",
      "10 point grading scale", "grade point table", "how to convert cgpa to percentage",
      "o grade marks", "f grade", "sgpa kaise banta hai", "cgpa percentage formula"
    ],
    answer: "MITS Gwalior follows a <strong>10-Point Absolute Grading System</strong>:<br>• <strong>O (Outstanding):</strong> 90–100% (Grade Point 10)<br>• <strong>A+ (Excellent):</strong> 80–89% (Grade Point 9)<br>• <strong>A (Very Good):</strong> 70–79% (Grade Point 8)<br>• <strong>B+ (Good):</strong> 60–69% (Grade Point 7)<br>• <strong>B (Above Average):</strong> 55–59% (Grade Point 6)<br>• <strong>C (Average):</strong> 50–54% (Grade Point 5)<br>• <strong>P (Pass):</strong> 40–49% (Grade Point 4)<br>• <strong>F (Fail/Backlog):</strong> &lt;40% (Grade Point 0)<br><br>• <strong>SGPA Formula:</strong> &Sigma;(Credits &times; Grade Points) / &Sigma;(Semester Credits)<br>• <strong>CGPA to Percentage (AICTE):</strong> Equivalent % = (CGPA - 0.75) &times; 10<br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"explain\"><i class=\"fas fa-book-reader\"></i> View Grading Guide</button>"
  },
  {
    id: "backlog_rules",
    category: "academic",
    questions: [
      "what if i fail a subject", "backlog rule in mits", "how to clear backlog",
      "re exam rules", "re appear exam", "year back rule", "backlog kaise clear kare"
    ],
    answer: "If you obtain an <strong>F grade</strong> (&lt;40% marks) in a course, it is deemed an active backlog.<br>• <strong>Remedy:</strong> You must reregister and appear in the Supplementary / Remedial Examination or along with subsequent regular semester end-term exams upon filling the examination form.<br>• <strong>Promotion Criteria:</strong> Promotion to higher years requires clearing minimum specified credits under the autonomous credit scheme to avoid academic probation."
  },

  // 6. FEES & HOSTEL EXPENSES
  {
    id: "fees_structure_btech",
    category: "fees",
    questions: [
      "what is btech fees in mits", "mits tuition fee", "per semester fees",
      "mits annual fees", "total fees for 4 years", "first year fees", "kya fees hai mits ki",
      "fees kitni hai"
    ],
    answer: "<strong>B.Tech Fee Structure at MITS Gwalior (Indicative Official Breakdown):</strong><br>• <strong>Tuition & Academic Fees:</strong> Approx. <strong>₹62,000 – ₹72,000 per semester</strong> (Aided core branches ~₹62,000; Self-financing programs like IT, AI/ML, IoT ~₹68,000–₹72,000).<br>• <strong>First-Year Total:</strong> Approx. <strong>₹1,28,000 – ₹1,38,000 annually</strong> (includes one-time refundable caution deposit ₹7,000, registration charges, and exam fees).<br>• <strong>TFW Seats:</strong> Selected Tuition Fee Waiver candidates are exempted from the base tuition fee component.<br><div class=\"chat-source-tag\"><i class=\"fas fa-receipt\"></i> Source: MITS Finance Section & Fee Circulars</div>"
  },
  {
    id: "hostel_mess_fees",
    category: "hostel",
    questions: [
      "mits hostel fees", "hostel facility in mits", "hostel for boys", "girls hostel mits",
      "mess fees", "is hostel compulsory", "hostel room rent", "hostel kaisa hai", "hostel fees kitni hai"
    ],
    answer: "<strong>MITS Hostel Facilities & Fee Estimates:</strong><br>• <strong>Hostel Blocks:</strong> 4 on-campus Boys Hostels (Hostel 1, 2, 3, 4) and dedicated Girls Hostel complex with 24/7 security, Wi-Fi, study rooms, and mess.<br>• <strong>First Semester Hostel Cost:</strong> Approx. <strong>₹62,000</strong> (Room rent ₹25,000 + One-time development ₹12,000 + Caution deposit ₹7,000 refundable + Mess advance ₹18,000).<br>• <strong>Subsequent Semesters:</strong> Approx. <strong>₹43,000 per semester</strong>.<br>• <strong>Curfew & Discipline:</strong> 9:30 PM entry curfew strictly monitored via biometric logging."
  },

  // 7. CAMPUS INFRASTRUCTURE & FACILITIES
  {
    id: "central_library",
    category: "facilities",
    questions: [
      "tell me about library", "mits central library", "library timings", "how many books in library",
      "digital library", "ieee access", "library kab tak khula rehta hai"
    ],
    answer: "The <strong>Central Library</strong> at MITS Gwalior is a three-story knowledge hub with:<br>• Over <strong>1,00,000+ physical volumes</strong>, technical textbooks, reference compendiums, and rare manuscripts.<br>• <strong>Digital Consortia:</strong> Subscribed IEEE Xplore, ScienceDirect, Springer, and DELNET digital access.<br>• <strong>Timings:</strong> 8:00 AM to 8:00 PM on all working academic days.<br>• Features air-conditioned quiet reading halls, digital e-learning zone, and reprography services."
  },
  {
    id: "central_computer_centre",
    category: "facilities",
    questions: [
      "central computer centre", "ccc mits", "computer lab", "internet facility",
      "wifi speed", "software labs in mits"
    ],
    answer: "The <strong>Central Computer Centre (CCC)</strong> is equipped with 150+ high-performance workstations connected via a high-speed fiber-optic campus backbone. It runs licensed software including MATLAB, AutoCAD, Oracle, and Linux development suites, serving institute-wide online examinations, lab practicals, and coding events."
  },
  {
    id: "campus_health_centre",
    category: "facilities",
    questions: [
      "medical facility in mits", "dispensary", "health centre", "doctor on campus",
      "emergency medical service", "hospital nearby"
    ],
    answer: "MITS Gwalior maintains an on-campus <strong>Dispensary / Health Centre</strong> staffed with a qualified Resident Medical Officer and nursing staff. Provides free routine check-ups, first-aid, emergency stabilization, and an on-call ambulance service. Located close to the residential hostel zone."
  },
  {
    id: "bank_atm_facility",
    category: "facilities",
    questions: [
      "bank on campus", "sbi branch mits", "atm facility", "cash withdrawal in college",
      "bank kahan hai"
    ],
    answer: "A full-service branch of the <strong>State Bank of India (SBI)</strong> with a <strong>24/7 ATM kiosk</strong> is operational on the MITS campus near the Main Gate (Race Course Road). Students and faculty can pay semester fees, maintain savings accounts, and withdraw cash safely."
  },

  // 8. PLACEMENTS & INTERNSHIPS
  {
    id: "placements_tnp",
    category: "placements",
    questions: [
      "mits placement", "placement percentage", "highest package in mits",
      "average package mits", "top companies visiting mits", "tnp cell",
      "placement kaisa hai", "highest salary mits"
    ],
    answer: "<strong>Training & Placement Cell (T&P) Highlights:</strong><br>• <strong>Track Record:</strong> Over 80% eligible students placed across leading software, engineering, and consulting firms.<br>• <strong>Packages:</strong> Highest domestic package has reached <strong>₹28 LPA</strong>; average package for IT & CSE branches is around <strong>₹6.5 – ₹7.5 LPA</strong>.<br>• <strong>Prominent Recruiters:</strong> TCS (Digital & Ninja), Infosys, Wipro, Cognizant, L&T Technology Services, Capgemini, Accenture, Persistent Systems, and Hexaware.<br>• <strong>Contact:</strong> tnp@mitsgwalior.in | Scindia Admin Block, 2nd Floor."
  },

  // 9. ACADEMIC CALENDAR & EXAMINATIONS
  {
    id: "academic_calendar_schedule",
    category: "calendar",
    questions: [
      "when are mid sem exams", "academic calendar", "end sem exams date",
      "when do classes start", "exam schedule", "diwali holidays", "winter vacation",
      "exams kab honge"
    ],
    answer: "The MITS Academic Calendar for the Odd Semester runs as follows:<br>• <strong>Commencement of Classes:</strong> Mid-August<br>• <strong>Mid-Sem Test 1 (MST-1):</strong> Late September / Early October<br>• <strong>Mid-Sem Test 2 (MST-2):</strong> Early November<br>• <strong>Practical Viva / Lab Exams:</strong> Mid-to-late November<br>• <strong>End-Semester Theory Examinations:</strong> December<br><br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"calendar\"><i class=\"fas fa-calendar-alt\"></i> Open Academic Calendar</button>"
  },

  // 10. HINGLISH NATURAL QUERIES & MISCELLANEOUS
  {
    id: "hinglish_attendance_query",
    category: "attendance",
    questions: [
      "attendance kam hai to kya hoga", "bunk mar sakta hu kya", "attendance 75 se kam hai",
      "medical lagane se attendance badhegi kya", "detain ho jaunga kya"
    ],
    answer: "Agar aapki attendance <strong>75% se kam</strong> hai:<br>• <strong>65% se 74.9%:</strong> Valid medical certificate ya college representation certificate jama karke Director sir se 10% tak condonation (relaxation) mil sakti hai.<br>• <strong>65% se kam:</strong> Course me debar (detain) ho jayenge aur semester exam nahi dene diya jayega.<br><br><button class=\"btn btn-secondary chat-action-nav-btn\" data-target=\"attendance\"><i class=\"fas fa-calculator\"></i> Check Safe Bunk Allowance</button>"
  },
  {
    id: "hinglish_clc_query",
    category: "admissions",
    questions: [
      "clc round kya hota hai", "college level counseling kaise hoti hai",
      "seat bachi hai kya", "direct admission hota hai kya mits me"
    ],
    answer: "<strong>College Level Counseling (CLC):</strong> MP DTE ke online counseling rounds ke baad jo seats vacant reh jaati hain, unke liye MITS campus me physical CLC round organize hota hai. Candidates ko MP Online par CLC registration karke original documents aur fee ke sath MITS campus me physically present hona padta hai."
  },
  {
    id: "campus_timings",
    category: "college_overview",
    questions: [
      "college timings", "working hours", "classes time", "office timings",
      "college kab open hota hai", "working days"
    ],
    answer: "<strong>MITS Working Hours:</strong><br>• <strong>Academic Classes:</strong> 9:00 AM to 4:30 PM (Monday to Friday; selective lab slots on Saturday).<br>• <strong>Administrative Offices:</strong> 9:00 AM to 5:00 PM (Monday to Saturday; 2nd & 4th Saturdays are official holidays).<br>• <strong>Central Library:</strong> 8:00 AM to 8:00 PM."
  }
];

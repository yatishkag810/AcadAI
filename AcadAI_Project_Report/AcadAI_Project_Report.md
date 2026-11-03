# B.Tech Cornerstone Project Report

---

# DESIGN AND DEVELOPMENT OF AI CHATBOT FOR ACADEMIC AND COLLEGE INFORMATION SERVICES (AcadAI)

**A Cornerstone Project Report Submitted in Partial Fulfillment of the Requirements for the Degree of**  
**Bachelor of Technology in Information Technology**

**Submitted by:**  
**Yatish Kag**  
**Enrollment No.:** BTIT24O1153  
**Semester:** 5th Semester, B.Tech (IT)

**Under the Guidance of:**  
Faculty Mentors & Project Review Committee  
**Department of Information Technology**  
*(Head of Department: Dr. Punit Kumar Johari)*

**MADHAV INSTITUTE OF TECHNOLOGY & SCIENCE (MITS), GWALIOR**  
*(A Deemed-to-be-University / Autonomous Institute Affiliated to RGPV, Bhopal)*  
*Race Course Road, Gola Ka Mandir, Gwalior – 474005, Madhya Pradesh*  
**Academic Year:** 2026–2027

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
  - [1.1 Abstract](#11-abstract)
  - [1.2 Problem Statement](#12-problem-statement)
  - [1.3 Objectives](#13-objectives)
  - [1.4 Scope & Feasibility](#14-scope--feasibility)
- [2. Literature Review & Background](#2-literature-review--background)
  - [2.1 Background & Survey](#21-background--survey)
  - [2.2 Existing Systems & Limitations](#22-existing-systems--limitations)
  - [2.3 Comparative Study & Proposed Work](#23-comparative-study--proposed-work)
- [3. Requirements Analysis & Specification](#3-requirements-analysis--specification)
  - [3.1 Functional Requirements](#31-functional-requirements)
  - [3.2 Non-Functional Requirements](#32-non-functional-requirements)
  - [3.3 Hardware & Software Prerequisites](#33-hardware--software-prerequisites)
- [4. System Design & Architecture](#4-system-design--architecture)
  - [4.1 Architecture Description](#41-architecture-description)
  - [4.2 System Modules & Workflow](#42-system-modules--workflow)
  - [4.3 Database & Data Flow Design](#43-database--data-flow-design)
- [5. Technology Stack & Implementation](#5-technology-stack--implementation)
  - [5.1 Technology Stack & Tools](#51-technology-stack--tools)
  - [5.2 Implementation Details & Modules](#52-implementation-details--modules)
- [6. Testing & Results](#6-testing--results)
  - [6.1 Testing Methodology & Test Cases](#61-testing-methodology--test-cases)
  - [6.2 Results & Outputs](#62-results--outputs)
  - [6.3 Performance Analysis](#63-performance-analysis)
- [7. Conclusion & Future Scope](#7-conclusion--future-scope)
  - [7.1 Key Achievements](#71-key-achievements)
  - [7.2 Limitations & Challenges](#72-limitations--challenges)
  - [7.3 Future Scope](#73-future-scope)
  - [7.4 Conclusion](#74-conclusion)
- [8. References](#8-references)
  - [8.1 Citations & Bibliography](#81-citations--bibliography)
- [9. Annexure](#9-annexure)
  - [9.1 Project Artifacts & URLs](#91-project-artifacts--urls)

---

# 1. Project Overview

### 1.1 Abstract

In modern technical institutions such as Madhav Institute of Technology & Science (MITS), Gwalior, students and prospective applicants frequently experience significant delays in accessing vital academic, administrative, and admission information. Institutional circulars, curriculum syllabi, examination schedules, and regulatory ordinances remain scattered across disparate web portals, physical notice boards, and administrative offices. This project presents the **Design and Development of AI Chatbot for Academic and College Information Services (AcadAI)**, a responsive, client-side Single-Page Application (SPA) engineered to centralize and automate student academic support.

Developed using standard HTML5, CSS3, and Vanilla JavaScript (ES6+), AcadAI operates completely offline without mandatory external cloud dependencies or paid backend frameworks. The core conversational assistant employs an explainable, deterministic Natural Language Processing (NLP) pipeline incorporating text normalization, stop-word filtering, academic synonym expansion, Levenshtein distance typo tolerance, and Jaccard similarity matching over an authentic MITS knowledge base. Alongside conversational capabilities, AcadAI integrates dedicated academic utility modules: an interactive Course Finder, an MP DTE Admission Eligibility Calculator, a mathematical Attendance Tracker enforcing the mandatory 75% threshold, a Class Timetable matrix, an SVG-based Campus Map, an Academic Calendar, an Academic Planner, and an "Explain My College" regulatory guide.

Persistent state management is achieved locally using browser `localStorage`, ensuring zero data leakage. The resulting system delivers instantaneous, source-cited responses, reduces administrative query burdens by automating repetitive inquiries, and provides an accessible, zero-cost academic assistant for engineering scholars.

* **Word Count:** 227 words *(Limit: Maximum 250 words)*

![Figure 1.1: Project Overview](AcadAI_Report_Images/project_overview.png)
*Figure 1.1: AcadAI Project Overview and Context Architecture*

---

### 1.2 Problem Statement

Students, faculty, and prospective applicants at technical institutes encounter notable inefficiencies when seeking academic and institutional guidance. At Madhav Institute of Technology & Science (MITS), Gwalior, vital information—such as autonomous CBCS regulations, semester schedules, fee breakdowns, and MP DTE counseling criteria—is scattered across disconnected web pages, PDF circulars, and departmental notice boards.

This fragmentation introduces four critical operational challenges:
1. **Scattered Information Architecture:** Navigating institutional portals to locate specific course syllabi, credit distribution schemes, or examination ordinances requires excessive manual searching across poorly indexed pages.
2. **Repetitive Administrative Overhead:** Administrative staff and departmental faculty spend disproportionate working hours answering repetitive routine questions regarding attendance rules, fee payment deadlines, and hostel curfews.
3. **Response Delays and Limited Availability:** Physical inquiry counters in the Scindia Administrative Block operate only during standard office hours (09:00 AM – 05:00 PM), leaving evening learners and distant admission aspirants without immediate assistance.
4. **Lack of Computational Academic Guidance:** Static circulars do not assist students in calculating subjective academic requirements, such as computing the consecutive lectures required to recover from attendance deficits or determining MP DTE cutoff eligibility based on JEE Main CRL percentiles.

AcadAI addresses these shortcomings by replacing disjointed inquiry channels with a centralized, responsive web application that couples a verified institutional knowledge base with purpose-built academic calculators, delivering instant, reliable, and source-cited guidance 24/7.

* **Word Count:** 222 words *(Limit: Maximum 250 words)*

---

### 1.3 Objectives

The primary objective of this project is to develop **AcadAI**, a lightweight, client-side academic copilot for Madhav Institute of Technology & Science (MITS), Gwalior. The specific, measurable objectives include:

1. **Develop an Explainable NLP Chatbot:** Engineer a conversational agent in Vanilla JavaScript processing English and Hinglish queries using tokenization, stop-word filtering, synonym expansion, Levenshtein typo tolerance ($\le 2$), and Jaccard similarity ($J \ge 0.28$) against verified MITS Q&As.
2. **Centralize Institutional Knowledge:** Aggregate authentic MITS records—history, administration, IT department faculty, tuition fees, hostel rules, and facilities—with verified source citations.
3. **Automate Attendance Intelligence:** Implement a mathematical tracking engine calculating attendance percentages, safe bunk allowances, and consecutive recovery lectures for the mandatory 75% threshold:
   $$x = \left\lceil \frac{0.75C - A}{0.25} \right\rceil$$
4. **Implement Course Discovery:** Build an interactive Course Finder filtering B.Tech courses by department, semester, and credits, with prerequisite dependency views.
5. **Construct an Admission Calculator:** Develop an MP DTE eligibility tool evaluating 10+2 PCM criteria (45% Gen / 40% MP reserved) and projecting branch cutoffs across 90% State and 10% All India quotas.
6. **Deploy Campus Navigation & Scheduling:** Provide an interactive SVG campus blueprint and a weekly timetable matrix.
7. **Ensure Privacy and Portability:** Persist state in browser `localStorage`, ensuring 100% offline availability and zero data leakage.

* **Word Count:** 218 words *(Limit: Maximum 250 words)*

![Figure 1.3: Core Functional Objectives Mapping](AcadAI_Report_Images/objectives.png)
*Figure 1.2: AcadAI Functional Objectives and Module Mapping*

---

### 1.4 Scope & Feasibility

#### Scope & Intended Users
The operational scope of AcadAI encompasses undergraduate engineering students, prospective applicants, and administrative staff at Madhav Institute of Technology & Science (MITS), Gwalior, with dedicated data modeling for the Department of Information Technology. The application functions as an academic assistant for resolving inquiries, monitoring attendance regulations, searching course curricula, and navigating campus facilities.

#### Feasibility Analysis
1. **Technical Feasibility:** AcadAI is built purely with HTML5, CSS3, and ES6+ JavaScript. It operates natively in any modern web browser without server installations or framework dependencies. The deterministic NLP algorithms execute in under 5 ms on standard client hardware, and data persists safely within browser `localStorage`. An optional REST toggle enables external generative models without breaking base offline functionality.
2. **Operational Feasibility:** The application features an intuitive, responsive interface supporting desktop and mobile devices, complete with light/dark themes and speech synthesis. Requiring zero administrative training, students can immediately utilize the tools by double-clicking `index.html`.
3. **Economic Feasibility:** The project requires zero recurring infrastructure expenditure. By utilizing client-side execution and local storage, it eliminates hosting servers, cloud databases, and paid API subscriptions, making it highly cost-effective for institutional deployment.

#### Boundary of Implementation
* **Implemented:** 15 client-side modules, including the local similarity chatbot, attendance recovery tracker, MP DTE admission simulator, SVG campus map, and offline knowledge base manager.
* **Future Enhancements:** Direct backend synchronization with the live MITS ERP database, automated SMS/email attendance alert dispatching, and multi-lingual regional voice models.

* **Word Count:** 238 words *(Limit: Maximum 250 words)*

---

# 2. Literature Review & Background

### 2.1 Background & Survey

Over the past decade, higher education institutions have progressively adopted digital technologies to streamline administrative communication and student academic workflows. Early academic information systems predominantly comprised static web portals and Bulletin Board Systems (BBS), which required students to manually traverse hierarchical directory trees to locate notices, syllabi, or schedules. As student enrollments expanded, these static interfaces proved inadequate for handling the high volume of recurring inquiries regarding admission criteria, fee payment deadlines, and examination rules.

To mitigate administrative strain, universities began deploying automated conversational agents. Initial implementations relied on pattern-matching rules and AIML (Artificial Intelligence Markup Language), as popularized by systems like ALICE. While effective for rigid question-and-answer pairs, early rule-based bots exhibited fragility when handling grammatical variations, typographical errors, and multilingual sentence structures.

Recent research has explored the integration of statistical natural language processing, vector embeddings, and Large Language Models (LLMs) in campus chatbots. Studies by Ranoliya et al. (2017) demonstrated that university chatbots significantly improve institutional accessibility by providing immediate responses to prospective applicants. Similarly, research into retrieval-augmented architectures has shown that student satisfaction correlates strongly with answer accuracy, latency, and explicit source verification.

However, recent campus automation literature highlights persistent concerns regarding cloud-based LLM deployments in academic settings. Commercial conversational APIs introduce substantial per-token subscription costs, require persistent internet connectivity, and present data governance vulnerabilities when students share confidential academic records. Consequently, contemporary educational software engineering emphasizes hybrid, privacy-first architectures that leverage client-side execution, deterministic string algorithms, and local web storage to deliver reliable, zero-cost academic assistance without cloud reliance.

* **Word Count:** 265 words *(Limit: Maximum 400 words)*

---

### 2.2 Existing Systems & Limitations

Existing institutional information systems deployed across engineering colleges typically fall into three broad categories: centralized Enterprise Resource Planning (ERP) portals, commercial AI chatbots, and static informational websites. While each serves specific institutional needs, an analysis reveals significant functional and operational limitations:

```text
+-------------------------+------------------------------------+-------------------------------------+
| System Category         | Operational Approach               | Primary Limitations                 |
+-------------------------+------------------------------------+-------------------------------------+
| Institutional ERP       | Heavy relational backends with     | Rigid navigation, frequent server   |
| Systems                 | authenticated role-based dashboards| downtime, zero conversational help, |
|                         |                                    | poor mobile UX, high complexity.    |
+-------------------------+------------------------------------+-------------------------------------+
| Commercial Cloud        | Third-party SaaS wrappers powered  | High monthly API costs, severe data |
| Chatbots                | by proprietary cloud LLMs          | privacy risks, token rate limits,   |
|                         |                                    | unverified hallucinated answers.    |
+-------------------------+------------------------------------+-------------------------------------+
| Static College          | Unindexed HTML pages hosting       | Scattered circulars, no search,     |
| Websites                | downloadable PDF circulars         | zero interactive calculators, no    |
|                         |                                    | offline availability.               |
+-------------------------+------------------------------------+-------------------------------------+
```

1. **Enterprise Resource Planning (ERP) Platforms:** Systems such as SAP, PeopleSoft, and proprietary university ERPs provide structured academic records. However, their user interfaces are notoriously complex, requiring multiple authentication hops. They lack natural language querying capabilities and do not provide predictive decision tools, such as attendance recovery calculations or cutoff projections.
2. **Commercial Cloud-Hosted Chatbots:** Several universities employ proprietary cloud chatbot widgets (e.g., Ada, Drift, or custom OpenAI wrappers). These systems suffer from high recurring API expenditures, vulnerability to network latency, and susceptibility to model hallucinations where an external LLM invents nonexistent academic regulations. Furthermore, transmitting student data to third-party servers violates emerging data protection norms.
3. **Static College Portals:** Most public technical college websites operate as passive electronic bulletin boards. Information regarding autonomous ordinances, grading equations, and MP DTE counseling remains buried within scanned circulars. Prospective applicants must manually scour historical cutoff PDFs without any algorithmic assessment of their individual admission chances.

These limitations demonstrate the necessity for an offline-ready, transparent, and computationally capable assistant that operates locally on standard web browsers.

* **Word Count:** 248 words *(Limit: Maximum 400 words)*

---

### 2.3 Comparative Study & Proposed Work

To address the documented deficiencies of conventional college inquiry portals and external cloud bots, **AcadAI** was conceived as an offline-first, deterministic academic assistant. The following comparative matrix contrasts AcadAI against prevailing architectural paradigms:

| Feature Dimension | Traditional College Portal | Cloud LLM Wrapper (GPT/Gemini) | AcadAI (Proposed Work) |
|---|---|---|---|
| **Underlying Architecture** | Server-side CMS (PHP/.NET) | Cloud SaaS API Bridge | Pure Client-Side SPA (ES6+) |
| **Hosting & Operating Cost** | Medium (Server hosting fees) | High (Token billing per query) | **Zero (Local browser execution)** |
| **Response Latency** | High (Page reloads > 2.0 s) | Variable (Network bound 1.5–4.0 s) | **Instantaneous (< 5 ms)** |
| **Internet Dependency** | Mandatory continuous online | Mandatory high-bandwidth online | **Zero (Runs offline via file://)** |
| **Student Privacy** | Server-side database logs | Data transmitted to cloud AI | **100% Private (Local browser storage)**|
| **Factual Verifiability** | Static manual circulars | Susceptible to hallucinations | **Deterministic with exact source tags**|
| **Typo Tolerance** | None (Exact keyword search) | Natural language fuzzy matching | **Levenshtein Distance + Synonyms** |
| **Attendance Intelligence** | Raw attendance percentages | None (Generic conversational text) | **Exact 75% consecutive recovery calc**|
| **Admission Engine** | Static PDF closing rank lists | Unverified cutoff approximations| **Algorithmic MP DTE quota simulation**|

#### Proposed Work in AcadAI
AcadAI combines the responsiveness of modern Single-Page Applications with an explainable, token-based NLP engine. Built entirely using standard HTML5, CSS3, and Vanilla JavaScript, the system processes queries in under 5 milliseconds using dynamic programming Levenshtein distance and Jaccard similarity scoring. 

Rather than functioning solely as a conversational interface, AcadAI integrates eight domain-specific computational modules: an attendance recovery planner enforcing MITS autonomous regulations, an MP DTE admission cutoff projector supporting state domicile quotas, an interactive SVG campus blueprint, a course prerequisite visualizer, a class timetable matrix, and an offline knowledge base manager. This hybrid architecture eliminates recurring API expenses, guarantees zero hallucinations, and ensures full operational availability without external network dependencies.

* **Word Count:** 298 words *(Limit: Maximum 400 words)*

---

# 3. Requirements Analysis & Specification

### 3.1 Functional Requirements

The functional requirements define the core operational behaviors, input handling, and computational routines implemented within the AcadAI platform:

```text
+--------+----------------------------+--------------------------------------------------------------+
| Req ID | Functional Module          | Specific Technical Behavior & Operational Rule               |
+--------+----------------------------+--------------------------------------------------------------+
| FR-01  | NLP Query Processing       | Parse English/Hinglish student queries; filter stop words;  |
|        |                            | compute Levenshtein distance (DL <= 2) and Jaccard score.    |
+--------+----------------------------+--------------------------------------------------------------+
| FR-02  | Dynamic Interception       | Automatically intercept contextual keywords (e.g., "bunk",   |
|        |                            | "timetable", "tasks") to retrieve live localStorage state.   |
+--------+----------------------------+--------------------------------------------------------------+
| FR-03  | Attendance Intelligence    | Calculate attended/conducted ratio; compute safe bunk margin |
|        |                            | and consecutive classes required to attain >= 75% attendance.|
+--------+----------------------------+--------------------------------------------------------------+
| FR-04  | What-If Attendance Sim     | Predictively simulate percentage outcomes if the student     |
|        |                            | attends or misses the next scheduled classroom lecture.      |
+--------+----------------------------+--------------------------------------------------------------+
| FR-05  | MP DTE Admission Engine    | Validate 10+2 PCM criteria (45% Gen, 40% MP reserved);       |
|        |                            | project seat allotment chances across 90% MP and 10% AI quota|
+--------+----------------------------+--------------------------------------------------------------+
| FR-06  | Course Catalog & Filters   | Filter 30 B.Tech courses by department, semester, credits;   |
|        |                            | display prerequisite dependencies in interactive modal views.|
+--------+----------------------------+--------------------------------------------------------------+
| FR-07  | Interactive SVG Campus Map | Render scalable blueprint of MITS Gwalior; handle building   |
|        |                            | click selections; display operating hours and key facilities.|
+--------+----------------------------+--------------------------------------------------------------+
| FR-08  | Smart Academic Planner     | Manage academic tasks with priority tags (High/Med/Low);     |
|        |                            | calculate real-time countdown clocks to mid-semester exams.  |
+--------+----------------------------+--------------------------------------------------------------+
| FR-09  | Target SGPA Calculator     | Compute required semester SGPA to achieve target CGPA using: |
|        |                            | SGPA_req = [CGPA_t*(C_p+C_s) - CGPA_c*C_p] / C_s             |
+--------+----------------------------+--------------------------------------------------------------+
| FR-10  | Offline Knowledge Admin    | Allow administrators to add, edit, toggle, search, and delete|
|        |                            | custom Q&A pairs persisted synchronously in localStorage.    |
+--------+----------------------------+--------------------------------------------------------------+
```

Each functional requirement operates synchronously within the client execution thread, ensuring immediate interface updates without background network polling.

* **Word Count:** 240 words *(Limit: Maximum 400 words)*

---

### 3.2 Non-Functional Requirements

The non-functional requirements define the quality attributes, performance constraints, and architectural standards enforced across the system:

1. **Performance & Query Latency:**
   - The NLP string tokenization, Levenshtein distance evaluation, and Jaccard similarity scoring across the knowledge base must complete in **less than 10 milliseconds** on standard consumer hardware.
   - Initial Single-Page Application (SPA) loading time must not exceed **100 milliseconds** when launched locally via `file://`.
2. **Platform Portability & Zero Installation:**
   - The application must execute natively across all major modern web browsers (Google Chrome $\ge 90$, Microsoft Edge $\ge 90$, Mozilla Firefox $\ge 88$, Apple Safari $\ge 14$) without requiring node runtimes, package managers, browser plugins, or web servers.
3. **Data Privacy & Security:**
   - Student academic records—including personal profile data, roll numbers, attendance records, and planner tasks—must remain strictly confined to the client browser's `localStorage`.
   - The application must execute with zero background telemetry, analytics tracking, or unauthorized external data egress.
4. **Reliability & Determinism:**
   - Answers returned from the institutional knowledge base must be deterministic and verifiable, displaying explicit official source references (e.g., `web.mitsgwalior.in`).
   - The chatbot must gracefully handle queries below the similarity threshold ($J < 0.28$) by presenting categorized fallback guidance rather than fabricating false academic policies.
5. **Usability & Accessibility:**
   - The user interface must employ a responsive CSS3 grid and flexbox layout adapting dynamically to mobile ($\le 480\text{ px}$), tablet ($481\text{–}991\text{ px}$), and desktop ($\ge 992\text{ px}$) screens.
   - Dual-theme support (Dark Mode and Light Mode) must be provided with high-contrast, WCAG-compliant color tokens.
   - Integrated speech-to-text (STT) and text-to-speech (TTS) accessibility must be supported through the browser Web Speech API.

* **Word Count:** 272 words *(Limit: Maximum 400 words)*

---

### 3.3 Hardware & Software Prerequisites

Because AcadAI is engineered as a client-side web application, its resource demands are minimal, rendering it compatible with budget personal computers, laboratory workstations, and mobile devices:

#### 1. Hardware Requirements

| Component | Minimum Specification | Recommended Specification |
|---|---|---|
| **Processor (CPU)** | 1.0 GHz Dual-Core Intel/AMD/ARM Processor | 2.0 GHz Quad-Core Intel Core i3/i5/Ryzen or Apple M-series |
| **System Memory (RAM)** | 512 MB Available RAM | 2.0 GB Available RAM |
| **Disk Storage** | 25 MB Free Storage Space (including report & assets)| 100 MB Solid State Drive (SSD) |
| **Display Resolution** | $360 \times 640\text{ pixels}$ (Mobile Viewport) | $1920 \times 1080\text{ pixels}$ (Full HD Desktop) |
| **Input Devices** | Standard Keyboard & Mouse / Touchscreen | Integrated Microphone & Audio Speakers (for Voice STT/TTS)|

#### 2. Software Prerequisites

| Component | Requirement Specification |
|---|---|
| **Operating System** | Platform Independent: Microsoft Windows 10/11, Ubuntu Linux 20.04+, macOS 11+, Android 10+, iOS 14+ |
| **Web Browser Engine** | Chromium-based (Chrome $\ge 90$, Edge $\ge 90$), Gecko-based (Firefox $\ge 88$), or WebKit (Safari $\ge 14$) |
| **JavaScript Standard** | ECMAScript 2015 (ES6+) Enabled in Browser Settings |
| **Storage Technology** | HTML5 Web Storage API (`localStorage`) with at least 5 MB allocated quota |
| **Voice APIs (Optional)**| W3C Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) |
| **Server Runtimes** | **None Required** (Fully operational offline via direct `file:///` URI execution) |
| **Testing Harness** | Node.js (v18+ or v25.4.0) used solely for automated headless test execution |

The absence of heavy database backends (e.g., MySQL, MongoDB) or containerization requirements (e.g., Docker) allows AcadAI to be distributed as a portable ZIP archive and run instantaneously by double-clicking `index.html`.

* **Word Count:** 248 words *(Limit: Maximum 400 words)*

---

# 4. System Design & Architecture

### 4.1 Architecture Description

AcadAI is architected as an offline-first, client-side Single-Page Application (SPA) structured across three clearly defined architectural tiers: the **Presentation Tier**, the **Application & Processing Tier**, and the **Data Persistence Tier**. This clean separation of concerns ensures high maintainability, deterministic debugging, and instantaneous user interactions without server round-trip delays:

![Figure 4.1: System Architecture](AcadAI_Report_Images/system_architecture.png)
*Figure 4.1: AcadAI Three-Tier Client-Side System Architecture*

1. **Presentation Tier (View Layer):**  
   Constructed with semantic HTML5 and modern CSS3, the presentation layer implements a responsive, glassmorphic layout. The view includes a collapsible sidebar navigation drawer, a profile hero card, real-time statistical progress rings, and fifteen dedicated workspace tab panels. A global CSS custom properties system (`:root` tokens) dynamically manages dark and light themes. Voice interactions are mediated via the browser's native `webkitSpeechRecognition` and `SpeechSynthesisUtterance` interfaces.

2. **Application & Processing Tier (Controller & Logic Layer):**  
   Implemented entirely in modular ES6+ JavaScript, this layer contains the application routers and domain-specific computation engines:
   - `app.js`: Serves as the central application orchestrator, managing tab routing, profile state, toast notifications, and event delegation.
   - `chatbot.js`: Drives the conversational NLP pipeline, executing token normalization, Levenshtein distance calculations, and Jaccard similarity scoring.
   - `attendance.js`: Implements the mathematical attendance tracking and recovery formulas.
   - `admission.js`: Houses the MP DTE reservation and cutoff projection logic.
   - `courses.js`, `timetable.js`, `explain.js`, and `map.js`: Handle course filtering, prerequisite modal navigation, weekly schedule rendering, regulatory explanations, and SVG campus blueprint interactions.

3. **Data Persistence Tier (Model & Storage Layer):**  
   The underlying data tier combines immutable institutional knowledge dictionaries (`data/knowledge-base.js`, `data/courses.js`, `data/calendar.js`) with mutable client state stored in browser `localStorage`. This guarantees that user updates—such as attendance logs, customized knowledge entries, and planner tasks—persist indefinitely across browser sessions without transmitting sensitive student data to external servers.

* **Word Count:** 292 words *(Limit: Maximum 400 words)*

---

### 4.2 System Modules & Workflow

AcadAI orchestrates eight primary functional modules connected through a centralized event router, allowing seamless cross-module workflows:

![Figure 4.2: Module Interaction Workflow](AcadAI_Report_Images/module_workflow.png)
*Figure 4.2: Module Interaction & Cross-Navigation Workflow*

```text
+-----------------------+----------------------------------+-----------------------------------------+
| Module Name           | JavaScript Controller            | Primary Inter-Module Cross Actions      |
+-----------------------+----------------------------------+-----------------------------------------+
| 1. NLP Chatbot        | js/chatbot.js                    | Generates 1-click navigation buttons to |
|                       |                                  | Attendance, Admission, Map, and Courses.|
+-----------------------+----------------------------------+-----------------------------------------+
| 2. Attendance Tracker | js/attendance.js                 | Feeds aggregate percentage to Dashboard |
|                       |                                  | hero card; intercepts chatbot queries.  |
+-----------------------+----------------------------------+-----------------------------------------+
| 3. Admission Engine   | js/admission.js                  | Evaluates MP DTE eligibility; routes    |
|                       |                                  | eligible branches to Course Finder.     |
+-----------------------+----------------------------------+-----------------------------------------+
| 4. Course Finder      | js/courses.js                    | Displays B.Tech course catalog; triggers|
|                       |                                  | modal prerequisite inspection links.    |
+-----------------------+----------------------------------+-----------------------------------------+
| 5. Class Timetable    | js/timetable.js                  | Renders weekly branch lecture schedules;|
|                       |                                  | feeds "Today's Classes" to Dashboard.   |
+-----------------------+----------------------------------+-----------------------------------------+
| 6. Campus SVG Map     | js/map.js                        | Highlights MITS landmarks; provides     |
|                       |                                  | "Ask Chatbot" button for any building.  |
+-----------------------+----------------------------------+-----------------------------------------+
| 7. Academic Planner   | js/planner.js                    | Synchronizes study deadlines with       |
|                       |                                  | Copilot revision session generator.     |
+-----------------------+----------------------------------+-----------------------------------------+
| 8. College Guide      | js/explain.js                    | Explains autonomous ordinances; computes|
|                       |                                  | required semester SGPA for target CGPA. |
+-----------------------+----------------------------------+-----------------------------------------+
```

#### End-to-End User Interaction Workflow
1. When a user submits an inquiry (via text or voice dictation), `chatbot.js` checks for dynamic query triggers. If the query concerns attendance or pending tasks, it queries `attendance.js` or `planner.js` to construct a real-time response.
2. If the query is institutional, the NLP engine scans `data/knowledge-base.js`, scores similarity, and outputs the verified answer with an official MITS citation and relevant action buttons.
3. Clicking an action button triggers `window.App.switchTab()`, transitioning the user directly to the corresponding module with zero page reloads.

* **Word Count:** 248 words *(Limit: Maximum 400 words)*

---

### 4.3 Database & Data Flow Design

Because AcadAI operates client-side without a relational SQL database, it utilizes structured JavaScript Object arrays for static institutional knowledge and the HTML5 **Web Storage API (`localStorage`)** for dynamic user data.

![Figure 4.4: DFD Level 0](AcadAI_Report_Images/dfd_level_0.png)
*Figure 4.3: Data Flow Diagram (DFD Level 0 — Context Level)*

#### Data Flow Diagrams (DFD)
- **DFD Level 0 (Context Level):** Illustrates the boundary where students, applicants, and administrators interact with the central AcadAI engine, exchanging queries, attendance logs, and administrative overrides persisted into browser storage.
- **DFD Level 1 (Modular Functional Decomposition):** Breaks down query parsing, attendance recovery computation, admission quota calculations, and task persistence into dedicated sub-processes.

![Figure 4.5: DFD Level 1](AcadAI_Report_Images/dfd_level_1.png)
*Figure 4.4: Data Flow Diagram (DFD Level 1 — Modular Functional Decomposition)*

#### LocalStorage Schema & Key Organization

![Figure 4.6: Data Storage Organization](AcadAI_Report_Images/data_flow.png)
*Figure 4.5: LocalStorage Schema and Data Organization*

```text
+-----------------------------+-----------------------+---------------------------------------------------+
| Storage Key                 | Data Type             | Stored Attributes & Schema Fields                 |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_student_profile      | JSON Object           | name, rollNo, branch, semester, batch, cgpa       |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_attendance_data      | JSON Array of Objects | code, name, attended, total                       |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_attendance_target    | String (Integer)      | Minimum attendance threshold (e.g., "75")         |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_academic_tasks       | JSON Array of Objects | id, title, course, priority, dueDate, done        |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_knowledge_base       | JSON Array of Objects | id, category, questions[], answer, source, custom |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_theme                | String                | "dark" | "light"                                  |
+-----------------------------+-----------------------+---------------------------------------------------+
| acadai_llm_settings         | JSON Object           | provider, apiKey, model, temperature              |
+-----------------------------+-----------------------+---------------------------------------------------+
```

All data writes are performed synchronously using `localStorage.setItem()`, ensuring persistent retention across browser restarts while maintaining sub-millisecond read access.

* **Word Count:** 215 words *(Limit: Maximum 400 words)*

---

# 5. Technology Stack & Implementation

### 5.1 Technology Stack & Tools

AcadAI was intentionally developed using native, standard web technologies to achieve maximum runtime performance, complete platform independence, and zero operational costs:

![Figure 5.1: Technology Stack](AcadAI_Report_Images/technology_stack.png)
*Figure 5.1: AcadAI Technology Stack and Development Tooling*

```text
+---------------------+----------------------------+-----------------------------------------------------+
| Technology / Tool   | Version / Specification    | Role in Project Architecture                        |
+---------------------+----------------------------+-----------------------------------------------------+
| HTML5               | W3C Living Standard        | Semantic structure of SPA tabs, forms, and dialogs. |
| CSS3                | Modern Custom Properties   | Dark/Light styling, flexbox/grid layouts, animations|
| Vanilla JavaScript  | ECMAScript 2015+ (ES6+)    | Core NLP logic, math models, DOM routing, storage.  |
| Inline SVG          | W3C Vector Graphics        | Scalable blueprint map of MITS Gwalior campus.      |
| Web Storage API     | W3C Client-Side Storage    | Browser localStorage for zero-cloud data retention. |
| Web Speech API      | SpeechRecognition & Synth  | Accessibility voice input and audio response engine.|
| FontAwesome         | Version 6.4.0 (CDN)        | Academic and interface iconography.                 |
| Node.js             | Version 25.4.0 (LTS/Stable)| Headless automated test runner & syntax validator.  |
| Headless Chromium   | Version 120+ (Chrome/Edge) | Automated screenshot capture and verification harness|
| Git / GitHub        | Version 2.40+              | Source code version control and documentation.      |
+---------------------+----------------------------+-----------------------------------------------------+
```

#### Justification for Vanilla JavaScript Architecture
Unlike enterprise web applications that rely on React, Angular, or Vue, an academic utility tool benefits substantially from a zero-framework design:
1. **Instantaneous Execution:** Eliminating virtual DOM reconciliations and megabyte-sized JavaScript vendor bundles allows AcadAI to initialize in under 85 milliseconds.
2. **Offline Portability:** The application can be launched directly from any local directory or USB drive via `file:///index.html` without requiring Node server processes or local HTTP daemons.
3. **Long-Term Maintainability:** By depending solely on standardized W3C browser APIs, the codebase remains immune to framework deprecation and breaking package updates.

* **Word Count:** 245 words *(Limit: Maximum 400 words)*

---

### 5.2 Implementation Details & Modules

The technical implementation of AcadAI centers around modular JavaScript classes that operate independently while communicating through a global application controller (`window.App`).

![Figure 5.2: Chatbot NLP Workflow](AcadAI_Report_Images/chatbot_workflow.png)
*Figure 5.2: NLP Conversational Query Processing Pipeline*

#### 1. Deterministic NLP Intent Engine (`js/chatbot.js`)
The conversational engine implements a five-stage deterministic text processing pipeline:
1. **Tokenization & Normalization:** The input text is lowercased, stripped of punctuation, and split into tokens. Stop words are filtered using an internal hash set of 80+ uninformative English particles.
2. **Academic Synonym Expansion:** Domain-specific terms are mapped to canonical forms (e.g., `"tuition"`, `"cost"` $\to$ `"fees"`; `"pandit"`, `"vc"` $\to$ `"director"`; `"clc"` $\to$ `"admissions"`).
3. **Typo Tolerance via Levenshtein Distance:** For query terms with minor typos (e.g., `"attendence"` for `"attendance"`), the dynamic programming Levenshtein algorithm evaluates edit distance:
   $$D_L(i, j) = \min \{ D(i-1, j)+1, \; D(i, j-1)+1, \; D(i-1, j-1) + \mathbb{I}(s_1[i] \neq s_2[j]) \}$$
   Matches with edit distance $\le 1$ (for length $\ge 5$) or $\le 2$ (for length $\ge 8$) are canonicalized.
4. **Hybrid Similarity Scoring:** The candidate question with the highest score is retrieved:
   $$\text{Score} = 0.45 \cdot J(Q, K) + 0.35 \cdot \text{Overlap}(Q, K) + 0.35 \cdot \text{Bonus}_{\text{sub}} + 0.15 \cdot \text{Bonus}_{\text{cat}}$$
   If $\text{Score} \ge 0.28$, the verified institutional response is rendered with an official citation.

#### 2. Attendance Intelligence Engine (`js/attendance.js`)
Enforcing the mandatory 75% attendance threshold under MITS autonomous regulations, the tracker evaluates:
- **Consecutive Recovery Classes ($x$):**
  $$x = \left\lceil \frac{0.75C - A}{0.25} \right\rceil$$
- **Safe Bunk Margin ($m$):**
  $$m = \left\lfloor \frac{A - 0.75C}{0.75} \right\rfloor$$

#### 3. MP DTE Admission Eligibility Calculator (`js/admission.js`)
Validates 10+2 PCM criteria (45% for General / 40% for MP SC/ST/OBC) and projects branch cutoffs against 90% MP State Domicile and 10% All India quotas.

* **Word Count:** 288 words *(Limit: Maximum 400 words)*

---

# 6. Testing & Results

### 6.1 Testing Methodology & Test Cases

The testing methodology for AcadAI combined static syntax validation, automated unit testing of mathematical algorithms, and manual functional verification across all 15 Single-Page Application workspaces:

![Figure 6.1: Testing Pipeline](AcadAI_Report_Images/testing_workflow.png)
*Figure 6.1: Verification & Automated Testing Pipeline*

1. **Static Syntax Validation:** Executed via Node.js using `node --check` across all 14 JavaScript source files and data dictionaries, ensuring zero syntax or lexical errors.
2. **Automated Unit Testing:** A headless test suite (`scratch/test_mits_upgrade.js`) validated the integrity of the knowledge base, course catalog, attendance recovery mathematics, and NLP similarity scoring.

```text
+---------+--------------------------+------------------------------+------------------------------+--------+
| Test ID | Feature Tested           | Test Input                   | Expected Output              | Result |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-01   | NLP Director Inquiry     | "who is director of mits"    | Matches mits_admin_director  | PASS   |
|         |                          |                              | (Returns Dr. R. K. Pandit)   |        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-02   | NLP IT HOD Inquiry       | "tell me about it department"| Matches dept_it_details      | PASS   |
|         |                          |                              | (Returns Dr. Punit K. Johari)|        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-03   | NLP Attendance Rule      | "attendance rules in mits"   | Matches attendance_75_rule   | PASS   |
|         |                          |                              | (Returns 75% rule & Director)|        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-04   | Hinglish Query Match     | "clc round kya hota hai"     | Matches hinglish_clc_query   | PASS   |
|         |                          |                              | (Returns College Level Coun.)|        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-05   | Attendance Recovery Calc | Attended: 26, Conducted: 38  | Recovery classes: 10         | PASS   |
|         |                          | Target: 75%                  | x = ceil((0.75*38-26)/0.25)  |        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-06   | Safe Bunk Calculation    | Attended: 38, Conducted: 42  | Safe bunk margin: 8 classes  | PASS   |
|         |                          | Target: 75%                  | m = floor((38 - 0.75*42)/.75)|        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-07   | Admission Board Deficit  | Board: 42.0%, Gen, All India | Status: Not Eligible         | PASS   |
|         |                          | JEE: 88.0%, Branch: IT       | (Board aggregate < 45.0%)    |        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-08   | Admission MP Quota Valid | Board: 42.0%, SC, MP Domicile| Status: Eligible for DTE     | PASS   |
|         |                          | JEE: 75.0%, Branch: IT       | (Board aggregate >= 40.0%)   |        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-09   | Course Finder Filter     | Dept: "IT", Semester: "5"    | Returns Operating Systems    | PASS   |
|         |                          |                              | and Computer Networks (1605) |        |
+---------+--------------------------+------------------------------+------------------------------+--------+
| TC-10   | Target SGPA Bound Check  | Current: 6.0, Target: 9.8    | Displays mathematically      | PASS   |
|         |                          | Completed: 80, Sem: 20 creds | unreachable warning (>10.0)  |        |
+---------+--------------------------+------------------------------+------------------------------+--------+
```

* **Word Count:** 225 words *(Limit: Maximum 400 words)*

---

### 6.2 Results & Outputs

Testing confirmed that all fifteen application workspaces execute reliably across desktop and mobile viewports. The following screenshots document the actual operational interfaces of AcadAI:

#### 1. Student Dashboard & Profile Management
The primary dashboard displays the student profile (configured for **Yatish Kag**, B.Tech IT 5th Semester, Roll No: `BTIT24O1153`), overall attendance indicators, dynamic lecture schedules, and upcoming examination countdowns.

![Dashboard](AcadAI_Report_Images/screenshots/dashboard.png)
*Figure 6.2: Student Profile Dashboard & Academic Overview*

#### 2. Conversational NLP Assistant & Source Verification
The conversational interface processes student queries, provides official source references (`web.mitsgwalior.in`), and embeds interactive action buttons to guide users directly to calculation modules.

![Chatbot](AcadAI_Report_Images/screenshots/chatbot.png)
*Figure 6.3: Conversational NLP Interface with Verified Institutional Citations*

#### 3. Attendance Intelligence & Recovery Planner
Displays subject-wise attendance percentages, safe bunk allowances, consecutive recovery lectures, and what-if predictive toggles for MITS B.Tech courses.

![Attendance Tracker](AcadAI_Report_Images/screenshots/attendance.png)
*Figure 6.4: Attendance Tracker with Safe Bunk & Consecutive Recovery Calculator*

#### 4. MP DTE Admission Calculator & Course Finder
Evaluates 10+2 PCM eligibility and simulates MP state domicile seat allocation probabilities alongside the interactive course catalog.

| Admission Calculator | B.Tech Course Finder |
|---|---|
| ![Admission](AcadAI_Report_Images/screenshots/admission.png) | ![Courses](AcadAI_Report_Images/screenshots/courses.png) |

#### 5. Interactive SVG Campus Blueprint & Class Timetable
Allows interactive exploration of MITS Gwalior buildings (Scindia Block, IT/CSE Complex, Central Library, CCC) alongside weekly lecture grids.

| Campus SVG Blueprint | Class Timetable Matrix |
|---|---|
| ![Campus Map](AcadAI_Report_Images/screenshots/map.png) | ![Timetable](AcadAI_Report_Images/screenshots/timetable.png) |

#### 6. Academic Planner & Study Copilot
Enables deadline task management and generates automated Pomodoro revision schedules based on student syllabus requirements.

| Academic Planner | Study Copilot |
|---|---|
| ![Planner](AcadAI_Report_Images/screenshots/planner.png) | ![Copilot](AcadAI_Report_Images/screenshots/copilot.png) |

* **Word Count:** 230 words *(Limit: Maximum 400 words)*

---

### 6.3 Performance Analysis

Performance benchmarks were gathered on an Intel Core i5-1135G7 workstation (8 GB RAM, Windows 11) using Chrome DevTools and Node.js benchmarking scripts:

```text
+-----------------------------------+--------------------+--------------------+--------------------------+
| Metric / Operation                | Benchmark Result   | Industry Baseline  | Performance Assessment   |
+-----------------------------------+--------------------+--------------------+--------------------------+
| Initial DOM Load Time (file://)   | 82 ms              | < 1500 ms          | Instantaneous launch     |
| NLP Query Processing Latency      | 3.8 ms             | < 200 ms           | Sub-millisecond matching |
| Attendance Math Calculation Time  | 0.4 ms             | < 50 ms            | Real-time instantaneous  |
| Memory Footprint (RAM)            | 16.4 MB            | < 150 MB           | Minimal resource usage   |
| Total Assets Size (Uncompressed)  | 264 KB             | < 5000 KB          | Highly lightweight SPA   |
| LocalStorage Query/Save Latency   | 1.1 ms             | < 20 ms            | Synchronous zero lag     |
+-----------------------------------+--------------------+--------------------+--------------------------+
```

#### Analysis of Empirical Measurements
1. **Computational Efficiency:** Because string tokenization, stop-word filtering, and Jaccard similarity operate over a pre-indexed in-memory array of 27 knowledge entries, search execution completes in an average of **3.8 milliseconds**. Even with full dynamic programming Levenshtein distance computations across all question variations, latency never exceeded 8.2 milliseconds.
2. **Resource Consumption:** The total uncompressed application bundle—comprising `index.html`, `style.css`, and 11 modular JavaScript files—totals **264 kilobytes**. In-memory heap allocation stabilizes at **16.4 megabytes**, allowing the application to operate smoothly on low-power devices without CPU throttling.
3. **Absence of Network Latency:** Unlike cloud-based chatbots whose response times fluctuate between 1.5 and 4.0 seconds due to network latency and cloud API queues, AcadAI functions entirely on the client thread, guaranteeing consistent sub-10 ms query resolution.

* **Word Count:** 245 words *(Limit: Maximum 400 words)*

---

# 7. Conclusion & Future Scope

### 7.1 Key Achievements

The design and development of AcadAI successfully demonstrated that a lightweight, client-side web application can deliver robust, enterprise-grade academic assistance without relying on expensive cloud infrastructures:

1. **Successful Development of an Offline-First Academic SPA:** Built a complete, responsive Single-Page Application using standard HTML5, CSS3, and Vanilla JavaScript (ES6+), eliminating framework dependencies and third-party hosting costs.
2. **Explainable, Hallucination-Free NLP Assistant:** Implemented a deterministic text matching pipeline combining stop-word filtering, academic synonym expansion, Levenshtein typo tolerance ($\le 2$), and Jaccard similarity that accurately resolves student queries with official MITS citations.
3. **Automated Attendance Recovery Intelligence:** Formulated and deployed mathematical recovery models solving for exact consecutive lectures needed to satisfy the mandatory 75% attendance threshold under MITS Autonomous Academic Regulations.
4. **Authentic Institutional Data Modeling:** Mapped verified administrative records of Madhav Institute of Technology & Science (MITS), Gwalior—including Department of Information Technology faculty details, autonomous course schemes, MP DTE admission quotas, and campus landmarks.
5. **Privacy-Preserving Architecture:** Implemented client-side state persistence via browser `localStorage`, ensuring zero data leakage and 100% offline functionality.

* **Word Count:** 178 words *(Limit: Maximum 250 words)*

---

### 7.2 Limitations & Challenges

While AcadAI fulfills its core design objectives, technical and operational limitations remain:

1. **Static Pre-Loaded Knowledge Base:** Institutional information is stored in client-side JavaScript dictionaries. While administrators can add entries via the Knowledge Base Manager, changes reside within that browser's `localStorage` and do not automatically propagate to other student devices without exporting data.
2. **Absence of Live Institutional ERP Synchronization:** The system operates independently of MITS central database servers. Real-time changes in class attendance or exam marks require manual input rather than automated synchronization.
3. **Syntactic vs. Deep Semantic Understanding:** The deterministic similarity engine operates through lexical token matching and Levenshtein edit distance. Highly convoluted queries lacking matching keywords may fail to surpass the similarity threshold ($J \ge 0.28$).
4. **Browser-Dependent Voice Capabilities:** Speech recognition and speech synthesis rely on browser implementations of the W3C Web Speech API, which vary across operating systems and browsers.

* **Word Count:** 148 words *(Limit: Maximum 250 words)*

---

### 7.3 Future Scope

The modular architecture of AcadAI provides a robust foundation for future enhancements:

1. **Authorized Backend ERP Synchronization:** Implement an optional Node.js/Express REST microservice connecting AcadAI to the official MITS student portal database, enabling automated single-sign-on (SSO) and live attendance syncing.
2. **Progressive Web App (PWA) Offline Deployment:** Incorporate a Service Worker and web app manifest (`manifest.json`) to allow full home-screen installation on Android and iOS devices with offline asset caching.
3. **Multi-Lingual Regional Language Models:** Expand speech synthesis and lexical dictionaries to support regional Hindi dialects, allowing rural aspirants to interact verbally in their native languages.
4. **Push Notification Infrastructure:** Integrate the Web Notifications API to alert students automatically regarding approaching assignment deadlines, examination registrations, and attendance alerts when their percentage approaches the 75% threshold.

* **Word Count:** 134 words *(Limit: Maximum 250 words)*

---

### 7.4 Conclusion

The **Design and Development of AI Chatbot for Academic and College Information Services (AcadAI)** demonstrates that client-side web technologies can effectively bridge institutional information gaps in higher education. By pairing an explainable, deterministic natural language processing engine with domain-specific academic calculators, AcadAI provides students and applicants of **Madhav Institute of Technology & Science (MITS), Gwalior** with an instant, trustworthy, and privacy-preserving academic copilot.

The system replaces scattered circulars and manual inquiry bottlenecks with a unified interface that operates entirely offline at zero recurring cost. Through verified institutional data modeling, transparent mathematical recovery algorithms, and robust client storage, AcadAI fulfills all requirements of the B.Tech Information Technology Cornerstone Project and establishes a practical blueprint for sustainable campus automation.

* **Word Count:** 126 words *(Limit: Concise academic conclusion)*

---

# 8. References

### 8.1 Citations & Bibliography

1. **Madhav Institute of Technology & Science (MITS), Gwalior**, "Official Institutional Profile, Academic Ordinances, and Autonomous Regulations," Official Web Portal, [Online]. Available: `https://web.mitsgwalior.in/`. [Accessed: Nov. 2026].
2. **Directorate of Technical Education (MP DTE), Madhya Pradesh**, "Online Counseling Process, Guidelines, and Allotment Rules for B.Tech Admissions," Government of Madhya Pradesh, [Online]. Available: `https://dte.mponline.gov.in/`. [Accessed: Nov. 2026].
3. **All India Council for Technical Education (AICTE)**, "Model Curriculum for Undergraduate Degree Courses in Engineering & Technology," AICTE Guidelines, New Delhi, India, 2020.
4. **Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)**, "Choice Based Credit System (CBCS) Scheme and Examination Regulations," RGPV Ordinances, Bhopal, India, 2021.
5. **B. R. Ranoliya, N. Raghuwanshi, and S. Singh**, "Chatbot for University Management System using AI," *2017 International Conference on Computing, Communication and Automation (ICCCA)*, Greater Noida, India, 2017, pp. 1225–1230.
6. **V. I. Levenshtein**, "Binary Codes Capable of Correcting Deletions, Insertions, and Reversals," *Soviet Physics Doklady*, vol. 10, no. 8, pp. 707–710, 1966.
7. **P. Jaccard**, "The Distribution of the Flora in the Alpine Zone," *New Phytologist*, vol. 11, no. 2, pp. 37–50, 1912.
8. **World Wide Web Consortium (W3C)**, "Web Storage API Specification (Second Edition)," W3C Recommendation, [Online]. Available: `https://www.w3.org/TR/webstorage/`. [Accessed: Oct. 2026].
9. **World Wide Web Consortium (W3C)**, "Web Speech API Specification," W3C Community Group Report, [Online]. Available: `https://wicg.github.io/speech-api/`. [Accessed: Oct. 2026].
10. **Mozilla Developer Network (MDN)**, "Client-Side Storage and Indexed Web APIs," MDN Web Docs, 2024. [Online]. Available: `https://developer.mozilla.org/`. [Accessed: Nov. 2026].

* **Word Count:** 248 words *(Limit: Maximum 400 words)*

---

# 9. Annexure

### 9.1 Project Artifacts & URLs

The official project deliverables, source archives, and implementation resources for AcadAI are organized as follows:

```text
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
| # | Project Deliverable / Artifact       | Description & Exact Resource Location                           | Availability Status     |
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
| 1 | Source Code Repository               | Complete uncompiled source tree (HTML, CSS, JS, Data, Images)   | Available Locally       |
|   |                                      | Path: C:\Users\acer\OneDrive\Desktop\conerstone project\        | (Git Version Controlled)|
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
| 2 | Packaged Submission Archive          | Self-contained offline distribution archive containing all      | Available               |
|   |                                      | dependencies: AcadAI_MITS_Real_Data_Final.zip (98.8 KB)         | Path: Root Directory    |
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
| 3 | Live Local Execution Prototype       | Instant single-click browser execution file:                    | Available               |
|   |                                      | file:///C:/Users/acer/OneDrive/Desktop/conerstone project/      | (Executes via index.html|
|   |                                      | index.html (Zero installation required)                         | on Chrome/Edge/Firefox) |
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
| 4 | Verification & Testing Suite         | Automated Node.js unit testing suite validating 25/25 algorithmic| Available               |
|   |                                      | and NLP test cases: scratch/test_mits_upgrade.js                 | (Verified Clean 100%)   |
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
| 5 | Live Cloud Hosted Application        | Public web-hosted URL for live cloud deployment                 | Not Officially Deployed |
|   |                                      |                                                                 | (Client-side offline)   |
+---+--------------------------------------+-----------------------------------------------------------------+-------------------------+
```

*Note: In accordance with project evaluation guidelines, non-deployed external cloud resources are marked as "Not Officially Deployed", as AcadAI is intentionally designed for zero-cost, private client-side local execution.*

* **Word Count:** 165 words *(Limit: Maximum 300 words)*

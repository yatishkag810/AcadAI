// MITS Gwalior Autonomous B.Tech Course Catalog
// Authentic curriculum structure adhering to MITS Flexible CBCS / AICTE Scheme.
// Features courses across IT, CSE, ECE, EEE, ME, and CE departments.

window.defaultCourses = [
  // --- INFORMATION TECHNOLOGY (IT) ---
  {
    code: "IT-160301",
    name: "Data Structures & Algorithms",
    department: "IT",
    credits: 4,
    semester: 3,
    type: "Core",
    prerequisites: "Programming for Problem Solving (ES-101)",
    description: "In-depth study of linear and non-linear data structures: dynamic arrays, linked lists, stacks, queues, binary search trees, AVL trees, graphs, hashing, sorting algorithms, and asymptotic complexity analysis under MITS IT curriculum."
  },
  {
    code: "IT-160302",
    name: "Digital Electronics & Logic Design",
    department: "IT",
    credits: 3,
    semester: 3,
    type: "Core",
    prerequisites: "Basic Electrical & Electronics (ES-102)",
    description: "Boolean algebra, combinational logic design, arithmetic circuits, multiplexers, decoders, sequential circuits, flip-flops, registers, counters, and finite state machines."
  },
  {
    code: "IT-160351",
    name: "Data Structures Lab",
    department: "IT",
    credits: 1,
    semester: 3,
    type: "Lab",
    prerequisites: "Programming for Problem Solving (ES-101)",
    description: "Practical laboratory implementation of linked lists, tree traversals, shortest path graph algorithms, and sorting benchmarks in C++ / Java."
  },
  {
    code: "IT-160401",
    name: "Database Management Systems",
    department: "IT",
    credits: 4,
    semester: 4,
    type: "Core",
    prerequisites: "IT-160301",
    description: "Relational database concepts, ER modeling, relational algebra, SQL querying, normal forms (1NF to BCNF), transaction processing, ACID properties, concurrency control, and crash recovery."
  },
  {
    code: "IT-160402",
    name: "Object Oriented Programming Using Java",
    department: "IT",
    credits: 3,
    semester: 4,
    type: "Core",
    prerequisites: "IT-160301",
    description: "Core Java, encapsulation, inheritance, polymorphism, interfaces, exception handling, multithreading, Java collections framework, and GUI application design."
  },
  {
    code: "IT-160501",
    name: "Operating Systems",
    department: "IT",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "IT-160301",
    description: "Process scheduling, thread management, inter-process communication, semaphores, deadlock avoidance (Banker's algorithm), memory virtualization, paging, segmentation, and file systems."
  },
  {
    code: "IT-160502",
    name: "Computer Networks & Protocols",
    department: "IT",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "IT-160401",
    description: "OSI and TCP/IP layered architectures, framing, flow and error control, IP addressing, subnetting, CIDR, routing protocols (OSPF, BGP), TCP/UDP socket programming, and HTTP/DNS."
  },
  {
    code: "IT-160601",
    name: "Internet of Things & Sensor Networks",
    department: "IT",
    credits: 3,
    semester: 6,
    type: "Core",
    prerequisites: "IT-160502",
    description: "IoT architecture, sensor interfacing, Arduino and Raspberry Pi hardware, MQTT/CoAP protocols, cloud IoT integration, and smart campus automation case studies."
  },
  {
    code: "IT-160602",
    name: "Web Technologies & Cloud Computing",
    department: "IT",
    credits: 3,
    semester: 6,
    type: "Elective",
    prerequisites: "IT-160402",
    description: "Full-stack web architecture, RESTful API design, modern JavaScript frameworks, cloud virtualization, AWS/GCP services, microservices, and containerization using Docker."
  },
  {
    code: "IT-160701",
    name: "Artificial Intelligence & Machine Learning",
    department: "IT",
    credits: 4,
    semester: 7,
    type: "Elective",
    prerequisites: "IT-160301, Engineering Mathematics",
    description: "Supervised and unsupervised learning, regression, classification, decision trees, support vector machines, neural networks, deep learning fundamentals, and Scikit-Learn/TensorFlow pipelines."
  },
  {
    code: "IT-160801",
    name: "Information & Cyber Security",
    department: "IT",
    credits: 3,
    semester: 8,
    type: "Elective",
    prerequisites: "IT-160502",
    description: "Classical and modern cryptography, AES, RSA, hash functions, digital signatures, public key infrastructure, network penetration testing, and ethical hacking fundamentals."
  },

  // --- COMPUTER SCIENCE & ENGINEERING (CSE) ---
  {
    code: "CS-150301",
    name: "Discrete Mathematics & Graph Theory",
    department: "CSE",
    credits: 4,
    semester: 3,
    type: "Core",
    prerequisites: "Engineering Mathematics-I",
    description: "Set theory, propositional logic, predicate calculus, relations, functions, recurrence relations, generating functions, graph coloring, trees, and algebraic structures."
  },
  {
    code: "CS-150401",
    name: "Design & Analysis of Algorithms",
    department: "CSE",
    credits: 4,
    semester: 4,
    type: "Core",
    prerequisites: "CS-150301",
    description: "Divide and conquer, greedy methods, dynamic programming, backtracking, branch and bound, string matching algorithms, P vs NP completeness, and approximation algorithms."
  },
  {
    code: "CS-150501",
    name: "Theory of Computation & Automata",
    department: "CSE",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "CS-150301",
    description: "Deterministic and non-deterministic finite automata, regular expressions, context-free grammars, pushdown automata, Turing machines, decidability, and Halting problem."
  },
  {
    code: "CS-150601",
    name: "Compiler Design",
    department: "CSE",
    credits: 4,
    semester: 6,
    type: "Core",
    prerequisites: "CS-150501",
    description: "Lexical analysis, top-down and bottom-up parsing (LL, LR, LALR), syntax-directed translation, intermediate code generation, code optimization, and target machine code generation."
  },
  {
    code: "CS-150702",
    name: "Data Mining & Big Data Analytics",
    department: "CSE",
    credits: 3,
    semester: 7,
    type: "Elective",
    prerequisites: "CS-150401",
    description: "Data warehousing, OLAP cubes, association rule mining (Apriori), clustering algorithms, Hadoop ecosystem, MapReduce programming, and Apache Spark analytics."
  },

  // --- ELECTRONICS ENGINEERING (ECE / ET) ---
  {
    code: "EC-140301",
    name: "Signals & Systems",
    department: "ECE",
    credits: 4,
    semester: 3,
    type: "Core",
    prerequisites: "Engineering Mathematics-II",
    description: "Continuous and discrete-time signals, LTI systems, convolution, Fourier series, Fourier transform, Laplace transform, and Z-transform analysis."
  },
  {
    code: "EC-140401",
    name: "Analog Communication Systems",
    department: "ECE",
    credits: 4,
    semester: 4,
    type: "Core",
    prerequisites: "EC-140301",
    description: "Amplitude modulation, frequency modulation, phase modulation, noise analysis, superheterodyne receivers, and pulse modulation techniques."
  },
  {
    code: "EC-140501",
    name: "Microprocessors & Microcontrollers (8085/8086/ARM)",
    department: "ECE",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "IT-160302",
    description: "8085/8086 architecture, assembly language programming, interrupt controllers, memory interfacing, peripheral interfacing (8255, 8254), and ARM microcontroller basics."
  },
  {
    code: "EC-140601",
    name: "Digital Signal Processing (DSP)",
    department: "ECE",
    credits: 4,
    semester: 6,
    type: "Core",
    prerequisites: "EC-140301",
    description: "Discrete Fourier Transform (DFT), Fast Fourier Transform (FFT) algorithms, IIR and FIR digital filter design, DSP architecture, and spectral analysis."
  },

  // --- ELECTRICAL ENGINEERING (EEE) ---
  {
    code: "EE-130301",
    name: "Electrical Network Theory",
    department: "EEE",
    credits: 4,
    semester: 3,
    type: "Core",
    prerequisites: "Basic Electrical Engineering",
    description: "Network theorems (Thevenin, Norton, Superposition, Maximum Power Transfer), transient analysis, two-port networks, graph theory applied to circuits, and state variable analysis."
  },
  {
    code: "EE-130401",
    name: "Electrical Machines - I",
    department: "EEE",
    credits: 4,
    semester: 4,
    type: "Core",
    prerequisites: "EE-130301",
    description: "Single-phase and three-phase transformers, autotransformers, DC generators and motors: characteristics, efficiency testing, speed control, and industrial applications."
  },
  {
    code: "EE-130501",
    name: "Control Systems",
    department: "EEE",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "EE-130301",
    description: "Transfer functions, block diagram reduction, signal flow graphs, time domain specifications, Routh-Hurwitz stability criterion, Root Locus, Bode plots, and Nyquist stability."
  },
  {
    code: "EE-130601",
    name: "Power Systems - I",
    department: "EEE",
    credits: 4,
    semester: 6,
    type: "Core",
    prerequisites: "EE-130401",
    description: "Generation of electrical energy, transmission line parameters, performance of transmission lines, skin effect, corona, insulators, and underground cables."
  },

  // --- MECHANICAL ENGINEERING (ME) ---
  {
    code: "ME-120301",
    name: "Engineering Thermodynamics",
    department: "ME",
    credits: 4,
    semester: 3,
    type: "Core",
    prerequisites: "Basic Mechanical Engineering",
    description: "Zeroth, First, and Second laws of thermodynamics, entropy, exergy analysis, air standard cycles (Otto, Diesel, Dual), and steam properties with Rankine cycle analysis."
  },
  {
    code: "ME-120401",
    name: "Fluid Mechanics & Hydraulic Machinery",
    department: "ME",
    credits: 4,
    semester: 4,
    type: "Core",
    prerequisites: "ME-120301",
    description: "Fluid statics, buoyancy, fluid kinematics, Bernoulli's equation, boundary layer theory, flow through pipes, impulse and reaction turbines, and centrifugal pumps."
  },
  {
    code: "ME-120501",
    name: "Manufacturing Science & Machining",
    department: "ME",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "Workshop Technology",
    description: "Metal cutting mechanics, tool life (Taylor's equation), lathe operations, milling, drilling, grinding, unconventional machining (EDM, ECM, USM), and CNC machine programming."
  },

  // --- CIVIL ENGINEERING (CE) ---
  {
    code: "CE-110301",
    name: "Strength of Materials (Solid Mechanics)",
    department: "CE",
    credits: 4,
    semester: 3,
    type: "Core",
    prerequisites: "Engineering Mechanics",
    description: "Simple stress and strain, Hooke's law, elastic constants, shear force and bending moment diagrams for beams, stresses in beams, torsion of circular shafts, and Euler's column theory."
  },
  {
    code: "CE-110401",
    name: "Structural Analysis - I",
    department: "CE",
    credits: 4,
    semester: 4,
    type: "Core",
    prerequisites: "CE-110301",
    description: "Static and kinematic indeterminacy, deflection of trusses and beams, energy theorems, Castigliano's theorem, influence line diagrams, and analysis of arches."
  },
  {
    code: "CE-110501",
    name: "Surveying & Geomatics",
    department: "CE",
    credits: 4,
    semester: 5,
    type: "Core",
    prerequisites: "None",
    description: "Compass surveying, leveling, contouring, theodolite traversing, curve setting, Total Station operation, remote sensing principles, and GIS mapping."
  }
];

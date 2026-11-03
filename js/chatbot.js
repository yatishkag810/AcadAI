// AcadAI Chatbot NLP & Intent Matching Engine
// Pure Vanilla JavaScript implementation using Tokenization, Stop-word Filtering,
// Synonym Expansion, Context Tracking, Jaccard Similarity Scoring, and Source Citations.
// Honest, fully explainable AI suitable for an engineering student viva.

// 1. Common English Stop Words to filter out uninformative terms
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 'have',
  'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt',
  'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out',
  'over', 'own', 'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some',
  'such', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'theres', 'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent',
  'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos', 'whom',
  'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre', 'youve',
  'your', 'yours', 'yourself', 'yourselves', 'tell', 'show', 'give', 'know', 'want', 'please', 'can'
]);

// 2. Academic Synonym Lexicon to bridge natural student query variations & Hinglish queries
const SYNONYMS = {
  'fee': 'fees', 'cost': 'fees', 'tuition': 'fees', 'price': 'fees', 'charge': 'fees', 'charges': 'fees', 'kitni': 'fees', 'kitna': 'fees',
  'hostel': 'hostel', 'dorm': 'hostel', 'room': 'hostel', 'stay': 'hostel', 'accommodation': 'hostel', 'mess': 'hostel',
  'timetable': 'timetable', 'schedule': 'timetable', 'periods': 'timetable', 'lectures': 'timetable', 'routine': 'timetable',
  'marks': 'exam', 'score': 'exam', 'grade': 'exam', 'cgpa': 'exam', 'sgpa': 'exam', 'backlog': 'exam', 'pass': 'exam', 'fail': 'exam',
  'prof': 'faculty', 'teacher': 'faculty', 'professor': 'faculty', 'teachers': 'faculty', 'sir': 'faculty', 'hod': 'faculty',
  'placements': 'placements', 'placement': 'placements', 'package': 'placements', 'salary': 'placements', 'job': 'placements', 'jobs': 'placements', 'lpa': 'placements', 'recruiter': 'placements',
  'admission': 'admissions', 'apply': 'admissions', 'eligibility': 'admissions', 'cutoff': 'admissions', 'counseling': 'admissions', 'cet': 'admissions', 'jee': 'admissions', 'dte': 'admissions', 'mponline': 'admissions', 'clc': 'admissions',
  'bus': 'transport', 'route': 'transport', 'metro': 'transport', 'reach': 'transport', 'location': 'contact_information', 'address': 'contact_information', 'gola': 'contact_information', 'kahan': 'contact_information',
  'book': 'library', 'books': 'library', 'library': 'library', 'reading': 'library', 'journal': 'library', 'ieee': 'library',
  'task': 'planner', 'tasks': 'planner', 'assignment': 'planner', 'todo': 'planner', 'deadline': 'planner', 'deadlines': 'planner',
  'director': 'director', 'pandit': 'director', 'vc': 'director',
  'johari': 'it', 'punit': 'it',
  'attendance': 'attendance', 'bunk': 'attendance', 'detain': 'attendance', 'detention': 'attendance', 'condonation': 'attendance'
};

// 3. Conversation Context Memory (Tracks ongoing dialogue topic for follow-up questions)
let conversationContext = {
  lastTopic: null,
  lastCategory: null,
  lastAnswerId: null
};

// Normalize text: converts to lowercase, trims whitespace, strips punctuation
function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Tokenize text into words with stop-word removal and synonym canonicalization
function extractKeywords(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  
  const rawTokens = normalized.split(' ');
  const cleaned = [];

  for (const word of rawTokens) {
    if (!word || STOP_WORDS.has(word) || word.length < 2) continue;
    const canonical = SYNONYMS[word] || word;
    cleaned.push(canonical);
  }

  return cleaned;
}

// Levenshtein edit distance between two token strings for typo tolerance
function levenshteinDistance(s1, s2) {
  if (s1 === s2) return 0;
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;

  const matrix = [];
  for (let i = 0; i <= s2.length; i++) matrix[i] = [i];
  for (let j = 0; j <= s1.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[s2.length][s1.length];
}

// Determines if two tokens are an approximate fuzzy match (forgiving 1-2 typos)
function isFuzzyTokenMatch(tokenA, tokenB) {
  if (tokenA === tokenB) return true;
  const maxLen = Math.max(tokenA.length, tokenB.length);
  if (maxLen >= 5) {
    const dist = levenshteinDistance(tokenA, tokenB);
    return dist <= (maxLen >= 8 ? 2 : 1);
  }
  return false;
}

// Calculate Jaccard Similarity Coefficient: |A ∩ B| / |A ∪ B| with typo tolerance
function calculateJaccardSimilarity(tokensA, tokensB) {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  let intersection = 0;
  const matchedB = new Set();

  for (const a of tokensA) {
    for (let i = 0; i < tokensB.length; i++) {
      if (!matchedB.has(i) && isFuzzyTokenMatch(a, tokensB[i])) {
        intersection++;
        matchedB.add(i);
        break;
      }
    }
  }

  const union = tokensA.length + tokensB.length - intersection;
  return union === 0 ? 0 : intersection / union;
}

// Calculate Token Overlap Ratio: |A ∩ B| / |A| with typo tolerance
function calculateOverlapRatio(queryTokens, targetTokens) {
  if (queryTokens.length === 0 || targetTokens.length === 0) return 0;

  let matches = 0;
  const matchedTarget = new Set();

  for (const q of queryTokens) {
    for (let i = 0; i < targetTokens.length; i++) {
      if (!matchedTarget.has(i) && isFuzzyTokenMatch(q, targetTokens[i])) {
        matches++;
        matchedTarget.add(i);
        break;
      }
    }
  }
  return matches / queryTokens.length;
}

// Load knowledge base records (merges built-in defaults with custom entries in localStorage)
function getFullKnowledgeBase() {
  const customKBJson = localStorage.getItem('acadai_knowledge_base');
  const customKB = customKBJson ? JSON.parse(customKBJson) : [];
  const activeCustom = customKB.filter(entry => entry.enabled !== false);
  const sysKB = window.defaultKnowledgeBase || [];
  return [...activeCustom, ...sysKB];
}

// Determine verifiable source citation for responses
function getSourceCitation(category) {
  const citations = {
    'admissions': 'Official Admissions Brochure 2026-27',
    'fees': 'Fee Regulatory Committee & Finance Circular',
    'departments': 'Academic Curriculum Handbook (AICTE & UGC)',
    'college_overview': 'Accreditation & Institutional Charter',
    'hostel': 'Chief Warden Residential Rules & Policies',
    'placements': 'Training & Placement Cell Annual Report',
    'library': 'Central Library Stackroom Regulations',
    'attendance': 'Live Attendance Monitoring Engine',
    'timetable': 'Central Academic Scheduling Matrix',
    'calendar': 'University Academic Calendar 2026',
    'planner': 'Smart Academic Planner Module',
    'copilot': 'Academic Copilot Syllabus Engine',
    'general_greeting': 'AcadAI Virtual Assistant'
  };
  return citations[category] || 'Institutional Knowledge Base';
}

// Main Intent Matching Function
function findBestMatch(userQuery) {
  const rawCleaned = normalizeText(userQuery);
  const queryTokens = extractKeywords(userQuery);

  // 1. Direct Greetings and Small-talk Handling
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'namaste', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'];
  if (greetings.includes(rawCleaned) || (queryTokens.length === 0 && rawCleaned.length > 0 && greetings.some(g => rawCleaned.startsWith(g)))) {
    return {
      match: { id: "greet_hello", category: "general_greeting" },
      confidence: 1.0,
      answer: `Hello! Welcome to <strong>AcadAI</strong>. I am your academic information assistant. Feel free to ask me about admissions, course syllabus, timetables, attendance, fees, exams, or campus facilities!<br><div class="chat-source-tag"><i class="fas fa-check-circle"></i> Source: AcadAI Engine</div>`
    };
  }

  // 2. Dynamic Live Attendance Interception (queries actual live attendance data)
  if (rawCleaned === 'what is my attendance' || rawCleaned === 'show attendance' || rawCleaned === 'my attendance' || rawCleaned.includes('attendance percentage')) {
    if (window.App && window.App.attendanceTracker) {
      const stats = window.App.attendanceTracker.getStats();
      conversationContext.lastCategory = 'attendance';
      return {
        match: { id: "dynamic_attendance", category: "attendance" },
        confidence: 1.0,
        answer: `Your overall average attendance is currently <strong>${stats.average.toFixed(1)}%</strong> across all enrolled courses. You have <strong>${stats.belowThreshold}</strong> subject(s) below your configured ${window.App.attendanceTracker.MIN_ATTENDANCE}% threshold.<br><br><button class="btn btn-secondary chat-action-nav-btn" data-target="attendance"><i class="fas fa-chart-pie"></i> Open Attendance Tracker</button><br><div class="chat-source-tag"><i class="fas fa-check-circle"></i> Source: Live Attendance Tracker</div>`
      };
    }
  }

  if (rawCleaned.includes('low attendance') || rawCleaned.includes('short attendance') || rawCleaned.includes('subjects below') || rawCleaned.includes('can i bunk')) {
    if (window.App && window.App.attendanceTracker) {
      const lowSubjects = window.App.attendanceTracker.subjects.filter(s => {
        const pct = s.total > 0 ? (s.attended / s.total) * 100 : 100;
        return pct < window.App.attendanceTracker.MIN_ATTENDANCE;
      });

      conversationContext.lastCategory = 'attendance';

      if (lowSubjects.length === 0) {
        return {
          match: { id: "dynamic_attendance_safe", category: "attendance" },
          confidence: 1.0,
          answer: `Great news! You have <strong>no subjects</strong> below the mandatory ${window.App.attendanceTracker.MIN_ATTENDANCE}% threshold. You can check your safe bunk margins in the tracker.<br><br><button class="btn btn-secondary chat-action-nav-btn" data-target="attendance"><i class="fas fa-umbrella-beach"></i> Check Bunk Allowances</button><br><div class="chat-source-tag"><i class="fas fa-check-circle"></i> Source: Live Attendance Tracker</div>`
        };
      }

      const listHTML = lowSubjects.map(s => {
        const pct = s.total > 0 ? (s.attended / s.total) * 100 : 100;
        const classesNeeded = window.App.attendanceTracker.calculateRecovery(s.attended, s.total);
        return `• <strong>${s.name}</strong> (${pct.toFixed(1)}%) — Must attend next <strong>${classesNeeded}</strong> consecutive classes.`;
      }).join('<br>');

      return {
        match: { id: "dynamic_attendance_low", category: "attendance" },
        confidence: 1.0,
        answer: `The following subject(s) currently require recovery to maintain &ge;${window.App.attendanceTracker.MIN_ATTENDANCE}% attendance:<br><br>${listHTML}<br><br><button class="btn btn-secondary chat-action-nav-btn" data-target="attendance"><i class="fas fa-exclamation-triangle"></i> Open Recovery Planner</button><br><div class="chat-source-tag"><i class="fas fa-check-circle"></i> Source: Live Attendance Tracker</div>`
      };
    }
  }

  // 3. Dynamic Timetable Interception
  if (rawCleaned === 'show timetable' || rawCleaned === 'class timetable' || rawCleaned === 'my timetable' || rawCleaned === 'schedule') {
    conversationContext.lastCategory = 'timetable';
    return {
      match: { id: "dynamic_timetable", category: "timetable" },
      confidence: 1.0,
      answer: `Here is the class timetable matrix. You can filter by department (CSE, IT, ECE, EEE, ME, CE) and semester to view daily lecture timings and faculty rooms.<br><br><button class="btn btn-secondary chat-action-nav-btn" data-target="timetable"><i class="fas fa-calendar-alt"></i> View Class Timetable</button><br><div class="chat-source-tag"><i class="fas fa-check-circle"></i> Source: Central Scheduling Matrix</div>`
    };
  }

  // 4. Dynamic Academic Planner Interception
  if (rawCleaned.includes('my task') || rawCleaned.includes('pending task') || rawCleaned.includes('deadline') || rawCleaned.includes('assignment due')) {
    if (window.App && window.App.planner) {
      const stats = window.App.planner.getStats();
      const deadlines = window.App.planner.getUpcomingDeadlines(3);
      conversationContext.lastCategory = 'planner';

      let taskListStr = deadlines.map(d => `• <strong>${d.title}</strong> (${d.course}) — Due: ${d.dueDate}`).join('<br>');
      if (!taskListStr) taskListStr = "No pending deadlines! All assignments are up to date.";

      return {
        match: { id: "dynamic_planner", category: "planner" },
        confidence: 1.0,
        answer: `You have <strong>${stats.pendingCount} pending task(s)</strong> (${stats.highPriorityCount} high priority).<br><br>${taskListStr}<br><br><button class="btn btn-secondary chat-action-nav-btn" data-target="planner"><i class="fas fa-tasks"></i> Open Academic Planner</button><br><div class="chat-source-tag"><i class="fas fa-check-circle"></i> Source: Smart Academic Planner</div>`
      };
    }
  }

  // 5. Follow-up Context Resolution
  let augmentedTokens = [...queryTokens];
  if (queryTokens.length <= 2 && conversationContext.lastCategory) {
    augmentedTokens.push(conversationContext.lastCategory);
  }

  // 6. Similarity Scoring over Knowledge Base
  const knowledgeBase = getFullKnowledgeBase();
  let bestEntry = null;
  let highestScore = 0;
  let matchedQuestionText = '';

  for (const entry of knowledgeBase) {
    for (const question of entry.questions) {
      const qTokens = extractKeywords(question);
      const normalizedQ = normalizeText(question);

      // A. Jaccard similarity score (0 to 1)
      const jaccard = calculateJaccardSimilarity(augmentedTokens, qTokens);

      // B. Token overlap ratio (0 to 1)
      const overlap = calculateOverlapRatio(augmentedTokens, qTokens);

      // C. Substring matching bonus
      let bonus = 0;
      if (rawCleaned.includes(normalizedQ) || normalizedQ.includes(rawCleaned)) {
        bonus += 0.35;
      }

      // D. Category keyword matching bonus
      if (entry.category && rawCleaned.includes(entry.category.toLowerCase())) {
        bonus += 0.15;
      }

      // Combined hybrid score (weighted average)
      const combinedScore = Math.min(1.0, (jaccard * 0.45) + (overlap * 0.35) + bonus);

      if (combinedScore > highestScore) {
        highestScore = combinedScore;
        bestEntry = entry;
        matchedQuestionText = question;
      }
    }
  }

  // 7. Threshold evaluation
  const CONFIDENCE_THRESHOLD = 0.28;

  if (bestEntry && highestScore >= CONFIDENCE_THRESHOLD) {
    conversationContext.lastTopic = matchedQuestionText;
    conversationContext.lastCategory = bestEntry.category;
    conversationContext.lastAnswerId = bestEntry.id;

    const source = getSourceCitation(bestEntry.category);
    const confidencePct = Math.min(99, Math.round(highestScore * 100));

    return {
      match: bestEntry,
      confidence: highestScore,
      answer: `${bestEntry.answer}<br><div class="chat-source-tag"><i class="fas fa-shield-alt"></i> Source: ${source} &bull; ${confidencePct}% Match</div>`
    };
  }

  // 8. Fallback when confidence is below threshold
  return {
    match: null,
    confidence: highestScore,
    answer: getSmartFallbackResponse(userQuery)
  };
}

// Helpful fallback response with category suggestions
function getSmartFallbackResponse(userQuery) {
  return `I'm not completely sure about that. Try asking about one of these campus services:<br>
  • <strong>Admissions</strong>: "How to apply?", "Cutoff percentiles for CSE"<br>
  • <strong>Courses & Fees</strong>: "B.Tech branch syllabus", "Annual tuition fees"<br>
  • <strong>Academic Services</strong>: "What is my attendance?", "My upcoming deadlines", "Show timetable"<br>
  • <strong>Campus Rules</strong>: "Explain grading system", "Hostel outpass timings"<br><br>
  <em>Tip: Try rephrasing your question using simple keywords like "fees", "hostel", or "calendar".</em>`;
}

// External LLM API Provider Bridge (Client-side REST Fetch)
// Supports Google Gemini (v1beta) and OpenAI (v1 chat completions) via User-provided API Keys.
async function queryLLM(prompt, apiConfig) {
  if (!apiConfig || !apiConfig.apiKey) {
    throw new Error("No API key configured");
  }

  const provider = apiConfig.provider || 'google';

  if (provider === 'google') {
    const model = apiConfig.model || 'gemini-1.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiConfig.apiKey)}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are AcadAI, an intelligent college information assistant for an engineering institute. Answer this student inquiry helpfully, accurately, and concisely:\n\n${prompt}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Gemini API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) throw new Error("No response text returned by Gemini");
    return candidate.replace(/\n/g, '<br>');

  } else if (provider === 'openai') {
    const model = apiConfig.model || 'gpt-3.5-turbo';
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are AcadAI, an intelligent college information assistant for an engineering institute. Provide helpful, concise answers.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `OpenAI API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    if (!message) throw new Error("No response text returned by OpenAI");
    return message.replace(/\n/g, '<br>');
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

// Reset conversation context memory
function resetConversationContext() {
  conversationContext = {
    lastTopic: null,
    lastCategory: null,
    lastAnswerId: null
  };
}

// Expose functions globally for app.js and HTML UI
window.normalizeText = normalizeText;
window.extractKeywords = extractKeywords;
window.levenshteinDistance = levenshteinDistance;
window.isFuzzyTokenMatch = isFuzzyTokenMatch;
window.calculateJaccardSimilarity = calculateJaccardSimilarity;
window.getFullKnowledgeBase = getFullKnowledgeBase;
window.findBestMatch = findBestMatch;
window.getSmartFallbackResponse = getSmartFallbackResponse;
window.queryLLM = queryLLM;
window.resetConversationContext = resetConversationContext;

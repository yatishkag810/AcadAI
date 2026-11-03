// Admission Eligibility Calculator Controller — MITS Gwalior Edition
// Based on Directorate of Technical Education (MP DTE) Counseling Regulations (dte.mponline.gov.in)
// Accurately incorporates 90% MP State Domicile, 10% All India Quota, 45%/40% 12th Board PCM rules,
// and College Level Counseling (CLC) vacancy guidelines.

class AdmissionCalculator {
  constructor() {
    this.form = document.getElementById('admission-calc-form');
    this.resultContainer = document.getElementById('calc-results');
    
    // Indicative Baseline Percentiles for MITS B.Tech (General Category, All India Quota reference)
    // Derived from historical MP DTE closing rank equivalents.
    this.branchBaselines = {
      'CSE': 93.5,
      'IT': 90.5,
      'ECE': 85.0,
      'EEE': 80.0,
      'ME': 74.0,
      'CE': 69.0
    };

    this.init();
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculateEligibility();
    });
  }

  calculateEligibility() {
    // Collect form data
    const boardPct = parseFloat(document.getElementById('board-percent').value);
    const jeePercentile = parseFloat(document.getElementById('jee-percentile').value);
    const category = document.getElementById('student-category').value;
    const domicile = document.getElementById('student-domicile').value;
    const branch = document.getElementById('desired-branch').value;
    
    if (isNaN(boardPct) || boardPct < 0 || boardPct > 100) {
      alert("Please enter a valid 12th percentage (0-100).");
      return;
    }
    if (isNaN(jeePercentile) || jeePercentile < 0 || jeePercentile > 100) {
      alert("Please enter a valid JEE Main percentile (0-100).");
      return;
    }

    // Step 1: Minimum Board Academic Eligibility Check (MP DTE / AICTE Norms)
    // General / EWS requires 45.0% in 12th PCM. MP SC/ST/OBC requires 40.0%.
    const isReserved = (category === 'SC' || category === 'ST' || category === 'OBC');
    const minRequiredPct = isReserved && domicile === 'home' ? 40.0 : 45.0;
    
    let isBoardEligible = boardPct >= minRequiredPct;
    let finalEligibility = isBoardEligible;
    
    // Step 2: Compute Cutoff Adjustment
    // Baseline cutoffs are for General Category + All India Quota (10% seats)
    let adjustedCutoff = this.branchBaselines[branch] || 75.0;
    
    // Category Discounts based on MP DTE reservation patterns
    if (category === 'OBC') adjustedCutoff -= 4.0;
    else if (category === 'EWS') adjustedCutoff -= 5.0;
    else if (category === 'SC') adjustedCutoff -= 16.0;
    else if (category === 'ST') adjustedCutoff -= 22.0;
    
    // Domicile discount (MP State Domicile holds 90% seats with significantly broader cutoff bands)
    if (domicile === 'home') {
      adjustedCutoff -= 6.5;
    }
    
    // Bound the adjusted cutoff floor
    adjustedCutoff = Math.max(adjustedCutoff, 35.0);

    // Step 3: Determine Competitiveness & Message
    let statusClass = '';
    let statusTitle = '';
    let competitivenessMsg = '';
    let recommendationMsg = '';

    if (!isBoardEligible) {
      statusClass = 'danger';
      statusTitle = 'Not Eligible (Board Criteria Deficit)';
      competitivenessMsg = `Your 12th Board aggregate of <strong>${boardPct}%</strong> is below the mandatory minimum aggregate of <strong>${minRequiredPct}%</strong> required by MP DTE and MITS Gwalior for the ${category} category (${domicile === 'home' ? 'MP Domicile' : 'All India'}).`;
      recommendationMsg = `As per MP DTE autonomous admission ordinances, 45% (40% for MP reserved categories) in 10+2 PCM is an absolute statutory requirement. You cannot be allotted a seat in B.Tech counseling without meeting this threshold.`;
    } else {
      const difference = jeePercentile - adjustedCutoff;
      
      if (difference >= 5.0) {
        statusClass = 'success';
        statusTitle = 'High Probability (Strong Allotment Potential)';
        competitivenessMsg = `Your JEE Main Percentile (<strong>${jeePercentile}%</strong>) is comfortably above the indicative closing cutoff of approximately <strong>${adjustedCutoff.toFixed(1)}%</strong> for <strong>${branch}</strong> at MITS Gwalior under the ${category} (${domicile === 'home' ? '90% MP State Quota' : '10% All India Quota'}).`;
        recommendationMsg = `You hold a strong competitive edge for ${branch} in Round 1 of MP DTE online counseling (dte.mponline.gov.in). Put MITS Gwalior (College Code: 0901) and your preferred branch at the top of your choice-filling priority list.`;
      } else if (difference >= 0) {
        statusClass = 'warning';
        statusTitle = 'Moderate Chance (Competitive Allotment Zone)';
        competitivenessMsg = `Your JEE Main Percentile (<strong>${jeePercentile}%</strong>) is near the estimated cutoff threshold of <strong>${adjustedCutoff.toFixed(1)}%</strong> for ${branch} at MITS.`;
        recommendationMsg = `You have a realistic possibility of allotment in Round 2 or internal branch sliding. Ensure you list related branches (e.g. IT, AI&DS, or ECE) as subsequent choices during MP DTE option locking.`;
      } else if (difference >= -10.0) {
        statusClass = 'danger-soft';
        statusTitle = 'Borderline / CLC Opportunity';
        competitivenessMsg = `Your JEE Main Percentile (<strong>${jeePercentile}%</strong>) is below the typical regular counseling round cutoff of <strong>${adjustedCutoff.toFixed(1)}%</strong> for ${branch}.`;
        recommendationMsg = `Direct allotment in Round 1/2 is challenging. However, you should definitely register for <strong>College Level Counseling (CLC)</strong> at MITS Gwalior, where vacant seats are filled based on physical attendance and merit. Alternatively, explore core branches like EEE, Mechanical, or Civil.`;
      } else {
        statusClass = 'danger';
        statusTitle = 'Low Chance for Selected Branch';
        competitivenessMsg = `Your JEE Main Percentile (<strong>${jeePercentile}%</strong>) is considerably below the historical cutoff of <strong>${adjustedCutoff.toFixed(1)}%</strong> for ${branch}.`;
        recommendationMsg = `Regular merit allotment for ${branch} is unlikely. Consider selecting other engineering disciplines such as Mechanical, Civil, or Chemical Engineering at MITS, or participate in the final on-campus CLC round.`;
      }
    }

    // Render Results HTML
    this.resultContainer.innerHTML = `
      <div class="result-card result-${statusClass} animate-fade-in">
        <div class="result-header">
          <i class="fas ${finalEligibility && statusClass !== 'danger' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
          <div>
            <h4>${statusTitle}</h4>
            <small>Indicative MITS Cutoff: ~${adjustedCutoff.toFixed(1)} Percentile | Quota: ${domicile === 'home' ? '90% MP State Domicile' : '10% All India Quota'}</small>
          </div>
        </div>
        <div class="result-body">
          <p>${competitivenessMsg}</p>
          <p class="recommendation-text"><strong>Guidance:</strong> ${recommendationMsg}</p>
        </div>
        
        <div class="required-docs-section">
          <h5><i class="fas fa-file-alt"></i> MP DTE Counseling Document Checklist (MITS Gwalior — Code 0901)</h5>
          <ul class="docs-checklist">
            <li><i class="fas fa-check-square"></i> NTA JEE Main Rank Card & MP Online Allotment Letter</li>
            <li><i class="fas fa-check-square"></i> 10th (High School) Marksheet & 12th (Higher Secondary PCM) Marksheet</li>
            <li><i class="fas fa-check-square"></i> MP Domicile Certificate (${domicile === 'home' ? 'Required for 90% State Quota' : 'All India Open Candidate'})</li>
            <li><i class="fas fa-check-square"></i> Category / Caste Certificate (${category === 'GEN' ? 'Not Applicable' : `Competent Authority Certificate for ${category}`})</li>
            <li><i class="fas fa-check-square"></i> Income Certificate (Mandatory for TFW and OBC Non-Creamy Layer benefits)</li>
            <li><i class="fas fa-check-square"></i> Transfer Certificate (TC) & Migration Certificate</li>
          </ul>
        </div>
        
        <div class="calculator-disclaimer">
          <i class="fas fa-info-circle"></i>
          <span><strong>Official Notice & Disclaimer:</strong> This assessment provides an indicative projection based on past MP DTE counseling closing ranks. Actual cutoffs vary dynamically each academic year based on registered applicant percentiles and seat availability. Official allotments are governed solely by MP DTE (<a href="https://dte.mponline.gov.in" target="_blank" style="color:var(--accent-blue); text-decoration:underline;">dte.mponline.gov.in</a>).</span>
        </div>
      </div>
    `;
    
    this.resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

// Attach to window namespace
window.AdmissionCalculator = AdmissionCalculator;

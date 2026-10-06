const resumeInput = document.getElementById("resumeInput");
const jobInput = document.getElementById("jobInput");
const analyzeButton = document.getElementById("analyzeButton");
const clearButton = document.getElementById("clearButton");
const resultsContainer = document.getElementById("resultsContainer");

// Load saved data
resumeInput.value = getSavedResume();
jobInput.value = getSavedJobDescription();


// Analyze button
analyzeButton.addEventListener("click", function () {

    const resumeText = resumeInput.value.trim();
    const jobText = jobInput.value.trim();

    if (resumeText === "" || jobText === "") {

        resultsContainer.innerHTML = `
            <div class="result-block">
                <h3>Please enter both resume and job description.</h3>
            </div>
        `;

        return;
    }

    saveResumeData(resumeText, jobText);

    analyzeButton.textContent = "Analyzing...";
    analyzeButton.disabled = true;

    setTimeout(function () {

        const resumeAnalysis = analyzeResume(resumeText);
        const jobAnalysis = analyzeResume(jobText);

        const matchedSkills = getMatchedSkills(
            resumeAnalysis.skills,
            jobAnalysis.skills
        );

        const missingSkills = getMissingSkills(
            resumeAnalysis.skills,
            jobAnalysis.skills
        );

        const matchScore = calculateMatchScore(
            resumeAnalysis.skills,
            jobAnalysis.skills
        );

        const matchedKeywords = getMatchedKeywords(
            resumeAnalysis.resumeKeywords,
            jobAnalysis.jobKeywords
        );

        const missingKeywords = getMissingKeywords(
            resumeAnalysis.resumeKeywords,
            jobAnalysis.jobKeywords
        );

        const keywordScore = calculateKeywordScore(
            resumeAnalysis.resumeKeywords,
            jobAnalysis.jobKeywords
        );

        showResults(
            matchScore,
            matchedSkills,
            missingSkills,
            keywordScore,
            matchedKeywords,
            missingKeywords,
            resumeAnalysis.resumeSections
        );

        analyzeButton.textContent = "Analyze Resume";
        analyzeButton.disabled = false;

        resultsContainer.scrollIntoView({
            behavior: "smooth"
        });

    }, 700);
});


// Clear button
clearButton.addEventListener("click", function () {

    resumeInput.value = "";
    jobInput.value = "";

    clearSavedData();

    resultsContainer.innerHTML = `
        <p class="section-label">YOUR RESULTS</p>

        <h2>Resume Analysis</h2>

        <p>
            Your analysis results will appear here after you analyze your resume.
        </p>
    `;

    analyzeButton.textContent = "Analyze Resume";
    analyzeButton.disabled = false;
});


function showResults(
    matchScore,
    matchedSkills,
    missingSkills,
    keywordScore,
    matchedKeywords,
    missingKeywords,
    resumeSections
) {

    let matchedSkillHTML = "";

    if (matchedSkills.length > 0) {

        matchedSkills.forEach(function (skill) {

            matchedSkillHTML += `
                <span class="skill-tag">${skill}</span>
            `;

        });

    } else {

        matchedSkillHTML = "<p>No matching skills found.</p>";

    }


    let missingSkillHTML = "";

    if (missingSkills.length > 0) {

        missingSkills.forEach(function (skill) {

            missingSkillHTML += `
                <span class="skill-tag missing">${skill}</span>
            `;

        });

    } else {

        missingSkillHTML = "<p>No major missing skills found.</p>";

    }


    let matchedKeywordHTML = "";

    if (matchedKeywords.length > 0) {

        matchedKeywords.forEach(function (keyword) {

            matchedKeywordHTML += `
                <span class="skill-tag">${keyword}</span>
            `;

        });

    } else {

        matchedKeywordHTML = "<p>No matching keywords found.</p>";

    }


    let missingKeywordHTML = "";

    if (missingKeywords.length > 0) {

        missingKeywords.forEach(function (keyword) {

            missingKeywordHTML += `
                <span class="skill-tag missing">${keyword}</span>
            `;

        });

    } else {

        missingKeywordHTML = "<p>No major missing keywords.</p>";

    }


    let sectionsHTML = "";

    Object.keys(resumeSections).forEach(function (section) {

        if (resumeSections[section]) {

            sectionsHTML += `
                <div class="section-status">
                    <span>${section}</span>
                    <strong>Found</strong>
                </div>
            `;

        } else {

            sectionsHTML += `
                <div class="section-status">
                    <span>${section}</span>
                    <strong>Not Found</strong>
                </div>
            `;

        }

    });


    let suggestions = [];


    if (missingSkills.length > 0) {

        suggestions.push(
            "If you have experience with " +
            missingSkills.join(", ") +
            ", consider mentioning it in your resume."
        );

    }


    if (missingKeywords.length > 0) {

        suggestions.push(
            "If relevant to your experience, consider using more job-related keywords such as " +
            missingKeywords.slice(0, 5).join(", ") +
            "."
        );

    }


    if (!resumeSections.Projects) {

        suggestions.push(
            "Consider adding a Projects section to highlight your practical work."
        );

    }


    if (!resumeSections.Certifications) {

        suggestions.push(
            "If you have relevant certifications, consider adding a Certifications section."
        );

    }


    if (suggestions.length === 0) {

        suggestions.push(
            "Your resume has a good basic structure for this job description."
        );

    }


    let suggestionsHTML = "";

    suggestions.forEach(function (suggestion) {

        suggestionsHTML += `
            <li>${suggestion}</li>
        `;

    });


    resultsContainer.innerHTML = `

        <div class="results-dashboard">

            <div class="score-card">

                <p>Resume Match Score</p>

                <div class="score">
                    ${matchScore}%
                </div>

                <span>
                    Based on skills mentioned in the job description
                </span>

            </div>


            <div class="result-grid">

                <div class="result-block">

                    <h3>Matched Skills</h3>

                    <p>
                        ${matchedSkills.length} skills matched
                    </p>

                    <div class="skill-list">
                        ${matchedSkillHTML}
                    </div>

                </div>


                <div class="result-block">

                    <h3>Missing Skills</h3>

                    <p>
                        ${missingSkills.length} skills not found
                    </p>

                    <div class="skill-list">
                        ${missingSkillHTML}
                    </div>

                </div>


                <div class="result-block">

                    <h3>Keyword Match</h3>

                    <div class="keyword-score">
                        ${keywordScore}%
                    </div>


                    <h4>Matched Keywords</h4>

                    <div class="skill-list">
                        ${matchedKeywordHTML}
                    </div>


                    <h4>Missing Keywords</h4>

                    <div class="skill-list">
                        ${missingKeywordHTML}
                    </div>

                </div>


                <div class="result-block">

                    <h3>Resume Sections</h3>

                    <div class="sections-list">
                        ${sectionsHTML}
                    </div>

                </div>

            </div>


            <div class="result-block suggestions-block">

                <h3>Suggestions</h3>

                <ul>
                    ${suggestionsHTML}
                </ul>

            </div>

        </div>
    `;
}
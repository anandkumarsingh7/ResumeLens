function getMatchedSkills(resumeSkills, jobSkills) {

    return jobSkills.filter(function (skill) {
        return resumeSkills.includes(skill);
    });

}


function getMissingSkills(resumeSkills, jobSkills) {

    return jobSkills.filter(function (skill) {
        return !resumeSkills.includes(skill);
    });

}


function calculateMatchScore(resumeSkills, jobSkills) {

    if (jobSkills.length === 0) {
        return 0;
    }

    const matchedSkills = getMatchedSkills(
        resumeSkills,
        jobSkills
    );

    const score =
        (matchedSkills.length / jobSkills.length) * 100;

    return Math.round(score);
}


function getMatchedKeywords(resumeKeywords, jobKeywords) {

    return jobKeywords.filter(function (keyword) {
        return resumeKeywords.includes(keyword);
    });

}


function getMissingKeywords(resumeKeywords, jobKeywords) {

    return jobKeywords.filter(function (keyword) {
        return !resumeKeywords.includes(keyword);
    });

}


function calculateKeywordScore(resumeKeywords, jobKeywords) {

    if (jobKeywords.length === 0) {
        return 0;
    }

    const matchedKeywords = getMatchedKeywords(
        resumeKeywords,
        jobKeywords
    );

    const score =
        (matchedKeywords.length / jobKeywords.length) * 100;

    return Math.round(score);
}
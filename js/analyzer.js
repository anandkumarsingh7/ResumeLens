const skills = [
    "java",
    "c++",
    "javascript",
    "html",
    "css",
    "sql",
    "git",
    "github",
    "dsa",
    "data structures",
    "algorithms",
    "oop",
    "object oriented programming",
    "spring boot",
    "rest api",
    "api",
    "mysql",
    "database",
    "backend",
    "frontend",
    "full stack",
    "python",
    "react",
    "angular",
    "node.js",
    "testing",
    "debugging",
    "cloud"
];

const keywords = [
    "developer",
    "software engineer",
    "backend",
    "frontend",
    "full stack",
    "problem solving",
    "communication",
    "teamwork",
    "database",
    "api",
    "testing",
    "debugging",
    "deployment",
    "cloud",
    "internship",
    "intern",
    "software development",
    "web development"
];


function cleanText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s+#.-]/g, " ");
}


function findSkills(text) {
    const cleanedText = cleanText(text);

    return skills.filter(function (skill) {
        return cleanedText.includes(skill);
    });
}


function findKeywords(text) {
    const cleanedText = cleanText(text);

    return keywords.filter(function (keyword) {
        return cleanedText.includes(keyword);
    });
}


function findResumeSections(text) {
    const cleanedText = cleanText(text);

    return {
        Education: cleanedText.includes("education"),
        Skills: cleanedText.includes("skills"),
        Projects: cleanedText.includes("projects"),
        Experience: cleanedText.includes("experience"),
        Certifications: cleanedText.includes("certifications"),
        Achievements: cleanedText.includes("achievements")
    };
}


function analyzeResume(text) {
    const resumeSkills = findSkills(text);
    const resumeKeywords = findKeywords(text);
    const resumeSections = findResumeSections(text);

    return {
        skills: resumeSkills,
        resumeKeywords: resumeKeywords,
        jobKeywords: resumeKeywords,
        resumeSections: resumeSections
    };
}
function saveResumeData(resume, jobDescription) {

    localStorage.setItem("resumeLensResume", resume);
    localStorage.setItem("resumeLensJob", jobDescription);

}


function getSavedResume() {

    return localStorage.getItem("resumeLensResume") || "";

}


function getSavedJobDescription() {

    return localStorage.getItem("resumeLensJob") || "";

}


function clearSavedData() {

    localStorage.removeItem("resumeLensResume");
    localStorage.removeItem("resumeLensJob");

}
const courses = [
    { name: "WDD 130", type: "WDD", credits: 3, completed: true },
    { name: "CSE 121", type: "CSE", credits: 3, completed: false },
    { name: "WDD 231", type: "WDD", credits: 3, completed: true },
];

function filterCourses(type) {
    let filteredCourses = type === "All" ? courses : courses.filter(course => course.type === type);
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);

    document.getElementById("courses").innerHTML = filteredCourses.map(course => `
        <p style="color: ${course.completed ? 'green' : 'red'}">${course.name} - ${course.credits} Credits</p>
    `).join('') + `<p>Total Credits: ${totalCredits}</p>`;
}

document.getElementById("showAll").addEventListener("click", () => filterCourses("All"));
document.getElementById("showWDD").addEventListener("click", () => filterCourses("WDD"));
document.getElementById("showCSE").addEventListener("click", () => filterCourses("CSE"));

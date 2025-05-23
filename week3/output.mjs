export function setTitle(course) {
    document.querySelector("#courseTitle").textContent = course.title;
}

export function renderSections(sections) {
    const sectionContainer = document.querySelector("#section-list");
    sectionContainer.innerHTML = "";
    sections.forEach(section => {
        let sectionElement = document.createElement("div");
        sectionElement.textContent = `Section ${section.number}: ${section.enrolled} enrolled`;
        sectionContainer.appendChild(sectionElement);
    });
}


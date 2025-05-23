export function populateSections(sections) {
    const sectionSelect = document.querySelector("#sectionNumber");
    sectionSelect.innerHTML = "";
    sections.forEach(section => {
        let option = document.createElement("option");
        option.value = section.number;
        option.textContent = `Section ${section.number}`;
        sectionSelect.appendChild(option);
    });
}


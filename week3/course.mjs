const byuiCourse = {
    sections: [],
    changeEnrollment(sectionNum, enroll = true) {
        const section = this.sections.find(sec => sec.number === sectionNum);
        if (section) {
            enroll ? section.enrolled++ : section.enrolled--;
        }
    }
};

export default byuiCourse;


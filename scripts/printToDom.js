
let printToDOM = (allStudentObjs) => {
    let stringToDOM = ""

    allStudentObjs.forEach(student => {
        let event = (student.eventType === "ForkEvent") ? "Forked: " : "Last push: "

        let student_name = student.name === undefined ? "Nameless.." : student.name.name;

        stringToDOM += `
            <div class="card">
                <img class="student-avatar" src="${student.avatar}">
                <h4>${student_name}</h4>
                <p class="${student.color}">${event} ${student.diffDays}</p>
                <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}</p></a>
                <p>${student.message}</p>
                <a href="https://github.com/${student.githubHandle}" target="_blank">Student's Repo</a>
            </div>`

        $("#output").html(stringToDOM)
    })

}

module.exports = printToDOM;

function printToDOM(allStudentObjs) {
    let stringToDOM = ""

    allStudentObjs.forEach(student => {
        let event = (student.eventType === "ForkEvent") ? "Forked: " : "Last push: "

        stringToDOM += `
            <div class="card">
                <h4>${student.name.name}</h4>
                <p class="${student.color}">${event} ${student.diffDays}</p>
                <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}</p></a>
                <p>${student.message}</p>
                <a href="https://github.com/${student.githubHandle}" target="_blank">Student's Repo</a>
            </div>`

        $("#output").html(stringToDOM)
    })

}

module.exports = printToDOM;
let stringToDOM = ""

function prepForBootstrap(allStudents){
    let students = allStudents,
        counter = 0

    students.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

    students.forEach(student => {
        if (counter === 0) {
            stringToDOM += "<div class='row'>"
        }

        if (counter % 4 === 0) {
            stringToDOM += "</div>"
            stringToDOM += "<div class='row'>"
        }

        counter++
        printToDOM(student)
    })
}


function printToDOM(student) {
    let event = (student.eventType === "ForkEvent") ? "Forked a repo " : "Pushed to GitHub "

    stringToDOM += `
        <div class="card center col">
            <div class="card-body">
                <h4>${student.name.name}</h4>
                <p class="${student.color}">${event} ${student.diffDays}</p>
                <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}</p></a>
                <p>${student.message}</p>
                <a href="https://github.com/${student.githubHandle}" target="_blank">Student's Repo</a>
            </div>
        </div>`


    $("#output").html(stringToDOM)
}

module.exports = prepForBootstrap;
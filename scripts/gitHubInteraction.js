let printStudent = require ("./DOMinteraction.js");
let getStudentObject = require ("./extractStudentData.js");


function createPromises(students) {
    let arrayOfPromises = []
    $("#output").html("")

    console.log("students", students)

    students.forEach(student => {
        arrayOfPromises.push(
            $.ajax({
                type: "GET",
                url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/events`
            })
        )
    })

    getStudentData(arrayOfPromises, students)
}


function getStudentData(arrayOfPromises, students) {
    let allStudentObjs = []

    Promise.all(arrayOfPromises).then(responses => {
        responses.forEach(response => {
            allStudentObjs.push(getStudentObject(response, students))
        })
    }).then(() => {
        $(".loader-gif2").hide()
        printStudent(allStudentObjs)
    })

}

module.exports = createPromises;
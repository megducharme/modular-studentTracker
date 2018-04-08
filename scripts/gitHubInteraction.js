let {printToDOM, stringToDOM} = require("./DOMinteraction.js");
let getStudentObject = require("./extractStudentData.js");


function createPromises(students) {
    let arrayOfPromises = []

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

        allStudentObjs.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        stringToDOM.reset()

        allStudentObjs.forEach(student => {
            printToDOM(student)
        })
    })

}

module.exports = createPromises;
const printStudent = require("./printStudents.js")
const getStudentObject = require("./extractStudentData.js")


function createPromises(students) {
    let arrayOfPromises = []

    console.log("students", students)

    students.forEach(student => {
        arrayOfPromises.push(
            $.ajax({
                type: "GET",
                url: `../${student.githubHandle}.json`
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

module.exports = createPromises
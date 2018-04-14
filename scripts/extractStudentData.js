let studentFactory = require ("./studentFactory.js");

let buildStudentObject = (data, students) => {
    let studentName = students.find(student => {
        return student.githubHandle === data[0].actor.login
    })

    let studentEvent = data.find(event => {
        return event.type === "PushEvent"
    })

    if (data[0].type === "ForkEvent") {
        studentEvent = data[0]
    }

    return studentFactory(studentName, studentEvent)
}

module.exports = buildStudentObject;
let studentFactory = require("./studentFactory.js");

let buildStudentObject = (data, students) => {
  console.log("students", students);
  console.log("data", data);

  let studentName = students.find(student => {
    return student.githubHandle === data[0].actor.login;
  });
  console.log("studentName find data actor login", studentName);

  let studentEvent = data.find(event => {
    return event.type === "PushEvent";
  });

  if (data[0].type === "ForkEvent") {
    studentEvent = data[0];
  }

  return studentFactory(studentName, studentEvent);
};

module.exports = buildStudentObject;

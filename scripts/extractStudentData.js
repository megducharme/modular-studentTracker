let studentFactory = require("./studentFactory.js");

let buildStudentObject = (data, students) => {
  console.log("students passed in", students);
  console.log("data", data);

  //This is an array of students who should have accurate github usernames that match the usernames we have in our DB for them
  let accurateGithubStudents = [];

  //here we are mapping over the original students array, seeing if the username from github matches the github UN we have in our DB and then pushes each CORRECT UN student to our accurateGithubStudents array above.
  // students.map(student => {
  //   //this is the username returned from the github data
  //   if (data[0].actor.login === student.githubHandle) {
  //     console.log("student", student);
  //     accurateGithubStudents.push(student);
  //   } else {
  //     console.log("github account not found");
  //   }
  // });
  console.log("accurate github student array:", accurateGithubStudents);

  let studentName = accurateGithubStudents.find(student => {
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

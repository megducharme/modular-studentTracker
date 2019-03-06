let printToDOM = require("./printToDom.js");
let getStudentObject = require("./extractStudentData.js");

let createPromises = students => {
  let arrayOfPromises = [];

  console.log("students right before promise", students);

  students.forEach(student => {
    arrayOfPromises.push(
      $.ajax({
        type: "GET",
        url: `https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${
          student.githubHandle
        }/events`
      })
    );
  });
  console.log("arrayOfPromises", arrayOfPromises);

  // let correctGithubUserNames = arrayOfPromises.find(studentData => {
  //   // return responseJSON.studentData[0].actor.login !== "undefined";
  // });
  // console.log("correctGithubUserNames", correctGithubUserNames);

  getStudentData(arrayOfPromises, students);
};

//Wait... this getStudentData doesn't do anything? If I comment it out, everything still works
let getStudentData = (arrayOfPromises, students) => {
  let allStudentObjs = [];

  Promise.all(arrayOfPromises)
    .then(responses => {
      responses.forEach(response => {
        //you get this console log for every single student's github data. Therefore, the responseS need to filter out the bad usernames before going through this forEach
        console.log("promise.all response:", response);
        allStudentObjs.push(getStudentObject(response, students));
      });
    })
    .then(() => {
      $(".loader-gif2").hide();

      allStudentObjs.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

      printToDOM(allStudentObjs);
    });
};

module.exports = createPromises;

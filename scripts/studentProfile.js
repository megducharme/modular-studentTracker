let gitHubInteraction = require("./gitHub.js");

let cohort = "";

$("body").on("click", function(event) {
  console.log(event);
  if (event.target.className === "class-buttons") {
    $("#jsPoints").hide();
    $("#footer").hide();

    let jsonAddress = event.target.id;
    if (
      jsonAddress.startsWith("c__") ||
      jsonAddress.startsWith("ds__") ||
      jsonAddress.startsWith("e__")
    ) {
      $("#output").html("");
      let student_type_num = jsonAddress.split("__");
      //index 0 is c and index [1] is the number of the cohort
      //   console.log("student_type_num[0]", student_type_num[0]);
      //   console.log("student_type_num[1]", student_type_num[1]);

      let cohort = `../students/${student_type_num[0] +
        student_type_num[1]}.json`;
      getStudentData(cohort).then(students => {
        gitHubInteraction(students);
      });
    }
  }
});

let getStudentData = cohort => {
  $(".loader-gif").hide();
  $(".loader-gif2").show();

  let localDataPromise = $.ajax({
    type: "GET",
    url: cohort
  });

  return localDataPromise;
};

module.exports = getStudentData;

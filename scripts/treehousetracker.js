// let c25 = ["kyleducharme", "danielaagnoletti", "rachaelbabcock2", "coledoster", "deannavickers", "jessicaswift", "levischubert", "rafc", "DanielBeecroft", "katherynford", "seanirwin", "johnmccoy2", "patrickmurphy2", "williamprater", "jacobsmith10", "dejanstjepanovic", "hayleylandsberg", "jeremiahpritchard", "jonathanriggs", "joshuabarton", "ronnieyoung", "paulzimmermanclayton", "meghandebity", "davidpaul2", "jakecarter"]

// let c26 = ["sethdana", "joeysmith", "leahgwin", "jordanwilliams2", "elliothuck", "eventurino", "sathvikreddy", "evanlusky", "philippatton", "jenniferlawson4", "brettshearin", "williamkimball", "austingorman", "michaelroberts14", "klaushardt", "adelaideyoder", "jewelramirez", "laurenrichert", "natashacox2", "jakeneild", "jacobhenderson4", "robertleedy", "shuaibsajid" ]

// let c27 = ["madisonpeper", "jedwards", "gretchennutter", "alejandrofont", "kellycook4", "mateusvanhalen", "helenchalmers", "janetwoods", "gradyrobbins", "anupamsingla", "matthewaugustine2", "rickybruner", "michaelparrish", "priyankagarg", "markhale2", "taylorgulley", "michaelmcclenton", "johnwood9", "figamus", "streatorward"];

// let c28 = ["jessicabarnett3", "lesleyboyd", "sebastiancivarolo", "racheldaniel", "bradnashville", "seandavis3", "jasehackman", "robbyhecht", "richardlancaster", "nolanlittle", "brendanmccray", "maxmilner", "kellymorin", "bryannilsen", "justinavickers", "samuelwebber", "dillonwilliams", "austinzoradi", "elysedawson", "ousamaelayan", "jasehackman", "lindseyemaddox"]

// let c30 = [
//   "warnercarpenter",
//   "samuelcronin",
//   "stephenclark2",
//   "brianbneal",
//   "kirren",
//   "naienko",
//   "connorbailey",
//   "mosilvera",
//   "kellycoles",
//   "antoniojefferson",
//   "prafullatasonawane",
//   "jacobsanders2",
//   "kenperkerwicz",
//   "ryandillinger",
//   "janetwoods",
//   "jamesfarrell2",
//   "abbeymichaelbrown",
//   "nathansepulveda",
//   "niallfraser",
//   "aliabdulle"
// ];

let c31 = [
  "samalpren",
  "sambritt",
  "brianjobe",
  "williammitchell3",
  "christophermorgan",
  "jonathanschaffer",
  "anthonyvick",
  "michaelyankura",
  "jamekaechols"
];

let output = "";

let studentPoints = [];

$("#c25").click(function() {
  let arrayOfPromises = [];
  let studentJsPoints = [];
  studentPoints = [];
  output = "";
  $("#output").html(output);

  $(".loader-gif").hide();
  $("#footer").hide();
  $(".loader-gif2").show();

  c31.forEach(student => {
    arrayOfPromises.push(
      $.ajax({
        type: "GET",
        url: `https://teamtreehouse.com/${student}.json`
      })
    );
  });

  Promise.all(arrayOfPromises).then(responses => {
    responses.forEach(data => {
      let studentData = {
        name: data.name,
        totalPoints: data.points.total,
        digitalLiteracy: data.points["Digital Literacy"],
        jsPoints: data.points.JavaScript,
        cssPoints: data.points.CSS,
        htmlPoints: data.points.HTML,
        pythonPoints: data.points.Python,
        totalFEpoints:
          data.points.JavaScript + data.points.CSS + data.points.HTML,
        color: "red",
        gravatar_url: data.gravatar_url
      };

      if (
        studentData.totalFEpoints < 3000 &&
        studentData.totalFEpoints > 2000
      ) {
        studentData.color = "yellow";
      } else if (studentData.totalFEpoints > 3000) {
        studentData.color = "green";
      }
      studentPoints.push(studentData);
    });

    studentPoints.sort(function(a, b) {
      return b.totalFEpoints - a.totalFEpoints;
    });

    $(".loader-gif2").hide();
    $("#jsPoints").show();

    studentPoints.forEach(student => {
      printToDom(student);
    });

    $("#output").html(output);
  });
});

let printToDom = studentData => {
  output += `<div class="card">
            <img class="student-avatar" src="${studentData.gravatar_url}">
            <h4>${studentData.name}</h4>
            <div>
            JavaScript points: ${studentData.jsPoints}
            </div>
            <div>
            Digital Literacy points: ${studentData.digitalLiteracy}
            </div>
            <div>
            CSS points: ${studentData.cssPoints}
            </div>
            <div>
            HTML points: ${studentData.htmlPoints}
            </div>
                <i>Total Treehouse Points: ${studentData.totalPoints}</i>
            <div class=${studentData.color}>
                Total Front End Points: ${studentData.jsPoints +
                  studentData.cssPoints +
                  studentData.htmlPoints}
            </div>
        </div><br>`;
};

let sortByJs = () => {
  return studentPoints.slice(0).sort(function(a, b) {
    return b.jsPoints - a.jsPoints;
  });
};

$("#jsPoints").click(function() {
  let students = sortByJs();
  output = "";

  students.forEach(student => {
    printToDom(student);
  });

  $("#output").html(output);
});

(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
let stringToDOM = ""

function prepForBootstrap(allStudents){
    let counter = 0
    allStudents.forEach(student => {
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
    console.log("student made it!!", student)
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

module.exports = prepForBootstrap
},{}],2:[function(require,module,exports){
function studentFactory(studentName, studentEvent){
    let eventDate = new Date(studentEvent.created_at)

    if(studentEvent.type === "ForkEvent"){
        eventDate = new Date(studentEvent.payload.forkee.pushed_at)
    }

    const studentObject = Object.create(null, {
        name: {
            value: studentName
        },
        githubHandle: {
            value: studentEvent.actor.login
        },
        eventType: {
            value: studentEvent.type
        },
        repo: {
            value: studentEvent.repo.name.split("/")[1]
        },
        message: {
            value: (studentEvent.type === "ForkEvent") ? "-" : `"${studentEvent.payload.commits[studentEvent.payload.commits.length - 1].message}"`
        },
        repoURL: {
            value: studentEvent.repo.url.split("repos/")[1],
        },
        diffDays: {
            value: getDiffDays(eventDate),
            writable: true
        },
        color: {
            value: getStudentColor(getDiffDays(eventDate)),
            writable: true
        }
    })
    return studentObject
}

function getStudentColor(diffDays) {
    switch (diffDays) {
        case " today":
            return color = "green"
        case " yesterday":
            return color = "green"
        case 2 + " days ago":
        case 3 + " days ago":
            return color = "yellow"
        default:
            return color = "red"
    }
}

function getDiffDays(lastPush){
    let date = parseInt((new Date(Date.now()) - lastPush) / (1000 * 60 * 60 * 24))

    if(date === 0){
        return " today"
    }else if(date === 1){
        return " yesterday"
    }else{
        return date + " days ago"
    }
}

module.exports = studentFactory
},{}],3:[function(require,module,exports){
const studentFactory = require("./buildStudentObj.js")

function buildStudentObject(data, students){
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

module.exports = buildStudentObject
},{"./buildStudentObj.js":2}],4:[function(require,module,exports){
const printStudent = require("./DOMinteraction.js")
const getStudentObject = require("./extractStudentData.js")


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
        printStudent(allStudentObjs)
    })

}

module.exports = createPromises
},{"./DOMinteraction.js":1,"./extractStudentData.js":3}],5:[function(require,module,exports){
const gitHubInteraction = require("./gitHubInteraction.js")

let cohort = "";

$("#classBtn").on("click", function (event) {
    let jsonAddress = event.target.id
    if(jsonAddress.startsWith("c__")){
        $("#output").html("")
        let cohort = `../students/c${jsonAddress.split("__")[1]}.json`
        getStudentData(cohort).then(students => {
            gitHubInteraction(students)
        })
    }
})

function getStudentData(cohort) {
    $(".loader-gif").hide()
    $(".loader-gif2").show()

    let localDataPromise = $.ajax({
            type: "GET",
            url: cohort
        });

    return localDataPromise
}

module.exports = getStudentData
},{"./gitHubInteraction.js":4}],6:[function(require,module,exports){
const studentInfo = require("./localStudentData.js")
const treehousetracker = require("./treehousetracker.js")

$(".loader-gif2").hide()
$(".loader-gif").show()
$("#jsPoints").hide()
},{"./localStudentData.js":5,"./treehousetracker.js":7}],7:[function(require,module,exports){
let students = ["kyleducharme", "danielaagnoletti", "rachaelbabcock2", "coledoster", "deannavickers", "jessicaswift", "levischubert", "rafc", "DanielBeecroft", "katherynford", "seanirwin", "johnmccoy2", "patrickmurphy2", "williamprater", "jacobsmith10", "dejanstjepanovic", "hayleylandsberg", "jeremiahpritchard", "jonathanriggs", "joshuabarton", "ronnieyoung", "paulzimmermanclayton", "meghandebity", "davidpaul2", "jakecarter"]
let output = ""

let arrayOfPromises = []
let studentPoints = []
let studentJsPoints = []

$("#c25").click(function () {
    arrayOfPromises = []
    studentJsPoints = []
    studentPoints = []
    output = ""

    $(".loader-gif").hide()
    $(".loader-gif2").show()

    students.forEach(student => {
        arrayOfPromises.push(
            $.ajax({
                type: "GET",
                url: `https://teamtreehouse.com/${student}.json`
            })
        )
    })

    console.log("number of promises", arrayOfPromises.length)

    Promise.all(arrayOfPromises).then(responses => {
        responses.forEach(data => {

            let studentData = {
                name: data.name,
                totalPoints: data.points.total,
                jsPoints: data.points.JavaScript,
                cssPoints: data.points.CSS,
                htmlPoints: data.points.HTML,
                pythonPoints: data.points.Python,
                totalFEpoints: (data.points.JavaScript + data.points.CSS + data.points.HTML),
                color: "red"
            }

            if (studentData.totalFEpoints < 3000 && studentData.totalFEpoints > 2000) {
                studentData.color = "yellow"
            } else if (studentData.totalFEpoints > 3000) {
                studentData.color = "green"
            }

            studentPoints.push(studentData)

        })

        studentPoints.sort(function (a, b) {
            return b.totalFEpoints - a.totalFEpoints
        });

        console.log(studentPoints)

        $(".loader-gif2").hide()
        $("#jsPoints").show()

        let counter = 0;
        studentPoints.forEach(student => {
            if (counter === 0) {
                output += `<div class="row">`
            }

            if (counter % 4 === 0) {
                output += `</div>`
                output += `<div class="row">`
            }

            counter++
            printToDom(student)
        })

        $("#output").html(output);
    })

});

function printToDom(studentData) {
    output +=
        `<div class="card center col">
                <div class="card-body">
                    <strong><h3>${studentData.name}</h3></strong>
                    <div class="navy">
                    Python points: ${studentData.pythonPoints}
                    </div>
                    <div>
                    JavaScript points: ${studentData.jsPoints}
                    </div>
                    <div>
                    CSS points: ${studentData.cssPoints}
                    </div>
                    <div>
                    HTML points: ${studentData.htmlPoints}
                    </div>
                    <i>Total Treehouse Points: ${studentData.totalPoints}</i>
                    <div class=${studentData.color}>
                        Total Front End Points: ${studentData.jsPoints + studentData.cssPoints + studentData.htmlPoints}
                    </div>
                </div>
            </div>
            <br>`
}

function sortByJs() {
    return studentPoints.slice(0).sort(function (a, b) {
        return b.jsPoints - a.jsPoints
    });
}

$("#jsPoints").click(function () {
    let students = sortByJs()
    console.log("sort by JS points")
    console.log("student js points", studentJsPoints)
    output = ""
    let counter = 0;

    students.forEach(student => {
        if (counter === 0) {
            output += `<div class="row">`
        }

        if (counter % 4 === 0) {
            output += `</div>`
            output += `<div class="row">`
        }

        counter++
        printToDom(student)
    })

    $("#output").html(output);
})
},{}]},{},[6]);

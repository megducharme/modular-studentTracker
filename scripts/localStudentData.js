let gitHubInteraction = require ("./gitHubInteraction.js");

let cohort = "";

$("#classBtn").on("click", function (event) {
    $(this).siblings().removeClass("active")
    $(this).addClass("active");

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

module.exports = getStudentData;
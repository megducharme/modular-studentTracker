let gitHubInteraction = require ("./gitHub.js");

let cohort = "";

$("body").on("click", function(event) {
    console.log(event)
    if(event.target.className === "class-buttons"){
        $("#jsPoints").hide();
        $("#footer").hide();

        let jsonAddress = event.target.id;
        if(jsonAddress.startsWith("c__")){
            $("#output").html("")
            let cohort = `../students/c${jsonAddress.split("__")[1]}.json`
            getStudentData(cohort).then(students => {
                gitHubInteraction(students)
            })
        }
    }
})


let getStudentData = cohort => {
    $(".loader-gif").hide()
    $(".loader-gif2").show()

    let localDataPromise = $.ajax({
            type: "GET",
            url: cohort
        });

    return localDataPromise
}

module.exports = getStudentData;
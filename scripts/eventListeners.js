
function addListeners(){
    $("#classBtn").on("click", function (event) {
        let jsonAddress = event.target.id
        if(jsonAddress.startsWith("c__")){
            $("#output").html("")
            let cohort = `./c${jsonAddress.split("__")[1]}.json`
            getStudentData(cohort)
        }
    })
}

module.exports = addListeners;
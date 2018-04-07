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

export default studentFactory;
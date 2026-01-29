const subjectsButton = document.querySelectorAll("[id^=subject-]")
const startButton = document.querySelector("#quiz-start-button")

startButton.addEventListener("click", () => {
    const activeButton = document.querySelector("[id^=subject-][class*=btn-light]")
    const selectedSubject = activeButton.querySelector("span").innerHTML

    console.log("start the quiz")
})

subjectsButton.forEach((button) => {
    button.addEventListener("click", () => {
        handleSubjectButtonState(button)
    })
})

const handleSubjectButtonState = (button) => {
    const btnClassList = button.classList
    const description = document.querySelector("#quiz-description p")

    if (btnClassList.contains("btn-outline-light")) {
        // Check if there already is an active button.
        // If so, it has to be deactivate.
        const activeButton = document.querySelector("[class*=btn-light]")

        if (activeButton) {
            toggleClass(activeButton.classList, "btn-light", "btn-outline-light")
        }

        // Activate
        toggleClass(btnClassList, "btn-outline-light", "btn-light")

        // Update description
        const selectedSubject = button.querySelector("span").innerHTML
        description.innerHTML = `Vous avez choisi de vous entraîner sur <span class="fw-bold">${selectedSubject}</span>.`

        // Show the start button if it's hidden
        if (startButton.classList.contains("d-none")) {
            toggleClass(startButton.classList, "d-none", "d-block")
        }
    } else {
        // Deactivate
        toggleClass(btnClassList, "btn-light", "btn-outline-light")

        // Update description
        description.innerHTML = "Choisissez le sujet pour commencer le quiz."

        // Hide the start button
        toggleClass(startButton.classList, "d-block", "d-none")
    }
}

const toggleClass = (classList, token, newToken) => {
    classList.replace(token, newToken)
}
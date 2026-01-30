/* **************************************************************** */
/*                          Variables                               */
/* **************************************************************** */
const description = document.querySelector("#quiz-description p")
const startButton = document.querySelector("#quiz-start-button")
const stopButton = document.querySelector("#quiz-stop-button")
const subjectsButton = document.querySelectorAll("[id^=subject-]")

const quizDifficultyLevel = document.querySelector("#quiz-difficulty-level")
const quizCountQuestions = document.querySelector("#quiz-count-questions")
const quizCorrectAnswers = document.querySelector("#quiz-correct-answers")
const quizWrongAnswers = document.querySelector("#quiz-wrong-answers")
const quizForm = document.querySelector("#quiz-form")
const quizTextarea = document.querySelector("#quiz-textarea")
const quizSendButton = document.querySelector("#quiz-send-button")

const chatbox = document.querySelector("#quiz-conversation-area")
const aiMessageBoxTemplate = document.querySelector(".ai-message-box")
const userMessageBoxTemplate = document.querySelector(".user-message-box")

const modalElement = document.querySelector("#modal-stop-quiz")
const modal = new bootstrap.Modal(modalElement)
const modalButtonStop = document.querySelector("#modal-btn-stop")


/* **************************************************************** */
/*                           Functions                              */
/* **************************************************************** */
const handleStartQuiz = () => {
    const activeButton = document.querySelector("[id^=subject-][class*=btn-light]")
    const selectedSubject = activeButton.querySelector("span").innerHTML

    toggleClass(startButton.classList, "d-block", "d-none")
    toggleClass(stopButton.classList, "d-none", "d-block")

    subjectsButton.forEach((button) => {
        button.disabled = true
    })

    console.log("start the quiz")

    // Append the first message of AI
    chatbox.append(handleNewMessage("ai", "Bonjour ! Êtes-vous prêt à entamer votre quiz sur " + selectedSubject + " ?"))

    // Enable chatbox's form
    quizTextarea.disabled = false
    quizSendButton.disabled = false
}

const handleDifficultyLevel = (newLevel) => {
    quizDifficultyLevel.innerHTML = newLevel
}

const handleProgressionAndScore = (countQuestions, correctAnswers, wrongAnswers) => {
    quizCountQuestions.innerHTML = countQuestions
    quizCorrectAnswers.innerHTML = correctAnswers
    quizWrongAnswers.innerHTML = wrongAnswers
}

const handleNewMessage = (sender, message) => {
    const senderMessageBox = sender === "ai" ? aiMessageBoxTemplate.cloneNode(true) : userMessageBoxTemplate.cloneNode(true)

    senderMessageBox.querySelector(".card-body").innerHTML = message

    return senderMessageBox
}

const handleStopQuiz = () => {
    modal.hide()

    // Deactivate the active button
    const activeButton = document.querySelector("[id^=subject-][class*=btn-light]")
    
    if (activeButton) {
        toggleClass(activeButton.classList, "btn-light", "btn-outline-light")
    }

    // Update description
    description.innerHTML = "Choisissez le sujet pour commencer le quiz."

    // Hide buttons
    toggleClass(startButton.classList, "d-block", "d-none")
    toggleClass(stopButton.classList, "d-block", "d-none")

    subjectsButton.forEach((button) => {
        button.disabled = false
    })

    // Reset difficulty, progression and scores
    quizCountQuestions.innerHTML = "0"
    quizCorrectAnswers.innerHTML = "0"
    quizWrongAnswers.innerHTML = "0"

    // Reset chatbox and form
    chatbox.innerHTML = ""
    quizTextarea.disabled = true
    quizSendButton.disabled = true
}

const handleSubjectButtonState = (button) => {
    const btnClassList = button.classList

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
        description.innerHTML = `<span class="fw-bold">${selectedSubject}</span>`

        // Show the start and stop buttons if it's hidden
        if (startButton.classList.contains("d-none")) {
            toggleClass(startButton.classList, "d-none", "d-block")
        }
    } else {
        // Deactivate
        toggleClass(btnClassList, "btn-light", "btn-outline-light")

        // Update description
        description.innerHTML = "Choisissez le sujet pour commencer le quiz."

        // Hide the start and stop buttons
        toggleClass(startButton.classList, "d-block", "d-none")
    }
}

const toggleClass = (classList, token, newToken) => {
    classList.replace(token, newToken)
}


/* **************************************************************** */
/*                         Event listeners                          */
/* **************************************************************** */
startButton.addEventListener("click", handleStartQuiz)

stopButton.addEventListener("click", () => { modal.show() })

modalButtonStop.addEventListener("click", handleStopQuiz)

subjectsButton.forEach((button) => {
    button.addEventListener("click", () => {
        handleSubjectButtonState(button)
    })
})

quizForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(quizForm)
    const message = formData.get("textarea")

    chatbox.append(handleNewMessage("user", message))

    quizForm.reset()

    quizTextarea.disabled = true
    quizSendButton.disabled = true
})
const subjectsButton = document.querySelectorAll('[id^=subject-]')

subjectsButton.forEach((button) => {
    button.addEventListener("click", () => {
        handleSubjectButtonState(button)
    })
})

const handleSubjectButtonState = (button) => {
    const btnClassList = button.classList

    if (btnClassList.contains('btn-outline-light')) {
        // Check if there already is an active button.
        // If so, it has to be deactivate.
        const btnActive = document.querySelector('[class*=btn-light]')

        if (btnActive) {
            toggleClass(btnActive.classList, 'btn-light', 'btn-outline-light')
        }

        // Activate
        toggleClass(btnClassList, 'btn-outline-light', 'btn-light')
    } else {
        // Deactivate
        toggleClass(btnClassList, 'btn-light', 'btn-outline-light')
    }
}

const toggleClass = (classList, token, newToken) => {
    classList.replace(token, newToken)
}
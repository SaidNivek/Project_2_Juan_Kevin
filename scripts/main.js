const dropdown = document.getElementById("dropdown")

// Toggle the is-active class to the Javascript on click
dropdown.addEventListener('touchend', () => {
    dropdown.classList.toggle('is-active')
})
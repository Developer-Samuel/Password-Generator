document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const passwordInput = document.getElementById("password"); // Input field for password
    const lengthSlider = document.getElementById("lengthSlider"); // Slider for password length
    const lengthValue = document.getElementById("lengthValue"); // Display for password length value
    const generateButton = document.getElementById("generate-password-btn"); // Button to generate password
    const smallCharactersCheckbox = document.getElementById("small-characters"); // Checkbox for small characters
    const largeCharactersCheckbox = document.getElementById("large-characters"); // Checkbox for large characters
    const numbersCharactersCheckbox = document.getElementById("numbers-characters"); // Checkbox for numbers
    const specialCharactersCheckbox = document.getElementById("special-characters"); // Checkbox for special characters
    const listItems = document.querySelectorAll(".list .item"); // List of checkbox items
    const decreaseBtn = document.getElementById("decrease-length"); // Button to decrease password length
    const increaseBtn = document.getElementById("increase-length"); // Button to increase password length
    const copyIcon = document.querySelector(".random-password .copy img"); // Icon to copy password

    // Function to generate a random password based on selected criteria
    const generatePassword = () => {
        let characters = "";
        if (smallCharactersCheckbox.checked) characters += "abcdefghijklmnopqrstuvwxyz";
        if (largeCharactersCheckbox.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numbersCharactersCheckbox.checked) characters += "0123456789";
        if (specialCharactersCheckbox.checked) characters += "!@#$%^&*()-_+=/\\<>{}[]|";

        const length = parseInt(lengthSlider.value);
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        passwordInput.value = password;
    };

    // Function to check if at least one checkbox is checked
    const checkAtLeastOneChecked = () => {
        let atLeastOneChecked = false;
        listItems.forEach(item => {
            if (item.checked) {
                atLeastOneChecked = true;
            }
        });
        return atLeastOneChecked;
    };

    // Event handler for checkbox change
    const handleCheckboxChange = () => {
        if (!checkAtLeastOneChecked()) {
            listItems[0].checked = true;
        }
        generatePassword();
    };

    // Event listeners for generating password and updating length
    generateButton.addEventListener("click", generatePassword);
    
    generatePassword();

    lengthSlider.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword();
    });

    // Event listener for checkbox change
    listItems.forEach(item => {
        item.addEventListener("change", handleCheckboxChange);
    });

    // Function to update length value display
    function updateLengthValue(value) {
        lengthValue.textContent = value;
    }

    updateLengthValue(lengthSlider.value);

    // Event listener to update length value display
    lengthSlider.addEventListener("input", function() {
        updateLengthValue(this.value);
    });

    // Event listener for decreasing password length
    decreaseBtn.addEventListener("click", function() {
        var currentValue = parseInt(lengthSlider.value);
        if (currentValue > parseInt(lengthSlider.min)) {
            lengthSlider.value = currentValue - 1;
            updateLengthValue(lengthSlider.value);
            generatePassword();
        }
    });

    // Event listener for increasing password length
    increaseBtn.addEventListener("click", function() {
        var currentValue = parseInt(lengthSlider.value);
        if (currentValue < parseInt(lengthSlider.max)) {
            lengthSlider.value = currentValue + 1;
            updateLengthValue(lengthSlider.value);
            generatePassword();
        }
    });

    // Event listener for copying password to clipboard
    copyIcon.addEventListener("click", function() {
        passwordInput.select();
        document.execCommand("copy");
        const copiedMessage = document.querySelector(".random-password small");
        copiedMessage.style.display = "block";
        setTimeout(() => {
            copiedMessage.style.display = "none";
        }, 3000);
    });
});

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("firstName");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const errorMessageBox = document.getElementById("error-message");
const successsMessageBox = document.getElementById("success-message");

const wordCounter = document.getElementById("word-counter")

messageInput.addEventListener("input", function(){
    wordCounter.innerHTML = messageInput.value.length;

    if(messageInput.value.length > 20){
        console.log("exceeded the limit!")
        errorMessageBox.innerHTML = "You have exceeded your word limit!"
    }
})


contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // prevents default submission behaviour of the browser

    // reset previous success or error messages
    errorMessageBox.innerHTML = "";
    successsMessageBox.innerHTML = "";

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Input validations startes here
    if(!nameValue){
        // name is not present
        errorMessageBox.innerHTML = "Please enter your name";
    } else if(!emailValue) {
        errorMessageBox.innerHTML = "Please enter your email";
    } else if(!messageValue){
        errorMessageBox.innerHTML = "Please enter your message";
    }

    if(nameValue && emailValue && messageValue){
        successsMessageBox.innerHTML = "You have successfully submitted your inputs!";
    }

    // input validation ends here

    console.log("name:", nameValue);
    console.log("email: ", emailValue);
    console.log("message: ", messageValue);

    // submit the inputs to the server and save to the database
    const apiUrl = "/api/contact";

    const formData = {
        name: nameValue,
        email: emailValue,
        message: messageValue
    };

    // Use the fetch() method to submit the data to the server
    fetch(apiUrl, {
        method: "POST", // GET, PUT
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // converts the formData to a string (sentence)
    })
    .then(response => response.json()) // converts the response to json
    .then(data => {
        console.log("Response:", data);
        
        alert(data.message);
    })
    .catch((error) => {
        // there be might error
        console.error("There is an error", error);
        alert("Something went wrong!")
    })
})
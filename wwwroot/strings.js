document.addEventListener("DOMContentLoaded", function () {
    fetch('wwwroot/strings.json')
        .then(response => response.json())
        .then(data => {
            const strings = data.strings;
            const fromNet = data.fromNet;

            function getRandomString() {
                let previousString = localStorage.getItem("previousString") || "";
                let currentString = "";
                do {
                    const randomSourceIndex = Math.floor(Math.random() * (Object.keys(data).length));
                    const randomizeFromNet = fromNet[Math.floor(Math.random() * (fromNet.length))];
                    currentString = randomSourceIndex === 0 ? strings[Math.floor(Math.random() * (strings.length))] : randomizeFromNet.text;
                } while (currentString === previousString);
                
                localStorage.setItem("previousString", currentString);
                console.log(localStorage.getItem("previousString"));
                return currentString;
            }

            document.getElementById("stringRandom").textContent = getRandomString();

        })
        .catch(error => {
            console.error("Could not fetch JSON file", error)
        });
});

// Handle form submission
document.getElementById("quoteForm").addEventListener("submit", function (event) {
    emailjs.init("4wKG5fG7KUFivlMBd");
    event.preventDefault();
    const name = document.getElementById("name").value;
    const quote = document.getElementById("quote").value;
    const quoteForm = document.getElementById("quoteForm");

    // Send an email
    emailjs.sendForm('service_9wz91va', 'template_o88n5k8', '#quoteForm')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Request sent successfully and now under approval!")
            quoteForm.reset();
        }, function (error) {
            console.log('FAILED...', error);
            // alert("Sorry but your request was not sent.")
        });
});
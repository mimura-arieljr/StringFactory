document.addEventListener("DOMContentLoaded", function(){
    fetch('strings.json')
    .then(response => response.json())
    .then(data=>{
        const strings = data.strings;
        const fromNet = data.fromNet;

        const randomSourceIndex = Math.floor(Math.random()*(Object.keys(data).length));
        const textToDisp = fromNet[Math.floor(Math.random()*(fromNet.length))];

        const textToDisplay = randomSourceIndex ===0? strings[Math.floor(Math.random()*(strings.length))]: textToDisp.text;        
        document.getElementById("stringRandom").textContent= textToDisplay;
        
    })
    .catch(error=>{
        console.error("Could not fetch JSON file", error)
    });
});
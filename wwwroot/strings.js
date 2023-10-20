document.addEventListener("DOMContentLoaded", function(){
    fetch('wwwroot/strings.json')
    .then(response => response.json())
    .then(data=>{
        const strings = data.strings;
        const fromNet = data.fromNet;

        function getRandomString(){
            let previousString = "";
            let currentString = "";
            do{
                const randomSourceIndex = Math.floor(Math.random()*(Object.keys(data).length));
                const randomizeFromNet = fromNet[Math.floor(Math.random()*(fromNet.length))];
                currentString = randomSourceIndex ===0? strings[Math.floor(Math.random()*(strings.length))]: randomizeFromNet.text;
            }while(currentString === previousString);

            previousString=currentString;
            return currentString;
        }
                
        document.getElementById("stringRandom").textContent= getRandomString();
        
    })
    .catch(error=>{
        console.error("Could not fetch JSON file", error)
    });
});
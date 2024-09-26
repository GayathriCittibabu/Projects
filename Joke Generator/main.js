const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

const apikey = "I38MO+6ddSGek57+V8Exgg==0A2zOdjMd3GaQmIo";

const options = {
    method: 'GET',
    // JokeAPI doesn't require an API key in the headers
};

const category = "Any"; // Define the joke category (e.g., "Programming", "Misc", "Dark", "Any")
const apiURL = `https://v2.jokeapi.dev/joke/${category}`;

async function getJoke() {
    try {
        const response = await fetch(apiURL, options);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle single-part and two-part jokes
        if (data.type === "single") {
            jokeEl.textContent = data.joke; // Single-part joke
        } else if (data.type === "twopart") {
            jokeEl.textContent = `${data.setup} - ${data.delivery}`; // Two-part joke
        }
        
    } catch (error) {
        console.error('Failed to fetch the joke:', error);
        jokeEl.textContent = "Sorry, something went wrong. Please try again later.";
    }
}

btnEl.addEventListener("click", getJoke);

document.body.innerHTML = `
    <h1>Random GIF Generator</h1>
    <div id="gif-container"></div>
    <button id="new-gif-btn">Get New GIF</button>
`;

const fetchRandomGif = async () => {
    const gifContainer = document.getElementById("gif-container");
    gifContainer.innerHTML = "Loading...";
    
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My&rating=g`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.data || !data.data.images) {
            throw new Error("Invalid data structure received from API");
        }
        
        const gifUrl = data.data.images.original.url;
        gifContainer.innerHTML = `<img src="${gifUrl}" alt="Random GIF">`;
        
    } catch (error) {
        console.error("Error fetching GIF:", error);
        gifContainer.innerHTML = `<p>Failed to load GIF: ${error.message}</p>`;
    }
};

document.addEventListener("DOMContentLoaded", fetchRandomGif);
document.getElementById("new-gif-btn").addEventListener("click", fetchRandomGif);

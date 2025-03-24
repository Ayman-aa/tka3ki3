(function(numChildren, partnerName, location, jobTitle) {
    const sentence = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
    
    function displayInDOM() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', appendToDOM);
        } else {
            appendToDOM();
        }
    }
    function appendToDOM() {
        const paragraph = document.createElement('p');
        paragraph.textContent = sentence;
        document.body.appendChild(paragraph);
    }
    
    displayInDOM();
})(3, "Alex", "Tokyo", "Software Engineer");
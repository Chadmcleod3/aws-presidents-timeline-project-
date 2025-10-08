// Function to fetch the data and build the timeline
async function loadTimeline() {
    // Get the container element where we will display the cards
    const container = document.getElementById('timeline-container');
    
    try {
        // 1. Fetch the local JSON file. This is the crucial step for S3 deployment,
        // as S3 must be configured to allow this file to be retrieved.
        const response = await fetch('presidents.json');
        
        // Check if the network request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 2. Parse the JSON data
        const presidents = await response.json();
        
        // 3. Loop through the data and dynamically create HTML elements (the cards)
        presidents.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('timeline-card');
            
            // Populate the card with the data
            card.innerHTML = `
                <div class="year">${data.year}</div>
                <h2>${data.president}</h2>
                <p>Party: ${data.party}</p>
            `;
            
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading the presidential data:', error);
        // Display a detailed error message if fetching or parsing fails
        container.innerHTML = 
            `<p class="error">Deployment Error: Failed to load timeline data. Check AWS S3 Bucket Policy (Permissions) or file names. Details: ${error.message}</p>`;
    }
}

// Start the application when the page loads
loadTimeline();
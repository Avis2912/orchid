const scrapePage = async (url) => {
    try {
        const response = await fetch('https://us-central1-pentra-claude-gcp.cloudfunctions.net/scrapeWebpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        return await response.json();
    } catch (error) {
        console.error('Scrape Error:', error);
        return { content: '' }; // Graceful fallback
    }
};

module.exports = scrapePage;

const YOU_API_KEY = '7cc375a9-d226-4d79-b55d-b1286ddb4609<__>1P4FjdETU8N2v5f458P2BaEp-Pu3rUjGEYkI4jh';

// Just forward to cloud function
const youSearch = async (query) => {
    try {
        const response = await fetch('https://us-central1-pentra-claude-gcp.cloudfunctions.net/youAPIFunction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: query
            })
        });
        return await response.json();
    } catch (error) {
        console.error('You API Error:', error);
        throw error;
    }
};

module.exports = youSearch;

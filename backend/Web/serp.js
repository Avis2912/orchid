async function getGoogleSERPResults(query) {
    const url = "https://api.dataforseo.com/v3/serp/google/images/live/advanced";
    const payload = JSON.stringify([{
        keyword: query,
        location_code: 2826,
        language_code: "en",
        device: "desktop",
        os: "windows",
        depth: 100,
        search_param: "",
    }]);

    const headers = {
        'Authorization': 'Basic YXZpcm94NEBnbWFpbC5jb206NTEwNjUzYzA0ODkyNjBmYg==',
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching SERP results:", error);
        throw error;
    }
}

module.exports = { getGoogleSERPResults };
const modelKeys = {
    1: 'claude-3-haiku-20240307',
    2: 'claude-3-5-sonnet-20240620',
    3: 'claude-3-sonnet-20240229',
    4: 'claude-3-opus-20240229',
} 

const claudeAPI = async (request) => {
    try {
        const { messages, model = 1 } = request; 

        let formattedMessages = messages;
        if (typeof messages === 'string') {
            formattedMessages = [{ role: 'user', content: messages }];
        }

        const gptResponse = await fetch('https://us-central1-pentra-claude-gcp.cloudfunctions.net/gcp-claudeAPI', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: formattedMessages,
                model: modelKeys[model],
                system: ``
            })
        });

        const textResponse = await gptResponse.text(); // Get raw text first
        let response;
        try {
            response = JSON.parse(textResponse);
        } catch (e) {
            // If not JSON, wrap the text in a similar format to OpenAI
            response = {
                choices: [{
                    message: {
                        content: textResponse
                    }
                }]
            };
        }
        return response;

    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to process request');
    }
};

module.exports = claudeAPI;

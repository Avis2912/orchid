const modelKeys = {
    1: 'gpt-4o-mini-2024-07-18',
    2: 'gpt-4o-2024-08-06',
    3: 'o3-mini-2025-01-31',
};

const openAIAPI = async (request) => {
    try {
        const { messages, model = 1, responseSchema = {} } = request;

        let formattedMessages = messages;
        if (typeof messages === 'string') {
            formattedMessages = [{ role: 'user', content: messages }];
        }

        // Ensure array schema compliance
        const fixArraySchema = (schema) => {
            if (schema.type === 'array' && !schema.items) {
                schema.items = { type: 'string' }; // Default to string array
            }
            return schema;
        };

        // Recursively fix array schemas
        const traverseAndFix = (obj) => {
            if (obj && typeof obj === 'object') {
                for (const key in obj) {
                    if (key === 'properties') {
                        for (const prop in obj[key]) {
                            if (obj[key][prop].type === 'array') {
                                fixArraySchema(obj[key][prop]);
                            }
                        }
                    }
                    traverseAndFix(obj[key]);
                }
            }
        };

        traverseAndFix(responseSchema);

        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                messages: formattedMessages,
                model: modelKeys[model],
                // response_format: {
                //     type: "json_schema",
                //     json_schema: {
                //       name: "event",
                //       schema: {
                //         type: "object",
                //         properties: {
                //           company: { type: "string" },
                //           revenue: { type: "string" },
                //           members: {
                //             type: "array",
                //             items: { type: "string" }
                //           }
                //         },
                //         required: ["company", "revenue", "members"],
                //         additionalProperties: false
                //       },
                //       strict: true
                //     }
                //   }
                response_format: {
                  type: "json_schema",
                  json_schema: {   
                    name: "company_list_or_analysis",
                    schema: responseSchema,
                    strict: true
                  }}
            })
        });

        if (!gptResponse.ok) {
            const errorBody = await gptResponse.text();
            throw new Error(`OpenAI API Error: ${gptResponse.status} - ${errorBody}`);
        }

        return await gptResponse.json();

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = openAIAPI;

// GOAL: High fidelity web analysis queries, towit:
// 1. Finds more relevant leads than OpenAI deep research
// 2. Formats them perfectly into a reasonable format

// TOOLS AT HAND: Semantic Snippet Queries (basic web search), 
// Deep Webpage Analysis (reads full webpage for interesting urls),

// 1. analyze the user request, see what tools you have at hand, and create 6-8 step plan
// 2. run queries for each step
// 3. somehow self-iterate??
// 4. after completion, ask if there's any additional areas you can explore

require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');

// Add better error handling and validation
const validateEnvironment = () => {
    const requiredEnvVars = ['OPENAI_API_KEY'];
    const missing = requiredEnvVars.filter(key => !process.env[key]);
    if (missing.length) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

const claudeAPI = require('./LLMs/claude');
const openAIAPI = require('./LLMs/openai');
const youSearch = require('./Web/you'); // to run a web search. can just put the entire output through an llm eventually
const scrapePage = require('./Web/firecrawl'); // to scrape a page in full, dont use yet

// Add a logging utility
const log = {
    info: (...args) => console.log('\x1b[36m%s\x1b[0m', '📘 [INFO]', ...args),
    warn: (...args) => console.log('\x1b[33m%s\x1b[0m', '⚠️ [WARN]', ...args),
    error: (...args) => console.log('\x1b[31m%s\x1b[0m', '❌ [ERROR]', ...args),
    success: (...args) => console.log('\x1b[32m%s\x1b[0m', '✅ [SUCCESS]', ...args)
};


async function runDeepAnalysisFlow(userQuery, onProgress) {

    let plannedSteps;

    try {
        log.info('Starting analysis for query:', userQuery);
        
        const partialResults = [];
        const analysisSchema = {
            type: "object",
            properties: {
                steps: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            step: { type: "integer" },
                            step_title: { type: "string" },
                            queries: {
                                type: "array",
                                items: { type: "string" }
                            },
                        },
                        required: ["step", "step_title", "queries"],
                        additionalProperties: false
                    }
                }
            },
            additionalProperties: false,
            required: ["steps"]
        };

        // Step 1: Plan using OpenAI
        log.info('Step 1: Planning with o3...');
        onProgress?.({ step: 0, info: "Planning search strategy..." });
        const planResponse = await openAIAPI({
            messages: [{
                role: 'user',
                content: `Given this search query: "${userQuery}", 
                create a 5-8 point search strategy (including all queries) focusing on finding all the right companies.
                Not each step must have queries attached, but every step involving searching should have them attached. 
                When attaching queries, know that these are queries that the model will then run on google to find relevant articles to research further.
                When attaching queries, always attach 9-12 of them.`
            }],
            model: 1,
            responseSchema: analysisSchema
        });
    
        log.info('Analysis Planning response:', planResponse?.choices?.[0]?.message?.content + '...');
        
        try {
            plannedSteps = typeof planResponse?.choices?.[0]?.message?.content === 'string' ? JSON.parse(planResponse.choices[0].message.content) : planResponse.choices[0].message.content;
        } catch (err) {
            log.error('Error parsing plan response as JSON:', err);
            plannedSteps = { steps: [] };
        }
        
        log.info('Steps planned:', plannedSteps?.steps);
        partialResults.push({ step: 1, info: planResponse?.choices?.[0]?.message?.content || "Plan created" });

        // Log the planned steps to the console immediately
        console.log('Planned Steps:', plannedSteps?.steps);

        // Step 2: Search using You.com cloud function
        log.info('Step 2: Searching You.com...');
        onProgress?.({ step: 1, info: "Searching for companies..." });
        const searchResults = await fetch('https://us-central1-pentra-claude-gcp.cloudfunctions.net/youAPIFunction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: userQuery
            })
        }).then(r => r.json());

        log.info(`Found ${searchResults?.hits?.length || 0} results from You.com`);
        log.info('First result:', searchResults?.hits?.[0]);
        partialResults.push({ step: 1, info: `Found ${searchResults?.hits?.length || 0} potential matches` });

        // Step 3: Enrich with Claude
        log.info('Step 3: Enriching data with Claude...');
        onProgress?.({ step: 2, info: "Analyzing companies..." });
        const enrichResponse = await claudeAPI({
            messages: [{
                role: 'user',
                content: `Based on these search results, generate a list of potential company leads with detailed information: ${JSON.stringify(searchResults?.hits?.slice(0, 5))}`
            }],
            model: 1,
        });
        log.info('Enrichment response:', enrichResponse?.choices?.[0]?.message?.content?.slice(0, 1000) + '...');
        partialResults.push({ step: 2, info: "Enhanced company profiles" });

        // Step 4: Final formatting with OpenAI
        log.info('Step 4: Final formatting with OpenAI...');
        onProgress?.({ step: 3, info: "Preparing final results..." });

        // Updated JSON schema with proper array definitions
        const jsonSchema = {
            "type": "object",
            "properties": {
                "companies": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": { "type": "string" },
                            "revenue": { "type": "string" },
                            "readiness": { "type": "string" },
                            "location": { "type": "string" },
                            "growth": { "type": "string" },
                            "employees": { "type": "string" },
                            "industry": { "type": "string" },
                            "logo": { "type": "string" },
                            "sources": {
                                "type": "object",
                                "properties": {
                                    "count": { "type": "number" },
                                    "details": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": { "type": "string" },
                                                "url": { "type": "string" },
                                                "date": { "type": "string" },
                                                "icon": { "type": "string" }
                                            },
                                            "required": ["type", "url", "date", "icon"],
                                            "additionalProperties": false
                                        }
                                    }
                                },
                                "required": ["count", "details"],
                                "additionalProperties": false
                            },
                            "reasoning": { "type": "string" },
                            "tags": {
                                "type": "array",
                                "items": { "type": "string" }
                            }
                        },
                        "required": ["name", "revenue", "readiness", "location", "growth", 
                                "employees", "industry", "logo", "sources", "reasoning", 
                                "tags"],
                        "additionalProperties": false
                    }
                }
            },
            "additionalProperties": false,
            "required": ["companies"],
        };

        const finalMessage = {
            messages: [{
                role: 'system',
                content: `Convert this company analysis into a properly formatted JSON array of company objects: ${enrichResponse?.choices?.[0]?.message?.content}`
            }],
            model: 2,
            responseSchema: jsonSchema
        };

        const finalResponse = await openAIAPI(finalMessage);

        const finalContent = JSON.stringify(finalResponse?.choices?.[0]?.message?.content);
        log.info('Final response received, length:', finalContent?.length);
        log.info('Final response:', finalContent);
        
        try {
            const parsed = JSON.parse(finalContent);
            log.success('Successfully parsed final JSON, companies:', parsed);
            console.log('Successfully parsed final JSON, companies:', parsed);
            log.success('Companies:', parsed.companies);
            partialResults.push({ step: 3, info: "Results formatted" });
            return {
                steps: plannedSteps.steps,
                partialResults,
                finalAnswer: finalContent
            };
        } catch (parseError) {
            log.error('Failed to parse final JSON:', finalContent);
            throw new Error('Invalid JSON in final response');
        }

    } catch (error) {
        log.error('Analysis flow error:', error);
        log.error('Error stack:', error.stack);
        throw error;
    }
}

const startServer = async () => {
    try {
        log.info('Starting server...');
        log.info('Environment check:', {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT || 3699,
            OPENAI_KEY: process.env.OPENAI_API_KEY ? '✅ Present' : '❌ Missing',
            CWD: process.cwd()
        });

        validateEnvironment();
        
        const app = express();
        app.use(cors());
        app.use(express.json());

        // Add health check endpoint
        
        app.get('/health', (_, res) => res.send('OK'));

        // Add error handling middleware
        app.use((err, req, res, next) => {
            log.error('Server error:', err);
            res.status(500).json({
                error: 'Server error',
                message: err.message,
                step: err.step // Track which step failed
            });
        });

        // Wrap runDeepAnalysisFlow in better error handling
        app.post('/api/deepAnalysis', async (req, res) => {
            const requestId = Math.random().toString(36).substring(7);
            log.info(`[${requestId}] New request received:`, req.body?.query);
            
            try {
                const { query } = req.body || {};
                if (!query?.trim()) {
                    log.warn(`[${requestId}] Empty query received`);
                    return res.status(400).json({ 
                        error: 'Invalid query',
                        message: 'Query cannot be empty'
                    });
                }

                // Track progress locally instead of streaming
                const progressUpdates = [];
                const results = await runDeepAnalysisFlow(query, (progress) => {
                    log.info(`[${requestId}] Progress:`, progress);
                    progressUpdates.push(progress);
                });

                log.success(`[${requestId}] Analysis completed successfully`);
                return res.json({
                    success: true,
                    progress: progressUpdates,
                    results: {
                        steps: results.steps,
                        partialResults: results.partialResults,
                        companies: JSON.parse(results.finalAnswer).companies || []
                    }
                });

            } catch (error) {
                log.error(`[${requestId}] Analysis failed:`, error);
                log.error(`[${requestId}] Stack:`, error.stack);
                return res.status(500).json({
                    success: false,
                    error: 'Analysis failed',
                    message: error.message,
                    step: error.step
                });
            }
        });

        // Start server with retries
        const PORT = process.env.PORT || 3699;
        const MAX_RETRIES = 3;
        let retries = 0;

        const tryStart = () => {
            app.listen(PORT, () => {
                log.success(`Orchid server running on port ${PORT}`);
            }).on('error', (err) => {
                if (err.code === 'EADDRINUSE' && retries < MAX_RETRIES) {
                    retries++;
                    log.warn(`Port ${PORT} in use, retrying... (${retries}/${MAX_RETRIES})`);
                    setTimeout(tryStart, 1000);
                } else {
                    log.error('Server failed to start:', err);
                    process.exit(1);
                }
            });
        };

        tryStart();

    } catch (error) {
        log.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Add global error handler
process.on('unhandledRejection', (error) => {
    log.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
    log.error('Uncaught Exception:', error);
});

startServer();
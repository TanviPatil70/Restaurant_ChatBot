const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');

const app = express();
const port = 3000;

const projectId = 'restaurant-assisstant-9ccn';

const sessionClient = new dialogflow.SessionsClient();

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en-US'
                }
            }
        };

        const [response] = await sessionClient.detectIntent(request);

        const result = response.queryResult;

        res.json({
            reply: result.fulfillmentText || "I'm sorry, I didn't understand that."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            reply: "Sorry, something went wrong while contacting FoodieHub."
        });
    }
});

app.listen(port, () => {
    console.log(`FoodieHub chatbot running at http://localhost:${port}`);
});
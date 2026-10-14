const dialogflow = require('@google-cloud/dialogflow');

const projectId = 'restaurant-assisstant-9ccn';
const sessionId = 'foodiehub-test-123';
const languageCode = 'en-US';

const sessionClient = new dialogflow.SessionsClient();

async function testDialogflow() {
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: 'Hello',
                languageCode: languageCode,
            },
        },
    };

    try {
        const [response] = await sessionClient.detectIntent(request);

        console.log('Dialogflow connected successfully!');
        console.log(
            'Bot:',
            response.queryResult.fulfillmentText
        );
    } catch (error) {
        console.error('Dialogflow connection failed:');
        console.error(error);
    }
}

testDialogflow();
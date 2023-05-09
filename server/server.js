import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import data from './mocks/data.json' assert {type: 'json'};
import { writeDistinctEmailsToJson, checkEmail } from './helper.js';
import distinctData from './mocks/distinct_emails.json' assert {type: 'json'};
import refined_data from './mocks/refined_data.json' assert {type: 'json'};
const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON body data
app.use(bodyParser.json());
app.use(cors())
// Endpoint to derive email address

//NOTE: Due to shortage of time I cannot modify the directoy structure 

app.post('/email', (req, res) => {
    const { fullName, domainName } = req.body;
    writeDistinctEmailsToJson(data, 'mocks/distinct_emails.json');
    checkEmail(distinctData, 'mocks/refined_data.json')
    // Check if company domain exists in sample data set
    if (!Object.values(distinctData).some(email => email.endsWith(`@${domainName}`))) {
        return res.status(200).json({ message: 'Company domain not found or email format unknown' });
    }
    else {
        refined_data.find((e) => {
            if (e.domain == domainName) {
                if (e.type == "initial") {
                    const firstNameInitial = fullName[0].toLowerCase();
                    const lastName = fullName.split(' ').pop().toLowerCase();
                    const email = `${firstNameInitial}${lastName}@${domainName}`;
                    return res.json({ email });
                }
                else if (e.type == "firstname_lastname") {
                    const nameParts = fullName.toLowerCase().split(' ');
                    const email = `${nameParts.join('')}@${domainName}`;
                    return res.json({ email });
                }
            }
        })
    }
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server;
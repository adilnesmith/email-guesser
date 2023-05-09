
import fs from 'fs';

export function writeDistinctEmailsToJson(_data, outputFile) {
    const domainNames = new Set();
    const distinctData = {};

    for (const [name, email] of Object.entries(_data)) {
        const domain = email.split('@')[1];
        if (!domainNames.has(domain)) {
            domainNames.add(domain);
            distinctData[name] = email;
        }
    }
    fs.writeFile(outputFile, JSON.stringify(distinctData, null, 2), (err) => {
        if (err) throw err;
        console.log(`Distinct emails have been written to ${outputFile}`);
    });
}

export function checkEmail(data, outputFile) {
    const output = [];
    for (const [name, email] of Object.entries(data)) {
        const [nameFromEmail, domainFromEmail] = email.split('@');
        const fullNameConvertedToLower = name.toLowerCase().replace(/\s+/g, '');
        const firstNameInitial = name[0].toLowerCase();
        const lastName = name.split(' ').pop().toLowerCase();
        const emailWithFirstInitial = `${firstNameInitial}${lastName}`;

        if (nameFromEmail === fullNameConvertedToLower) {
            output.push({
                email,
                name,
                type: 'firstname_lastname',
                domain: domainFromEmail
            });
        } else if (emailWithFirstInitial === nameFromEmail) {
            output.push({
                email,
                name,
                type: 'initial',
                domain: domainFromEmail
            });
        }
    }
    fs.writeFile(outputFile, JSON.stringify(output, null, 2), (err) => {
        if (err) throw err;
        console.log(`Refined data has been written to ${outputFile}`);
    });
}

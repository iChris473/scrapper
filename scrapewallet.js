const request = require('request');
const cheerio = require('cheerio');
const { addressHtml } = require('./wallet.html');
const { anotherAddress } = require('./secondwallet');

const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    path: './address_2.csv',
});
 
// Define the array to be written to the CSV file
const records = [
    ['address'],
];

let data = [];

async function getAddresses() {
    try {
        const html = anotherAddress();
        const $ = cheerio.load(html);
        $('.t6de38h').each((i, el) => {
            const name = $(el).text();
            if (name.trim().length == 48) {
                records.push([name.trim()]);
            }
        })
        csvWriter.writeRecords(records) // returns a promise
        .then(() => {
            console.log('...Done');
        });
    } catch (error) {
        console.log(error);
    }
}

getAddresses();
const request = require('request');
const cheerio = require('cheerio');


let data = [];

// 1.
request(
    'https://studentship.com.ng/nigerian-universities-courses/', 
    (error, response, html) => {
    if(!error && response.statusCode === 200){
        
        const $ = cheerio.load(html);

        $('tbody tr').each((i, el) => {

            const name = $(el).children().first().text();

            data.push({ name: name.trim().replace("\u00a0"," ") });

        });
        console.log(data);
    };
    
});
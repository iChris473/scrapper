const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs').promises;

// 1. NIGERIAN UNIVERISTY = https://www.nuc.edu.ng/nigerian-univerisities/federal-univeristies/
// 2. STATE UNIVERISTY = https://www.nuc.edu.ng/nigerian-univerisities/state-univerisity/
// 3. PRIVATE UNIVERSITY = https://www.nuc.edu.ng/nigerian-univerisities/private-univeristies/
// 4. PRIVATE AFFILIATIONS = https://www.nuc.edu.ng/approved-affiliations/

let data = [];

// 1.
request(
    'https://www.nuc.edu.ng/nigerian-univerisities/private-univeristies/', 
    (error, response, html) => {
    if(!error && response.statusCode === 200){
        
        const $ = cheerio.load(html);

        $('tr').each((i, el) => {

            const name = $(el).find('.column-2').text();

            const website = $(el).find('.column-4 a').html();

            const year = $(el).find('.column-5').text();

            if(name !== 'FEDERAL UNIVERSITIES'){
                
                const school = { name: name.trim().replace("\u00a0"," ") };

                if(website){
                    school.website = website;
                };

                if(year){
                    school.year = year;
                }
                
                data.push(school);

            }
        });

        console.log(data.slice((-15)));

    };
    
});

// //2.
// request(
//     'https://www.nuc.edu.ng/nigerian-univerisities/state-univerisity/',
//     (error, response, html) => {
//     if(!error && response.statusCode === 200){
        
//         const $ = cheerio.load(html);

//         $('tr').each((i, el) => {

//             const name = $(el).find('.column-2').text();

//             const website = $(el).find('.column-4 a').html();

//             const year = $(el).find('.column-5').text();

//             if(name !== 'FEDERAL STATE UNIVERSITIES'){
                
//                 const school = { name };

//                 if(website){
//                     school.website = website;
//                 };

//                 if(year){
//                     school.year = year;
//                 }
                
//                 data.push(school);

//             }

//         });      
//     };
    
// });

// //3.
// request(
//     'https://www.nuc.edu.ng/nigerian-univerisities/private-univeristies/', 
//     (error, response, html) => {
//     if(!error && response.statusCode === 200){
        
//         const $ = cheerio.load(html);

//         $('tr').each((i, el) => {

//             const name = $(el).find('.column-2').text();

//             const website = $(el).find('.column-4 a').html();

//             const year = $(el).find('.column-5').text();

//             if(name !== ''PRIVATE UNIVERSITIES'){
                
//                 const school = { name };

//                 if(website){
//                     school.website = website;
//                 };

//                 if(year){
//                     school.year = year;
//                 }
                
//                 data.push(school);

//             }

//         });      
//     };
    
// });

//4. 
// request(
//     'https://www.nuc.edu.ng/approved-affiliations/',
//     async (error, response, html) => {
//     if(!error && response.statusCode === 200){
        
//         const $ = cheerio.load(html);

//         $('.et_pb_toggle_content').each((i, el) => {
//             const name = $(el).text();
//             if(name.includes('1.') && !name.includes('2.')){
//                 data.push({ name: name.slice(3).trimStart().replace("\u00a0"," ") })
//             }
//         });

//         $('p').each((i, el) => {
//             const name = $(el).text();
//             if(!name.includes('1.') && name && name != ' '){
//                 data.push({ name: name.slice(3).trimStart().replace("\u00a0"," ") });
//             }
//         })
//         data[0].name = 'Peaceland College of Education, Enugu';

//     };

// });

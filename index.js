const fs = require('fs');
const http = require('http');
const url= require("url");
const replaceTemplate = require('./starter/modules/replaceTemplate.js');
///////////////////////////////////////////////////////
////////////////File System
//Blocking, syncronous
// const textin= fs.readFileSync('./starter/txt/input.txt','utf-8');
// console.log(textin);
// const textout= `This is what we created: ${textin} \n created on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt',textout);
// console.log('file created');

//nonBlocking,nonsyncronous
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err,data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(err,data2) =>{
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt','utf-8', (err,data3) =>{
//             console.log(data3);
//             fs.writeFile('./starter/txt/final.txt',`${data2} \n ${data3}`,'utf-8', (err) =>
//             {
//                 console.log("File written in final");
//             })

//         })
//     })
// })
// console.log("read this first");





const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/temlplate-overview.html`,'utf-8');
const tempCard =fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
//const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');
//const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataobj = JSON.parse(data);



const server = http.createServer((req,res) =>
{
    const { query, pathname }= url.parse(req.url, true);
     //console.log(pathname);]

    //Overview page
    if(pathname === '/' || pathname === '/overview')
    {
        res.writeHead(200, {'Content-type':'text/html'});

        const cardsHtml = dataobj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);

        res.end(output);

        
    }

    //Product page 
    else if(pathname === '/product')
    {
        res.writeHead(200, {'Content-type':'text/html'});
        const product = dataobj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    }


    //API page 
    else if(pathname === '/api')
    {
         //res.end("API");
        //fs.readFile(`${__dirname}/starter/dev-data/data.json`,'utf-8', (err,data) =>
        //{
           
            res.writeHead(200, {'Content-type':'application/json'});
            res.end(data);
            //console.log(productData);
       // });
    }

    //Not found page
    else
     {
         res.writeHead(404,{
             'Content-type': 'text/html',
             'my-own-header': 'Hello world'
         });
         res.end('<h1>Page Not Found</h1>');

     }
   
});
server.listen(8000,'127.0.0.1');
console.log("Listening on port 8000");
const fs = require('fs');
const http = require('http');
const url = require('url');
 const replaceTemplate = require('./Modules/replaceTemplate');
////////////// Server ////////////////////



const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
   const pathName =req.url;
    const  {query , pathname } = url.parse(req.url, true);
   
   //overview page

   if(pathname === '/' || pathname === '/overview'){
         res.writeHead(200,{'Content-type': 'text/html'});
         

       const cardHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
       const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml)
       res.end(output);
   }
//product page

   else if (pathname === '/product'){
       
    const product = dataObj [query.id];
    output = replaceTemplate(tempProduct,product)
    res.end(output);
   }

//API
   else if (pathname === '/api')
   {
     res.writeHead(200,{'Content-type': 'application/json'});
     res.end(data);  
   }
// Not Found Page
   else {
       res.writeHead(404,{
           'Content-type': 'text/html',
           'my-own-header': 'hello-world'
       });
       res.end('<h1> Page not Found</h1>')
   }
   
});

server.listen(8000,'127.0.0.1', () => {
    console.log('listen to request on port 8000')
});





















////////////// syncrones blocking way /////////////////////

// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `hello how are you guys \n ${textIn} \n and date is today \n ${Date.now()}`;
// fs.writeFileSync('./txt/output2.txt', textOut);
// console.log("file written");
 
////////////// asyncrones non-blocking way /////////////////////

// fs.readFile('./txt/start.txt','utf-8' , (err,data1) => {
    
// fs.readFile(`./txt/${data1}.txt`,'utf-8' , (err,data2) => {
//      console.log(data2);
// fs.readFile('./txt/append.txt','utf-8' , (err,data3) => {
//     console.log(data3);
//     fs.writeFile('./txt/final.txt' ,`${data1} \n  ${data2} \n ${data3}`,'utf-8', err => {
//         console.log('file be written !!')
//     })
// })
// })
// })
// console.log("will read")
const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()
const PORT = 80
const realworldUrl= require('./projectPath').realworldUrl
const handleListening = () =>
console.log(`✅ Listening Port : ${PORT}`);

app.listen(PORT, handleListening);
const os = require( 'os' );
const networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);
console.log(networkInterfaces);
const arr = networkInterfaces['Loopback Pseudo-Interface 1']
const ip = arr[1].address
console.log('ip',ip);
const template = fs.readFileSync(path.join(__dirname,realworldUrl,'index.html'), { encoding: 'utf8'});

app.use('/realworld',express.static(path.join(__dirname,realworldUrl)));

app.get('/realworld*', (req, res) => {
    const newTemplate = template.replace('main.js', `http://${ip}:${PORT}/realworld/main.js`);
    console.log('send realworld');
    // return res.send('realworld');
    res.send(newTemplate);
    // res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})
app.get('/yunshop/*', (req, res) => {
    return res.send('yun shop');
})
app.get('/favicon.ico', (req, res) => {
    console.log('send  favicon');
    return res.send();
})
app.get('/*', (req, res) => {
    console.log('send  read me');
    return res.send('read me')
})
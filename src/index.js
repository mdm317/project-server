const fs = require('fs');
const path = require('path');
const express = require('express')
const app = express()
const PORT = 80
const realworldUrl= require('./projectPath').realworldUrl
const yunshopUrl = require('./projectPath').yunshopUrl
const handleListening = () =>
console.log(`✅ Listening Port : ${PORT}`);

const insertPath = require('./utils').insertPath;
const insertRealworld = insertPath('realworld');
const insertYunshop = insertPath('yunshop');
const relativePathReg = /(\=\"\/)([^\/])/g;

app.listen(PORT, handleListening);

const realworldHtml = fs.readFileSync(path.join(__dirname,realworldUrl,'index.html'), { encoding: 'utf8'});
const yunShopHtml = fs.readFileSync(path.join(__dirname,yunshopUrl,'index.html'), { encoding: 'utf8'});

//수정전의 html 이 보내지는것을 막기위해 index에 false 를 넣어줌
app.use('/realworld',express.static(path.join(__dirname,realworldUrl),{  index: false,}));
app.use('/yunshop',express.static(path.join(__dirname,yunshopUrl),{  index: false,}));

app.get('/realworld*', (req, res) => {

    const newHtml = realworldHtml.replace(relativePathReg,insertRealworld);
    console.log('send realworld');
    // return res.send('realworld');
    res.send(newHtml);
    // res.sendFile(path.resolve(__dirname, '../dist/index.html'));
})
app.get('/yunshop*', (req, res) => {
    const newHtml = yunShopHtml.replace(relativePathReg,insertYunshop);
    console.log('send yunshop');
    // console.log(newHtml);
    res.send(newHtml);

    // console.log('send yunshop');
    // res.sendFile(path.join(__dirname,yunshopUrl,'index.html'));
})
app.get('/favicon.ico', (req, res) => {
    console.log('send  favicon');
    return res.send();
})
app.get('/*', (req, res) => {
    console.log('send  read me');
    res.redirect('https://mdm317.github.io/')
})
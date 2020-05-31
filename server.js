const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');


const app = express()
const port = 3000




app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get('/media_urls', function (req, res) {
    get_urls().then(urls => res.json(urls));
})



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});


async function get_urls() {
    image_urls = [];

    let results = await cloudinary.search
        .expression('folder:portfolio-website')
        .max_results(12)
        .sort_by('filename', 'asc')
        .execute()

    let items = results.resources;
    items.forEach(item => image_urls.push(item.secure_url));

    return image_urls
        
}







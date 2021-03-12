const mongoose = require('mongoose');
const { title } = require('process');
const Campground = require('../Models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/YelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6048051cab6baef232160830',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:[ 
                { url: 'https://res.cloudinary.com/ssurge/image/upload/v1615353464/YelpCamp/qsmnua2dbqakz6xnphdt.jpg',
                  filename: 'YelpCamp/qsmnua2dbqakz6xnphdt' 
                },
                { url:'https://res.cloudinary.com/ssurge/image/upload/v1615353464/YelpCamp/xasrq1lpr1uin0czouii.jpg',
                  filename: 'YelpCamp/xasrq1lpr1uin0czouii' 
                },
                { url: 'https://res.cloudinary.com/ssurge/image/upload/v1615353465/YelpCamp/hirm4uhzjeekn1budm6d.jpg',
                  filename: 'YelpCamp/hirm4uhzjeekn1budm6d' 
                } 
            ],

            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pellentesque nibh at sapien fringilla rhoncus. Fusce eget interdum tellus, quis pharetra elit. In dapibus et diam id dictum. Donec tincidunt. ',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
            },
        })
        await camp.save(); 
    }
}

seedDB().then(() => {
    db.close();
})
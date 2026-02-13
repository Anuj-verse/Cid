const mongoose = require('mongoose');
require('dotenv').config();
const Character = require('./models/Character');

const characters = [
    {
        name: 'ACP Pradyuman',
        image: '/acp.jpg',
        poses: [
            '/acp.jpg', // Standard
            '/acp.jpg',
            '/acp.jpg'
        ],
        dialogues: [
            "Kuch toh gadbad hai, Daya!",
            "Daya, darwaza tod do!",
            "Abhijeet, is case ko dhyaan se dekho.",
            "Kuch toh choot raha hai humse.",
            "Iska matlab samjhe Daya? Yeh sab inka natak hai!",
            "Aakhri baar pooch raha hoon, khoon kisne kiya?",
            "Tumhe toh phaansi hogi... phaansi!"
        ]
    },
    {
        name: 'Abhijeet',
        image: '/abhijeet.jpg',
        poses: [
            '/abhijeet.jpg', // Standard
            '/abhijeet.jpg',
            '/abhijeet.jpg'
        ],
        dialogues: [
            "Mai Senior Inspector Abhijeet bol raha hu. CID se.",
            "Daya, darwaza tod do!",
            "Tumhe phaansi hogi!",
            "Kuch toh gadbad hai.",
            "Yeh khoon tumne kiya hai!",
            "Boss, mujhe lagta hai ki ye suicide nahi, murder hai.",
            "Jhoot mat bolo! Hamein sab pata hai."
        ]
    },
    {
        name: 'Daya',
        image: '/daya.jpg',
        poses: [
            '/daya.jpg', // Standard
            '/daya.jpg',
            '/daya.jpg'
        ],
        dialogues: [
            "Sir, darwaza band hai!",
            "Jab tak tum sach nahi bologe, tab tak main tumhe nahi chodunga!",
            "Ye sab tumhara kiya dhara hai!",
            "Abhijeet, sir sahi keh rahen hain.",
            "Iska matlab khooni is imarat mein chupa hai!",
            "Ek thappad maara toh saara sach bahar aa jayega!"
        ]
    }
];

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Character.deleteMany({});
        await Character.insertMany(characters);
        console.log('Data seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding data:', err);
        mongoose.connection.close();
    });

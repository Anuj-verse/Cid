const mongoose = require('mongoose');
require('dotenv').config();
const Character = require('./models/Character');

const characters = [
    {
        name: 'ACP Pradyuman',
        image: '/acp1.jpeg',
        poses: [
            '/acp1.jpeg', // Standard
            '/acp2.jpeg',
            '/acp3.jpeg'
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
            '/abhijeet2.jpeg',
            '/abhijeet3.jpeg'
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
        image: '/daya2.jpeg',
        poses: [
            '/daya.jpg', // Standard
            '/daya2.jpeg',
            '/daya3.jpeg'
        ],
        dialogues: [
            "Sir, darwaza band hai!",
            "Jab tak tum sach nahi bologe, tab tak main tumhe nahi chodunga!",
            "Ye sab tumhara kiya dhara hai!",
            "Abhijeet, sir sahi keh rahen hain.",
            "Iska matlab khooni is imarat mein chupa hai!",
            "Ek thappad maara toh saara sach bahar aa jayega!"
        ]
    },
    {
        name: 'Ab',
        image: '/ab.jpeg',
        poses: ['/ab.jpeg', '/ab.jpeg', '/ab.jpeg'],
        dialogues: [
            "Exam hall mein aisa lagta hai jaise sab kuch bhool gaya hoon!",
            "Mummy: Beta, shaadi kab karega? Main: Next question please!",
            "Gym jaane ka plan roz banta hai, par jaata kabhi nahi!",
            "Traffic mein phas jao toh lagta hai, zindagi slow motion hai!"
        ]
    },
    {
        name: 'Ajay',
        image: '/ajay.jpeg',
        poses: ['/ajay.jpeg', '/ajay.jpeg', '/ajay.jpeg'],
        dialogues: [
            "Fridge khol ke khana dhoondhna, aur mummy ka 'kuch nahi hai' sunna!",
            "Alarm 6 baje ka, uthte 9 baje hain!",
            "Online shopping mein cart bharna, par order kabhi nahi karna!",
            "Raincoat tabhi milta hai jab baarish khatam ho jaye!"
        ]
    },
    {
        name: 'Akshay',
        image: '/akshay.jpeg',
        poses: ['/akshay.jpeg', '/akshay.jpeg', '/akshay.jpeg'],
        dialogues: [
            "Chai garam ho ya dosti, dono dil se honi chahiye!",
            "Selfie lene jao, storage full!",
            "ATM pe line tabhi badi hoti hai jab jaldi ho!",
            "TV remote hamesha gaayab kyu rehta hai?"
        ]
    },
    {
        name: 'Amresh',
        image: '/amresh.jpeg',
        poses: ['/amresh.jpeg', '/amresh.jpeg', '/amresh.jpeg'],
        dialogues: [
            "Mummy ki daant, alarm se tez hoti hai!",
            "Friend: Treat kab dega? Main: Jab lottery lag jaaye!",
            "Lift hamesha tabhi slow hoti hai jab late ho!",
            "Chappal hamesha bed ke neeche milti hai!"
        ]
    },
    {
        name: 'Jetha',
        image: '/jetha.jpeg',
        poses: ['/jetha.jpeg', '/jetha.jpeg', '/jetha.jpeg'],
        dialogues: [
            "Bapuji ki daant, wifi se tez hai!",
            "Sabzi lene jao, sabse mehengi wali pasand aa jati hai!",
            "Neighbour ki shaadi mein khana sabse pehle!",
            "Mobile charge tabhi khatam hota hai jab zarurat ho!"
        ]
    },
    {
        name: 'Sharukh',
        image: '/sharukh.jpeg',
        poses: ['/sharukh.jpeg', '/sharukh.jpeg', '/sharukh.jpeg'],
        dialogues: [
            "Dil toh har kisi ka tut-ta hai, par pizza kabhi nahi chhodta!",
            "Selfie lene jao, piche se mummy aa jati hai!",
            "Movie dekhte waqt popcorn khatam sabse pehle!",
            "Raincoat tabhi milta hai jab baarish khatam ho jaye!"
        ]
    },
    {
        name: 'Smile',
        image: '/smile.jpeg',
        poses: ['/smile.jpeg', '/smile.jpeg', '/smile.jpeg'],
        dialogues: [
            "Smile karo, mummy daant nahiengi!",
            "Photo khinchne jao, aankh band ho jati hai!",
            "Ice cream girte hi sabse pehle dog aata hai!",
            "Exam mein sabse pehle pen hi chala jaata hai!"
        ]
    },
    {
        name: 'Varun',
        image: '/varun.jpg',
        poses: ['/varun.jpg', '/varun.jpg', '/varun.jpg'],
        dialogues: [
            "Varun ka swag, sabse alag!",
            "Party tabhi milti hai jab paise khatam ho!",
            "Chai ki chuski, dosto ke saath!",
            "Shopping mall mein sabse mehenga cheez pasand aati hai!"
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

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import { Builder, parseString } from 'xml2js';



const data = await fs.readFile('./items.json','utf8');
const parsedData = JSON.parse(data);


let users =[];
users = parsedData;

const router = express.Router();

router.get('/',(req,res)=>{
    console.log(parsedData);
    res.send(parsedData)
});

router.post('/', async (req,res)=>{
    const user =req.body;
    const userId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const userWithId = {...user, id: userId}
    users.push(userWithId);
    await fs.writeFile('./items.json', JSON.stringify(users, null, 2),'utf8');
    res.send(`User with the name  ${user.firstName} added to the database`);
})


router.get('/get', (req, res)=>{
    const builder  = new Builder();
    const xml = builder.buildObject(parsedData);
    res.type('application/xml').send(xml);
})



router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const foundUser = users.find(user=> user.Id === id);

    res.send(foundUser);
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    users = users.filter(user=> user.id !== id);
    await fs.writeFile('./items.json', JSON.stringify(users, null, 2),'utf8');
    res.send(`user with the id ${id} deleted from db`);    

});


// router.get('/users', (req, res)=> {
//     const format = req.query.format;

//     if(format === 'json'){
//         res.json(users);
//     }
//     else if(format === 'html'){
//         let html = '<h1>Users</h1>';
//         users.forEach(user=>{
//             html+=`<p>ID: ${user.id}, Name: ${user.firstName} ${user.lastName}</p>`;
//         });
//         res.send(html);
//     }
//     else if (format === 'xml') {
//         let xml = '<?xml version="1.0" encoding="UTF-8"?><users>';
//         users.forEach(user => {
//             xml += `<user><id>${user.id}</id><firstName>${user.firstName}</firstName><lastName>${user.lastName}</lastName><age>${user.age}</age></user>`;
//         });
//         xml += '</users>';
//         res.set('Content-Type', 'application/xml'); // Set header
//         res.send(xml); // Send as XML
//     } else {
//         res.status(400).send('Invalid format requested'); // Handle invalid format
//     }
// });
export default router;
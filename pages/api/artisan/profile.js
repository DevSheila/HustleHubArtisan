import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
     if(!req.body) {
      return res.status(404).json({ error: "Don't have form data...!"});
     }
    const { phone, profession, years, image,email  } = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();

    try {
      // Check if the profile already exists
      // const existingUser = await db.collection('artisans').findOne({ email });
      // if (existingUser) {
      //   res.status(409).json({ message: 'Profile email already exists' });
      //   return;
      // }
      // Create a new user
      const result = await db.collection('artisans').updateOne({ email: req.body.email }, req.body);
      return res.status(201).json({ message: 'Profile created' ,data:result});

    } catch (error) {

      return res.status(500).json({ message: 'Something went wrong' });

    } finally {

      client.close();
      
    }

  } else if(req.method === 'PATCH'){
   //save artisan details to mongo db
      const client = await MongoClient.connect(process.env.MONGO_URL);   // Connect to MongoDB
      const db = client.db();
   
      // //Check if the profile already exists
      // const existingUser = await db.collection('artisans').findOne({ email });
      // if (existingUser) {
      //   res.status(409).json({ message: 'Profile email already exists' });
      //   return;
      // }
    let email=req.body.email;
    let artisan=req.body.artisan
    console.log("webhook email2"+req.body.email)
      // Create a new artisan
    const result = await db.collection('artisans').findOneAndUpdate({ email:email },{$set: {artisan:artisan}});
      return res.status(201).json({ message: 'Account verified' ,data:result});
      
  }else {
    console.log("yeyeyy6")

    return res.status(400).json({ message: 'Invalid request method' });
  }
}
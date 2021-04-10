import { MongoClient, Db, Collection } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
  //Add your play-around code here


  //update single document
  await db.collection('inventory').updateOne(
    {item: 'paper'}, 
    {
      $set: {'size.uom': 'mm', status: 'p'},
      $currentDate: {lastModified: true}
    });

  //update multiple documents
  await db.collection('inventory').updateMany(
    {qty: {$lt:50}},
    {
      $set: {'size.uom': 'in', status: 'P'},
      $currentDate: {lastModified: true}
    });
  
  //replace single document
  await db.collection('inventory').replaceOne(
    {item: 'notebook'},
    {
      name: "replaced"
    }
  )


  client.close()
})()

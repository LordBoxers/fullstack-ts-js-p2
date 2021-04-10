import { MongoClient, Db, Collection, ObjectId } from "mongodb"
import connect from "./connect";
import setupTestData from "./setupTestData"

(async function Tester() {
  const client = await connect();
  const db = client.db("day1ex1")
  const collection = db.collection("inventory")
  const status = await setupTestData(collection)
  
  //Add your play-around code here
  const demo = db.collection("demo");
  await demo.deleteMany({})
  await demo.insertOne({name:"Kurt"})
  await demo.insertOne({animal:"Lion"})

  //print all info in a collection
  const all = await demo.find({}).toArray()
  console.log(all)

  //print first element
  const first:any = all[0] 
  console.log(all[0]._id)

  //print timestamp
  console.log(new ObjectId(first._id).getTimestamp())

  //returned array of inserted documents
  const cursor = db.collection('demo').find({})
  

  client.close()
})()

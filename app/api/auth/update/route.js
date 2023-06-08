import clientPromise from "@/libs/mongodb/client";
import connectMongo from "@/libs/mongodb/connect";
import Users from "@/libs/mongodb/model/user_schema";
import { NextResponse } from "next/server";

let client
let db
let users

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
    users = await db.collection('users')
  } catch (error) {
    throw new Error('Failed to stablish connection to database')
  }
}

export async function PUT(request){
     //create connection with mongodb
    connectMongo().catch(error => NextResponse.json({ message: "Connection Failed...!"}))

    //create connection with nextauth database
    if (!users) await init()


    const { username,email}= await request.json()

    //checking missing data
    if (!username) return NextResponse.json({ "message": "Missing required data" })

    const update = await Users.findOneAndUpdate({ email },{username},{new:true}) ||  await users.updateOne({ email }, { $set: {name:username} })
    if(update){
        return NextResponse.json(update)
    }
    return NextResponse.json({message:"update failed"})



}
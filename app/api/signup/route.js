import connectMongo from "@/libs/mongodb/connect"
import Users from "@/libs/mongodb/model/user_schema"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request) {

    //create connection with mongodb
    connectMongo().catch(error => NextResponse.json({ message: "Connection Failed...!"}))

    const { username,email,password }= await request.json()

    //console.log(username,email,password)

    //checking missing data
    if (!username || !email || !password) return NextResponse.json({ "message": "Missing required data" })

    //checking duplicate username
     const checkUsernameExisting = await Users.findOne({ username });
     if(checkUsernameExisting) return NextResponse.json({ message: "Username Already Used...!"},{status:422});

     //checking duplicate username
     const checkEmailExisting = await Users.findOne({ email });
     if(checkEmailExisting) return NextResponse.json({ message: "Email Already Used...!"},{status:422});

    //hashed password and post it to database
    const newUser=new Users({
        username, 
        email, 
        password : await hash(password, 12)},
    )
   newUser.save()
   return NextResponse.json({
    message:"New user created......"
   },{
    status:200
   })
      




    
}
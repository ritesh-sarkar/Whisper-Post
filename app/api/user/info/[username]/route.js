import User from "@/models/UserModel";
import ConnectToDB from "@/lib/DBConnection";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    //Grab username
    const username = params.username;

    try {
        await ConnectToDB();

        const users = await User.findOne({ username: username });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import User from "@/models/UserModel";
import MessageModel from "@/models/MessageModel";
import ConnectToDB from "@/lib/DBConnection";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";

export async function DELETE() {
    try {
        await ConnectToDB();

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Delete all messages belonging to the user
        await MessageModel.deleteMany({
            user: user._id,
        });

        // Delete user account
        await User.findByIdAndDelete(user._id);

        return NextResponse.json(
            {
                success: true,
                message: "Account deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
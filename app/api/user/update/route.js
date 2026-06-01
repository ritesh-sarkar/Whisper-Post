import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import User from "@/models/UserModel";
import ConnectToDB from "@/lib/DBConnection";
import cloudinary from "@/lib/Cloudinary";
import { authOptions } from "@/lib/AuthOptions";

export async function PATCH(req) {
    try {
        // Database connection
        await ConnectToDB();

        // Session check
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Current user
        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Form data
        const formData = await req.formData();

        const name = formData.get("name");
        const username = formData.get("username");
        const image = formData.get("image");
        
        

        // Username uniqueness check
        if (username && username !== user.username) {
            const existingUser = await User.findOne({
                username,
                _id: { $ne: user._id },
            });

            if (existingUser) {
                return NextResponse.json(
                    { error: "Username already exists" },
                    { status: 409 }
                );
            }
        }

        let imageUrl = user.image;

        // Image upload
        if (image && image.size > 0) {
            // 5MB limit
            if (image.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    {
                        error: "Image size must be less than 5MB",
                    },
                    { status: 400 }
                );
            }

            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise(
                (resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            {
                                folder: "Whisper-Post/profile-images",
                                resource_type: "image",
                            },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        )
                        .end(buffer);
                }
            );

            imageUrl = uploadResult.secure_url;
        }

        // Build update object
        const updateData = {};

        if (name?.trim()) {
            updateData.name = name.trim();
        }

        if (username?.trim()) {
            updateData.username = username.trim();
        }

        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Profile updated successfully",
                user: updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
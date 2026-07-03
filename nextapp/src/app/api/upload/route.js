import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    // Allowed Image Types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPG, PNG and WEBP images are allowed",
        },
        {
          status: 400,
        }
      );
    }

    // Max Size = 2MB
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image size must be less than 2MB",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    // Upload Folder

    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "profile"
    );

    // Create Folder if Not Exists

    await mkdir(uploadPath, {
      recursive: true,
    });

    // Unique Image Name

    const fileName =
      Date.now() +
      "-" +
      file.name.replace(/\s+/g, "-");

    const filePath = path.join(
      uploadPath,
      fileName
    );

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      image: `/uploads/profile/${fileName}`,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload Failed",
      },
      {
        status: 500,
      }
    );
  }
}
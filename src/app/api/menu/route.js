import mongoose from "mongoose";
import { NextResponse } from "next/server";
import MenuItem from "@/app/models/MenuItem"; // ✅ default import

export async function POST(req) {
  try {
    const {
      name,
      image,
      description,
      basePrice,
      category,
      sizes,
      extraIngredientPrices,
    } = await req.json();

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    if (!name) {
      return NextResponse.json(
        { message: "Menu item name is required" },
        { status: 400 }
      );
    }

    const existingName = await MenuItem.findOne({ name });
    if (existingName) {
      return NextResponse.json(
        { message: "Menu item name already exists" },
        { status: 400 }
      );
    }

    const createdMenu = await new MenuItem({
      name,
      image,
      description,
      basePrice,
      category,
      sizes,
      extraIngredientPrices,
    }).save();

    return NextResponse.json(createdMenu, { status: 201 });
  } catch (error) {
    console.error("POST /api/menu error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    const menu_items = await MenuItem.find().populate("category"); // ✅ now works
    return NextResponse.json(menu_items, { status: 200 });
  } catch (error) {
    console.error("GET /api/menu error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

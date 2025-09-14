import mongoose from "mongoose";
import { NextResponse } from "next/server";
import MenuItem from "@/app/models/MenuItem";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const updateFields = {};

    if (body?.name) updateFields.name = body.name;
    if (body?.description) updateFields.description = body.description;
    if (body?.image) updateFields.image = body.image;
    if (body?.category) updateFields.category = body.category; // make sure this is just an id string
    if (body?.basePrice) updateFields.basePrice = body.basePrice;
    if (body?.sizes) updateFields.sizes = body.sizes;
    if (body?.extraIngredientPrices)
      updateFields.extraIngredientPrices = body.extraIngredientPrices;

    const menuItem = await MenuItem.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!menuItem) {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    console.error("PUT /api/menu/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);

    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Menu item has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/menu/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

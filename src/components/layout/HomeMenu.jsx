"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import useSWR from "swr";
import axios from "axios";

export default function HomeMenu() {
  const fetcher = async () => {
    const response = await axios.get("/api/menu");
    const latestMenuItems = response.data.slice(-3);
    return latestMenuItems;
  };

  const { data: menuItems, error, isLoading } = useSWR("menuItems", fetcher);

  return (
    <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      {/* Decorative images */}
      <div className="absolute top-0 left-0 h-56 w-56 opacity-30 -z-10">
        <Image
          src="/sallad1.png"
          fill
          className="object-contain"
          alt="salad decoration"
        />
      </div>
      <div className="absolute top-10 right-0 h-56 w-56 opacity-30 -z-10">
        <Image
          src="/sallad2.png"
          fill
          className="object-contain"
          alt="salad decoration"
        />
      </div>

      {/* Headers */}
      <div className="text-center mb-12">
        <h3 className="uppercase text-sm tracking-widest text-orange-500 font-semibold">
          Check out
        </h3>
        <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-bold">
          Our Newest Dishes
        </h2>
        <p className="font-sans text-gray-600 max-w-xl mx-auto mt-3 text-lg">
          Freshly baked, crafted with love, and delivered hot & fast.
        </p>
      </div>

      {/* Menu items */}
      {isLoading ? (
        <p className="text-center text-gray-500 font-sans">
          Loading dishes...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 font-sans">
          Failed to load menu.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <div
                key={item._id}
                className="transform transition duration-300 hover:scale-105"
              >
                <MenuItem {...item} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

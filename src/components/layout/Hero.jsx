"use client";
import Image from "next/image";
import Right from "../icons/Right";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 -z-10" />

      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Taste the <span className="text-primary">Pizza</span> You Deserve
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-md mx-auto md:mx-0">
            Freshly crafted, oven-baked, and made with love. Explore a wide
            range of pizzas — from timeless classics to gourmet creations —
            delivered to your doorstep.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => router.push("/menu")}
              className="bg-primary hover:bg-primary/90 transition text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 font-semibold shadow-md"
            >
              Order Now
              <Right />
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition flex items-center justify-center gap-2 font-semibold"
            >
              Visit Profile
              <Right />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/pizza.png"
            alt="Delicious Pizza"
            width={500}
            height={500}
            className="drop-shadow-2xl rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}

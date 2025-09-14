import Image from "next/image";
import SectionHeaders from "./SectionHeaders";

export default function AboutUs() {
  return (
    <section className="relative py-20 px-6 lg:px-16 bg-gradient-to-b from-white via-green-50 to-white overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <SectionHeaders subHeader="Our Story" mainHeader="About Us" />
          <p className="mt-6 text-gray-600 leading-relaxed text-base sm:text-lg md:text-xl">
            At <span className="text-primary font-semibold">SRayen Pizza</span>, 
            we are passionate foodies on a mission to bring you the best. 
            Our handcrafted pizzas are made with fresh, local ingredients 
            and time-honored recipes.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed text-base sm:text-lg md:text-xl">
            Every bite is a celebration of flavor, crafted with care, and 
            delivered with a smile — because food should not only satisfy 
            your hunger, but also warm your heart.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:scale-105 transition">
              Explore Menu
            </button>
            <button className="px-6 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[28rem]">
          <Image
            src="/pizza.png"
            alt="Delicious Pizza"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

import SectionHeaders from "./SectionHeaders";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="relative py-20 px-6 lg:px-16 bg-gradient-to-b from-white via-green-50 to-white overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <SectionHeaders subHeader="Don't hesitate" mainHeader="Contact Us" />

        <p className="text-gray-600 mt-4 mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          Have a question, feedback, or just craving pizza talk? 
          We’re always happy to hear from you. 
        </p>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Phone */}
          <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Phone className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Call Us</h3>
            <a
              href="tel:+21678456456"
              className="mt-2 text-primary font-bold text-lg hover:underline"
            >
              +216 33 456 456
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Mail className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Email Us</h3>
            <a
              href="mailto:info@srayenpizza.com"
              className="mt-2 text-primary font-bold text-lg hover:underline"
            >
              info@srayenpizza.com
            </a>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <MapPin className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">Visit Us</h3>
            <p className="mt-2 text-gray-600 font-medium">
              123 Pizza Street, Tunis, Tunisia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

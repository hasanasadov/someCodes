"use client";

import { motion } from "framer-motion";
import {
  Clock10Icon,
  InstagramIcon,
  MailIcon,
  PhoneCallIcon,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: MailIcon,
      label: "Email",
      value: "xolmili@gmail.com",
      link: "mailto:xolmili@gmail.com",
    },
    {
      icon: PhoneCallIcon,
      label: "Whatsapp",
      value: "+994 70 504 88 88",
      link: "tel:+994705048888",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: "xolmili_",
      link: "https://www.instagram.com/xolmili_/",
    },
    {
      icon: Clock10Icon,
      label: "İş saatları",
      value: "B.e - Cümə, 9:00 - 18:00",
      link: "",
    },
  ];

  const renderContactDetails = () => {
    return contactDetails.map((detail, index) => (
      <div
        key={index}
        className=" flex  justify-start items-center mb-4 dark:text-gray-300 text-gray-400 dark:hover:text-cyan-400 hover:text-cyan-600 transition duration-300"
      >
        <detail.icon className="w-6 h-6 mr-2" />
        <Link
          href={detail.link}
          target="_blank"
          rel="noopener noreferrer"
          className="dark:text-gray-300 text-gray-700 hover:underline dark:hover:text-cyan-400 hover:text-cyan-600 transition duration-300"
        >
          {detail.label}: {detail.value}
        </Link>
      </div>
    ));
  };

  return (
    <div className=" min-h-screen px-6 py-16 ">
      <div className="container mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="md:text-5xl text-3xl text-start md:text-center font-extrabold mb-4 tracking-wide">
            <span className="dark:text-white text-black">Bizimlə </span>
            <span className="text-secondary">əlaqə</span>
          </h1>
          <p className="dark:text-gray-300 text-gray-700 md:text-lg text-start md:text-center ">
            Here at Kholmili, we value your feedback and inquiries. Whether you
            have questions about our products, need assistance with an order, or
            want to share your experience with us, we are here to help. Please
            feel free to reach out through the contact form below or directly
            via our email or phone number. Our dedicated team is ready to assist
            you and ensure you have the best experience possible. Thank you for
            choosing Kholmili, where quality meets reliability!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-10 mt-16 ">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 md:p-8 shadow-xl border dark:border-white/10 border-black/20"
          >
            <h2 className="text-3xl font-semibold mb-4  text-secondary">
              Bizim məkanımız
            </h2>
            <p className="dark:text-gray-300 text-gray-700 mb-4">
              Bakı, Azərbaycan - 1000
            </p>
            <div className="rounded-xl overflow-hidden h-64 border border-white/10">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.0709786946516!2d49.946691315409535!3d40.40392707936583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40306306a6ccbde1%3A0x47fa46d4558f3fee!2s8-CI%20KM%20BAZARI%20LITSEY!5e0!3m2!1sen!2s!4v1715326254000!5m2!1sen!2s"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 md:p-8 shadow-xl border dark:border-white/10 border-black/20"
          >
            <h2 className="text-3xl font-semibold mb-4 text-secondary">
              Əlaqə Detalları
            </h2>
            <div className="dark:text-gray-300 text-gray-700  grid lg:grid-cols-4 md:grid-cols-2">
              {renderContactDetails()}
            </div>
            <p className="dark:text-gray-300 text-gray-700 mt-4">
              İstənilən növ bizimlə əlaqəli suallar verməyə çəkinməyin.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

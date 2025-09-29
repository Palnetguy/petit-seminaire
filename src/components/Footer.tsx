import React from "react";
import { Link } from "react-router-dom";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <AcademicCapIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Petit Séminaire St Léon</h3>
                <p className="text-gray-400">Kabgayi, Muhanga - Rwanda</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A Catholic educational institution dedicated to forming young
              minds in faith, knowledge, and character. We nurture future
              leaders grounded in Christian values and academic excellence.
            </p>
            <div className="flex items-center space-x-2 text-gold-400">
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm font-medium">
                Guided by Faith, Inspired by Learning
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Our History
                </Link>
              </li>
              <li>
                <Link
                  to="/academics"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-gold-400 mt-1" />
                <div>
                  <p className="text-gray-300">Kabgayi, Muhanga</p>
                  <p className="text-gray-300">Southern Province, Rwanda</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-gold-400" />
                <p className="text-gray-300">+250 788 123 456</p>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="w-5 h-5 text-gold-400" />
                <p className="text-gray-300">info@petitseminaire-kabgayi.rw</p>
              </div>
            </div>
          </div>
        </div>

        {/* Catholic Mission Statement */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <p className="text-gold-400 font-medium mb-2">
              "In the name of the Father, and of the Son, and of the Holy
              Spirit"
            </p>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              As a Catholic institution, we are committed to the spiritual,
              intellectual, and moral development of our students, following the
              teachings of Jesus Christ and the traditions of the Catholic
              Church.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Petit Séminaire St Léon Kabgayi. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Built with</span>
              <HeartIcon className="w-4 h-4 text-red-500" />
              <span>for Catholic Education</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "admission",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will get back to you soon.");
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We welcome your inquiries about admission, programs, and our
            Catholic educational community
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Get in Touch
              </h2>

              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Our Location
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Petit Séminaire St Léon
                      <br />
                      Kabgayi, Muhanga
                      <br />
                      Southern Province
                      <br />
                      Rwanda
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Phone Numbers
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Main Office: +250 788 123 456
                      <br />
                      Admissions: +250 788 654 321
                      <br />
                      Emergency: +250 788 987 654
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Email Addresses
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      General: info@petitseminaire-kabgayi.rw
                      <br />
                      Admissions: admissions@petitseminaire-kabgayi.rw
                      <br />
                      Academic: academic@petitseminaire-kabgayi.rw
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Office Hours
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: After Mass (10:00 AM - 12:00 PM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Type of Inquiry
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="admission">Admission Inquiry</option>
                    <option value="academic">Academic Information</option>
                    <option value="general">General Information</option>
                    <option value="visit">School Visit Request</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter the subject of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quick Contact Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the best way to reach us for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Admissions */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AcademicCapIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Admissions Office
              </h3>
              <p className="text-gray-600 mb-4">
                Questions about enrollment, requirements, and application
                process
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +250 788 654 321</p>
                <p>✉️ admissions@petitseminaire-kabgayi.rw</p>
              </div>
            </div>

            {/* Academic Affairs */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BuildingLibraryIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Academic Affairs
              </h3>
              <p className="text-gray-600 mb-4">
                Curriculum, academic programs, and educational policies
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +250 788 456 789</p>
                <p>✉️ academic@petitseminaire-kabgayi.rw</p>
              </div>
            </div>

            {/* Main Office */}
            <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <EnvelopeIcon className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Main Office
              </h3>
              <p className="text-gray-600 mb-4">
                General inquiries, visits, and administrative matters
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📞 +250 788 123 456</p>
                <p>✉️ info@petitseminaire-kabgayi.rw</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Visit Our Campus
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We welcome visitors to our beautiful campus in Kabgayi, Muhanga.
              Please contact us in advance to schedule your visit.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Directions to Our Campus
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  From Kigali
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>
                    Take the main road towards Muhanga (approximately 50km)
                  </li>
                  <li>In Muhanga town, follow signs to Kabgayi</li>
                  <li>The seminary is located in the Kabgayi area</li>
                  <li>Look for the Catholic church compound</li>
                </ol>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Public Transportation
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Take a bus from Kigali to Muhanga</li>
                  <li>From Muhanga, take local transport to Kabgayi</li>
                  <li>Ask for "Petit Séminaire St Léon"</li>
                  <li>The school is well-known in the local community</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

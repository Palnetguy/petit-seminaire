import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  HeartIcon,
  BookOpenIcon,
  UsersIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center catholic-gradient">
        <div className="absolute inset-0 cross-pattern opacity-10"></div>
        <div className="relative z-10 text-center text-white container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-cathedral">
                <AcademicCapIcon className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Petit Séminaire
                <span className="block gold-text">St Léon</span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-light">
                Kabgayi, Muhanga - Rwanda
              </p>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <BuildingLibraryIcon className="w-6 h-6 text-gold-300" />
                <p className="text-lg text-gold-200 font-medium">
                  Catholic Education Excellence Since Foundation
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl mb-8 leading-relaxed font-light max-w-3xl mx-auto">
              Nurturing young minds in faith, knowledge, and character. Where
              Catholic values meet academic excellence to shape tomorrow's
              leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/about" className="btn-primary text-lg px-8 py-4">
                Discover Our Mission
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Inquire About Admission
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <HeartIcon className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-800">
                Our Sacred Mission
              </h2>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              "To form young men of character, grounded in Catholic faith and
              values, equipped with excellent education, and prepared to serve
              God and society with integrity and compassion."
            </p>
            <div className="bg-primary-50 rounded-2xl p-8 border-l-4 border-primary-600">
              <blockquote className="text-lg italic text-gray-700 mb-4">
                "Train up a child in the way he should go; even when he is old
                he will not depart from it."
              </blockquote>
              <cite className="text-primary-600 font-semibold">
                - Proverbs 22:6
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Petit Séminaire St Léon?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our Catholic educational community exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Catholic Formation */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <BuildingLibraryIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Catholic Formation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Deep spiritual formation rooted in Catholic teachings, daily
                prayers, and moral education that shapes character and faith.
              </p>
            </div>

            {/* Academic Excellence */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                <BookOpenIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Academic Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous curriculum designed to challenge minds and prepare
                students for higher education and future leadership roles.
              </p>
            </div>

            {/* Community Life */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mb-6">
                <UsersIcon className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Community Life
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Strong brotherhood and community spirit that fosters lifelong
                friendships and mutual support in faith and learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-200">Students Formed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-primary-200">Dedicated Teachers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-200">Catholic Values</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Join Our Catholic Educational Family
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Begin your journey of faith, learning, and character formation
              with us. Contact us today to learn more about admission to Petit
              Séminaire St Léon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                Start Your Application
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

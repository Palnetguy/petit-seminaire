import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  HeartIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  TrophyIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">
            About Petit Séminaire St Léon
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            A Catholic educational institution dedicated to forming young men of
            character, faith, and academic excellence in the heart of Rwanda.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To provide a comprehensive Catholic education that forms young
                men intellectually, spiritually, morally, and socially. We
                strive to develop leaders who will serve God, Church, and
                society with integrity, compassion, and excellence.
              </p>
              <div className="bg-primary-50 rounded-lg p-6 border-l-4 border-primary-600">
                <blockquote className="text-gray-700 italic">
                  "Let the little children come to me, and do not hinder them,
                  for the kingdom of heaven belongs to such as these."
                </blockquote>
                <cite className="text-primary-600 font-semibold mt-2 block">
                  - Matthew 19:14
                </cite>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <HeartIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Foster deep Catholic faith and spiritual growth
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <AcademicCapIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Provide excellent academic preparation
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <UserGroupIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Build strong community and brotherhood
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrophyIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Develop leadership and character
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Catholic Foundation */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Catholic Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rooted in the rich tradition of Catholic education and the
              teachings of Jesus Christ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BuildingLibraryIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Daily Prayer
              </h3>
              <p className="text-gray-600">
                Our day begins and ends with prayer, Mass celebrations, and
                spiritual reflection, keeping God at the center of our
                educational journey.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Moral Formation
              </h3>
              <p className="text-gray-600">
                Catholic values and moral teachings guide our curriculum and
                daily life, forming students with strong ethical foundations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GlobeAltIcon className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Service to Others
              </h3>
              <p className="text-gray-600">
                Following Christ's example, we emphasize service to community,
                helping those in need, and working for social justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated educators and spiritual leaders committed to excellence
              in Catholic education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Rector */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">FR</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Rev. Father [Name]
              </h3>
              <p className="text-primary-600 font-semibold mb-4">Rector</p>
              <p className="text-gray-600">
                Spiritual leader and principal administrator overseeing the
                academic and spiritual formation of our students.
              </p>
            </div>

            {/* Academic Director */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">AD</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                [Academic Director Name]
              </h3>
              <p className="text-secondary-600 font-semibold mb-4">
                Academic Director
              </p>
              <p className="text-gray-600">
                Leading our academic programs and ensuring excellence in
                teaching and learning across all subjects.
              </p>
            </div>

            {/* Student Affairs */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-24 h-24 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">SA</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                [Student Affairs Name]
              </h3>
              <p className="text-gold-600 font-semibold mb-4">
                Student Affairs Director
              </p>
              <p className="text-gray-600">
                Supporting student life, wellbeing, and community building
                within our seminary family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Catholic Educational Community
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover how Petit Séminaire St Léon can shape your son's future
            through faith-based education and character formation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Contact Us Today
            </Link>
            <Link
              to="/academics"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

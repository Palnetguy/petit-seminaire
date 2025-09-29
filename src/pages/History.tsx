import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const History = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Our Sacred History</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            A journey of faith, education, and service spanning decades in the
            heart of Rwanda
          </p>
        </div>
      </section>

      {/* Foundation Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Foundation & Early Years
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Petit Séminaire St Léon was founded with a vision to provide
              quality Catholic education in Kabgayi, Muhanga. Our founding
              fathers established this institution as a beacon of learning and
              spiritual formation for young men in Rwanda.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>

            {/* Timeline Item 1 */}
            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-end mb-4">
                    <CalendarDaysIcon className="w-6 h-6 text-primary-600 mr-2" />
                    <span className="text-primary-600 font-bold">
                      [Foundation Year]
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Foundation
                  </h3>
                  <p className="text-gray-600">
                    Petit Séminaire St Léon was established by the Catholic
                    Church to serve the educational needs of young men in the
                    region.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
              <div className="w-1/2 pl-8"></div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-8"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
              <div className="w-1/2 pl-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <CalendarDaysIcon className="w-6 h-6 text-primary-600 mr-2" />
                    <span className="text-primary-600 font-bold">
                      [Expansion Year]
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Growth & Expansion
                  </h3>
                  <p className="text-gray-600">
                    The seminary expanded its facilities and programs to
                    accommodate more students and enhanced educational
                    offerings.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-8 text-right">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-end mb-4">
                    <CalendarDaysIcon className="w-6 h-6 text-primary-600 mr-2" />
                    <span className="text-primary-600 font-bold">
                      [Modern Era]
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Modern Excellence
                  </h3>
                  <p className="text-gray-600">
                    Continued commitment to academic excellence while
                    maintaining strong Catholic identity and spiritual
                    formation.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
              <div className="w-1/2 pl-8"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & Impact */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Legacy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Decades of forming young leaders who serve Church and society
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Alumni Graduated</div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-secondary-600 mb-2">
                50+
              </div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-gold-600 mb-2">25+</div>
              <div className="text-gray-600">Priests Ordained</div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Community Leaders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Be Part of Our Continuing Story
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join the legacy of excellence and faith that defines Petit Séminaire
            St Léon
          </p>
          <Link
            to="/contact"
            className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
          >
            Start Your Journey With Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default History;

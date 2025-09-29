import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  TrophyIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Events = () => {
  const upcomingEvents = [
    {
      title: "Annual Founder's Day Celebration",
      date: "November 15, 2025",
      time: "9:00 AM",
      location: "School Chapel",
      description:
        "Celebrating our founding heritage with Mass, cultural performances, and community gathering.",
      type: "Religious",
    },
    {
      title: "Academic Excellence Awards",
      date: "December 3, 2025",
      time: "2:00 PM",
      location: "Main Hall",
      description:
        "Recognizing outstanding academic achievements and student excellence.",
      type: "Academic",
    },
    {
      title: "Christmas Concert",
      date: "December 20, 2025",
      time: "6:00 PM",
      location: "School Auditorium",
      description:
        "Traditional carols and spiritual music to celebrate the birth of Christ.",
      type: "Cultural",
    },
  ];

  const annualEvents = [
    {
      title: "Spiritual Retreat",
      period: "Lent Season",
      icon: BuildingLibraryIcon,
      description:
        "Annual spiritual retreat for reflection, prayer, and spiritual growth.",
    },
    {
      title: "Sports Competition",
      period: "July",
      icon: TrophyIcon,
      description:
        "Inter-school sports competitions promoting teamwork and healthy competition.",
    },
    {
      title: "Cultural Festival",
      period: "September",
      icon: MusicalNoteIcon,
      description:
        "Celebrating Rwandan culture through music, dance, and traditional arts.",
    },
    {
      title: "Community Service",
      period: "Year-round",
      icon: HeartIcon,
      description:
        "Regular community outreach and service projects helping those in need.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">
            School Events & Activities
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Enriching student life through spiritual, academic, cultural, and
            community activities
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for these upcoming celebrations and activities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-primary-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{event.type}</span>
                    <CalendarDaysIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {event.title}
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CalendarDaysIcon className="w-5 h-5 text-primary-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <ClockIcon className="w-5 h-5 text-primary-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPinIcon className="w-5 h-5 text-primary-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Annual Traditions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrated traditions that define our school community throughout
              the year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {annualEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-primary-600 font-semibold mb-3">
                        {event.period}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* School Calendar */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Academic Calendar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important dates and periods throughout the academic year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Term 1 */}
            <div className="bg-primary-50 rounded-xl p-8 border-l-4 border-primary-600">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Term 1</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Start:</strong> January 15, 2025
                </p>
                <p>
                  <strong>Mid-term:</strong> March 10-14, 2025
                </p>
                <p>
                  <strong>End:</strong> April 18, 2025
                </p>
                <p>
                  <strong>Holidays:</strong> April 19 - May 5
                </p>
              </div>
            </div>

            {/* Term 2 */}
            <div className="bg-secondary-50 rounded-xl p-8 border-l-4 border-secondary-600">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Term 2</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Start:</strong> May 6, 2025
                </p>
                <p>
                  <strong>Mid-term:</strong> June 16-20, 2025
                </p>
                <p>
                  <strong>End:</strong> August 1, 2025
                </p>
                <p>
                  <strong>Holidays:</strong> August 2 - September 1
                </p>
              </div>
            </div>

            {/* Term 3 */}
            <div className="bg-gold-50 rounded-xl p-8 border-l-4 border-gold-600">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Term 3</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Start:</strong> September 2, 2025
                </p>
                <p>
                  <strong>Mid-term:</strong> October 14-18, 2025
                </p>
                <p>
                  <strong>End:</strong> December 5, 2025
                </p>
                <p>
                  <strong>Holidays:</strong> December 6 - January 14
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Activities */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Student Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Extracurricular activities that enrich student experience and
              build character
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <UserGroupIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Student Council
              </h3>
              <p className="text-gray-600 text-sm">
                Leadership and governance activities
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <MusicalNoteIcon className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Choir</h3>
              <p className="text-gray-600 text-sm">
                Sacred music and liturgical singing
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <TrophyIcon className="w-12 h-12 text-gold-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Sports Teams
              </h3>
              <p className="text-gray-600 text-sm">
                Football, basketball, and athletics
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <HeartIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Service Club
              </h3>
              <p className="text-gray-600 text-sm">
                Community outreach and charity work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Vibrant Community
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Be part of a rich tradition of events and activities that form
            lasting memories and friendships
          </p>
          <Link
            to="/contact"
            className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
          >
            Get Involved Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Events;

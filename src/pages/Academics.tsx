import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  AcademicCapIcon,
  BeakerIcon,
  CalculatorIcon,
  GlobeAltIcon,
  LanguageIcon,
  BuildingLibraryIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const Academics = () => {
  const subjects = [
    {
      name: "Mathematics",
      icon: CalculatorIcon,
      description:
        "Advanced mathematics including algebra, geometry, calculus, and statistics",
    },
    {
      name: "Sciences",
      icon: BeakerIcon,
      description: "Physics, Chemistry, Biology, and Environmental Science",
    },
    {
      name: "Languages",
      icon: LanguageIcon,
      description: "Kinyarwanda, French, English, and Latin studies",
    },
    {
      name: "Social Studies",
      icon: GlobeAltIcon,
      description: "History, Geography, Civics, and Economics",
    },
    {
      name: "Religious Studies",
      icon: BuildingLibraryIcon,
      description: "Catholic doctrine, Biblical studies, and moral theology",
    },
    {
      name: "Technology",
      icon: ComputerDesktopIcon,
      description: "Computer literacy, digital skills, and modern technology",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-6">Academic Excellence</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            A comprehensive curriculum that challenges minds while nurturing
            Catholic values and character formation
          </p>
        </div>
      </section>

      {/* Academic Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Academic Philosophy
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Petit Séminaire St Léon, we believe that true education
                encompasses the whole person. Our rigorous academic program is
                designed to develop critical thinking, intellectual curiosity,
                and moral reasoning while maintaining fidelity to Catholic
                teaching.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <AcademicCapIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Rigorous academic standards
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <BookOpenIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Faith-integrated learning
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <BuildingLibraryIcon className="w-6 h-6 text-primary-600 mt-1" />
                  <span className="text-gray-700">
                    Character development focus
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Academic Goals
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Intellectual Formation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Developing critical thinking and analytical skills
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Spiritual Integration
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Connecting learning with Catholic faith and values
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Future Preparation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Preparing for higher education and life service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Subjects We Teach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A well-rounded curriculum that prepares students for academic
              success and spiritual growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {subject.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Academic Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured learning paths that support both academic achievement
              and spiritual formation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Secondary Education */}
            <div className="bg-primary-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Secondary Education
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <span className="text-gray-700">
                    Form 1-3: Foundation Years
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="text-gray-700">
                    Form 4-6: Advanced Studies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <span className="text-gray-700">
                    National Examinations Preparation
                  </span>
                </div>
              </div>
            </div>

            {/* Seminary Formation */}
            <div className="bg-secondary-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Seminary Formation
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✝</span>
                  </div>
                  <span className="text-gray-700">
                    Daily spiritual exercises
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✝</span>
                  </div>
                  <span className="text-gray-700">
                    Religious education and catechism
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✝</span>
                  </div>
                  <span className="text-gray-700">
                    Vocational discernment guidance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Excel Academically?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of learners and discover how academic excellence
            and spiritual formation can shape your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              Apply for Admission
            </Link>
            <Link
              to="/about"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;

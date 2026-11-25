/**
 * All school content lives here so it can be edited without touching layout code.
 * Source: the student team's pages in /LINKED (history from the seminary register,
 * staff lists, mission texts) plus public sources (New Times, Wikipedia).
 * Items marked TODO need confirmation from the school administration.
 */

export const school = {
  name: "Petit Séminaire Saint Léon Kabgayi",
  shortName: "Petit Séminaire Saint Léon Kabgayi",
  kinyarwandaName: "Ishuri rya Petit Séminaire Saint Léon Kabgayi",
  motto: "Turerera u Rwanda rwejo",
  mottoEn: "We raise the Rwanda of tomorrow",
  mottoLong:
    "Twita ku burezi bufite ireme, tugamurera umwana w'umunyarwanda ufite ubumenyi, indangagaciro n'ikinyabupfura.",
  mottoLongEn:
    "We are committed to quality education, raising a Rwandan child with knowledge, strong values and good character.",
  founded: 1912,
  foundedFull: "22 December 1912",
  location: "Kabgayi, Nyamabuye Sector, Muhanga District",
  province: "Southern Province, Rwanda",
  diocese: "Catholic Diocese of Kabgayi",
  phone: "+250 790 696 932",
  email: "info@saintleon.rw", // TODO: confirm official address
  map: { lat: -2.097338, lng: 29.754589 },
  hours: [
    ["Mon – Fri", "08:00 – 17:00"],
    ["Saturday", "08:00 – 12:00"],
    ["Sunday", "Closed to visitors"],
  ] as const,
  registerCount: 5154, // entries in the seminary register as of 7 January 2013
};

export const nav = [
  { href: "/", label: "Home", rw: "Ahabanza" },
  { href: "/about", label: "About", rw: "Abo turi bo" },
  { href: "/history", label: "History", rw: "Amateka" },
  { href: "/programs", label: "Programs", rw: "Amasomo" },
  { href: "/staff", label: "Staff", rw: "Abarezi" },
  { href: "/gallery", label: "Gallery", rw: "Amafoto" },
  { href: "/contact", label: "Contact", rw: "Twandikire" },
] as const;

export const stats = [
  { value: 1912, label: "Founded", note: "22 December, Apostolic Vicariate of Kivu", plain: true },
  { value: 5154, label: "Names in the register", note: "Nº 1 Abraham Aholihise → Nº 5,154 (2013)", suffix: "+" },
  { value: 146, label: "Priests by the golden jubilee", note: "including 6 bishops, by 1963" },
  { value: 81, label: "Register number of Rwanda's first bishop", note: "Mgr Aloys Bigirumwami, entered 1914", prefix: "Nº " },
];

export const pillars = [
  {
    n: "I",
    title: "Spiritual",
    rw: "Ubukristu",
    text: "Daily Mass, prayer and the sacraments in a chapel that has formed generations of priests. Faith is the ground everything else grows from.",
    image: "/img/faith/chapel-prayer.jpg",
  },
  {
    n: "II",
    title: "Intellectual",
    rw: "Ubumenyi",
    text: "A rigorous science curriculum, examined nationally, carried by teachers who expect excellence and know every student by name.",
    image: "/img/academics/classroom.jpg",
  },
  {
    n: "III",
    title: "Human",
    rw: "Ikinyabupfura",
    text: "Discipline, honesty and responsibility, learned in shared dormitories, on the pitch, in the brass band and around the table.",
    image: "/img/life/brass-band-field.jpg",
  },
  {
    n: "IV",
    title: "Community",
    rw: "Ubufatanye",
    text: "Service to neighbours and to the nation. Learners, educators and parents working together to build a better Rwanda.",
    image: "/img/life/service.jpg",
  },
];

export const values = [
  "Faith",
  "Integrity",
  "Excellence",
  "Discipline",
  "Respect",
  "Solidarity",
  "Service",
];

export const purpose = {
  mission: {
    short:
      "To educate and form young people intellectually, morally, spiritually and socially through faith and reason.",
    long: "We provide quality Catholic education that promotes academic excellence, spiritual growth and character formation. We create a safe and supportive environment where every student is encouraged to discover and develop their God-given talents. Through effective teaching, faith formation and community engagement, we prepare learners to become responsible citizens and lifelong learners who serve others, pursue truth and contribute positively to society.",
  },
  vision: {
    short:
      "To be a leading Catholic institution that shapes learners into ethical leaders and agents of positive change.",
    long: "We nurture young people who are academically competent, spiritually grounded and socially responsible. We envision graduates who become leaders of integrity, capable of transforming their communities through knowledge, faith and service. By fostering innovation, critical thinking and strong moral principles, we prepare students to meet the challenges of a changing world.",
  },
  values: {
    short: "Faith, integrity, excellence, discipline, respect, solidarity and service.",
    long: "Our core values are rooted in the Gospel and guide everything we do. We uphold integrity, respect, honesty, responsibility and excellence in learning and behaviour. We also encourage compassion, humility and service to others, so that students learn to make good choices, respect human dignity and help build a peaceful and just world.",
  },
  community: {
    short:
      "A family of learners, educators and parents working together to build a better future.",
    long: "Our school community is built on faith, respect and unity. Students, teachers, parents and staff come together in an environment where everyone is valued and encouraged to grow. As a Catholic community we promote service, kindness and care for one another, a family spirit that reflects Christ's love.",
  },
};

export const whyUs = [
  { title: "Quality Catholic education", text: "Over a century of forming minds and consciences." },
  { title: "Dedicated, experienced staff", text: "Priests and lay teachers who live alongside the students." },
  { title: "Well-rounded programs", text: "Sciences, languages, music, sport and service." },
  { title: "Safe, supportive campus", text: "A boarding community with structure and care." },
  { title: "Leadership and service", text: "Alumni who serve the Church and the nation." },
];

export type Person = { name: string; role: string; image?: string; title?: string };

export const leadership: Person[] = [
  { title: "Fr.", name: "Innocent Muvunyi", role: "Rector", image: "/img/staff/muvunyi.jpg" },
  { title: "Abbé", name: "Pater Rukundo", role: "Dean of Studies", image: "/img/staff/rukundo.jpg" },
  { title: "Abbé", name: "Jean Berchmans Gasasira", role: "Spiritual Father", image: "/img/staff/gasasira.jpg" },
  { title: "Abbé", name: "Anastase Musabyimana", role: "Bursar", image: "/img/staff/musabyimana.jpg" },
];

export const teachers: Person[] = [
  { name: "Clément Ngirabatware", role: "Chemistry", image: "/img/staff/ngirabatware.jpg" },
  { name: "Jean Félix Rugango", role: "General Studies", image: "/img/staff/rugango.jpg" },
  { name: "Pascal Nteziyaremye", role: "Biology · O-Level", image: "/img/staff/nteziyaremye.jpg" },
  { name: "Emmanuel Nyandwi", role: "Kinyarwanda", image: "/img/staff/nyandwi.jpg" },
  { name: "Martin Tusingwire", role: "ICT", image: "/img/staff/tusingwire.jpg" },
  { name: "Clémentine Uwinshuti", role: "Physics · A-Level", image: "/img/staff/uwinshuti.jpg" },
  { name: "Jean Damascène Harerimana", role: "Physics · O-Level", image: "/img/staff/harerimana.jpg" },
  { name: "Jean Bosco Niyibizi", role: "Geography & History", image: "/img/staff/niyibizi.jpg" },
  { name: "Jean de Dieu", role: "Music", image: "/img/staff/jean-de-dieu.jpg" },
  { name: "Isaïe Kayihura", role: "Mathematics" },
  { name: "Léonard Hanyurwimfura", role: "English", image: "/img/staff/hanyurwimfura.jpg" },
  { name: "Étienne Karinganire", role: "Mathematics" },
];

/** The student team who built the first version of this website. */
export const studentDevelopers = [
  "Armand", "Arsène", "Blaise", "Bonheur", "Darcy", "Idesbard", "Igikwiye",
  "Jay B", "Lavigne", "Mike", "Patient", "Rwakazina", "Xavier",
].map((n) => ({
  name: n,
  image: `/img/students/${n.normalize("NFD").toLowerCase().replace(/[^a-z]/g, "")}.jpg`,
}));

export const programs = {
  levels: [
    {
      code: "O",
      title: "Ordinary Level",
      years: "Senior 1 – Senior 3",
      text: "A broad foundation under Rwanda's competence-based curriculum: mathematics, sciences, languages (Kinyarwanda, English, French), history, geography, ICT, religion and music.",
    },
    {
      code: "A",
      title: "Advanced Level",
      years: "Senior 4 – Senior 6",
      text: "Specialised science combinations, building on the seminary's long tradition in Mathematics, Chemistry and Biology, examined by the National Examination and School Inspection Authority.",
    },
  ],
  // TODO: confirm the combinations currently offered with the Dean of Studies.
  combinations: [
    { code: "MCB", name: "Mathematics · Chemistry · Biology", note: "The seminary's historic science option" },
    { code: "MPC", name: "Mathematics · Physics · Computer Science", note: "Physics, mathematics and ICT taught at A-Level" },
  ],
  subjects: [
    { name: "Sciences", items: ["Mathematics", "Physics", "Chemistry", "Biology"], color: "var(--lapis)" },
    { name: "Languages", items: ["Kinyarwanda", "English", "French", "Latin heritage"], color: "var(--brick)" },
    { name: "Humanities", items: ["History", "Geography", "General Studies", "Religion"], color: "var(--green)" },
    { name: "Technology", items: ["ICT", "Computer lab", "Digital skills"], color: "var(--navy-2)" },
  ],
  coCurricular: [
    { title: "Brass band", text: "The seminary fanfare leads processions, feasts and national days in full blue uniform.", image: "/img/life/brass-band.jpg" },
    { title: "Sport", text: "Football, volleyball, basketball, handball and karate, on courts at the heart of campus.", image: "/img/life/volleyball-team.jpg" },
    { title: "Choir & liturgy", text: "Sung Mass in the chapel; the seminary hymn and the music of the Church.", image: "/img/faith/chapel-full.jpg" },
    { title: "Science & clubs", text: "Science fairs, debating, Xaveri youth movement and student-led clubs.", image: "/img/life/science-fair.jpg" },
    { title: "Service", text: "Environmental work, outreach and service to the people of Muhanga.", image: "/img/life/service.jpg" },
  ],
};

export const news = [
  {
    date: "20 May",
    rw: "Amarushanwa y'Ubwenge",
    title: "Science fair: students present their projects to the Bishop",
    text: "Seminarians presented models and experiments to Mgr. the Bishop of Kabgayi and visiting guests.",
    image: "/img/life/science-fair.jpg",
    tag: "Academics",
  },
  {
    date: "15 May",
    rw: "Urusengero rw'abanyeshuri",
    title: "A full chapel for the opening Mass of the term",
    text: "The whole seminary gathered in the chapel to open the new term in prayer.",
    image: "/img/faith/chapel-full.jpg",
    tag: "Faith",
  },
  {
    date: "05 May",
    rw: "Irushanwa rya Volleyball",
    title: "Volleyball: the seminary team on court",
    text: "Our volleyball team competed against neighbouring schools in front of a home crowd.",
    image: "/img/life/volleyball-team.jpg",
    tag: "Sport",
  },
];

export type GalleryItem = { src: string; alt: string; cat: "Faith" | "Academics" | "Student life" | "Campus" | "Events" };

export const gallery: GalleryItem[] = [
  { src: "/img/campus/chapel-exterior.jpg", alt: "The seminary chapel under a blue sky", cat: "Campus" },
  { src: "/img/campus/chapel-interior.jpg", alt: "The painted sanctuary of the chapel", cat: "Faith" },
  { src: "/img/life/brass-band.jpg", alt: "The seminary brass band in blue uniform", cat: "Student life" },
  { src: "/img/faith/bishop-procession.jpg", alt: "The Bishop arrives for a celebration", cat: "Events" },
  { src: "/img/academics/classroom.jpg", alt: "Students writing in class", cat: "Academics" },
  { src: "/img/campus/main-building.jpg", alt: "The main building and courtyard", cat: "Campus" },
  { src: "/img/faith/chapel-full.jpg", alt: "Students gathered in the chapel", cat: "Faith" },
  { src: "/img/life/volleyball-team.jpg", alt: "The volleyball team", cat: "Student life" },
  { src: "/img/life/science-fair.jpg", alt: "Science fair presentations", cat: "Academics" },
  { src: "/img/campus/aerial-courtyard.jpg", alt: "Campus seen from above", cat: "Campus" },
  { src: "/img/faith/mass-students.jpg", alt: "Mass with the students", cat: "Faith" },
  { src: "/img/life/basketball.jpg", alt: "Basketball on the central court", cat: "Student life" },
  { src: "/img/life/assembly-hall.jpg", alt: "The whole school in front of the hall", cat: "Events" },
  { src: "/img/academics/computer-lab.jpg", alt: "Students in the computer lab", cat: "Academics" },
  { src: "/img/campus/gardens.jpg", alt: "Gardens and pathways", cat: "Campus" },
  { src: "/img/life/brass-band-field.jpg", alt: "Brass band on the field", cat: "Events" },
  { src: "/img/faith/chapel-prayer.jpg", alt: "Prayer in the chapel", cat: "Faith" },
  { src: "/img/life/service.jpg", alt: "Students on a service day", cat: "Student life" },
  { src: "/img/campus/grounds.jpg", alt: "The grounds after rain", cat: "Campus" },
  { src: "/img/academics/exam.jpg", alt: "Students sitting an exam", cat: "Academics" },
  { src: "/img/life/teams.jpg", alt: "School teams on the court", cat: "Student life" },
  { src: "/img/events/family-day.jpg", alt: "Family visit day", cat: "Events" },
  { src: "/img/life/gathering.jpg", alt: "Students gathered outdoors", cat: "Events" },
  { src: "/img/campus/main-building-2.jpg", alt: "Palm trees along the main building", cat: "Campus" },
  { src: "/img/academics/study.jpg", alt: "Quiet study", cat: "Academics" },
  { src: "/img/life/brass-march.jpg", alt: "Brass band marching", cat: "Student life" },
];

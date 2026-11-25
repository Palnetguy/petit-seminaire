/**
 * Chronology of the seminary, from the history the student team transcribed
 * (based on the seminary register and the centenary booklet, 2013).
 */

export type Milestone = {
  year: string;
  date?: string;
  title: string;
  text: string;
  image?: string;
  place?: string;
  key?: boolean;
};

export const milestones: Milestone[] = [
  {
    year: "1904",
    date: "October",
    place: "Save & Zaza → Kigoromola",
    title: "The first call",
    text: "Only four years after the missionaries arrived, and a year after the first baptisms of 22 April 1903, Bishop Jean-Joseph Hirth asks for candidates. Fifteen young Rwandans from Save and Zaza are sent to the minor seminary of Kigoromola, near Bukoba in Tanzania.",
    image: "/img/history/save-mission.jpg",
  },
  {
    year: "1909",
    place: "Rubya, Ihangiro",
    title: "Saint Léon of Rubya",
    text: "Bishop Hirth inaugurates the St. Léon Minor Seminary of Rubya. Of its 18 students, four are Rwandan. Of the first 15 seminarians sent there, six will reach the priesthood.",
  },
  {
    year: "1912",
    date: "22 December",
    place: "Apostolic Vicariate of Kivu",
    title: "Foundation",
    text: "Ten days after the creation of the Apostolic Vicariate of Kivu, the seminary is founded with 17 seminarians. The decree of foundation is dated Christmas Day, 25 December 1912.",
    key: true,
  },
  {
    year: "1913",
    date: "2 January",
    place: "Nyaruhengeri, Kansi",
    title: "Doors open",
    text: "The seminary opens at Nyaruhengeri, in the mission of Kansi, near Save, the first mission in the country. After a five-day retreat, classes begin on 7 January, under Fr. Knoll as first rector.",
    image: "/img/history/zaza-mission.jpg",
  },
  {
    year: "1913",
    date: "4 October",
    place: "Kabgayi",
    title: "Home at Kabgayi",
    text: "The seminary moves to Kabgayi, the date counted as the official opening of Petit Séminaire Saint Léon Kabgayi. A second intake of 40 seminarians arrives on 9 and 10 October.",
    key: true,
    image: "/img/history/old-campus.jpg",
  },
  {
    year: "1913",
    date: "20 November",
    place: "Kabgayi",
    title: "Two seminaries born together",
    text: "Seminarians repatriated from Rubya-Katigondo, four of them major seminarians, join Kabgayi. This marks the birth of St. Charles Borromée Major Seminary: junior and senior seminaries began together, under Fr. Nicolas Cunrath.",
  },
  {
    year: "1914",
    date: "October",
    place: "Register Nº 81",
    title: "A future bishop enrols",
    text: "Among the intake of 1914 is Aloys Bigirumwami, Nº 81 in the register. Ordained in 1921 as the tenth Rwandan priest, he became the first Rwandan bishop in 1952.",
    image: "/img/history/bigirumwami.jpg",
    key: true,
  },
  {
    year: "1917",
    date: "26 March",
    title: "Minor and major separate",
    text: "Under Fr. Léon Classe, the minor and major seminaries become two institutions. The minor seminary is entrusted to Fr. Briquet, assisted by Fr. Laurent Déprimoz.",
  },
  {
    year: "1926",
    place: "Mugera, Burundi",
    title: "A seminary for two nations",
    text: "Kabgayi forms seminarians from Burundi as well, until Burundi opens its own seminary at Mugera.",
  },
  {
    year: "1931",
    date: "3 October",
    title: "639 names",
    text: "Since December 1912, 639 seminarians have been recruited. The house counts five formator priests, four major seminarians in probation, and 154 students, including 27 candidates to the Josephite Brothers, founded in 1919 by Fr. Classe.",
  },
  {
    year: "1934",
    title: "Jubilee and the chapel",
    text: "Celebrating its first 25 years, the seminary expands to welcome ever larger classes. The chapel, the heart of the campus to this day, is built during this period.",
    image: "/img/campus/chapel-front.jpg",
  },
  {
    year: "1953",
    place: "Nyundo",
    title: "No longer alone",
    text: "Until St. Pius X Minor Seminary of Nyundo opens, Kabgayi is the only minor seminary in Rwanda. Its model will be repeated in every new diocese.",
  },
  {
    year: "1959",
    date: "7 December",
    title: "The first Rwandan rector",
    text: "Abbé Mathias Kamari becomes rector, assisted by the White Fathers. With the local hierarchy established in 1959, the seminary passes to the Archdiocese of Kabgayi.",
  },
  {
    year: "1961",
    title: "348 students",
    text: "The septième préparatoire opens: 145 new students join 220 seminarians, bringing the total to 348.",
  },
  {
    year: "1963",
    date: "13 June",
    title: "Golden jubilee",
    text: "Fifty years on, 146 priests, six of them bishops, have been formed at Kabgayi.",
    key: true,
    image: "/img/history/jubilee.jpg",
  },
  {
    year: "2013",
    date: "7 January",
    title: "A century, 5,154 names",
    text: "At the centenary the register reaches Nº 5,154, from Abraham Aholihise to François-Xavier Umuhire. The jubilee is celebrated by the whole Church in Rwanda.",
    key: true,
  },
];

export const rectors = {
  whiteFathers: [
    ["Cunrath", "1912 – 1915", "assisted by Knoll"],
    ["Buisson", "1915 – 1917"],
    ["Briquet", "1917 – 1919"],
    ["Déprimoz", "1919 – 1930"],
    ["Antoine van Overschelde", "1930 – 1934"],
    ["Lody", "1934 – 1947"],
    ["Martin", "1947 – 1948", "interim"],
    ["De Schrevel", "1948 – 1951"],
    ["Hartmann", "1951 – 1958"],
    ["Aelvoet", "1958 – 1959"],
  ],
  diocesan: [
    ["Mathias Kamari", "1959"],
    ["Joseph Sibomana", "1960"],
    ["Pierre Claver Nyiringondo", "1961"],
    ["Phocas Nikwigize", "1961 – 1968"],
    ["Jean-Marie Vianney Rusingizandekwe", "1968 – 1977"],
    ["Jan Renis, M.Afr.", "1977 – 1983", "the last White Father rector"],
    ["Laurent Ndagijimana", "1984 – 1990"],
    ["Silas Ngerero", "1990 – 1992"],
    ["Emmanuel Uwimana", "1992 – 1994"],
    ["Silas Ngerero", "1994 – 1996"],
    ["Vincent Sibomana", "1996 – 1997"],
    ["Evergiste Rukebesha", "1997 – 2000"],
    ["Vincent Kagabo", "2000 – 2002"],
    ["Prudence Bicamumpaka", "2002 – 2006"],
    ["Jean de Dieu Hodari", "2006 – 2008"],
    ["Celse Hakuziyaremye", "2008 – 2011"],
    ["Théotime Gatete", "2011 – 2013"],
    ["Innocent Muvunyi", "Present"],
  ],
} as const;

export const curriculum = [
  { era: "1913 →", title: "Classical humanities", text: "Greek and Latin, French, religion, arithmetic, music, drama and sport, alongside a life of prayer." },
  { era: "1962 →", title: "A national curriculum", text: "After independence, programmes are set by Rwanda's Ministry of Education rather than the colonial model." },
  { era: "Later", title: "Latin & science sections", text: "Latin sections, Maths–Physics, Latin and modern letters, Latin sciences in Biology–Chemistry, then Maths–Chemistry–Biology (MCB)." },
  { era: "Today", title: "Among the best", text: "State and civil society continue to rank Rwanda's seminaries among the best schools in the country." },
];

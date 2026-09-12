import { Problem, Idea, DistrictData, CategoryData, LeaderboardStudent, LeaderboardUni, LeaderboardIndustry, LeaderboardGov, NotificationItem } from '../types';

export const DISTRICTS: DistrictData[] = [
  { name: "Ranchi", total: 212, unresolved: 58, inProgress: 71, solved: 83 },
  { name: "East Singhbhum", total: 184, unresolved: 44, inProgress: 60, solved: 80 },
  { name: "West Singhbhum", total: 96, unresolved: 31, inProgress: 29, solved: 36 },
  { name: "Dhanbad", total: 151, unresolved: 39, inProgress: 52, solved: 60 },
  { name: "Bokaro", total: 118, unresolved: 28, inProgress: 41, solved: 49 },
  { name: "Hazaribagh", total: 87, unresolved: 26, inProgress: 31, solved: 30 },
  { name: "Deoghar", total: 74, unresolved: 22, inProgress: 25, solved: 27 },
  { name: "Dumka", total: 69, unresolved: 24, inProgress: 21, solved: 24 },
  { name: "Giridih", total: 81, unresolved: 27, inProgress: 28, solved: 26 },
  { name: "Gumla", total: 52, unresolved: 19, inProgress: 17, solved: 16 },
  { name: "Khunti", total: 38, unresolved: 14, inProgress: 12, solved: 12 },
  { name: "Koderma", total: 41, unresolved: 15, inProgress: 13, solved: 13 },
  { name: "Latehar", total: 47, unresolved: 18, inProgress: 16, solved: 13 },
  { name: "Lohardaga", total: 33, unresolved: 12, inProgress: 11, solved: 10 },
  { name: "Pakur", total: 36, unresolved: 14, inProgress: 10, solved: 12 },
  { name: "Palamu", total: 92, unresolved: 33, inProgress: 30, solved: 29 },
  { name: "Ramgarh", total: 58, unresolved: 19, inProgress: 20, solved: 19 },
  { name: "Sahibganj", total: 44, unresolved: 17, inProgress: 14, solved: 13 },
  { name: "Seraikela-Kharsawan", total: 56, unresolved: 20, inProgress: 18, solved: 18 },
  { name: "Simdega", total: 29, unresolved: 11, inProgress: 9, solved: 9 },
  { name: "Chatra", total: 39, unresolved: 15, inProgress: 12, solved: 12 },
  { name: "Garhwa", total: 61, unresolved: 22, inProgress: 21, solved: 18 },
  { name: "Jamtara", total: 35, unresolved: 13, inProgress: 11, solved: 11 },
  { name: "Godda", total: 42, unresolved: 16, inProgress: 13, solved: 13 }
];

export const CATEGORIES: CategoryData[] = [
  { name: "Water", count: 212 },
  { name: "Education", count: 184 },
  { name: "Healthcare", count: 176 },
  { name: "Agriculture", count: 158 },
  { name: "Infrastructure", count: 149 },
  { name: "Sanitation", count: 121 },
  { name: "Environment", count: 96 },
  { name: "Rural Development", count: 88 },
  { name: "Public Services", count: 71 },
  { name: "Accessibility", count: 44 },
  { name: "Other", count: 29 }
];

export const INITIAL_PROBLEMS: Problem[] = [
  {
    id: "EC-2026-JH-001248",
    title: "Unsafe drinking water in rural hamlet",
    district: "Ranchi",
    state: "Jharkhand",
    village: "Nagri",
    pin: "835222",
    cat: "Water",
    subcat: "Public Health",
    sev: "High",
    date: "12 Aug 2026",
    status: "Government Review",
    tech: ["IoT", "Sensors", "Cloud", "LoRaWAN"],
    students: 14,
    solutions: 3,
    description: "Residents of Nagri village report recurring water contamination leading to waterborne illness during monsoon seasons. Hand pumps and open wells have tested high for coliform and fluoride traces, requiring a low-cost, continuous water quality telemetry network.",
    evidenceCount: 4,
    affectedPopulation: "~12,000 residents",
    department: "Jharkhand Dept. of Water Resources",
    reportedBy: "Rekha Kumari",
    upvotes: 48
  },
  {
    id: "EC-2026-JH-001201",
    title: "No streetlights on school access road",
    district: "Dhanbad",
    state: "Jharkhand",
    village: "Govindpur",
    pin: "828109",
    cat: "Infrastructure",
    subcat: "Public Safety",
    sev: "Medium",
    date: "03 Aug 2026",
    status: "Prototype",
    tech: ["Solar", "IoT", "Embedded C", "LiFePO4"],
    students: 9,
    solutions: 2,
    description: "A 2.4-kilometer stretch linking Govindpur Higher Secondary School to the highway lacks illumination, causing safety risks for evening students and cyclists.",
    evidenceCount: 3,
    affectedPopulation: "~1,800 residents & students",
    department: "Jharkhand Rural Dev. Dept.",
    reportedBy: "Manoj Tudu",
    upvotes: 32
  },
  {
    id: "EC-2026-JH-001177",
    title: "High dropout rate due to lack of digital learning tools",
    district: "Gumla",
    state: "Jharkhand",
    village: "Chainpur",
    pin: "835206",
    cat: "Education",
    subcat: "Digital Literacy",
    sev: "High",
    date: "27 Jul 2026",
    status: "Open for Solutions",
    tech: ["Mobile App", "Offline-first", "SQLite", "Audio Lessons"],
    students: 21,
    solutions: 5,
    description: "Intermittent cellular connectivity severely impedes state e-learning initiatives in tribal schools. Teachers require an offline-synced micro-course platform in local languages.",
    evidenceCount: 4,
    affectedPopulation: "~6,400 students",
    department: "Jharkhand Dept. of Education",
    reportedBy: "Pooja Besra",
    upvotes: 67
  },
  {
    id: "EC-2026-JH-001150",
    title: "Crop loss from unpredictable irrigation scheduling",
    district: "Palamu",
    state: "Jharkhand",
    village: "Medininagar",
    pin: "822101",
    cat: "Agriculture",
    subcat: "Smart Farming",
    sev: "Medium",
    date: "19 Jul 2026",
    status: "Solution Selected",
    tech: ["IoT", "Data Analytics", "Weather API", "Python"],
    students: 11,
    solutions: 4,
    description: "Smallholder farmers experience repeated crop wilt during dry spells due to erratic canal water releases and unpredictable canal pump cycles.",
    evidenceCount: 3,
    affectedPopulation: "~900 farming families",
    department: "Jharkhand Dept. of Agriculture",
    reportedBy: "Rameshwar Mahto",
    upvotes: 41
  },
  {
    id: "EC-2026-JH-001098",
    title: "Overflowing community waste collection points",
    district: "East Singhbhum",
    state: "Jharkhand",
    village: "Jugsalai",
    pin: "831006",
    cat: "Sanitation",
    subcat: "Waste Management",
    sev: "High",
    date: "05 Jul 2026",
    status: "Pilot",
    tech: ["Route Optimization", "GPS", "Ultrasonic Sensors"],
    students: 7,
    solutions: 2,
    description: "Secondary trash transit points in high-density pockets overflow faster than municipal pickup routes can clear them, leading to drainage clogging.",
    evidenceCount: 5,
    affectedPopulation: "~18,000 residents",
    department: "Urban Development & Housing Dept.",
    reportedBy: "Anil Murmu",
    upvotes: 53
  },
  {
    id: "EC-2026-JH-001066",
    title: "Poor maternal health tracking in remote block",
    district: "Simdega",
    state: "Jharkhand",
    village: "Kolebira",
    pin: "835211",
    cat: "Healthcare",
    subcat: "Maternal Health",
    sev: "High",
    date: "29 Jun 2026",
    status: "AI Analyzed",
    tech: ["Mobile Health", "SMS", "USSD", "Offline Sync"],
    students: 5,
    solutions: 0,
    description: "ASHA workers lack reliable battery-operated mobile logging tools to track prenatal immunizations and high-risk pregnancy signs in non-network zones.",
    evidenceCount: 2,
    affectedPopulation: "~3,200 women",
    department: "Health & Family Welfare Dept.",
    reportedBy: "Shanti Tirkey",
    upvotes: 29
  },
  {
    id: "EC-2026-JH-000994",
    title: "Deforestation encroaching on watershed",
    district: "West Singhbhum",
    state: "Jharkhand",
    village: "Saranda",
    pin: "833214",
    cat: "Environment",
    subcat: "Conservation",
    sev: "Medium",
    date: "14 Jun 2026",
    status: "New",
    tech: ["Satellite Imagery", "GIS", "Computer Vision"],
    students: 2,
    solutions: 0,
    description: "Unregulated tree felling along the Koel river tributary is depleting local springs and accelerating soil erosion into catchment ponds.",
    evidenceCount: 3,
    affectedPopulation: "Catchment basin ecosystem",
    department: "Forest, Environment & Climate Change",
    reportedBy: "Sanjay Hembrom",
    upvotes: 19
  },
  {
    id: "EC-2026-JH-000921",
    title: "Inaccessible ramps at primary health centre",
    district: "Khunti",
    state: "Jharkhand",
    village: "Torpa",
    pin: "835227",
    cat: "Accessibility",
    subcat: "Barrier-Free Access",
    sev: "Low",
    date: "02 Jun 2026",
    status: "Implemented",
    tech: ["Civil Design", "Ergonomic Handrails", "Modular Concrete"],
    students: 6,
    solutions: 1,
    description: "Elderly patients and wheelchair users faced steep, cracked steps at the Torpa PHC entrance without tactile paving or compliant handrails.",
    evidenceCount: 4,
    affectedPopulation: "~4,500 monthly patients",
    department: "Public Works Department",
    reportedBy: "Dilip Soren",
    upvotes: 38
  },
  {
    id: "EC-2026-JH-000887",
    title: "Delayed grievance redressal at block office",
    district: "Latehar",
    state: "Jharkhand",
    village: "Mahuadanr",
    pin: "822119",
    cat: "Public Services",
    subcat: "E-Governance",
    sev: "Medium",
    date: "22 May 2026",
    status: "Solved",
    tech: ["Workflow Automation", "SMS Bot", "Dashboard"],
    students: 8,
    solutions: 3,
    description: "Citizens had to travel up to 40 km repeatedly to check status of ration card corrections and land registry certificates without any automated SMS alerts.",
    evidenceCount: 2,
    affectedPopulation: "~25,000 citizens",
    department: "Dept. of Personnel & Administrative Reforms",
    reportedBy: "Basant Yadav",
    upvotes: 46
  }
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: "idea-1",
    title: "Low-cost IoT water quality sensor network",
    problem: "Unsafe drinking water in rural hamlet",
    problemId: "EC-2026-JH-001248",
    uni: "BIT Mesra",
    team: "Team Aquasense (4)",
    tech: ["IoT", "LoRaWAN", "Cloud", "Sensors"],
    impact: "12,000 residents",
    cost: "₹4.2L",
    match: 92,
    proto: "Working prototype deployed at 2 wells",
    interest: 3,
    description: "Solar-powered LoRa probe measuring pH, turbidity, TDS, and oxidation-reduction potential. Sends periodic telemetry via long-range mesh to a central solar base station in Nagri.",
    mentor: "Dr. S. K. Singh (Dept. of ECE)",
    stage: "Prototype"
  },
  {
    id: "idea-2",
    title: "Solar-powered adaptive streetlight grid",
    problem: "No streetlights on school access road",
    problemId: "EC-2026-JH-001201",
    uni: "NIT Jamshedpur",
    team: "Team Lumen (3)",
    tech: ["Solar", "IoT", "Embedded C"],
    impact: "1,800 residents",
    cost: "₹2.8L",
    match: 88,
    proto: "Design validated & bench tested",
    interest: 2,
    description: "Intelligent LED luminaire with motion sensing, auto-dimming during low footfall hours, and cloud-linked battery state-of-health tracking.",
    mentor: "Prof. R. Banerjee (Dept. of Electrical)",
    stage: "Prototype"
  },
  {
    id: "idea-3",
    title: "Offline-first micro-learning app for rural schools",
    problem: "High dropout rate due to lack of digital learning tools",
    problemId: "EC-2026-JH-001177",
    uni: "Ranchi University",
    team: "Team Vidya (5)",
    tech: ["Android", "SQLite", "Offline Sync", "Audio Lessons"],
    impact: "6,400 students",
    cost: "₹3.1L",
    match: 95,
    proto: "Beta testing in 3 pilot schools",
    interest: 5,
    description: "Gamified foundational numeracy and literacy modules in Kurukh, Mundari, and Hindi. Peer-to-peer Wi-Fi Direct sync for offline content exchange between student devices.",
    mentor: "Dr. A. Verma (Computer Applications)",
    stage: "Beta testing"
  },
  {
    id: "idea-4",
    title: "AI-assisted irrigation scheduling advisory",
    problem: "Crop loss from unpredictable irrigation scheduling",
    problemId: "EC-2026-JH-001150",
    uni: "BAU Ranchi",
    team: "Team Krishi (4)",
    tech: ["Python", "Weather API", "ML", "SMS Gateway"],
    impact: "900 farmers",
    cost: "₹1.9L",
    match: 90,
    proto: "Selected by industry partner",
    interest: 4,
    description: "Combines local soil moisture sensors with regional rain forecasts to broadcast vernacular voice & SMS alerts for precise canal water usage.",
    mentor: "Dr. P. K. Roy (Soil Sciences)",
    stage: "Selected"
  }
];

export const LB_STUDENTS: LeaderboardStudent[] = [
  { name: "Ananya Kujur", uni: "BIT Mesra", skills: "IoT, Cloud, Embedded", solved: 6, ideas: 9, projects: 4, credits: 2450 },
  { name: "Rahul Mahato", uni: "NIT Jamshedpur", skills: "Embedded, Solar, C++", solved: 5, ideas: 7, projects: 3, credits: 2180 },
  { name: "Sneha Oraon", uni: "Ranchi University", skills: "Mobile, UX, Android", solved: 4, ideas: 8, projects: 3, credits: 1960 },
  { name: "Vikram Singh", uni: "BAU Ranchi", skills: "ML, Python, AgriTech", solved: 4, ideas: 6, projects: 2, credits: 1720 },
  { name: "Fatima Ansari", uni: "XLRI Jamshedpur", skills: "Data Analytics, Policy", solved: 3, ideas: 6, projects: 2, credits: 1510 }
];

export const LB_UNIS: LeaderboardUni[] = [
  { name: "BIT Mesra", accepted: 38, solutions: 52, projects: 21, solved: 14, credits: 3120 },
  { name: "NIT Jamshedpur", accepted: 34, solutions: 44, projects: 18, solved: 11, credits: 2870 },
  { name: "Ranchi University", accepted: 29, solutions: 41, projects: 15, solved: 10, credits: 2410 },
  { name: "BAU Ranchi", accepted: 22, solutions: 30, projects: 11, solved: 7, credits: 1890 }
];

export const LB_INDUSTRY: LeaderboardIndustry[] = [
  { name: "Tata Steel Foundation", selected: 9, projects: 7, products: 4, implementations: 3, credits: 2960 },
  { name: "Adani Foundation", selected: 7, projects: 5, products: 3, implementations: 2, credits: 2340 },
  { name: "JSPL CSR", selected: 6, projects: 5, products: 2, implementations: 2, credits: 2010 },
  { name: "Infosys Springboard", selected: 5, projects: 4, products: 2, implementations: 1, credits: 1680 }
];

export const LB_GOV: LeaderboardGov[] = [
  { name: "Jharkhand Dept. of Water Resources", addressed: 18, implemented: 7, satisfaction: "88%", credits: 2680 },
  { name: "Jharkhand Dept. of Education", addressed: 15, implemented: 6, satisfaction: "82%", credits: 2410 },
  { name: "Jharkhand Rural Dev. Dept.", addressed: 12, implemented: 5, satisfaction: "79%", credits: 2090 }
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", icon: "✅", title: "Your problem EC-2026-JH-001248 has completed AI analysis and entered university matching.", time: "2 hours ago", category: "problem", unread: true },
  { id: "n2", icon: "🏛️", title: "BIT Mesra & NIT Jamshedpur were matched to solve drinking water issues in Nagri.", time: "5 hours ago", category: "solution", unread: true },
  { id: "n3", icon: "💡", title: "Team Aquasense (BIT Mesra) submitted prototype telemetry for Water Quality.", time: "1 day ago", category: "solution" },
  { id: "n4", icon: "🏭", title: "Tata Steel Foundation expressed CSR interest in scaling the solar streetlight project.", time: "2 days ago", category: "solution" },
  { id: "n5", icon: "🏢", title: "Jharkhand Dept. of Water Resources scheduled a technical field evaluation for 18 Sep.", time: "4 days ago", category: "evaluation" },
  { id: "n6", icon: "🎉", title: "Problem EC-2026-JH-000887 marked Solved: Block Grievance SMS portal deployed!", time: "1 week ago", category: "system" }
];

const LOCAL_STORAGE_KEY = 'echelon_problems_v1';

export function getStoredProblems(): Problem[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return INITIAL_PROBLEMS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROBLEMS;
  } catch {
    return INITIAL_PROBLEMS;
  }
}

export function saveStoredProblems(problems: Problem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(problems));
  } catch (e) {
    console.error('Failed to save problems to local storage', e);
  }
}

export function addStoredProblem(newProb: Problem): void {
  const current = getStoredProblems();
  const updated = [newProb, ...current];
  saveStoredProblems(updated);
}

export function getProblemById(id: string): Problem | undefined {
  const problems = getStoredProblems();
  return problems.find(p => p.id.toLowerCase() === id.toLowerCase());
}

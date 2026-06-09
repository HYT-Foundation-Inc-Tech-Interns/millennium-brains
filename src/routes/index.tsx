import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Shield,
  Zap,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  GraduationCap,
  Building2,
  Radio,
  Smartphone,
  Building,
  Settings,
  Wifi,
  PenTool,
  Brain,
  Presentation,
  Workflow,
  Globe,
  Monitor,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Award,
  FileText,
  Share2,
  AtSign,
  Hash,
  Play,
  Hd,
  Cpu,
  ChevronDown,
} from "lucide-react";
import heroImg from "@/assets/millennium tv.png";
import { Header } from "@/components/site/Header";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import HeroWave from "@/components/site/HeroWave";
import { IntroOverlay } from "@/components/IntroOverlay";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Millennium" },
      {
        name: "description",
        content:
          "Millennium is a smart interactive board that can do presentatiosn in the classroom, the confference room, in your home theater or anywhere that requires collaborative and engaging presentations",
      },
      { property: "og:title", content: "Millennium — Smart Technology for Modern Collaboration" },
      { property: "og:description", content: "Enterprise-grade smart technology solutions." },
    ],
  }),
  component: Index,
});

/* ------------------------------- Data ------------------------------- */

// Powering Innovation Across Industries
const stats = [
  { value: "500+", label: "Enterprise Clients", icon: Building2 },
  { value: "200+", label: "Educational Institutions", icon: GraduationCap },
  { value: "200+", label: "Government Agencies", icon: Building },
  { value: "50+", label: "Projects Completed", icon: Users },
];

const partners = [
  { name: "TechCorp Global", type: "Enterprise", icon: Building2 },
  { name: "State University", type: "Education", icon: GraduationCap },
  { name: "City Government", type: "Government", icon: Building },
  { name: "Innovation Hub", type: "Corporate", icon: Users },
  { name: "Global Academy", type: "Education", icon: GraduationCap },
  { name: "Enterprise Solutions Inc", type: "Enterprise", icon: Building2 },
  { name: "National Institute", type: "Institution", icon: Shield },
  { name: "Smart City Council", type: "Government", icon: Building },
];

// Smart Technology Ecosystems
const solutions = [
  {
    icon: GraduationCap,
    title: "Smart Classrooms",
    desc: "Interactive learning environments with cutting-edge collaboration technology",
    grad: "from-cyan-400 to-blue-500",
  },
  {
    icon: Users,
    title: "Enterprise Collaboration",
    desc: "Seamless team coordination with advanced digital meeting solutions",
    grad: "from-pink-400 to-purple-500",
  },
  {
    icon: Radio,
    title: "Digital Signage",
    desc: "Dynamic content display systems for impactful visual communication",
    grad: "from-emerald-400 to-teal-500",
  },
  {
    icon: Smartphone,
    title: "Interactive Kiosks",
    desc: "Self-service touchscreen solutions for enhanced customer engagement",
    grad: "from-orange-400 to-red-500",
  },
  {
    icon: Building2,
    title: "Smart Office Systems",
    desc: "Intelligent workspace solutions for modern enterprise environments",
    grad: "from-sky-400 to-indigo-500",
  },
  {
    icon: Settings,
    title: "Automation Systems",
    desc: "AI-powered automation for streamlined business operations",
    grad: "from-violet-400 to-fuchsia-500",
  },
];
// Technology That Empowers
const gradientPalette = [
  "from-cyan-400 to-blue-500",
  "from-teal-400 to-emerald-500",
  "from-violet-400 to-fuchsia-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-indigo-500",
  "from-emerald-400 to-cyan-500",
];
const productFeatures = [
  {
    icon: Wifi,
    title: "Wireless Collaboration",
    desc: "Seamless screen sharing and device connectivity",
  },
  { icon: Cpu, title: "Embedded OS", desc: "Embedded Windows and Android Operating Systems" },
  { icon: Brain, title: "AI-Powered Meetings", desc: "Intelligent transcription and insights" },
  {
    icon: Presentation,
    title: "Interactive Presentations",
    desc: "Engaging multi-touch experiences",
  },
  { icon: Workflow, title: "Seamless Discussions", desc: "Project your laptop and smartphone" },
  {
    icon: Globe,
    title: "Future-proof System",
    desc: "Scalable computing capacity through Open Pluggable Specification",
  },
];

function useCountUpOnVisible(values: number[]) {
  const [counts, setCounts] = useState<number[]>(values.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const targetValuesRef = useRef(values);

  useEffect(() => {
    if (!ref.current || hasStarted) return;

    const targetValues = targetValuesRef.current;
    let rafId = 0;
    let startTime: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = Math.min(timestamp - startTime, duration);
      const nextCounts = targetValues.map((target) => Math.floor(target * (elapsed / duration)));
      setCounts(nextCounts);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCounts(targetValues);
        setHasStarted(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [hasStarted]);

  return { ref, counts };
}

// Explore Our Smart Environments
const environments = [
  {
    key: "classroom",
    label: "Smart Classroom",
    icon: GraduationCap,
    title: "Interactive Learning Environment",
    desc: "Transform traditional classrooms into engaging digital learning spaces with interactive displays, wireless collaboration, and smart content management.",
    features: ['86" and 65" 4K Interactive Display', "Wireless Screen Sharing"],
    img: "/img/SC.jpg",
    //  img: "/img/hero-circuit.jpg",
  },
  {
    key: "meeting",
    label: "Meeting Room",
    icon: Users,
    title: "Modern Meeting Spaces",
    desc: "Empower hybrid teams with seamless video conferencing, AI meeting assistants, and immersive collaboration tools.",
    features: [
      "4K Video Conferencing",
      "Meeting Notes",
      "One-Touch Join",
      "Smart Whiteboarding",
      "Room Analytics",
    ],
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "office",
    label: "Smart Office",
    icon: Building2,
    title: "Connected Workspaces",
    desc: "Enable productive, intelligent offices with sensor-driven automation, occupancy insights, and unified device control.",
    features: [
      "Occupancy Sensors",
      "Lighting Automation",
      "Climate Control",
      "Desk Booking",
      "Energy Optimization",
    ],
    img: "/img/SMART_OFFICE1.jpg",
  },
  {
    key: "training",
    label: "Training Center",
    icon: Monitor,
    title: "Immersive Training Hubs",
    desc: "Deliver memorable training experiences with multi-display walls, interactive simulations, and remote participation.",
    features: [
      "Video Wall Systems",
      "Multi-User Touch",
      "Recording & Replay",
      "Remote Participation",
      "Performance Analytics",
    ],
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
];

// Successful Deployments
const projectFilters = [
  "Schools | University",
  "Government",
  "Corporate",
  // "Smart Offices",
] as const;

// Images below Successful Deployments
const projects = [
  // {
  //   tag: "45 Smart Classrooms",
  //   title: "Riverside High School",
  //   location: "New York, USA",
  //   category: "Schools | University",
  //   images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80",

  //   ],
  // },
  {
    tag: "Condominium Complex",
    title: "AVIDA Tower",
    location: "Quezon City, Philippines",
    category: "Corporate",
    images: [
      "/img/AVIDA (1).jpg",
      "/img/AVIDA (2).jpg",
      "/img/AVIDA (3).jpg",
      "/img/AVIDA (4).jpg",
    ],
  },
  // {
  //   tag: "20 Lecture Halls",
  //   title: "State University",
  //   location: "Boston, USA",
  //   category: "Schools | University",
  //   images: [ "/img/stateuniversity.webp"

  //   ],
  // },
  {
    tag: "Holistic Basic Education",
    title: "Claret School Center",
    location: "Quezon City, Philippines",
    category: "Schools | University",
    images: [
      "/img/CLARA1.jpg",
      "/img/CLARA2.jpg",
      "/img/CLARA3.jpg",
      "/img/Screenshot 2026-05-26 115250.png",
    ],
  },
  {
    tag: "Comprehensive Review Programs",
    title: "Carl Balita Review Center",
    location: "NCR, Philippines",
    category: "Schools | University",
    images: [
      "/img/photo_2024-07-28_08-47-30 (2).jpg",
      "/img/photo_2024-07-28_08-47-30.jpg",
      "/img/photo_2024-07-28_09-05-27.jpg",
      "/img/carlbalita.png",
    ],
  },
  {
    tag: " Quality Education",
    title: "MCA Montessori School Taguig",
    location: "Taguig, Philippines",
    category: "Schools | University",
    images: ["/img/MCA.jpg"],
  },
  {
    tag: "Highly Employable Courses",
    title: "Quezon City University",
    location: "Quezon City, Philippines",
    category: "Schools | University",
    images: ["/img/QCU (1).jpg", "/img/QCU (2).jpg", "/img/QCU (3).jpg", "/img/QCU.jpg"],
  },
  // {
  //   tag: "Complete AV System",
  //   title: "City Hall Council",
  //   location: "Chicago, USA",
  //   category: "Government",
  //   images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"

  //   ],
  // },
  {
    tag: "National Defense",
    title: "Armed Forces of the Philippines",
    location: "Quezon City, Philippines",
    category: "Government",
    images: ["/img/AFP1.jpg", "/img/AFP2.jpg", "/img/AFP3.jpg", "/img/AFP4.jpg"],
  },
  {
    tag: "National Defense",
    title: "Manila Police District",
    location: "Quezon City, Philippines",
    category: "Government",
    images: ["/img/MPD (1).jpg", "/img/MPD (2).jpg", "/img/MPD (3).jpg"],
  },
  {
    tag: "Online Public Services",
    title: "Department of Information and Communications Technology",
    location: "Quezon City, Philippines",
    category: "Government",
    images: ["/img/DICT (1).jpg", "/img/DICT (2).jpg"],
  },
  {
    tag: "Environmental Regulations",
    title: "Department of Environment and Natural Resources",
    location: "Quezon City, Philippines",
    category: "Government",
    images: [
      "/img/DepartmentNR (1).jpg",
      "/img/DepartmentNR (2).jpg",
      "/img/DepartmentNR (3).jpg",
      "/img/DepartmentNR (4).jpg",
      "/img/DepartmentNR (5).jpg",
    ],
  },
  {
    tag: "Environmental Regulations",
    title: "Department of Agrarian ",
    location: "Quezon City, Philippines",
    category: "Government",
    images: [
      "/img/AGRARIAN (1).jpg",
      "/img/AGRARIAN (2).jpg",
      "/img/AGRARIAN (3).jpg",
      "/img/AGRARIAN.jpg",
    ],
  },

  {
    tag: "Public Safety & Enforecement",
    title: "Bureau of Immigration",
    location: "Metro Manila, Philippines",
    category: "Government",
    images: [
      "/img/IMMIG1 (1).jpg",
      "/img/IMMIG1 (2).jpg",
      "/img/IMMIG1 (3).jpg",
      "/img/IMMIGP2 (1).jpg",
      "/img/IMMIGP2 (2).jpg",
    ],
  },

  {
    tag: "Maritime Territorial Defense",
    title: "Philippine Navy",
    location: " Metro Manila, Philippines",
    category: "Government",
    images: [
      "/img/NAVY (1).jpg",
      "/img/NAVY (2).jpg",
      "/img/NAVY (3).jpg",
      "/img/NAVY (4).jpg",
      "/img/NAVY (5).jpg",
    ],
  },
  {
    tag: "Tactical Air Support",
    title: "Philippine Air Force",
    location: "Pasay City, Philippines",
    category: "Government",
    images: [
      "/img/AIRFORCE (1).jpg",
      "/img/AIRFORCE (2).jpg",
      "/img/AIRFORCE (3).jpg",
      "/img/AIRFORCE (4).jpg",
    ],
  },
  {
    tag: "Graduate Education",
    title: "Development Academy of the Philippines",
    location: "Pasig, Philippines",
    category: "Government",
    images: [
      "/img/DAP (1).jpg",
      "/img/DAP (2).jpg",
      "/img/DAP (3).jpg",
      "/img/DAP (4).jpg",
      "/img/DAP (5).jpg",
      "/img/DAP (6).jpg",
    ],
  },
  {
    tag: "Peace and Order",
    title: "Department of the Interior and Local Government",
    location: "Quezon City, Philippines",
    category: "Government",
    images: ["/img/DILG (1).jpg", "/img/DILG (2).jpg", "/img/DILG (3).jpg", "/img/DILG (4).jpg"],
  },
  {
    tag: "Basic & Emergrency Care",
    title: "Novaliches General Hospital",
    location: "Quezon City, Philippines",
    category: "Government",
    images: ["/img/NCH (1).jpg", "/img/NCH (2).jpg", "/img/NCH (3).jpg", "/img/NCH (4).jpg"],
  },
  {
    tag: "Urban Green Space Management",
    title: "National Parks Development Committee",
    location: "Metro Manila, Philippines",
    category: "Government",
    images: ["/img/NPDC (1).jpg", "/img/NPDC (2).jpg"],
  },
  // {
  //   tag: "Smart Office System",
  //   title: "Innovation Studios",
  //   location: "Austin, USA",
  //   category: "Smart Offices",
  //   images: [
  //     "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  //   ],
  // },
  {
    tag: "Commercial Development",
    title: "AYALA Corpo One",
    location: "Makati City, Philippines",
    category: "Corporate",
    images: [
      "/img/AYALA (1).jpg",
      "/img/AYALA (2).jpg",
      "/img/AYALA (3).jpg",
      "/img/AYALA (4).jpg",
    ],
  },
  {
    tag: "Commercial Development",
    title: "AYALA Council Meeting",
    location: "Makati City, Philippines",
    category: "Corporate",
    images: ["/img/ACM (1).jpg", "/img/ACM (2).jpg", "/img/ACM (3).jpg", "/img/ACM (4).jpg"],
  },
  {
    tag: "Commercial Office",
    title: "AYALA Tower One",
    location: "Makati City, Philippines",
    category: "Corporate",
    images: ["/img/ATO (3).jpg", "/img/ATO (2).jpg", "/img/ATO (1).jpg", "/img/ATO (4).jpg"],
  },
  {
    tag: "Membership Sports",
    title: "City Club",
    location: "Makati City, Philippines",
    category: "Corporate",
    images: [
      "/img/CC (1).jpg",
      "/img/CC (2).jpg",
      "/img/CC (3).jpg",
      "/img/CC (4).jpg",
      "/img/CC (5).jpg",
    ],
  },
  {
    tag: "Commercial Office",
    title: "Suntrust Building",
    location: "Manila, Philippines",
    category: "Corporate",
    images: ["/img/SB (1).jpg", "/img/SB (2).jpg", "/img/SB (3).jpg", "/img/SB (4).jpg"],
  },
  {
    tag: "Product Distributor",
    title: "North Block Enterprise",
    location: "Santa Rosa, Philippines",
    category: "Corporate",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    tag: "Medical and Aesthetic Equipment Supplier",
    title: "Spark Industries",
    location: "Quezon City, Philippines",
    category: "Corporate",
    images: ["/img/SI (1).jpg", "/img/SI (2).jpg"],
  },
  {
    tag: "Rental Space",
    title: "Fire and Ice Studios",
    location: "Quezon City, Philippines",
    category: "Corporate",
    images: ["/img/FCS (1).jpg", "/img/FCS (2).jpg"],
  },
];
// images below Meet Us at Industry Events
const events = [
  {
    type: "Military & History Museum",
    title: "ARMED FORCES OF THE PHILIPPINE MUSEUM",
    desc: "The Museum displays historical military hardware and artifacts to honor the bravery of Filipino soldiers. They use the Millennium smart board to display interactive combat timelines and vivid video documentaries for visiting students.",
    date: "December 16, 2025",
    location: "Quezon City, Philippines",
    attendees: "5000+",
    images: ["/img/IMG_9178.jpeg", "/img/AFP2.jpg", "/img/AFP3.jpg", "/img/AFP4.jpg"],
  },
  {
    type: "Gala Ceremony",
    title: "ARMED FORCES OF THE PHILIPPINE COMMISSIONED OFFICERS COUNTRY GAWAD AWARDS",
    desc: "This national event gathers public servants, civic leaders, and military heroes to celebrate extraordinary service to the country. Thery use the Millennium smart board to display high-definition tribute videos and nominee profiles during the live ceremony.",
    date: "March 22, 2024",
    location: "Quezon City, Philippines",
    attendees: "500+",
    images: [
      "/img/GAWAD.jpg",
      "/img/GAWAD2 (1).jpg",
      "/img/GAWAD2 (2).jpg",
      "/img/GAWAD2 (3).jpg",
      "/img/GAWAD2 (4).jpg",
    ],
  },
  {
    type: "Exposition",
    title: "DEPARTMENT OF INFORMATION AND COMMUNICATIONS TECHNOLOGY",
    desc: "This annual government technology gathering showcases the country's latest digital advancements, cybersecurity frameworks, and ICT initiatives. Speakers use the Millennium smart board to deliver highly collaborative software demonstrations and cloud architecture pitch decks.",
    date: "June 7, 2024",
    location: "Quezon City, Philippines",
    attendees: "3000+",
    images: ["/img/DICT (1).jpg", "/img/DICT (2).jpg"],
  },
  {
    type: "Summit",
    title: "BUREAU OF IMMIGRATION",
    desc: "This national security gathering focuses on strengthening border protections, passenger screening protocols, and modernizing travel control systems. Officials use the Millennium smart board to map out real-time international flight statistics and collaborate on global security databases.",
    date: "March 23, 2026",
    location: "Manila, Philippines",
    attendees: "2000+",
    images: ["/img/IMMIG1 (3).jpg", "/img/IMMIGP2 (1).jpg"],
  },
  {
    type: "Conference",
    title: "DEVELOPMENT ACADEMY OF THE PHILIPPINES",
    desc: "This conference trains government leaders and public administrators in effective governance, policy creation, and modern management skills. Facilitators use the Millennium smart board to host interactive leadership workshops and build dynamic policy concept maps with the attendees.",
    date: "March 6, 2026",
    location: "Pasig City, Philippines",
    attendees: "5000+",
    images: ["/img/DAP (2).jpg", "/img/DAP (5).jpg", "/img/DAP (1).jpg"],
  },
  {
    type: "Convention",
    title: "DEPARTMENT OF AGRARIAN REFORM",
    desc: "This convention brings together regional directors and farmer representatives to discuss equitable land distribution and rural development programs. Representatives use the Millennium smart board to track regional land titles and map out agricultural supply chains interactively.",
    date: "May 7, 2025",
    location: "Quezon City, Philippines",
    attendees: "5000+",
    images: ["/img/AGRARIAN.jpg", "/img/AGRARIAN (3).jpg", "/img/AGRARIAN (1).jpg"],
  },
  {
    type: "Summit",
    title: "DEPARTMENT OF ENVIRONMENT AND NATURAL RESOURCES",
    desc: "This environmental summit coordinates nationwide strategies for wildlife conservation, reforestation, and climate change mitigation. Scientists and policymakers use the Millennium smart board to zoom into high-resolution satellite maps and collaborate on ecosystem data models.",
    date: "May 15, 2024",
    location: "Quezon City, Philippines",
    attendees: "10000+",
    images: ["/img/DepartmentNR (3).jpg", "/img/DepartmentNR (5).jpg", "/img/DepartmentNR (1).jpg"],
  },
  {
    type: "Exposition",
    title: "PHILIPPINE CHAMBER OF COMMERCE AND INDUSTRY",
    desc: "The largest business gathering in the country connects entrepreneurs, trade delegates, and global investors to foster economic growth. Corporate executives use the Millennium smart board to deliver interactive investment pitches and run live market analysis projections.",
    date: "January 21, 2026",
    location: "Taguig City, Philippines",
    attendees: "5000+",
    images: ["/img/PCCI.jpg"],
  },
  {
    type: "Exhibition",
    title: "PHILIPPINE NAVAL BASE",
    desc: "This military exhibition serves as a hub for discussing maritime security, naval defense tactics, and territorial border patrol logistics. Fleet commanders use the Millennium smart board to run tactical maritime simulations and collaborate on naval defense strategies.",
    date: "March 27, 2025",
    location: "Cavite, Philippines",
    attendees: "5000+",
    images: ["/img/NAVY (5).jpg", "/img/NAVY (4).jpg", "/img/NAVY (3).jpg"],
  },
  {
    type: "Exposition",
    title: "AYALA PROPERTIES",
    desc: "This premium real estate exhibition showcases upcoming eco-efficient commercial hubs and luxury residential developments to potential investors. Agents use the Millennium smart board to give clients interactive 3D virtual property tours and review floor plans in real-time.",
    date: "March 5, 2026",
    location: "Makati City, Philippines",
    attendees: "10000+",
    images: ["/img/AYALA (4).jpg", "/img/AYALA (3).jpg", "/img/AYALA (1).jpg"],
  },
  {
    type: "Exposition",
    title: "PHILIPPINE PHARMA & HEALTHCARE",
    desc: "This medical convention features the newest advancements in laboratory equipment, pharmaceutical manufacturing, and patient care systems. Researchers use the Millennium smart board to display complex molecular formulas and collaborate on clinical trial data visualizations.",
    date: "February 24, 2024",
    location: "Pasay City, Philippines",
    attendees: "4000+",
    images: ["/img/PHARMA.jpg", "/img/PHARMA2.jpg"],
  },
  {
    type: "Exposition",
    title: "BREAD OF LIFE QC",
    desc: "This faith-based exhibition provides a platform for sharing inspirational messages and engaging with the community through interactive multimedia presentations.",
    date: "March 23, 2024",
    location: "Quezon City, Philippines",
    attendees: "5000+",
    images: ["/img/BL.jpg", "/img/BL2 (1).jpg", "/img/BL2 (2).jpg", "/img/BL2 (3).jpg"],
  },
  {
    type: "Seminar",
    title: "Elite Teacher",
    desc: "This academic seminar equips top educators with modern pedagogical techniques and digital tools for interactive classrooms. Instructors use the Millennium smart board to model advanced blended-learning lessons and demonstrate collaborative gamified teaching apps.",
    date: "July 23, 2024",
    location: "Quezon City, Philippines",
    attendees: "2000+",
    images: ["/img/ETS.jpg", "/img/ETS2.jpg"],
  },

  {
    type: "Conference",
    title: "INNOVATION AI TECH-TALK",
    desc: "This technology conference showcases the latest advancements in artificial intelligence through highly collaborative and engaging presentations.",
    date: "May 15, 2024",
    location: "Taguig City, Philippines",
    attendees: "1500+",
    images: ["/img/AYALA.png"],
  },
  {
    type: "Summit",
    title: "TARLAC STA IGNACIA",
    desc: "Municipal officers use the Millennium smart board to present budgeting spreadsheets and receive interactive feedback from the community.",
    date: "June 23, 2024",
    location: "Santa Ignacia, Tarlac, Philippines",
    attendees: "2000+",
    images: ["/img/TSI.png", "/img/TSI2.jpg"],
  },
  {
    type: "Exposition",
    title: "TAGAYTAY HIGHLANDS",
    desc: "This exclusive property event showcases luxury mountain resort estates, premium golf course views, and residential vacation homes. Sales directors use the Millennium smart board to illustrate topgraphical maps and map out custom landscape options for prospective buyers.",
    date: "June 26, 2024",
    location: "Tagaytay City, Philippines",
    attendees: "3000+",
    images: ["/img/TH.jpg"],
  },
  {
    type: "Exposition",
    title: "TRAVEL SALE",
    desc: "This massive tourism exhibition brings together airlines, cruise lines, and resorts to offer exclusive travel discounts to the public. Travel agencies use the Millennium smart board to display live flight booking calendars and run interactive destination videos for buyers.",
    date: "March 28",
    location: "Mandaluyong City, Philippines",
    attendees: "10000+",
    images: ["/img/AYALA.png"],
  },
  {
    type: "Exposition",
    title: "HALAL EVENT (MEGAMALL)",
    desc: " Exhibitors use the Millennium smart board to display food preparation certifications and trace raw ingredient supply chains interactively.Location: Mandaluyong City, Philippines",
    date: "September 25, 2025",
    location: "Mandaluyong City, Philippines",
    attendees: "10000+",
    images: ["/img/HALAL.jpg"],
  },
  {
    type: "Exposition",
    title: "HALAL EVENT (WORLD TRADE CENTER)",
    desc: "This international trade exhibition connects global exporters, compliance bodies, and enterprise buyers within the global Halal ecosystem. Trade leaders use the Millennium smart board to sign digital partnerships and deliver international market expansion presentations.",
    date: "November 14-16, 2024",
    location: "Pasay City, Philippines",
    attendees: "10000+",
    images: [
      "/img/HALAL2.jpg",
      "/img/HALAL3 (1).jpg",
      "/img/HALAL3 (2).jpg",
      "/img/HALAL3 (3).jpg",
    ],
  },
  {
    type: "Ceremony",
    title: "GUSI PEACE PRIZE FOUNDATION",
    desc: "This prestigious international awards night honors individuals from across the globe who make outstanding contributions to world peace and human rights. The production team uses the Millennium smart board to display historical global achievements and broadcast live translation feeds.",
    date: "November 26, 20",
    location: "Manila, Philippines",
    attendees: "1000+",
    images: ["/img/GUSI.jpg", "/img/GUSI2.jpg"],
  },
  {
    type: "Exposition",
    title: "FIRST CAVITE INDUSTRIAL ESTATE",
    desc: "This industrial assembly brings together manufacturing companies and technology suppliers to discuss automated assembly lines and eco-friendly factories. Plant managers use the Millennium smart board to review factory layouts and interactively streamline shipping logistics.",
    date: "February 19, 2026",
    location: "Dasmariñas, Cavite, Philippines",
    attendees: "5000+",
    images: [
      "/img/CAVITE.jpg",
      "/img/CAVITE2 (1).jpg",
      "/img/CAVITE2 (2).jpg",
      "/img/CAVITE2 (3).jpg",
    ],
  },
  {
    type: "Exposition",
    title: "WORLDBEX (SMX)",
    desc: "The premier building and construction exposition exhibits cutting-edge building materials, architectural designs, and engineering equipment. Architects use the Millennium smart board to zoom into complex blueprints and interactively manipulate 3D structural building models.",
    date: "March 12-15, 2026",
    location: "Manila, Philippines",
    attendees: "3000+",
    images: [
      "/img/WORLDBEX.jpg",
      "/img/WORLDBEX2 (1).jpg",
      "/img/WORLDBEX2 (2).jpg",
      "/img/WORLDBEX2 (3).jpg",
    ],
  },
  {
    type: "Conference",
    title: "WOMEN ECONOMIC FORUM",
    desc: "This forum empowers female entrepreneurs and corporate executives through deep discussions on financial inclusion and economic equality. Speakers use the Millennium smart board to lead interactive financial workshops and build collaborative mentorship networks.",
    date: "March 31, 2026",
    location: "Quezon City, Philippines",
    attendees: "2000+",
    images: ["/img/WEF.jpg", "/img/WEF2 (1).jpg", "/img/WEF2 (2).jpg"],
  },
  {
    type: "Tour",
    title: "HISTORIC FREDERICKSBURG FOUNDATION INC.",
    desc: "This preservation event explores colonial heritage sites and historical architectural preservation efforts within the old downtown district. Tour guides use the Millennium smart board to display historical archival photos and compare them side-by-side with modern street views.",
    date: "",
    location: "Fredericksburg, United States ",
    attendees: "1000+",
    images: ["/img/AYALA.png"],
  },
];

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

function EventCard({ event }: { event: (typeof events)[number] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageCount = event.images.length;

  const cycleImage = (direction: number) => {
    setActiveIndex((current) => (current + direction + imageCount) % imageCount);
  };

  return (
    <div className="card-surface overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[16/9] group">
        {event.images.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={event.title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none opacity-0 translate-y-3 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          <div className="absolute inset-x-0 bottom-0 h-[60px] bg-black/50" />
          <div className="relative w-full px-4">
            <div className="h-[60px] flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={() => cycleImage(-1)}
                className="pointer-events-auto inline-flex h-[32px] w-[32px] items-center justify-center rounded-full text-white/65 transition duration-300 ease-in-out hover:opacity-100 focus:outline-none"
                aria-label="Previous image"
              >
                <ArrowIcon direction="left" />
              </button>

              <div className="h-[32px] w-px bg-white/65" />

              <button
                type="button"
                onClick={() => cycleImage(1)}
                className="pointer-events-auto inline-flex h-[32px] w-[32px] items-center justify-center rounded-full text-white/65 transition duration-300 ease-in-out hover:opacity-100 focus:outline-none"
                aria-label="Next image"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-brand text-primary-foreground">
          {event.type}
        </span>
        <span className="absolute bottom-4 left-4 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-background/70 backdrop-blur">
          <Users className="w-3.5 h-3.5" /> {event.attendees}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{event.desc}</p>
        <div className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-primary" /> {event.date}
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-primary" /> {event.location}
          </div>
           </div>
      </div>
    </div>
  );
}

const certifications = [
  { icon: Shield, label: "ISO 9001:2015" },
  { icon: Award, label: "Enterprise Grade" },
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Award, label: "Energy Star Certified" },
];

/* ----------------------------- Component ----------------------------- */

function StarfieldSection({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const stars = Array.from({ length: 24 }, (_, i) => ({
    top: `${(i * 7 + 5) % 90}%`,
    left: `${(i * 13 + 7) % 100}%`,
    opacity: [0.35, 0.55, 0.75, 0.25][i % 4],
    size: [2, 3, 1.5, 2.5][i % 4],
  }));

  return (
    <section className={`relative overflow-hidden ${className}`} {...props}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_25%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.05),transparent_35%)]" />
        <div className="absolute inset-0 bg-black" />
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white/80 shadow-[0_0_12px_rgba(148,163,184,0.35)]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      {children}
    </section>
  );
}

function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay may be blocked by the browser.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <StarfieldSection className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={<span className="chip">Product Video</span>}
          title="See Millennium"
          highlight="in Action"
          subtitle="Discover how Millennium transforms presentations, collaboration, and smart environments."
        />

        <div className="mx-auto mt-12 w-full max-w-[1280px] px-4">
          <div className="relative rounded-[1.4rem] border border-white/15 bg-gradient-to-b from-zinc-700/40 via-zinc-950 to-black p-4 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
            <div className="absolute inset-0 rounded-[1.4rem] pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_20%,rgba(255,255,255,0.02)_45%,transparent_70%)] opacity-30" />

            <div className="relative rounded-xl border border-black bg-black p-2 shadow-inner">
              <div className="relative aspect-[1953.6/1152.7] w-full overflow-hidden rounded-lg bg-black">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src="/videos/Millenvid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                      {/* Grain overlay (non-interactive) */}
                      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35)_0_1px,transparent_1px)] bg-[length:3px_3px]" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_75%,rgba(0,0,0,0.45)_100%)]" />
                    </div>
                  </div>

                  {/* Bottom device bar - thicker and visible */}
                  <div className="mt-4 -mx-4 rounded-b-[0.85rem] bg-gradient-to-b from-zinc-900 to-zinc-800 border-t border-black/50 flex items-center justify-between px-6"
                       style={{ height: '56px' }}>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="ml-1 tracking-[0.2em]">MILLENNIUM</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* small control buttons */}
                      <div className="flex items-center gap-2 pr-2">
                        <span className="h-3 w-3 rounded-full bg-zinc-700 border border-black/60 shadow-[0_1px_0_rgba(255,255,255,0.02)]" />
                        <span className="h-3 w-3 rounded-full bg-zinc-700 border border-black/60 shadow-[0_1px_0_rgba(255,255,255,0.02)]" />
                        <span className="h-3 w-3 rounded-full bg-zinc-700 border border-black/60 shadow-[0_1px_0_rgba(255,255,255,0.02)]" />
                      </div>

                      {/* indicator lights */}
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                        <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                        <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                        <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                        <span className="ml-3 h-2 w-5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </StarfieldSection>
  );
}

function Index() {
  const [activeView, setActiveView] = useState<"home" | "lease" | "demo">("home");
  const [showIntro, setShowIntro] = useState(true);

  const [selectedShortTermSize, setSelectedShortTermSize] = useState<"65" | "86" | null>(null);
  const [selectedMonthlySize, setSelectedMonthlySize] = useState<"65" | "86" | null>(null);
  const [showShortTermSelector, setShowShortTermSelector] = useState(false);
  const [showMonthlySelector, setShowMonthlySelector] = useState(false);
  const shortTermSelectorRef = useRef<HTMLDivElement | null>(null);
  const monthlySelectorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        showShortTermSelector &&
        shortTermSelectorRef.current &&
        !shortTermSelectorRef.current.contains(target)
      ) {
        setShowShortTermSelector(false);
      }
      if (
        showMonthlySelector &&
        monthlySelectorRef.current &&
        !monthlySelectorRef.current.contains(target)
      ) {
        setShowMonthlySelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShortTermSelector, showMonthlySelector]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const introPlayed = window.sessionStorage.getItem("introPlayed");
    const forceParam = window.location.search.includes("forceIntro=true");

    if (introPlayed === "true" && !forceParam) {
      setShowIntro(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroOverlay
            onComplete={() => {
              window.sessionStorage.setItem("introPlayed", "true");
              setShowIntro(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: showIntro ? 0 : 1, scale: showIntro ? 0.98 : 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative min-h-screen overflow-hidden bg-background text-foreground"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <img
            src="/img/cover.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35 brightness-[0.65] contrast-[1.05] blur-[1px]"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.65)_0%,rgba(3,7,18,0.72)_35%,rgba(2,6,23,0.86)_100%)]" />
        </div>

        <Header setActiveView={setActiveView} />
        <main className="relative z-10 pt-16">
          {activeView === "home" && (
            <>
              <Hero />
              <Trust />
              <VideoShowcase />
              <Solutions />
              <Products />
              <Showcase />
              <Events />
              <Portfolio />
            </>
          )}

          {activeView === "lease" && (
            <ExperienceInnovation
              mode="lease"
              selectedShortTermSize={selectedShortTermSize}
              setSelectedShortTermSize={setSelectedShortTermSize}
              selectedMonthlySize={selectedMonthlySize}
              setSelectedMonthlySize={setSelectedMonthlySize}
              showShortTermSelector={showShortTermSelector}
              setShowShortTermSelector={setShowShortTermSelector}
              showMonthlySelector={showMonthlySelector}
              setShowMonthlySelector={setShowMonthlySelector}
              shortTermSelectorRef={shortTermSelectorRef}
              monthlySelectorRef={monthlySelectorRef}
            />
          )}

          {activeView === "demo" && (
            <ExperienceInnovation
              mode="demo"
              selectedShortTermSize={selectedShortTermSize}
              setSelectedShortTermSize={setSelectedShortTermSize}
              selectedMonthlySize={selectedMonthlySize}
              setSelectedMonthlySize={setSelectedMonthlySize}
              showShortTermSelector={showShortTermSelector}
              setShowShortTermSelector={setShowShortTermSelector}
              showMonthlySelector={showMonthlySelector}
              setShowMonthlySelector={setShowMonthlySelector}
              shortTermSelectorRef={shortTermSelectorRef}
              monthlySelectorRef={monthlySelectorRef}
            />
          )}
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

/* ------------------------------ Hero -------------------------------- */

function Hero() {
  const { ref: heroStatsRef, counts: heroCounts } = useCountUpOnVisible([500, 100, 20]);

  return (
    <section className="relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-grid opacity-60" aria-hidden /> */}
      <div className="absolute w-full h-full inset-0">
        <HeroWave />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.0) 70%)",
            zIndex: 2,
          }}
        />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1800px] px-[20px] py-20 md:py-28 gap-6 items-center"
        style={{ zIndex: 3, display: "grid", gridTemplateColumns: "48% 48%" }}
      >
        <div className="pl-2">
          <span className="chip">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Powered by Brains Infinite Innovation
            Inc.
          </span>
          <h1 className="mt-6 text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02]">
          The Start of <span className="text-white">Modern Day Technology</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Millennium is a smart interactive board that can do presentatiosn in the classroom, the
            confference room, in your home theater or anywhere that requires collaborative and
            engaging presentations
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a href="#contact" className="btn-primary transform-gpu scale-105">
              Book Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#solutions" className="btn-ghost transform-gpu scale-105">
              Explore Solutions
            </a>
          </div>
          <div ref={heroStatsRef} className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            <div className="text-center">
              <Zap className="w-6 h-6 mx-auto text-primary" />
              <div className="mt-2 text-3xl md:text-4xl font-bold">{heroCounts[0]}+</div>
              <div className="text-xs text-muted-foreground">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto text-primary" />
              <div className="mt-2 text-3xl md:text-4xl font-bold">{heroCounts[1]}+</div>
              <div className="text-xs text-muted-foreground">Installations</div>
            </div>
            <div className="text-center">
              <Sparkles className="w-6 h-6 mx-auto text-primary" />
              <div className="mt-2 text-3xl md:text-4xl font-bold">{heroCounts[2]}+</div>
              <div className="text-xs text-muted-foreground">Cities Served</div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-end pr-[10px]">
          <div className="relative p-3 w-full">
            <div className="relative aspect-[16/9] w-full origin-right scale-110">
              <img
                src={heroImg}
                alt="Glowing circuit board"
                width={1280}
                height={896}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="absolute -top-6 -right-1 card-surface px-4 py-3 flex items-center gap-3 scale-110">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand grid place-items-center">
                <Hd className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-xs">
                <div className="text-muted-foreground">Display</div>
                <div className="font-semibold">4k Ultra HD Display</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-25 card-surface px-4 py-3 flex items-center gap-3 scale-110">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand grid place-items-center">
                <Cpu className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-xs">
                <div className="text-muted-foreground">Operating System</div>
                <div className="font-semibold">Windows &amp; Android</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Trust -------------------------------- */

function Trust() {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const targetValues = stats.map((stat) => Number(stat.value.replace(/\D/g, "")));
    const suffixes = stats.map((stat) => stat.value.match(/\D+$/)?.[0] ?? "");
    const duration = 1400;
    let rafId = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = Math.min(time - startTime, duration);
      const nextValues = targetValues.map((target) => {
        const progress = elapsed / duration;
        return Math.floor(target * progress);
      });
      setCounts(nextValues);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCounts(targetValues);
        setHasAnimated(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [hasAnimated]);

  return (
    <StarfieldSection className="py-24 ">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 ">
        <SectionHeading
          chip={
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Trusted by Industry
              Leaders
            </>
          }
          title="Powering Innovation Across"
          highlight="Industries"
          subtitle="Serving enterprises, educational institutions, government agencies, and organizations worldwide"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, index) => {
            const rawValue = Number(s.value.replace(/\D/g, ""));
            const suffix = s.value.match(/\D+$/)?.[0] ?? "";
            const displayValue = `${counts[index] > 0 ? counts[index] : 0}${suffix}`;

            return (
              <div key={s.label} className="card-surface p-6 text-center">
                <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center mx-auto">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-bold">
                  {hasAnimated ? `${rawValue}${suffix}` : displayValue}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {partners.map((p) => {
            const Icon = p.icon;

            return (
              <div key={p.name} className="card-surface p-6 text-center">
                <div className="w-11 h-11 rounded-lg bg-secondary grid place-items-center mx-auto text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-4 font-semibold text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.type}</div>
              </div>
            );
          })}
        </div>
      </div>
    </StarfieldSection>
  );
}

/* ---------------------------- Solutions ------------------------------ */

function Solutions() {
  return (
    <StarfieldSection id="solutions" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Comprehensive Solutions Portfolio
            </>
          }
          title="Smart Technology"
          highlight="Ecosystems"
          subtitle="End-to-end digital transformation solutions tailored for education, enterprise, and institutional excellence"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s) => (
            <div
              key={s.title}
              className="card-surface p-6 group hover:border-primary/30 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.grad} grid place-items-center text-white shadow-lg`}
              >
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary font-medium"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </StarfieldSection>
  );
}



/* ----------------------------- Products ------------------------------ */

function Products() {
  const { ref: productStatsRef, counts: productCounts } = useCountUpOnVisible([20, 4, 21]);
  const productMetrics = [
    { v: `${productCounts[0]}`, l: "Touch Points" },
    { v: `${productCounts[1]}K`, l: "Resolution" },
    { v: `${productCounts[2]}+`, l: "Multi-Language Support" },
  ];

  return (
    <StarfieldSection id="product" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <Zap className="w-3.5 h-3.5 text-primary" /> Product Experience
            </>
          }
          title="Technology That"
          highlight="Empowers"
          subtitle="Experience the future of collaboration with our flagship interactive smart board systems"
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="flex flex-col h-full card-surface p-3 relative">
            <img
              src="https://img.youtube.com/vi/FwzdLd3bSx8/maxresdefault.jpg"
              alt="Millennium Pro Series"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
            />
            <div className="absolute top-6 left-6 chip">4K Ultra HD</div>
            <div className="px-3 py-5 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold">Millennium Pro Series</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Enterprise-grade interactive display with AI-powered collaboration features
              </p>
              <div ref={productStatsRef} className="mt-6 grid grid-cols-3 gap-4 text-center">
                {productMetrics.map((m) => (
                  <div key={m.l}>
                    <div className="text-2xl font-bold text-gradient-brand">{m.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="grid sm:grid-cols-2 gap-4 flex-1">
              {productFeatures.map((f, index) => (
                <div
                  key={f.title}
                  className="card-surface p-5 h-full hover:border-primary/30 transition-colors flex flex-col"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientPalette[index % gradientPalette.length]} grid place-items-center text-white shadow-sm`}
                  >
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h4 className="mt-4 font-semibold">{f.title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StarfieldSection>
  );
}

/* ----------------------------- Showcase ------------------------------ */

function Showcase() {
  const [active, setActive] = useState(environments[0].key);
  const env = environments.find((e) => e.key === active)!;
  return (
    <StarfieldSection id="use-cases" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <Monitor className="w-3.5 h-3.5 text-primary" /> Virtual Showroom Experience
            </>
          }
          title="Explore Our"
          highlight="Smart Environments"
          subtitle="Discover how our technology transforms spaces across education, corporate, and enterprise sectors"
        />

        <div className="card-surface p-1.5 inline-flex flex-wrap gap-1 mx-auto mb-12 w-full max-w-3xl justify-center">
          {environments.map((e) => {
            const isActive = e.key === active;
            return (
              <button
                key={e.key}
                onClick={() => setActive(e.key)}
                className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-brand text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <e.icon className="w-4 h-4" />
                {e.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="card-surface p-3">
            <img
              src={env.img}
              alt={env.title}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold">{env.title}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{env.desc}</p>
            <div className="mt-6">
              <div className="font-semibold mb-3">Key Features:</div>
              <ul className="space-y-3">
                {env.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/15 grid place-items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="btn-primary mt-8">
              Schedule a Virtual Tour
            </a>
          </div>
        </div>
      </div>
    </StarfieldSection>
  );
}


/* ------------------------------ Events ------------------------------- */

function Events() {
  return (
    <StarfieldSection id="events" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <Calendar className="w-3.5 h-3.5 text-primary" /> Events & Exhibitions
            </>
          }
          title="Meet Us at"
          highlight="Industry Events"
          subtitle="Join us at upcoming technology exhibitions, conferences, and seminars worldwide"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((e) => (
            <EventCard key={e.title} event={e} />
          ))}
        </div>
      </div>
    </StarfieldSection>
  );
}

/* ----------------------------- Portfolio ----------------------------- */

function Portfolio() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("Schools | University");

  const filtered = projects.filter((p) => p.category === filter);

  return (
    <StarfieldSection id="installations" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <FileText className="w-3.5 h-3.5 text-primary" /> Project Portfolio
            </>
          }
          title="Successful"
          highlight="Deployments"
          subtitle="Real-world implementations across education, corporate, and government sectors"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectFilters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  active
                    ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </StarfieldSection>
  );
}

/* ------------------------- Experience Innovation ------------------------ */

function ExperienceInnovation({
  mode,
  selectedShortTermSize,
  setSelectedShortTermSize,
  selectedMonthlySize,
  setSelectedMonthlySize,
  showShortTermSelector,
  setShowShortTermSelector,
  showMonthlySelector,
  setShowMonthlySelector,
  shortTermSelectorRef,
  monthlySelectorRef,
}: {
  mode: "lease" | "demo";
  selectedShortTermSize: "65" | "86" | null;
  setSelectedShortTermSize: React.Dispatch<React.SetStateAction<"65" | "86" | null>>;
  selectedMonthlySize: "65" | "86" | null;
  setSelectedMonthlySize: React.Dispatch<React.SetStateAction<"65" | "86" | null>>;
  showShortTermSelector: boolean;
  setShowShortTermSelector: React.Dispatch<React.SetStateAction<boolean>>;
  showMonthlySelector: boolean;
  setShowMonthlySelector: React.Dispatch<React.SetStateAction<boolean>>;
  shortTermSelectorRef: React.RefObject<HTMLDivElement | null>;
  monthlySelectorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const leaseSectionRef = useRef<HTMLDivElement | null>(null);
  // Leasing form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [ingress, setIngress] = useState("");
  const [egress, setEgress] = useState("");
  const [address, setAddress] = useState("");
  const [leaseType, setLeaseType] = useState<"short" | "monthly" | "">("");
  const [boardSize, setBoardSize] = useState<"65" | "86" | "">("");
  const [packageOption, setPackageOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Book Demo form state (separate from leasing form)
  const [demoFullName, setDemoFullName] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPhone, setDemoPhone] = useState("");
  const [demoCompany, setDemoCompany] = useState("");
  const [demoSolution, setDemoSolution] = useState("");
  const [demoMessage, setDemoMessage] = useState("");
  const [demoErrors, setDemoErrors] = useState<Record<string, string>>({});
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoTermsChecked, setDemoTermsChecked] = useState(false);

  const closeAllDropdowns = () => {
    setShowShortTermSelector(false);
    setShowMonthlySelector(false);
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isInsideDropdown =
        (shortTermSelectorRef.current && shortTermSelectorRef.current.contains(target)) ||
        (monthlySelectorRef.current && monthlySelectorRef.current.contains(target));

      if ((showShortTermSelector || showMonthlySelector) && !isInsideDropdown) {
        closeAllDropdowns();
      }

      // no-op for terms section here (moved to Book Demo)
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [showShortTermSelector, showMonthlySelector]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (leaseSectionRef.current) {
        const rect = leaseSectionRef.current.getBoundingClientRect();
        if (rect.bottom < 96 || rect.top > window.innerHeight - 96) {
          closeAllDropdowns();
        }
      }


      // Duplicate nested VideoShowcase removed (kept top-level component)
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync pricing selectors into the inquiry form
  useEffect(() => {
    if (selectedShortTermSize) {
      setBoardSize(selectedShortTermSize);
      setLeaseType("short");
    }
  }, [selectedShortTermSize]);

  useEffect(() => {
    if (selectedMonthlySize) {
      setBoardSize(selectedMonthlySize);
      setLeaseType("monthly");
    }
  }, [selectedMonthlySize]);

  function getEstimatedPrice() {
    if (!leaseType || !boardSize || !packageOption) return "—";
    if (leaseType === "short") {
      const size = shortTermSizes.find((s) => s.id === boardSize);
      if (!size) return "—";
      if (packageOption.includes("Daily")) return size.details.daily;
      if (packageOption.includes("3 Days")) return size.details.threeDay;
      if (packageOption.includes("7 Days")) return size.details.sevenDay;
    }
    if (leaseType === "monthly") {
      const size = monthlySizes.find((s) => s.id === boardSize);
      if (!size) return "—";
      if (packageOption.includes("6 Months")) return size.details.sixMonth;
      if (packageOption.includes("12 Months")) return size.details.twelveMonth;
      return size.details.monthly;
    }
    return "—";
  }

  function formatTime12(t: string) {
    if (!t) return "—";
    const parts = t.split(":");
    if (parts.length === 0) return t;
    const hh = parseInt(parts[0], 10) || 0;
    const mm = parts[1] || "00";
    const suffix = hh >= 12 ? "PM" : "AM";
    const hour12 = ((hh + 11) % 12) + 1;
    return `${hour12}:${mm} ${suffix}`;
  }

  function isFormValid() {
    if (!fullName.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !phone.trim() || !date.trim() || !address.trim() || !leaseType || !boardSize || !packageOption) return false;
    if (!ingress.trim() || !egress.trim()) return false;
    const [ih, im] = ingress.split(":").map((v) => parseInt(v, 10) || 0);
    const [eh, em] = egress.split(":").map((v) => parseInt(v, 10) || 0);
    const iMinutes = ih * 60 + im;
    const eMinutes = eh * 60 + em;
    return eMinutes > iMinutes;
  }
  const shortTermSizes = [
    {
      id: "65" as const,
      label: "65 Inches",
      details: {
        daily: "Php 6,500",
        threeDay: "Php 17,500",
        sevenDay: "Php 35,000",
      },
    },
    {
      id: "86" as const,
      label: "86 Inches",
      details: {
        daily: "Php 8,500",
        threeDay: "Php 23,000",
        sevenDay: "Php 48,000",
      },
    },
  ];

  const monthlySizes = [
    {
      id: "65" as const,
      label: "65 Inches",
      details: {
        monthly: "Php 25,000",
        sixMonth: "Php 23,000/mo",
        twelveMonth: "Php 21,000/mo",
      },
    },
    {
      id: "86" as const,
      label: "86 Inches",
      details: {
        monthly: "Php 35,000",
        sixMonth: "Php 32,000/mo",
        twelveMonth: "Php 29,000/mo",
      },
    },
  ];

  return (
    <StarfieldSection id="contact" className="py-24 border-t border-border">
      <div id="leasing-inquiry-section" style={{ scrollMarginTop: "96px" }} />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          chip={
            <>
              <Calendar className="w-3.5 h-3.5 text-primary" /> Get Started Today
            </>
          }
          title="Experience"
          highlight="Innovation"
          subtitle="Schedule a personalized demonstration or discuss flexible leasing options for your organization"
        />
        {mode === "lease" ? (
          <div className="mt-8">
            <div className="space-y-5">
              {[
                {
                  icon: Calendar,
                  title: "Flexible Scheduling",
                  desc: "Choose a time that works best for your team. Virtual or in-person demonstrations available.",
                },
                {
                  icon: Building2,
                  title: "Enterprise Solutions",
                  desc: "Tailored packages for educational institutions, corporations, and government agencies.",
                },
                {
                  icon: CheckCircle2,
                  title: "Expert Consultation",
                  desc: "Get personalized recommendations from our technology specialists.",
                },
              ].map((b) => (
                <div key={b.title} className="card-surface p-5 flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{b.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{b.desc}</div>
                  </div>
                </div>
              ))}

              <div ref={leaseSectionRef} className="card-surface p-6">
                <div className="text-sm text-muted-foreground mb-4">Lease Pricing</div>

                <div className="space-y-8">
                  <section>
                    <h4 className="font-semibold mb-2">SHORT-TERM LEASE (EVENTS / CONFERENCES)</h4>
                    <p className="text-sm text-muted-foreground mb-4">Ideal for hotels and event organizers</p>

                    <div ref={shortTermSelectorRef} className="relative inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowShortTermSelector((value) => !value);
                          setShowMonthlySelector(false);
                        }}
                        className="card-surface inline-flex items-center justify-between gap-4 rounded-3xl border border-border px-4 py-3 text-left shadow-none"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {selectedShortTermSize ? `${selectedShortTermSize} Inches` : "Select Smart Board Size"}
                          </span>
                          <span className="text-xs text-muted-foreground">Select Smart Board Size</span>
                        </div>
                        <span className="text-xs text-muted-foreground">▼</span>
                      </button>

                      {showShortTermSelector ? (
                        <div className="card-surface absolute left-full top-1/2 z-20 ml-3 w-auto -translate-y-1/2 border border-border px-3 py-2 shadow-lg">
                          <div className="flex gap-2">
                            {shortTermSizes.map((size) => (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => {
                                  setSelectedShortTermSize(size.id);
                                  setShowShortTermSelector(false);
                                }}
                                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                                  selectedShortTermSize === size.id
                                    ? "border-primary text-foreground bg-primary/5"
                                    : "border-border text-muted-foreground bg-background"
                                }`}
                              >
                                {size.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {selectedShortTermSize ? (
                      <motion.div
                        key={selectedShortTermSize}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <table className="w-full min-w-[720px] text-sm border-separate border-spacing-x-4">
                          <thead>
                            <tr className="text-xs text-muted-foreground text-left uppercase tracking-[0.03em]">
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">Unit Size</th>
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">Daily Rate (5 Hours)</th>
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">3 Days</th>
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">7 Days</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {shortTermSizes
                              .filter((size) => size.id === selectedShortTermSize)
                              .map((size) => (
                                <tr key={size.id}>
                                  <td className="px-4 py-4 font-medium">{size.label}</td>
                                  <td className="px-4 py-4">{size.details.daily}</td>
                                  <td className="px-4 py-4">{size.details.threeDay}</td>
                                  <td className="px-4 py-4">{size.details.sevenDay}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </motion.div>
                    ) : null}
                  </section>

                  <section>
                    <h4 className="font-semibold mb-2">MONTHLY LEASE (ORGANIZATIONS / OFFICES)</h4>
                    <p className="text-sm text-muted-foreground mb-4">Enterprise-grade leasing for sustained deployments</p>

                    <div ref={monthlySelectorRef} className="relative inline-flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMonthlySelector((value) => !value);
                          setShowShortTermSelector(false);
                        }}
                        className="card-surface inline-flex items-center justify-between gap-4 rounded-3xl border border-border px-4 py-3 text-left shadow-none"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {selectedMonthlySize ? `${selectedMonthlySize} Inches` : "Select Smart Board Size"}
                          </span>
                          <span className="text-xs text-muted-foreground">Select Smart Board Size</span>
                        </div>
                        <span className="text-xs text-muted-foreground">▼</span>
                      </button>

                      {showMonthlySelector ? (
                        <div className="card-surface absolute left-full top-1/2 z-20 ml-3 w-auto -translate-y-1/2 border border-border px-3 py-2 shadow-lg">
                          <div className="flex gap-2">
                            {monthlySizes.map((size) => (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => {
                                  setSelectedMonthlySize(size.id);
                                  setShowMonthlySelector(false);
                                }}
                                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                                  selectedMonthlySize === size.id
                                    ? "border-primary text-foreground bg-primary/5"
                                    : "border-border text-muted-foreground bg-background"
                                }`}
                              >
                                {size.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {selectedMonthlySize ? (
                      <motion.div
                        key={selectedMonthlySize}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <table className="w-full min-w-[720px] text-sm border-separate border-spacing-x-4">
                          <thead>
                            <tr className="text-xs text-muted-foreground text-left uppercase tracking-[0.03em]">
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">Unit Size</th>
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">Monthly Rate</th>
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">6 Months Contract</th>
                              <th className="whitespace-nowrap px-4 py-3 font-semibold">12 Months Contract</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {monthlySizes
                              .filter((size) => size.id === selectedMonthlySize)
                              .map((size) => (
                                <tr key={size.id}>
                                  <td className="px-4 py-4 font-medium">{size.label}</td>
                                  <td className="px-4 py-4">{size.details.monthly}</td>
                                  <td className="px-4 py-4">{size.details.sixMonth}</td>
                                  <td className="px-4 py-4">{size.details.twelveMonth}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </motion.div>
                    ) : null}
                  </section>
                </div>
              </div>

              {/* Leasing Inquiry Form */}
              <div className="card-surface p-6 mt-6">
                <div className="text-sm text-muted-foreground mb-4">Leasing Inquiry Form</div>

                {!submitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const nextErrors: Record<string, string> = {};
                      if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
                      if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) nextErrors.email = "Valid email is required.";
                      if (!phone.trim()) nextErrors.phone = "Phone number is required.";
                      if (!date.trim()) nextErrors.date = "Date is required.";
                      if (!ingress.trim()) nextErrors.ingress = "Ingress time is required.";
                      if (!egress.trim()) nextErrors.egress = "Egress time is required.";
                      if (!address.trim()) nextErrors.address = "Full address is required.";
                      if (!leaseType) nextErrors.leaseType = "Lease type is required.";
                      if (!boardSize) nextErrors.boardSize = "Smart board size is required.";
                      if (!packageOption) nextErrors.packageOption = "Please select a package.";
                      // Terms agreement removed from Lease Now

                      // validate ingress < egress
                      if (ingress.trim() && egress.trim()) {
                        const [ih, im] = ingress.split(":").map((v) => parseInt(v, 10) || 0);
                        const [eh, em] = egress.split(":").map((v) => parseInt(v, 10) || 0);
                        const iMinutes = ih * 60 + im;
                        const eMinutes = eh * 60 + em;
                        if (eMinutes <= iMinutes) {
                          nextErrors.egress = "Egress time must be later than Ingress time.";
                        }
                      }

                      setErrors(nextErrors);

                      if (Object.keys(nextErrors).length === 0) {
                        setSubmitted(true);
                        // TODO: wire to backend API
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" /> Full Name
                        </label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                        {errors.fullName ? <div className="text-xs text-red-400 mt-1">{errors.fullName}</div> : null}
                      </div>

                      <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" /> Email Address
                        </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                        {errors.email ? <div className="text-xs text-red-400 mt-1">{errors.email}</div> : null}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" /> Phone Number
                        </label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                        {errors.phone ? <div className="text-xs text-red-400 mt-1">{errors.phone}</div> : null}
                      </div>

                      <div>
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" /> Date <span className="text-xs text-muted-foreground ml-2">(DD/MM/YYYY)</span>
                        </label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                        {errors.date ? <div className="text-xs text-red-400 mt-1">{errors.date}</div> : null}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Full Address</label>
                      <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                      {errors.address ? <div className="text-xs text-red-400 mt-1">{errors.address}</div> : null}
                    </div>

                     <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" /> Ingress <span className="text-xs text-muted-foreground ml-2">e.g. 1:00 PM</span>
                          </label>
                          <input type="time" value={ingress} onChange={(e) => setIngress(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                          {errors.ingress ? <div className="text-xs text-red-400 mt-1">{errors.ingress}</div> : null}
                        </div>

                        <div>
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" /> Egress <span className="text-xs text-muted-foreground ml-2">e.g. 6:00 PM</span>
                          </label>
                          <input type="time" value={egress} onChange={(e) => setEgress(e.target.value)} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm" />
                          {errors.egress ? <div className="text-xs text-red-400 mt-1">{errors.egress}</div> : null}
                        </div>
                      </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Lease Type</label>
                        <select value={leaseType} onChange={(e) => { const v = e.target.value as "short" | "monthly" | ""; setLeaseType(v); setPackageOption(""); }} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm focus:bg-black focus:outline-none">
                          <option value="">Select lease type</option>
                          <option value="short">Short-Term Lease (Events / Conferences)</option>
                          <option value="monthly">Monthly Lease (Organizations / Offices)</option>
                        </select>
                        {errors.leaseType ? <div className="text-xs text-red-400 mt-1">{errors.leaseType}</div> : null}
                      </div>

                      <div>
                        <label className="text-sm font-medium">Smart Board Size</label>
                        <select value={boardSize} onChange={(e) => setBoardSize(e.target.value as "65" | "86" | "")} className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm focus:bg-black focus:outline-none">
                          <option value="">Select size</option>
                          <option value="65">65 Inches</option>
                          <option value="86">86 Inches</option>
                        </select>
                        {errors.boardSize ? <div className="text-xs text-red-400 mt-1">{errors.boardSize}</div> : null}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">{leaseType === "monthly" ? "Contract Duration" : "Package"}</label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {leaseType === "monthly" ? (
                          [
                            { id: "monthly_rate", label: "Monthly Rate" },
                            { id: "6_months", label: "6 Months Contract" },
                            { id: "12_months", label: "12 Months Contract" },
                          ].map((p) => (
                            <button key={p.id} type="button" onClick={() => setPackageOption(p.label)} className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${packageOption === p.label ? "border-primary text-foreground bg-primary/5" : "border-border text-muted-foreground bg-background"}`}>
                              {p.label}
                            </button>
                          ))
                        ) : (
                          [
                            { id: "daily", label: "Daily Rate (5 Hours)" },
                            { id: "3_days", label: "3 Days" },
                            { id: "7_days", label: "7 Days" },
                          ].map((p) => (
                            <button key={p.id} type="button" onClick={() => setPackageOption(p.label)} className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${packageOption === p.label ? "border-primary text-foreground bg-primary/5" : "border-border text-muted-foreground bg-background"}`}>
                              {p.label}
                            </button>
                          ))
                        )}
                      </div>
                      {errors.packageOption ? <div className="text-xs text-red-400 mt-1">{errors.packageOption}</div> : null}
                    </div>

                    <div className="card-surface p-4 rounded-lg border border-border">
                      <div className="font-semibold text-sm mb-2">LEASE SUMMARY</div>
                      <div className="text-sm text-muted-foreground">
                        <div>Lease Type: <span className="text-foreground font-medium">{leaseType === "short" ? "Short-Term Lease" : leaseType === "monthly" ? "Monthly Lease" : "—"}</span></div>
                        <div>Display Size: <span className="text-foreground font-medium">{boardSize ? `${boardSize} Inches` : "—"}</span></div>
                        <div>Selected Package: <span className="text-foreground font-medium">{packageOption || "—"}</span></div>
                        <div>Estimated Price: <span className="text-foreground font-medium">{getEstimatedPrice()}</span></div>
                        <div>Ingress: <span className="text-foreground font-medium">{ingress ? formatTime12(ingress) : "—"}</span></div>
                        <div>Egress: <span className="text-foreground font-medium">{egress ? formatTime12(egress) : "—"}</span></div>
                      </div>
                    </div>

                    

                    <button type="submit" disabled={!isFormValid()} className={`btn-primary w-full ${!isFormValid() ? "opacity-60 cursor-not-allowed" : ""}`}>
                      REQUEST LEASE QUOTATION
                    </button>
                  </form>
                ) : (
                  <div className="p-6 text-center">
                    <div className="text-2xl font-bold mb-3">Thank you!</div>
                    <div className="text-sm text-muted-foreground">Your lease quotation request has been submitted successfully.
                      <div className="mt-3">Our team will contact you shortly regarding your leasing requirements.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-5">
              <div className="card-surface p-5 flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Flexible Scheduling</div>
                  <div className="text-sm text-muted-foreground mt-1">Choose a time that works best for your team. Virtual or in-person demonstrations available.</div>
                </div>
              </div>

              <div className="card-surface p-5 flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Enterprise Solutions</div>
                  <div className="text-sm text-muted-foreground mt-1">Tailored packages for educational institutions, corporations, and government agencies.</div>
                </div>
              </div>

              <div className="card-surface p-5 flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Expert Consultation</div>
                  <div className="text-sm text-muted-foreground mt-1">Get personalized recommendations from our technology specialists.</div>
                </div>
              </div>
            </div>

            {!demoSubmitted ? (
              <form
                className="card-surface p-7 space-y-5 mt-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  // final validation
                  const newErrors: Record<string, string> = {};
                  if (!demoFullName.trim()) newErrors.fullName = "Required";
                  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoEmail);
                  if (!demoEmail.trim()) newErrors.email = "Required";
                  else if (!emailValid) newErrors.email = "invalid";
                  const phoneDigits = demoPhone.replace(/\D/g, "");
                  if (!demoPhone.trim()) newErrors.phone = "Required";
                  else if (phoneDigits.length < 7) newErrors.phone = "invalid";
                  if (!demoCompany.trim()) newErrors.company = "Required";
                  if (!demoSolution.trim()) newErrors.solution = "Required";
                  if (!demoMessage.trim()) newErrors.message = "Required";

                  setDemoErrors(newErrors);
                  if (Object.keys(newErrors).length > 0) return;

                  // require terms agreement for demo
                  if (!demoTermsChecked) return;

                  setDemoSubmitting(true);
                  // emulate async submit
                  setTimeout(() => {
                    setDemoSubmitting(false);
                    setDemoSubmitted(true);
                    // clear form fields
                    setDemoFullName("");
                    setDemoEmail("");
                    setDemoPhone("");
                    setDemoCompany("");
                    setDemoSolution("");
                    setDemoMessage("");
                    setDemoErrors({});
                    closeAllDropdowns();
                    setDemoTermsChecked(false);
                  }, 900);
                }}
              >
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Full Name
                  </label>
                  <input
                    value={demoFullName}
                    onChange={(e) => setDemoFullName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground"
                  />
                  {demoErrors.fullName ? <div className="text-xs text-red-400 mt-1">This field is required.</div> : null}
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground"
                  />
                  {demoErrors.email === "invalid" ? (
                    <div className="text-xs text-red-400 mt-1">Please enter a valid email address.</div>
                  ) : demoErrors.email ? (
                    <div className="text-xs text-red-400 mt-1">This field is required.</div>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" /> Phone Number
                  </label>
                  <input
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground"
                  />
                  {demoErrors.phone === "invalid" ? (
                    <div className="text-xs text-red-400 mt-1">Please enter a valid phone number.</div>
                  ) : demoErrors.phone ? (
                    <div className="text-xs text-red-400 mt-1">This field is required.</div>
                  ) : null}
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" /> Company / Institution Name
                  </label>
                  <input
                    value={demoCompany}
                    onChange={(e) => setDemoCompany(e.target.value)}
                    placeholder="Company / Institution Name"
                    className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground"
                  />
                  {demoErrors.company ? <div className="text-xs text-red-400 mt-1">This field is required.</div> : null}
                </div>

                <div>
                  <label className="text-sm font-medium">Solution Interest</label>
                  <select
                    value={demoSolution}
                    onChange={(e) => setDemoSolution(e.target.value)}
                    className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm focus:bg-black focus:outline-none"
                  >
                    <option value="">Select solution</option>
                    {solutions.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {demoErrors.solution ? <div className="text-xs text-red-400 mt-1">This field is required.</div> : null}
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" /> Message
                  </label>
                  <textarea
                    rows={4}
                    value={demoMessage}
                    onChange={(e) => setDemoMessage(e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm resize-none placeholder:text-muted-foreground"
                  />
                  {demoErrors.message ? <div className="text-xs text-red-400 mt-1">This field is required.</div> : null}
                </div>

                <div className="card-surface p-4 rounded-lg border border-border">
                  <div className="text-sm font-semibold text-foreground text-center">TERMS AND CONDITIONS</div>
                  <div className="text-sm text-muted-foreground text-center mt-1">Review the booking and payment policies before submitting your inquiry.</div>
                  <div className="mt-4 text-sm text-muted-foreground max-h-[36vh] overflow-y-auto pr-2">
                    {/* Terms content (visible, scrollable) */}
                    <div>
                     
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-foreground mb-2">I. INCLUSIONS</p>
                      <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Unit setup and basic orientation</li>
                        <li>Technical support (optional for events)</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-foreground mb-2">II. BOOKING POLICIES</p>
                      <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>First-come, first-served basis</li>
                        <li>Reservations must be confirmed with 50% downpayment</li>
                        <li>Bookings will be accepted only during office hours, Monday to Saturday, 9:00am to 6pm. Rental shall be for a minimum of two hours. We are close during holidays.</li>
                        <li>Ocular inspections may be done only during office hours with prior notice and scheduled appointment.</li>
                        <li>A renter should be of legal age, 18 years old and above. A renter with age below 18 years old must be accompanied by an adult. For a corporation. only the authorized person/s should enter into a rental agreement.</li>
                        <li>We need a 30-minute clean-up time between usage.</li>
                        <li>Fully payment required prior to deployment</li>
                        <li>Studio rental is inclusive of Brains Infinite Innovation venue, LED/commercial display, WIFi, airconditioning, and basic sound system.</li>
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-foreground mb-2">III. PAYMENT</p>
                      <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>For holiday bookings, a thirty (30%) percent surcharge shall be applied.</li>
                        <li>A 50% down payment (DP) is required for any reservation worth P5,000.00 and above payable, upon booking confirmation. Based on our first-to-pay, first-to-be-served policy, a DP confirms your booking and the studio will not be awarded to another client.</li>
                        <li>Bank transfer / online payment / direct payment accepted</li>
                        <li>Down payments can be done through:

                          <div className="ml-4 mt-1 text-sm space-y-1">
                            <p>Account name: Globaltronics, Inc.</p>
                            <p>Metrobank Account#: 361-402-1897</p>
                            <p>BDO Account#: 261-0008-941</p>
                            <p>GCash: <span className="text-blue-400">0917 5262762</span> Macy Guido</p>
                            <p>Please send a copy of the deposit slip/money transfer to <a href="mailto:mroxas@globaltronics.net" className="text-blue-400 hover:underline">mroxas@globaltronics.net</a>.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 mb-5">
                  <input id="demo_terms_agree" type="checkbox" checked={demoTermsChecked} onChange={(e) => setDemoTermsChecked(e.target.checked)} />
                  <label htmlFor="demo_terms_agree" className="text-sm">I have read and agree to the Terms and Conditions.</label>
                </div>

                <button
                  type="submit"
                  className={`btn-primary w-full ${(!demoFullName || !demoEmail || !demoPhone || !demoCompany || !demoSolution || !demoMessage || demoSubmitting || !demoTermsChecked) ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={
                    demoSubmitting ||
                    !(
                      demoFullName.trim() &&
                      demoEmail.trim() &&
                      demoPhone.trim() &&
                      demoCompany.trim() &&
                      demoSolution.trim() &&
                      demoMessage.trim() &&
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoEmail) &&
                      demoPhone.replace(/\D/g, "").length >= 7 &&
                      demoTermsChecked
                    )
                  }
                >
                  {demoSubmitting ? "Submitting..." : (
                    <>
                      Schedule Demo <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            ) : (
              <div className="card-surface p-6 text-center mt-8">
                <div className="text-2xl font-bold mb-3">Thank you!</div>
                <div className="text-sm text-muted-foreground">Your demo request has been submitted. Our team will contact you shortly.</div>
              </div>
            )}
          </div>
        )}

        
      </div>
    </StarfieldSection>
    
  );
}

function Field({
  icon: Icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: typeof User;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" /> {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground"
      />
    </div>
  );
}

/* ------------------------------ Footer ------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background relative">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold shadow-glow">
                M
              </div>
              <span className="font-semibold text-lg">Millennium</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Transforming collaboration through enterprise-grade smart technology solutions for
              education, corporate, and institutional excellence.
            </p>
            <div className="mt-5 flex gap-3">
              {[Share2, AtSign, Hash, Play].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Solutions"
            links={[
              "Smart Classrooms",
              "Enterprise Collaboration",
              "Digital Signage",
              "Smart Office Systems",
              "Automation Technologies",
              "Custom Solutions",
            ]}
          />
          <FooterCol
            title="Company"
            links={["About Us", "Case Studies", "Events", "Careers", "Partners", "Contact"]}
          />

          <div id="footer-contact">
            <div className="font-semibold mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary" /> hello@brainstech.ph
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary" /> (+63) 916 339 6258
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5" /> Suite 1004 Atlanta Center,
                Annapolis St., San Juan City, Metro Manila, Philippines
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="font-semibold">Stay Updated</div>
            <p className="text-sm text-muted-foreground mt-1">
              Subscribe to our newsletter for the latest product updates and industry insights
            </p>
          </div>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-sm"
            />
            <button className="btn-primary">Subscribe</button>
          </form>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground mb-5">
            Certified &amp; Trusted
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((c) => (
              <span key={c.label} className="chip">
                <c.icon className="w-3.5 h-3.5 text-primary" /> {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2026 Millennium Dynamic Touch Panel. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-semibold mb-5">{title}</div>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-foreground transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

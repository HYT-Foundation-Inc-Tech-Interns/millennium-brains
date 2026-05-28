import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  Calendar,
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
} from "lucide-react";
import heroImg from "@/assets/millennium tv.png";
import { Header } from "@/components/site/Header";
import { SectionHeading } from "@/components/site/SectionHeading";
import Spline from "@splinetool/react-spline";


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
  { value: "1000+", label: "Educational Institutions", icon: GraduationCap },
  { value: "200+", label: "Government Agencies", icon: Building },
  { value: "2500+", label: "Projects Completed", icon: Users },
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

// Explore Our Smart Environments
const environments = [
  {
    key: "classroom",
    label: "Smart Classroom",
    icon: GraduationCap,
    title: "Interactive Learning Environment",
    desc: "Transform traditional classrooms into engaging digital learning spaces with interactive displays, wireless collaboration, and smart content management.",
    features: [
      '86" and 65" 4K Interactive Display',
      "Wireless Screen Sharing",
     
    ],
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
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
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
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
    tag: "30 Meeting Rooms",
    title: "AVIDA Tower",
    location: "San Francisco, USA",
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
    images: [
      "/img/MCA.jpg",
    ],
  },
  {
    tag: "Highly Employable Courses",
    title: "Quezon City University",
    location: "Quezon City, Philippines",
    category: "Schools | University",
    images: [
      "/img/QCU (1).jpg",
      "/img/QCU (2).jpg",
      "/img/QCU (3).jpg",
      "/img/QCU.jpg",

    ],
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
    images: [ 
      "/img/AFP1.jpg",
      "/img/AFP2.jpg",
      "/img/AFP3.jpg",
      "/img/AFP4.jpg",

     ],
  },
   {
    tag: "National Defense",
    title: "Manila Police District",
    location: "Quezon City, Philippines",
    category: "Government",
    images: [ 
      "/img/MPD (1).jpg",
      "/img/MPD (2).jpg",
      "/img/MPD (3).jpg",

      

     ],
  },
  {
    tag: "Online Public Services",
    title: "Department of Information and Communications Technology",
    location: "Quezon City, Philippines",
    category: "Government",
    images: [
      "/img/DICT (1).jpg",
      "/img/DICT (2).jpg",
    ],
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
      "/img/AGRARIAN (4).jpg",
   
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
    title: "PH Navy",
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
    title: "PH Airforce",
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
    ],
  },
  {
    tag: "Peace and Order",
    title: "Department of the Interior and Local Government",
    location: "Quezon City, Philippines",
    category: "Government",
    images: [
      "/img/DILG (1).jpg",
      "/img/DILG (2).jpg",
      "/img/DILG (3).jpg",
      "/img/DILG (4).jpg",
    ],
  },
  {
    tag: "Basic & Emergrency Care",
    title: "Novaliches General Hospital",
    location: "Quezon City, Philippines",
    category: "Government",
    images: [
      "/img/NCH (1).jpg",
      "/img/NCH (2).jpg",
      "/img/NCH (3).jpg",
      "/img/NCH (4).jpg",
    ],
  },
  {
    tag: "Urban Green Space Management",
    title: "National Parks Development Committee",
    location: "Metro Manila, Philippines",
    category: "Government",
    images: [
      "/img/NPDC (1).jpg",
      "/img/NPDC (2).jpg",
    ],
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
    tag: "Automation & Collaboration",
    title: "AYALA Corpo One",
    location: "Seattle, USA",
    category: "Corporate",
    images: [
      "/img/AYALA (1).jpg",
      "/img/AYALA (2).jpg",
      "/img/AYALA (3).jpg",
      "/img/AYALA (4).jpg",
    ],
  },
  {
    tag: "Automation & Collaboration",
    title: "AYALA Council Meeting",
    location: "Seattle, USA",
    category: "Corporate",
    images: [
      "/img/ACM (1).jpg",
      "/img/ACM (2).jpg",
      "/img/ACM (3).jpg",
      "/img/ACM (4).jpg",
    ],
  },
  {
    tag: "Automation & Collaboration",
    title: "AYALA Tower One",
    location: "Seattle, USA",
    category: "Corporate",
    images: [
      "/img/ATO (1).jpg",
      "/img/ATO (2).jpg",
      "/img/ATO (3).jpg",
      "/img/ATO (4).jpg",
    ],
  },
  {
    tag: "Automation & Collaboration",
    title: "City Club",
    location: "Seattle, USA",
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
    tag: "Automation & Collaboration",
    title: "Suntrust Building",
    location: "Seattle, USA",
    category: "Corporate",
    images: [
      "/img/SB (1).jpg",
      "/img/SB (2).jpg",
      "/img/SB (3).jpg",
      "/img/SB (4).jpg",
    ],
  },
  {
    tag: "Industrial Lubricants",
    title: "North Block Enterprise",
    location: "Pasay City, Philippines",
    category: "Corporate",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    ],
  },
  {
    tag: "Multiple Distict Companies",
    title: "Spark Industries",
    location: "Quezon City, Philippines",
    category: "Corporate",
    images: [
      "/img/SI (1).jpg",
      "/img/SI (2).jpg",
    ],
  },
  {
    tag: "Studio Rentals",
    title: "Fire and Ice Studios",
    location: "Quezon City, Philippines",
    category: "Corporate",
    images: [
      "/img/FCS (1).jpg",
      "/img/FCS (2).jpg",
    ],
  },
  
];
// images below Meet Us at Industry Events
const events = [
  {
    type: "Military & History Museum",
    title: "AFP MUSEUM",
    desc: "Join us at the AFP Museum to explore Philippine military history and honor our heroes!",
    date: "June 15-17, 2026",
    location: "Quezon City, Philippines",
    attendees: "5000+",
    img: "/img/IMG_9178.jpeg",
  },
   {
    type: "Gala Ceremony",
    title: "AFPCOC GAWAD AWARDS",
    desc: "Come celebrate amazing Filipino heroes—join us in honoring outstanding people who change lives today!",
    date: "June 15-17, 2026",
    location: "Quezon City, Philippines",
    attendees: "500+",
    img: "/img/GAWAD.jpg",
  },
  {
    type: "Expo",
    title: "DICT",
    desc: "Discover the future of workplace collaboration with live product demonstrations and expert panels",
    date: "July 22, 2026",
    location: "Cavite, Philippines",
    attendees: "3000+",
    img: "/img/DICT (1).jpg",
  },
  {
    type: "Summit",
    title: "BUREAU OF IMMIGRATION",
    desc: "Join our immigration network—protect our national borders, explore security systems, and streamline travel processing today!",
    date: "August 10-12, 2026",
    location: "Manila, Philippines",
    attendees: "2000+",
    img: "/img/IMMIG1 (3).jpg",
  },
  {
    type: "Conference",
    title: "DEVELOPMENT ACADEMY OF THE PHILIPPINES",
    desc: "Unlock your leadership potential—join our public sector training programs to drive smart national development!",
    date: "September 5, 2026",
    location: "Pasig City, Philippines",
    attendees: "5000+",
    img: "/img/DAP (2).jpg",
  },
  {
    type: "Convention",
    title: "DEPARTMENT OF AGRARIAN REFORM",
    desc: "Support our farmers—join our community programs to help secure land rights and boost food production!",
    date: "August 10-12, 2026",
    location: "Quezon City, Philippines",
    attendees: "5000+",
    img: 
      "/img/AGRARIAN (1).jpg",
        
  },
  {
    type: "Summit",
    title: "DENR",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/DepartmentNR (3).jpg",
  },
  {
    type: "Expo",
    title: "PCCI",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/PCCI.jpg",
  },
  {
    type: "Expo",
    title: "PH NAVAL BASE",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/NAVY (4).jpg",
  },
  {
    type: "Expo",
    title: "AYALA PROPERTIES",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/AYALA (4).jpg",
  },
  {
    type: "Expo",
    title: "PH Pharma & Healthcare Expo (2024)",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/PHARMA.jpg",
  },
  {
    type: "Expo",
    title: "BREAD OF LIFE QC",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/BL.jpg",
  },
   {
    type: "Expo",
    title: "Elite Teacher Seminar",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/ETS.jpg",
  },
   
  {
    type: "Expo",
    title: "INNOVATION AI TECH-TALK",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/AYALA.png",
  },
  {
    type: "Expo",
    title: "TARLAC STA IGNACIA",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/TSI.png",
  },
  {
    type: "Golf Tournament",
    title: "TAGAYTAY HIGHLANDS",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/TH.jpg",
  },
  {
    type: "Expo",
    title: "TRAVEL SALE EXPO",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "",
  },
  {
    type: "Expo",
    title: "HALAL EVENT (MEGAMALL)",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/HALAL.jpg",
  },
  {
    type: "Expo",
    title: "HALAL EVENT (WORLD TRADE CENTER)",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/HALAL2.jpg",
  },
  {
    type: "Expo",
    title: "GUSI PEACE PRIZE FOUNDATION",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/GUSI.jpg",
  },
  {
    type: "Expo",
    title: "FIRST CAVITE INDUSTRIAL ESTATE",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/CAVITE.jpg",
  },
  {
    type: "Expo",
    title: "WORLDBEX (SMX)",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/WORLDBEX.jpg",
  },
  {
    type: "Expo",
    title: "WOMEN ECONOMIC FORUM",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/WEF.jpg",
  },
  {
    type: "Expo",
    title: "HISTORIC FREDERICKSBURG FOUNDATION INC.",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "/img/HFFI.jpg",
  },
];

const certifications = [
  { icon: Shield, label: "ISO 9001:2015" },
  { icon: Award, label: "Enterprise Grade" },
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Award, label: "Energy Star Certified" },
];

/* ----------------------------- Component ----------------------------- */

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        <Hero />
        <Trust />
        <Solutions />
        <Products />
        <Showcase />
        <Portfolio />
        <Events />
        <BookDemo />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------ Hero -------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-grid opacity-60" aria-hidden /> */}
      <div className="absolute w-full h-full inset-0">
        <Spline
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
          }}
        />
        {/* Black overlay gradient to hide Spline logo at the bottom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.0) 70%)",
            zIndex: 2,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center" style={{zIndex: 3}}>
        <div>
          <span className="chip">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Powered by Brains Infinite Innovation
            Inc.
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            The start of <span className="text-gradient-brand">Modern Day Technology</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Millennium is a smart interactive board that can do presentatiosn in the classroom, the
            confference room, in your home theater or anywhere that requires collaborative and
            engaging presentations
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a href="#contact" className="btn-primary">
              Book Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#solutions" className="btn-ghost">
              Explore Solutions
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "500+", l: "Enterprise Clients", i: Zap },
              { v: "100+", l: "Installations", i: Shield },
              { v: "20+", l: "Cities Served", i: Sparkles },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <s.i className="w-5 h-5 mx-auto text-primary" />
                <div className="mt-2 text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="e p-3 relative">
            <img
              src={heroImg}
              alt="Glowing circuit board"
              width={1280}
              height={896}
              className="w-full h-auto "
            />
            <div className="absolute -top-4 -right-4 card-surface px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand grid place-items-center">
                <Hd className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-xs">
                <div className="text-muted-foreground">Display</div>
                <div className="font-semibold">4k Ultra HD Display</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 card-surface px-4 py-3 flex items-center gap-3">
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
  return (
    <section className="relative py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
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
          {stats.map((s) => (
            <div key={s.label} className="card-surface p-6 text-center">
              <div className="w-11 h-11 rounded-lg bg-primary/10 grid place-items-center mx-auto">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-4 text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
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
    </section>
  );
}

/* ---------------------------- Solutions ------------------------------ */

function Solutions() {
  return (
    <section id="solutions" className="py-24 border-t border-border">
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
    </section>
  );
}

/* ----------------------------- Products ------------------------------ */

function Products() {
  return (
    <section id="products" className="py-24 border-t border-border">
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
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { v: "20", l: "Touch Points" },
                  { v: "4K", l: "Resolution" },
                  { v: "21+", l: "Multi-Language Support" },
                ].map((m) => (
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
    </section>
  );
}

/* ----------------------------- Showcase ------------------------------ */

function Showcase() {
  const [active, setActive] = useState(environments[0].key);
  const env = environments.find((e) => e.key === active)!;
  return (
    <section id="showcase" className="py-24 border-t border-border">
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
    </section>
  );
}

/* ----------------------------- Portfolio ----------------------------- */

function Portfolio() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("Schools | University");

  const [activeImages, setActiveImages] = useState<{ [key: string]: number }>({});

  const [playingSlides, setPlayingSlides] = useState<{ [key: string]: boolean }>({});

  const [fading, setFading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    Object.keys(playingSlides).forEach((title) => {
      if (playingSlides[title]) {
        const project = projects.find((p) => p.title === title);

        if (project && project.images.length > 1) {
          const interval = setInterval(() => {
  setFading((prev) => ({
    ...prev,
    [title]: true,
  }));

  setTimeout(() => {
    setActiveImages((prev) => ({
      ...prev,
      [title]:
        ((prev[title] || 0) + 1) % project.images.length,
    }));

    setFading((prev) => ({
      ...prev,
      [title]: false,
    }));
  }, 700);
}, 2500);

          intervals.push(interval);
        }
      }
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [playingSlides]);

  const filtered = projects.filter((p) => p.category === filter);

  return (
    <section id="installations" className="py-24 border-t border-border">
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
            <div key={p.title} className="card-surface overflow-hidden group">
              <div className="relative">
                <img
                  src={p.images[activeImages[p.title] || 0]}
                  alt={p.title}
                  loading="lazy"
                  onClick={() => {
                  setPlayingSlides({
                  [p.title]: true,
               });
          }}
                 className={`w-full aspect-[4/3] object-cover cursor-pointer group-hover:scale-105 transition-all duration-1000 
                  ${
  fading[p.title]
    ? "opacity-0 blur-md scale-105"
    : "opacity-100 blur-0 scale-100"
    }`      
  } 
/>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-brand text-primary-foreground">
                  {p.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Events ------------------------------- */

function Events() {
  return (
    <section id="events" className="py-24 border-t border-border">
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
            <div key={e.title} className="card-surface overflow-hidden">
              <div className="relative">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="w-full aspect-[16/9] object-cover"
                />
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-brand text-primary-foreground">
                  {e.type}
                </span>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-background/70 backdrop-blur">
                  <Users className="w-3.5 h-3.5" /> {e.attendees}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                <div className="mt-5 space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-primary" /> {e.date}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary" /> {e.location}
                  </div>
                </div>
                <a href="#contact" className="btn-primary w-full mt-6">
                  Register Now <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Book Demo ----------------------------- */

function BookDemo() {
  const [tab, setTab] = useState<"demo" | "lease">("demo");
  return (
    <section id="contact" className="py-24 border-t border-border relative overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTab("demo")}
                className={`card-surface p-6 text-center transition-all ${
                  tab === "demo"
                    ? "!bg-gradient-brand !text-primary-foreground border-transparent shadow-glow"
                    : ""
                }`}
              >
                <Calendar className="w-6 h-6 mx-auto" />
                <div className="mt-3 font-semibold">Book Demo</div>
                <div className="text-xs opacity-80 mt-1">Live Product Tour</div>
              </button>
              <button
                onClick={() => setTab("lease")}
                className={`card-surface p-6 text-center transition-all ${
                  tab === "lease"
                    ? "!bg-gradient-brand !text-primary-foreground border-transparent shadow-glow"
                    : ""
                }`}
              >
                <Building2 className="w-6 h-6 mx-auto" />
                <div className="mt-3 font-semibold">Leasing Inquiry</div>
                <div className="text-xs opacity-80 mt-1">Flexible Options</div>
              </button>
            </div>

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

            <div className="card-surface p-6">
              <div className="text-sm text-muted-foreground mb-4">Trusted by:</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs text-muted-foreground">Enterprises</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-xs text-muted-foreground">Schools</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>
          </div>

          <form
            className="card-surface p-7 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We'll be in touch shortly.");
            }}
          >
            <Field icon={User} label="Full Name" placeholder="John Doe" />
            <Field icon={Mail} label="Email Address" type="email" placeholder="john@company.com" />
            <Field icon={Phone} label="Phone Number" placeholder="+1 (555) 000-0000" />
            <Field icon={Building2} label="Organization" placeholder="Company / Institution Name" />

            <div>
              <label className="text-sm font-medium">Organization Type</label>
              <select className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm focus:bg-black focus:outline-none">
                <option>Select type</option>
                <option>School</option>
                <option>University</option>
                <option>Enterprise</option>
                <option>Government</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Solution Interest</label>
              <select className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm focus:bg-black focus:outline-none">
                <option>Select solution</option>
                {solutions.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your requirements..."
                className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              {tab === "demo" ? "Schedule Demo" : "Request Leasing Info"}{" "}
              <Send className="w-4 h-4" />
            </button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </div>
    </section>
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

          <div>
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
          <div>© 2026 Millennium Technology Solutions. All rights reserved.</div>
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

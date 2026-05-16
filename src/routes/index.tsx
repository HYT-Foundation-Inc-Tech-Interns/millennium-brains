import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Millennium — Smart Technology for Modern Collaboration" },
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

const stats = [
  { value: "500+", label: "Enterprise Clients", icon: Building2 },
  { value: "1000+", label: "Educational Institutions", icon: GraduationCap },
  { value: "200+", label: "Government Agencies", icon: Building },
  { value: "2500+", label: "Projects Completed", icon: Users },
];

const partners = [
  { name: "TechCorp Global", type: "Enterprise" },
  { name: "State University", type: "Education" },
  { name: "City Government", type: "Government" },
  { name: "Innovation Hub", type: "Corporate" },
  { name: "Global Academy", type: "Education" },
  { name: "Enterprise Solutions Inc", type: "Enterprise" },
  { name: "National Institute", type: "Institution" },
  { name: "Smart City Council", type: "Government" },
];

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

const environments = [
  {
    key: "classroom",
    label: "Smart Classroom",
    icon: GraduationCap,
    title: "Interactive Learning Environment",
    desc: "Transform traditional classrooms into engaging digital learning spaces with interactive displays, wireless collaboration, and smart content management.",
    features: [
      '86" 4K Interactive Display',
      "Wireless Screen Sharing",
      "Cloud-based Content Library",
      "Student Engagement Tools",
      "Real-time Assessment",
    ],
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "meeting",
    label: "Meeting Room",
    icon: Users,
    title: "Modern Meeting Spaces",
    desc: "Empower hybrid teams with seamless video conferencing, AI meeting assistants, and immersive collaboration tools.",
    features: [
      "4K Video Conferencing",
      "AI Meeting Notes",
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

const projectFilters = [
  "All Projects",
  "Schools",
  "Government",
  "Corporate",
  "Universities",
  "Smart Offices",
] as const;

const projects = [
  {
    tag: "45 Smart Classrooms",
    title: "Riverside High School",
    location: "New York, USA",
    category: "Schools",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "30 Meeting Rooms",
    title: "TechCorp Headquarters",
    location: "San Francisco, USA",
    category: "Corporate",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "20 Lecture Halls",
    title: "State University",
    location: "Boston, USA",
    category: "Universities",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Complete AV System",
    title: "City Hall Council",
    location: "Chicago, USA",
    category: "Government",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Smart Office System",
    title: "Innovation Studios",
    location: "Austin, USA",
    category: "Smart Offices",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Automation & Collaboration",
    title: "Enterprise Loft HQ",
    location: "Seattle, USA",
    category: "Corporate",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
];

const events = [
  {
    type: "Exhibition",
    title: "EdTech Innovation Summit 2026",
    desc: "Join us at the largest education technology exhibition showcasing our latest smart classroom solutions",
    date: "June 15-17, 2026",
    location: "Las Vegas Convention Center",
    attendees: "5000+",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
  },
  {
    type: "Conference",
    title: "Enterprise Collaboration Forum",
    desc: "Discover the future of workplace collaboration with live product demonstrations and expert panels",
    date: "July 22, 2026",
    location: "New York City",
    attendees: "2000+",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
  },
  {
    type: "Expo",
    title: "Government Tech Expo",
    desc: "Showcasing smart governance and public-sector digital transformation solutions",
    date: "August 10-12, 2026",
    location: "Washington, DC",
    attendees: "3000+",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    type: "Webinar",
    title: "Smart Workspace Webinar",
    desc: "Live online session exploring automation, AI, and the future of intelligent offices",
    date: "September 5, 2026",
    location: "Online",
    attendees: "10000+",
    img: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1000&q=80",
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
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-blue-glow/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
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
              { v: "1000+", l: "Installations", i: Shield },
              { v: "50+", l: "Cities Served", i: Sparkles },
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
          {partners.map((p) => (
            <div key={p.name} className="card-surface p-6 text-center">
              <div className="w-11 h-11 rounded-lg bg-secondary grid place-items-center mx-auto text-lg font-bold">
                {p.name[0]}
              </div>
              <div className="mt-4 font-semibold text-sm">{p.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.type}</div>
            </div>
          ))}
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

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="card-surface p-3 relative">
            <img
              src="https://img.youtube.com/vi/FwzdLd3bSx8/maxresdefault.jpg"
              alt="Millennium Pro Series"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]"
            />
            <div className="absolute top-6 left-6 chip">4K Ultra HD</div>
            <div className="px-3 py-5">
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

          <div className="grid sm:grid-cols-2 gap-4">
            {productFeatures.map((f) => (
              <div
                key={f.title}
                className="card-surface p-5 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 grid place-items-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="mt-4 font-semibold">{f.title}</h4>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
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
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All Projects");
  const filtered =
    filter === "All Projects" ? projects : projects.filter((p) => p.category === filter);
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
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
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
              <select className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm">
                <option>Select type</option>
                <option>School</option>
                <option>University</option>
                <option>Enterprise</option>
                <option>Government</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Solution Interest</label>
              <select className="mt-2 w-full bg-input border border-border rounded-lg px-4 py-3 text-sm">
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

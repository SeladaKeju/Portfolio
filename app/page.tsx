"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import SplitText from "@/components/SplitText";
import { gsap } from "gsap";
import "gsap/dist/gsap";

// TypeWriter component
type TypeWriterProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
};

function TypeWriter({ text, speed = 70, delay = 0, className = "", onComplete = () => {} }: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  
  // Reset semua state ketika component re-mount
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
    setStartTyping(false);
    
    const startTimeout = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, isComplete, speed, text, startTyping, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-0.5 h-[1em] ml-0.5 align-middle"
          // Hapus bg-black untuk diganti dengan styling dinamis
          style={{ backgroundColor: 'currentColor' }} // Menggunakan currentColor agar sesuai dengan warna teks
        >
          &nbsp;
        </motion.span>
      )}
    </span>
  );
}

// Add this new hook to handle client-side only operations
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return hasMounted;
}

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  // Tetap set state awal ke true untuk initial load
  const [titleTyped, setTitleTyped] = useState(true); 
  const [subtitleTyped, setSubtitleTyped] = useState(true);
  
  const [heroInView, setHeroInView] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  
  // State untuk header dinamis - pastikan state awal adalah hero
  const [activeSection, setActiveSection] = useState("hero");
  
  // Ubah warna header default ke hitam (warna hero)
  const [headerColor, setHeaderColor] = useState("#000000");
  const [headerTextColor, setHeaderTextColor] = useState("text-white");
  
  // Add this missing state for the project carousel
  const [currentProject, setCurrentProject] = useState(0);

  // Add this state
  const [hasLeftHero, setHasLeftHero] = useState(false);

  // Perbaiki fungsi untuk menentukan warna header berdasarkan section
  const updateHeaderColor = (section: string) => {
    console.log(`Section changed to: ${section}`); // Debugging
    
    // Tandai section aktif terlebih dahulu
    setActiveSection(section);
    
    // Set warna berdasarkan section
    if (section === "about" || section === "skills" || section === "footer") {
      setHeaderColor("#FFFFFF");
      setHeaderTextColor("text-black");
    } else {
      // Untuk hero, projects, dan contact
      setHeaderColor("#000000");
      setHeaderTextColor("text-white");
    }
  };
  
  // useEffect untuk memastikan warna header benar saat pertama kali load
  useEffect(() => {
    // Set warna header untuk hero section saat pertama kali load
    updateHeaderColor("hero");
  }, []);

  // Referensi untuk setiap section
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  // Add isAnimating state to control animation reset
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Update this useEffect to reset animations properly and wait longer
  useEffect(() => {
    if (heroInView && hasLeftHero) {
      // Only reset if not currently animating and we've previously left the hero
      if (!isAnimating) {
        setIsAnimating(true);
        setTitleTyped(false);
        setSubtitleTyped(false);
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          setResetKey(prev => prev + 1);
          
          // Reset animation state after animations complete
          // Increased timeout to match our longer animations
          setTimeout(() => {
            setIsAnimating(false);
          }, 5000); // Increased from 3000 to 5000 for longer animations
        }, 100);
      }
    }
  }, [heroInView, isAnimating, hasLeftHero]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with Next.js and Stripe integration.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
      link: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team features.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "#",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations and modern design.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      link: "#",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with location-based forecasts and analytics.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React", "API Integration", "Chart.js", "CSS3"],
      link: "#",
    },
  ]

  const skills = [
    "PHP",
    "Laravel",
    "MySQL",
    "Oracle",
    "HTML5",
    "CSS3",
    "JavaScript",
    "Bootstrap",
    "Git",
  ]

  // PENTING: Hapus useEffect yang konflik dan gunakan satu pendekatan konsisten
  useEffect(() => {
    // Set warna header untuk hero section saat pertama kali load
    setHeaderColor("#000000"); // Pastikan menggunakan hitam murni, bukan #808080
    setHeaderTextColor("text-white");
    
    // Tambahkan event listener untuk scroll yang akan mempengaruhi header
    const handleScroll = () => {
      // Get scroll position
      const scrollPosition = window.scrollY;
      
      // Jika di bagian paling atas (hero section), tambahkan efek transparansi
      if (scrollPosition < 10) {
        // Header lebih transparan di bagian paling atas
        document.documentElement.style.setProperty('--header-opacity', '0.6');
      } else {
        // Header solid saat scrolling
        document.documentElement.style.setProperty('--header-opacity', '1');
      }
    };
    
    // Initialize opacity variable
    document.documentElement.style.setProperty('--header-opacity', '0.6');
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use this to check if we're client-side
  const hasMounted = useHasMounted();
  
  // Move document manipulation to an effect that only runs client-side
  useEffect(() => {
    // Only run this on the client
    if (typeof window === 'undefined') return;
    
    // Set warna header untuk hero section saat pertama kali load
    setHeaderColor("#000000"); 
    setHeaderTextColor("text-white");
    
    // Scroll effect code
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition < 10) {
        document.documentElement.style.setProperty('--header-opacity', '0.6');
      } else {
        document.documentElement.style.setProperty('--header-opacity', '1');
      }
    };
    
    document.documentElement.style.setProperty('--header-opacity', '0.6');
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pre-generate random values instead of calculating them during render
  const backgroundElements = useMemo(() => 
    Array.from({ length: 30 }).map(() => ({
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      width: Math.random() * 50 + 10,
      height: Math.random() * 50 + 10,
      opacity: Math.random() * 0.5 + 0.1,
      animateX: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ],
      animateY: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ],
      duration: Math.random() * 80 + 40
    })), 
  []);
  
  return (
    <div className="min-h-screen text-black">
      {/* Header dengan efek transisi opacity */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50"
        style={{ 
          backgroundColor: headerColor,
          opacity: 'var(--header-opacity, 1)',
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "background-color 800ms ease, opacity 500ms ease" // Longer, smoother transition
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Text color also needs a transition */}
            <div 
              className={`text-xl font-semibold ${headerTextColor}`}
              style={{ transition: "color 800ms ease" }}
            >
              PORTFOLIO
            </div>
            <div className="hidden md:flex space-x-10">
              <a 
                href="#about" 
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium`}
                style={{ transition: "color 800ms ease" }}
              >
                About
              </a>
              <a 
                href="#projects" 
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium`}
                style={{ transition: "color 800ms ease" }}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium`}
                style={{ transition: "color 800ms ease" }}
              >
                Skills
              </a>
              <a 
                href="#contact" 
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium`}
                style={{ transition: "color 800ms ease" }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Tambahkan priority untuk viewport callback */}
      <motion.section 
        ref={heroRef}
        id="hero"
        className="h-screen flex items-center justify-center px-6 bg-black relative overflow-hidden"
        onViewportEnter={() => {
          console.log("Hero in view");
          setHeroInView(true);
          updateHeaderColor("hero");
        }}
        onViewportLeave={() => setHeroInView(false)}
        viewport={{ amount: 0.3, once: false }}
      >
        {/* Background animation remains the same */}
        {hasMounted && (
          <div className="absolute inset-0 w-full h-full z-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              {backgroundElements.map((elem, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  initial={{ 
                    x: `${elem.initialX}%`, 
                    y: `${elem.initialY}%`,
                    width: elem.width,
                    height: elem.height,
                    opacity: elem.opacity
                  }}
                  animate={{ 
                    x: elem.animateX.map(x => `${x}%`),
                    y: elem.animateY.map(y => `${y}%`)
                  }}
                  transition={{ 
                    duration: elem.duration, 
                    ease: "linear",
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-3xl mx-auto w-full relative z-10 text-center"
        >
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Centered text with split text animation */}
              <h1 className="text-6xl lg:text-7xl font-light leading-tight min-h-[160px] text-white">
                <div className="block">
                  <SplitText 
                    text="Creative" 
                    className="block font-light" 
                    delay={120}
                    duration={1.8}
                    ease="power1.out"
                    from={{ opacity: 0, y: 60, rotationX: -30 }}
                    to={{ opacity: 1, y: 0, rotationX: 0 }}
                    onLetterAnimationComplete={() => setTitleTyped(true)}
                  />
                </div>
                
                {titleTyped && (
                  <div className="block">
                    <SplitText 
                      text="Developer" 
                      className="block font-semibold" 
                      delay={100}
                      duration={1.5}
                      ease="power2.out"
                      from={{ opacity: 0, y: 40, scale: 0.9 }}
                      to={{ opacity: 1, y: 0, scale: 1 }}
                      onLetterAnimationComplete={() => {
                        setSubtitleTyped(true);
                      }}
                    />
                  </div>
                )}
              </h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-xl text-white leading-relaxed">
                  Crafting digital experiences with clean code and thoughtful design. Passionate about creating
                  solutions that make a difference.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* About Section - Tambahkan priority dan viewport options */}
      <motion.section 
        ref={aboutRef}
        id="about" 
        className="h-screen flex items-center px-6 bg-white"
        onViewportEnter={() => {
          console.log("About in view");
          updateHeaderColor("about");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-6 text-black">About Me</h2>
            <div className="w-20 h-px bg-black/30 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <p className="text-lg text-black/80 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that
                combine functionality with beautiful design.
              </p>
              <p className="text-lg text-black/80 leading-relaxed">
                My approach focuses on clean, maintainable code and user-centered design. I believe in the power of
                technology to solve real-world problems and create meaningful experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="relative group">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-black hover:border-black/70 text-black bg-transparent hover:bg-black/5 relative"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    GitHub Profile
                  </span>
                </div>
                
                <div className="relative group">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-black hover:border-black/70 text-black bg-transparent hover:bg-black/5"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    LinkedIn Profile
                  </span>
                </div>
                
                <div className="relative group">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-black hover:border-black/70 text-black bg-transparent hover:bg-black/5"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    Contact Email
                  </span>
                </div>
                
                <div className="relative group">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-full border-black hover:border-black/70 text-black bg-transparent hover:bg-black/5"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    Download CV
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="About"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section with White Cards */}
      <motion.section 
        ref={projectsRef}
        id="projects" 
        className="h-screen flex items-center px-6 bg-black" 
        onViewportEnter={() => {
          console.log("Projects in view");
          updateHeaderColor("projects");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-4 text-white">Featured Projects</h2>
            <div className="w-20 h-px bg-white/50 mx-auto mb-3"></div>
          </motion.div>

          {/* Project Carousel with Clickable Cards */}
          <div className="relative">
            <motion.div 
              className="overflow-hidden rounded-2xl"
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
            >
              <motion.div 
                className="flex transition-all duration-500 ease-out"
                animate={{ x: `calc(-${currentProject * 100}%)` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white rounded-xl overflow-hidden shadow-lg mx-auto max-w-2xl transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-t"></div>
                          <div className="absolute bottom-0 left-0 p-5 md:hidden">
                            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-3 text-black hidden md:block">{project.title}</h3>
                            <p className="text-black/80 text-sm mb-4 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-black/70 text-sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            <span>View project details</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Navigation Buttons - Keep the same design */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setCurrentProject(current => (current === 0 ? projects.length - 1 : current - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
            >
              <ArrowRight className="h-4 w-4 text-white transform rotate-180" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setCurrentProject(current => (current === projects.length - 1 ? 0 : current + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.button>
          </div>

          {/* Progress Indicator - Keep the same design */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center items-center mt-6 space-x-1"
          >
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className="p-2 group"
                aria-label={`Go to project ${index + 1}`}
              >
                <div className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  index === currentProject ? 'bg-white' : 'bg-white/20 group-hover:bg-white/40'
                }`}></div>
              </button>
            ))}
          </motion.div>
          
          {/* Project navigation info - Keep the same */}
          <div className="flex justify-center mt-4 text-sm text-white/60">
            <span>Project {currentProject + 1} of {projects.length}</span>
            <span className="mx-2">•</span>
            <span>Swipe or use arrows to navigate</span>
          </div>
        </div>
      </motion.section>

      {/* Skills Section - Tambahkan priority dan viewport options */}
      <motion.section 
        ref={skillsRef}
        id="skills" 
        className="h-screen flex items-center px-6 bg-white"
        onViewportEnter={() => {
          console.log("Skills in view");
          updateHeaderColor("skills");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-6 text-black">Skills & Technologies</h2>
            <div className="w-20 h-px bg-black/30 mx-auto mb-4"></div>
            <p className="text-lg text-black/70 max-w-2xl mx-auto">
              My technical toolkit includes a variety of languages, frameworks, and technologies.
            </p>
          </motion.div>

          {/* All skills in one grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInUp}
          >
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl flex items-center justify-center hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-200"
                >
                  <span className="font-medium text-black/80 text-lg">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section - Tambahkan priority dan viewport options */}
      <motion.section 
        ref={contactRef}
        id="contact" 
        className="h-screen flex items-center px-6 bg-black"
        onViewportEnter={() => {
          console.log("Contact in view");
          updateHeaderColor("contact");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl font-light mb-6 text-white">Let's Work Together</h2>
            <div className="w-20 h-px bg-white/50 mx-auto mb-8"></div>
            <p className="text-xl text-white leading-relaxed max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div 
              variants={{
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.5 }}
            >
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-12 py-6 text-lg group">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div 
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center space-x-6"
            >
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                hello@portfolio.com
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-white hover:text-gray-200 transition-colors">
                +1 (555) 123-4567
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer - Tambahkan priority dan viewport options */}
      <motion.footer 
        ref={footerRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
        className="py-12 px-6 border-t border-gray-200 bg-white"
        onViewportEnter={() => {
          console.log("Footer in view");
          updateHeaderColor("footer");
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-black/60">© 2024 Portfolio. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-black/60 hover:text-black transition-colors">
                Privacy
              </a>
              <a href="#" className="text-black/60 hover:text-black transition-colors">
                Terms
              </a>
              <a href="#" className="text-black/60 hover:text-black transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Style untuk efek tambahan - modifikasi untuk dynamic cursor color */}
      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        
        section, footer {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

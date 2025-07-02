"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import BlurText from "@/components/BlurText";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import Masonry from "@/components/Masonry";
import { gsap } from "gsap";
import "gsap/dist/gsap";
import { Playfair_Display } from "next/font/google";

// Add Playfair Display font configuration
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap"
});

// Add this new hook to handle client-side only operations
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return hasMounted;
}

export default function Portfolio() {
  const [heroInView, setHeroInView] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  
  // State untuk header dinamis - ubah ke putih sebagai default
  const [activeSection, setActiveSection] = useState("hero");
  
  // Ubah warna header default ke putih
  const [headerColor, setHeaderColor] = useState("#FFFFFF");
  const [headerTextColor, setHeaderTextColor] = useState("text-black");
  
  const [hasLeftHero, setHasLeftHero] = useState(false);
  const [startBlurAnimation, setStartBlurAnimation] = useState(false);

  // Update fungsi untuk warna header - semua section menggunakan header putih
  const updateHeaderColor = (section: string) => {
    console.log(`Section changed to: ${section}`);
    setActiveSection(section);
    
    // Semua section menggunakan header putih dengan teks hitam
    setHeaderColor("#FFFFFF");
    setHeaderTextColor("text-black");
  };
  
  useEffect(() => {
    updateHeaderColor("hero");
  }, []);

  // Referensi untuk setiap section
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  const [isAnimating, setIsAnimating] = useState(false);

  // Simplified useEffect for hero animation
  useEffect(() => {
    if (heroInView && hasLeftHero) {
      setStartBlurAnimation(false);
      setTimeout(() => {
        setStartBlurAnimation(true);
      }, 100);
    } else if (heroInView && !hasLeftHero) {
      setStartBlurAnimation(true);
    }
  }, [heroInView, hasLeftHero]);

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
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with Next.js and Stripe integration.",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"]
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 400,
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team features.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"]
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 400,
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations and modern design.",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"]
    }
  ];

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

  const certifications = [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: "AWS"
    },
    {
      id: "2", 
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023",
      icon: "GCP"
    }
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setHeaderColor("#FFFFFF"); 
    setHeaderTextColor("text-black");
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition < 10) {
        document.documentElement.style.setProperty('--header-opacity', '0.95');
      } else {
        document.documentElement.style.setProperty('--header-opacity', '1');
      }
    };
    
    document.documentElement.style.setProperty('--header-opacity', '0.95');
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasMounted = useHasMounted();

  return (
    <div className={`min-h-screen text-black bg-white ${playfairDisplay.className}`}>
      {/* Header dengan background putih */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50"
        style={{ 
          backgroundColor: headerColor,
          opacity: 'var(--header-opacity, 1)',
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "background-color 800ms ease, opacity 500ms ease"
        }}
      >
        <div className="w-full px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Portfolio Title - Left Corner */}
            <div 
              className={`text-xl font-semibold ${headerTextColor}`}
              style={{ transition: "color 800ms ease" }}
            >
              PORTFOLIO
            </div>
            
            {/* Navigation Menu - Right Corner */}
            <div className="hidden md:flex space-x-8">
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
                href="#certifications" 
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium`}
                style={{ transition: "color 800ms ease" }}
              >
                Certifications
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

      {/* Hero Section - Background putih */}
      <motion.section 
        ref={heroRef}
        id="hero"
        className="h-screen flex items-center justify-center px-6 bg-white relative overflow-hidden"
        onViewportEnter={() => {
          console.log("Hero in view");
          setHeroInView(true);
          updateHeaderColor("hero");
        }}
        onViewportLeave={() => {
          setHeroInView(false);
          setHasLeftHero(true);
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="max-w-4xl mx-auto w-full relative z-10 text-center"
        >
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="min-h-[200px] flex items-center justify-center">
                {startBlurAnimation && (
                  <BlurText
                    text="Building better web experiences, one line of code at a time — I'm Rizqi Aditya."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={() => {
                      console.log('Hero text animation completed!');
                    }}
                    className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black text-center max-w-4xl"
                  />
                  
                )}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="max-w-2xl mx-auto"
              >

              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* About Section - Background putih */}
      <motion.section 
        ref={aboutRef}
        id="about" 
        className="min-h-screen flex items-center px-6 bg-white py-20"
        onViewportEnter={() => {
          console.log("About in view");
          updateHeaderColor("about");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Title Section - Left Aligned */}
          <ScrollReveal direction="left" delay={0} distance={60}>
            <div className="text-left mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold text-black tracking-tight">
                About Me
              </h2>
            </div>
          </ScrollReveal>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-2 items-center">
            {/* Photo Section - Left Side */}
            <ScrollReveal direction="left" delay={0.2} distance={40}>
              <div className="relative w-full max-w-sm mx-auto md:mx-0">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="About Rizqi Aditya"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-black/5 rounded-full -z-10"></div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-black/10 rounded-full -z-10"></div>
              </div>
            </ScrollReveal>

            {/* Content Section - Right Side */}
            <ScrollReveal direction="right" delay={0.4} distance={40}>
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-lg text-black/80 leading-relaxed">
                    Passionate about creating digital experiences that matter. I specialize in modern web technologies, 
                    combining clean code with thoughtful design to build applications that users love.
                  </p>
                  <p className="text-lg text-black/80 leading-relaxed">
                    Currently pursuing my degree while constantly learning and exploring new technologies. 
                    I believe in the power of continuous improvement and user-centered design.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="relative group">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full border-black hover:border-black/70 text-black bg-transparent hover:bg-black/5"
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </motion.section>

      {/* Projects Section - Background putih */}
      <motion.section 
        ref={projectsRef}
        id="projects" 
        className="min-h-screen flex items-center px-6 bg-white py-20" 
        onViewportEnter={() => {
          console.log("Projects in view");
          updateHeaderColor("projects");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-4 text-black">Featured Projects</h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto">
              A collection of projects showcasing my skills in web development and design.
            </p>
          </motion.div>

          {/* Masonry Grid Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <Masonry
              items={projects}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section - Background putih */}
      <motion.section 
        ref={skillsRef}
        id="skills" 
        className="min-h-screen flex items-center px-6 bg-white py-20"
        onViewportEnter={() => {
          console.log("Skills in view");
          updateHeaderColor("skills");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-6 text-black">Skills and Technologies</h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto">
              My technical toolkit includes a variety of languages, frameworks, and technologies.
            </p>
          </motion.div>

          {/* All skills in one grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl flex items-center justify-center hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-200"
                >
                  <span className="font-medium text-black/80 text-lg">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications Section - Background putih */}
      <motion.section 
        id="certifications" 
        className="min-h-screen flex items-center px-6 bg-white py-20"
        onViewportEnter={() => {
          console.log("Certifications in view");
          updateHeaderColor("certifications");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4 text-black">
              Certifications
            </h2>
          </motion.div>

          {/* Certification Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    filter: "blur(0px)"
                  }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.05
                  }}
                  whileHover={{ 
                    scale: 0.95,
                    filter: "blur(0px)",
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-64">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10"></div>
                    
                    {/* Overlay with certification info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                        <p className="text-sm opacity-90 mb-3 line-clamp-2">{cert.issuer}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                            {cert.date}
                          </span>
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                            Certified
                          </span>
                        </div>
                        <div className="flex items-center text-xs opacity-75">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Professional Credential</span>
                        </div>
                      </div>
                    </div>

                    {/* Icon display when not hovered */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {cert.icon}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-10 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-black/10 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-5 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-black/5 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section - Background putih dengan content area abu-abu */}
      <motion.section 
        ref={contactRef}
        id="contact" 
        className="min-h-screen flex items-center px-6 bg-white py-20"
        onViewportEnter={() => {
          console.log("Contact in view");
          updateHeaderColor("contact");
        }}
        viewport={{ amount: 0.3, once: false }}
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          {/* Content area with gray background */}
          <div className="bg-slate-100 p-16 shadow-xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <h2 className="text-4xl font-light mb-6 text-black">Let's Work Together</h2>
              <p className="text-xl text-black/80 leading-relaxed max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="space-y-6"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-12 py-6 text-lg group">
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center space-x-6"
              >
                <a href="#" className="text-black/70 hover:text-black transition-colors">
                  hello@portfolio.com
                </a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-black/70 hover:text-black transition-colors">
                  +1 (555) 123-4567
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer - Background putih */}
      <motion.footer 
        ref={footerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
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

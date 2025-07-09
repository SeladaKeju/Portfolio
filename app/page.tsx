"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BlurText from "@/components/BlurText";
import { Playfair_Display } from "next/font/google";

// Add Playfair Display font configuration
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
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
  // Ubah warna header default ke putih
  const [headerColor, setHeaderColor] = useState("#FFFFFF");
  const [headerTextColor, setHeaderTextColor] = useState("text-black");
  const [headerVisible, setHeaderVisible] = useState(true);

  // Add state for header visibility with improved scroll detection
  const [lastScrollY, setLastScrollY] = useState(0);

  // Update fungsi untuk warna header - semua section menggunakan header putih
  const updateHeaderColor = () => {
    // Semua section menggunakan header putih dengan teks hitam
    setHeaderColor("#FFFFFF");
    setHeaderTextColor("text-black");
  };

  useEffect(() => {
    updateHeaderColor();
  }, []);

  // Referensi untuk setiap section
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  const [isAnimating, setIsAnimating] = useState(false);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const projects = [
    {
      id: "1",
      img: "/projects/pbl.png",
      url: "https://github.com/SeladaKeju/aplikasi-ujian-online.git",
      height: 450,
      title: "Dashboard - Laravel",
      description:
        "A comprehensive exam management dashboard built with Laravel. Features include student management, exam monitoring, token generation, and real-time statistics with an intuitive admin interface.",
      tags: [
        "Laravel",
        "PHP",
        "MySQL",
        "Tailwind CSS",
        "TypeScript",
        "React",
        "Inertia.js",
      ],
    },
    {
      id: "2",
      img: "/projects/nationary.png",
      url: "https://github.com/SeladaKeju/blog-cms.git",
      height: 450,
      title: "Notionary Blog",
      description:
        "A modern blog platform for sharing stories and expertise. Built with clean design principles, featuring user authentication, story management, and responsive reading experience.",
      tags: [
        "Laravel",
        "PHP",
        "MySQL",
        "Tailwind CSS",
        "JavaScript",
        "React",
        "Inertia.js",
      ],
    },
    {
      id: "3",
      img: "/projects/justipin.png",
      url: "https://justipin.my.id",
      height: 450,
      title: "Justipin - Aplikasi Jasa Titip",
      description:
        "A mobile application for tipping services that provides safe, easy, and transparent solutions for students and general public. Features secure payment processing and multi-order management.",
      tags: ["Laravel", "PHP", "MySQL", "Flutter", "Dart", "Firebase"],
    },
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
  ];

  const certifications = [
    {
      id: "1",
      title: "Database Design",
      issuer: "Oracle Academy",
      date: "22nd October 2024",
      img: "/certifications/database-design_page-0001.jpg",
      url: "/certifications/database-design_page-0001.jpg",
      height: 260,
      description: "Certificate for Database Design from Oracle Academy.",
    },
    {
      id: "2",
      title: "Database Programming with SQL",
      issuer: "Oracle Academy",
      date: "26th December 2024",
      img: "/certifications/database-programming-with-sql_page-0001.jpg",
      url: "/certifications/database-programming-with-sql_page-0001.jpg",
      height: 260,
      description:
        "Certificate for Database Programming with SQL from Oracle Academy.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    setHeaderColor("#FFFFFF");
    setHeaderTextColor("text-black");

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const currentScrollY = scrollPosition;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          // Header visibility logic with improved thresholds
          if (currentScrollY < 50) {
            // Always show header at top of page
            setHeaderVisible(true);
          } else if (
            currentScrollY > lastScrollY &&
            currentScrollY > 150 &&
            scrollDifference > 5
          ) {
            // Scrolling down - hide header (with minimum scroll distance)
            setHeaderVisible(false);
          } else if (currentScrollY < lastScrollY && scrollDifference > 5) {
            // Scrolling up - show header (with minimum scroll distance)
            setHeaderVisible(true);
          }

          setLastScrollY(currentScrollY);

          // Smooth opacity transition
          if (scrollPosition < 10) {
            document.documentElement.style.setProperty(
              "--header-opacity",
              "0.95"
            );
          } else if (scrollPosition < 100) {
            const opacity = 0.95 + (scrollPosition / 100) * 0.05;
            document.documentElement.style.setProperty(
              "--header-opacity",
              opacity.toString()
            );
          } else {
            document.documentElement.style.setProperty("--header-opacity", "1");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    document.documentElement.style.setProperty("--header-opacity", "0.95");

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const hasMounted = useHasMounted();

  return (
    <div
      className={`min-h-screen text-black bg-white ${playfairDisplay.className}`}
    >
      {/* Header tanpa animasi - static */}
      <nav
        className="fixed top-0 w-full z-50"
        style={{
          backgroundColor: headerColor,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
          <div className="flex justify-between items-center">
            {/* Portfolio Title - Left Corner */}
            <div
              className={`text-base sm:text-lg md:text-xl font-semibold ${headerTextColor}`}
            >
              PORTFOLIO
            </div>

            {/* Navigation Menu - Right Corner */}
            <div className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
              <a
                href="#about"
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium text-xs sm:text-sm lg:text-base`}
              >
                About
              </a>
              <a
                href="#projects"
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium text-xs sm:text-sm lg:text-base`}
              >
                Projects
              </a>
              <a
                href="#skills"
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium text-xs sm:text-sm lg:text-base`}
              >
                Skills
              </a>
              <a
                href="#certifications"
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium text-xs sm:text-sm lg:text-base`}
              >
                Certifications
              </a>
              <a
                href="#contact"
                className={`${headerTextColor} hover:opacity-80 transition-colors font-medium text-xs sm:text-sm lg:text-base`}
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className={`${headerTextColor} hover:opacity-80 transition-colors p-2`}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Background putih */}
      <motion.section
        ref={heroRef}
        id="hero"
        className="h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 bg-white relative overflow-hidden"
        onViewportEnter={() => {
          console.log("Hero in view");
          updateHeaderColor();
        }}
        viewport={{ amount: 0.3, once: true }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto w-full relative z-10 text-center"
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
          >
            <motion.div
              variants={fadeInUp}
              className="space-y-3 sm:space-y-4 md:space-y-6"
            >
              <div className="min-h-[100px] sm:min-h-[120px] md:min-h-[150px] lg:min-h-[200px] flex items-center justify-center px-2">
                <BlurText
                  text="Building Reliable, User-Friendly Web Solutions"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={() => {
                    console.log("Hero text animation completed!");
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-black text-center max-w-5xl"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/70 text-center leading-relaxed">
                  Passionate Fullstack Developer and Creative Problem Solver
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section - Background putih */}
      <section
        ref={aboutRef}
        id="about"
        className="min-h-screen flex items-center px-3 sm:px-4 md:px-6 bg-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Title Section - Left Aligned */}
          <div className="text-left mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold text-black tracking-tight">
              About Me
            </h2>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Photo Section - Left Side */}
            <div className="order-2 md:order-1">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-sm mx-auto md:mx-0">
                <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
                  <Image
                    src="about-me/about.jpg"
                    alt="About Rizqi Aditya"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black/5 rounded-full -z-10"></div>
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-black/10 rounded-full -z-10"></div>
              </div>
            </div>

            {/* Content Section - Right Side */}
            <div className="order-1 md:order-2">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <p className="text-sm sm:text-base md:text-lg text-black/80 leading-relaxed">
                    I’m Rizqi Aditya Pratama, currently pursuing my D3 in
                    Informatics Engineering at Semarang State Polytechnic while
                    exploring new technologies and growing my skills in
                    fullstack web development. Passionate about creating
                    user-friendly digital solutions and solving real-world
                    problems through creative thinking and adaptability.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center md:justify-start">
                  <div className="relative group">
                    <a
                      href="https://github.com/SeladaKeju"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </Button>
                    </a>
                  </div>

                  <div className="relative group">
                    <a
                      href="https://www.linkedin.com/in/rizqiadityapratama"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                        <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </Button>
                    </a>
                  </div>

                  <div className="relative group">
                    <a
                      href="cv/Rizqi Aditya Pratama - Resume fix.pdf"
                      download="Rizqi_Aditya_Pratama_Resume.pdf"
                    >
                      <Button>
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Background putih */}
      <section
        ref={projectsRef}
        id="projects"
        className="min-h-screen flex items-center px-3 sm:px-4 md:px-6 bg-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-black">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-black/70 max-w-2xl mx-auto px-2 sm:px-4">
              A collection of projects showcasing my skills in web development
              and design.
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center"
              >
                {/* Project Description - Left Side */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6 order-2 md:order-1 text-center md:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-black/80 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gray-100 text-black/70 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-black hover:text-black/70 transition-all duration-300 font-medium text-sm sm:text-base md:text-lg group justify-center md:justify-start"
                  >
                    View Project
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* Project Image - Right Side */}
                <div className="relative order-1 md:order-2">
                  <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mx-auto max-w-sm sm:max-w-md md:max-w-none">
                    <Image
                      src={project.img}
                      alt={project.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Static decorative elements */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-black/5 rounded-full -z-10"></div>
                  <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-6 md:-left-6 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-black/3 rounded-full -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Background putih */}
      <motion.section
        ref={skillsRef}
        id="skills"
        className="min-h-screen flex items-center px-3 sm:px-4 md:px-6 bg-white py-12 sm:py-16 md:py-20"
        onViewportEnter={() => {
          console.log("Skills in view");
          updateHeaderColor();
        }}
        viewport={{ amount: 0.3, once: true }}
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-black">
              Skills
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-black/70 max-w-2xl mx-auto">
              Technologies and tools I use to build modern web applications
            </p>
          </div>

          {/* Skills Grid - 3x3 layout */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 text-center"
              >
                <span className="text-sm sm:text-base font-medium text-black">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certifications Section - Background putih */}
      <motion.section
        id="certifications"
        className="min-h-screen flex items-center px-3 sm:px-4 md:px-6 bg-white py-12 sm:py-16 md:py-20"
        onViewportEnter={() => {
          console.log("Certifications in view");
          updateHeaderColor();
        }}
        viewport={{ amount: 0.3, once: true }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-black">
              Certifications
            </h2>
          </div>

          {/* Certification Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={cert.id} className="flex flex-col">
                {/* Image Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
                  <Image
                    src={cert.img}
                    alt={cert.title}
                    width={300}
                    height={cert.height || 200}
                    className="w-full object-contain rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="text-left space-y-1 px-1">
                  <h3 className="text-base sm:text-lg md:text-lg font-semibold mb-1">
                    {cert.title}
                  </h3>

                  <div className="text-xs sm:text-sm text-black/70">
                    {cert.issuer}
                  </div>

                  <div className="text-xs text-black/50">{cert.date}</div>

                  <div className="text-black/80 text-xs sm:text-sm mt-2">
                    {cert.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section - Background putih */}
      <section
        ref={contactRef}
        id="contact"
        className="flex items-center px-3 sm:px-4 md:px-6 bg-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          {/* Black container around content only */}
          <div className="bg-black p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-white">
                Let&apos;s Work Together
              </h2>

              <div className="mb-4 sm:mb-5 md:mb-6">
                <Button
                  className="bg-white text-black hover:bg-gray-200 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base group rounded-none"
                  onClick={() =>
                    (window.location.href =
                      "mailto:rizqiadit2430@gmail.com?subject=Project Inquiry&body=Hi Rizqi, I would like to discuss a project with you.")
                  }
                >
                  <Mail className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Get In Touch
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto px-2">
                Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss
                how we can bring your ideas to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}

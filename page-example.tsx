"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import {
  ArrowDownToLine, // Add this line
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Calendar,
  Code,
  Coffee,
  Database,
  DatabaseBackup, 
  DatabaseZap,
  Feather,
  FileCheck,
  FileCode,
  FileCode2,
  Figma,
  Flame,
  GitMerge,
  Github,
  Globe,
  GraduationCap,
  Home,
  Languages,
  Linkedin,
  LucideProps,
  Mail,
  Moon,
  Network,
  Palette,
  Paintbrush,
  PenTool,
  Scissors,
  Server,
  Sigma,
  Smartphone,
  Sun,
  TerminalSquare,
  User,
  Users,
} from "lucide-react";

// Helper to render icon components
const Icon = ({ 
  icon: IconComponent, 
  ...props 
}: { 
  icon: React.ComponentType<LucideProps> 
} & Omit<LucideProps, 'ref'>) => {
  return <IconComponent {...props} />;
};

// Skills data array
const skillsData = [
  {
    category: "Programming Languages",
    icon: Code,
    items: [
      { name: "JavaScript", icon: Code },
      { name: "PHP", icon: FileCode2 },
      { name: "Python", icon: BrainCircuit },
      { name: "Java", icon: Coffee },
      { name: "HTML/CSS", icon: FileCode },
      { name: "C", icon: Sigma },
    ],
  },
  {
    category: "Web Frontend",
    icon: Paintbrush,
    items: [
      { name: "HTML", icon: FileCode },
      { name: "CSS", icon: Paintbrush },
      { name: "React", icon: Network },
      { name: "Next.js", icon: Network },
    ],
  },
  {
    category: "Web Backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: Server },
      { name: "Laravel", icon: Database },
    ],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    items: [
      { name: "React Native", icon: Smartphone },
      { name: "Flutter", icon: Feather },
    ],
  },
  {
    category: "Databases",
    icon: DatabaseZap,
    items: [
      { name: "MySQL", icon: DatabaseZap },
      { name: "Oracle", icon: DatabaseBackup },
    ],
  },
  {
    category: "Other Tools",
    icon: TerminalSquare,
    items: [
      { name: "Git", icon: GitMerge },
      { name: "GitHub", icon: Github },
      { name: "VS Code", icon: TerminalSquare },
      { name: "Firebase", icon: Flame },
    ],
  },
  {
    category: "Human Languages",
    icon: Languages,
    items: [
      { name: "Indonesia", icon: Languages },
      { name: "English", icon: Globe },
    ],
  },
  {
    category: "Design Tools",
    icon: Figma,
    items: [
      { name: "Figma", icon: Figma },
      { name: "Canva", icon: Palette },
      { name: "CorelDraw", icon: PenTool },
      { name: "CapCut", icon: Scissors },
    ],
  },
];

// Card component with consistent styling
const Card = ({ 
  children, 
  isDarkMode,
  isSmall = false // Add prop for smaller card variant
}: { 
  children: React.ReactNode, 
  isDarkMode: boolean,
  isSmall?: boolean
}) => {
  return (
    <div className={`${isSmall ? 'space-y-3 p-4' : 'space-y-8 p-8'} rounded-2xl ${
      isDarkMode 
        ? "bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] border-white/10" // Reduced opacity and transparency
        : "bg-white/10 shadow-blue-50/20 border-[#E5E5EA]/50"
    } backdrop-blur-sm border transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}>
      {children}
    </div>
  );
};

const AboutPage = () => {
  // State management
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Scroll position tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Clock updating
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? "bg-[#0a0a0f] text-white" // Darker background for starry effect
        : "bg-white text-gray-900"
      }`}
    >
      {/* Starry background effect */}
      {isDarkMode ? (
        <>
          {/* Base dark layer with subtle grain */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 bg-[#0a0a0f] opacity-100"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '150px 150px'
            }}
          ></div>
          
          {/* Subtle stars layer 1 - Small, more numerous */}
          <div 
            className="fixed inset-0 pointer-events-none z-1" 
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.3
            }}
          ></div>
          
          {/* Subtle stars layer 2 - Larger, sparse */}
          <div 
            className="fixed inset-0 pointer-events-none z-1" 
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1.5px)',
              backgroundSize: '100px 100px',
              opacity: 0.4
            }}
          ></div>
          
          {/* Animated twinkling stars */}
          <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 0.5}px`,
                  height: `${Math.random() * 2 + 0.5}px`,
                  opacity: Math.random() * 0.5 + 0.1,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 5 + 3}s`,
                }}
              ></div>
            ))}
          </div>
          
          {/* Subtle glow in certain areas */}
          <div className="fixed top-1/4 left-1/4 w-96 h-96 pointer-events-none z-1 rounded-full bg-indigo-500/5 blur-[120px]"></div>
          <div className="fixed bottom-1/3 right-1/3 w-80 h-80 pointer-events-none z-1 rounded-full bg-blue-300/5 blur-[100px]"></div>
        </>
      ) : (
        // Light mode paper texture (keep original or modify as needed)
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "url('/textures/paper.jpg')", // Make sure this path is correct
            backgroundRepeat: "repeat",
            backgroundSize: "500px 500px",
            backgroundBlendMode: "multiply",
            opacity: 0.1, 
            mixBlendMode: "darken"
          }}
        />
      )}
      
      {/* Header with navigation and time */}
      <header className={`fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b ${
  isDarkMode 
    ? "bg-black/40 border-white/10" 
    : "bg-white/70 border-gray-200/50"
}`}>
      <Link href="/" className="text-2xl font-bold">PORTFOLIO</Link>
      <div className="font-mono text-sm">{currentTime}</div>
      </header>
      
      <main className="pt-20 px-4 md:px-8 lg:px-16">        {/* About Me Section */}
        <section id="about-me" className="py-2 md:py-3"> {/* Further reduced padding */}
          {/* Increased max-width to accommodate flanking images and added padding */}
          <div className="max-w-6xl mx-auto px-4"> 
            {/* Header Removed */}
            
            {/* Flex container for card (left) and images (right) */}
            <div className="flex flex-col md:flex-row items-start gap-8 mt-8">
              
              {/* About Me Card (Left side) */}
              <div className="w-full md:w-2/3"> 
                <Card isDarkMode={isDarkMode}>
                  <div className="text-center md:text-left">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
                      Faiz Ata Choirul Anaam
                    </h2>
                    <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-6`}>
                      I&apos;m Faiz, a passionate fullstack developer specializing in modern web technologies and user experience design. Currently studying programming at Semarang State Polytechnic, I blend technical expertise with creative problem-solving to build intuitive digital experiences.
                    </p>
                    <a
                      href="/images/cv.pdf" // Assuming cv.pdf is in the public/images folder
                      download="Faiz_Ata_CV.pdf" // Suggested filename for download
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isDarkMode 
                          ? "bg-white/10 hover:bg-white/20 text-gray-200 border border-white/20" 
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                        } `}
                    >
                      Download CV
                      <Icon icon={ArrowDownToLine} className="size-4" />
                    </a>
                  </div>
                </Card>
              </div>
              
              {/* Images Container (Right side with Marquee Animation) */}
              {/* This outer div maintains the 1/3 column width on medium screens and handles alignment. */}
              {/* Changed md:justify-start to md:justify-center to center the marquee content within this column */}
              <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center">
                {/* Marquee container: overflow-hidden is crucial. Added relative positioning for gradient overlays. */}
                {/* md:max-w-none allows it to fill the 1/3 width on medium+ screens. */}
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none flex overflow-hidden">
                  {/* Left Gradient Overlay */}
                  <div className={`absolute top-0 bottom-0 left-0 w-16 md:w-20 z-10 pointer-events-none ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-[#0a0a0f] to-transparent' 
                      : 'bg-gradient-to-r from-white to-transparent'
                  }`}></div>

                  {/* Inner div that contains duplicated images and animates. */}
                  {/* Changed to 'animate-marquee-bidirectional'. CSS needs to be defined. */}
                  <div className="flex whitespace-nowrap animate-marquee-bidirectional">
                    {/* Image 1 (Original) */}
                    <div className="flex-shrink-0 w-32 h-44 md:w-36 md:h-48 relative rounded-xl overflow-hidden shadow-xl group transform hover:scale-105 transition-transform duration-300 mx-2">
                      <Image 
                        src="/images/photo1.jpg" 
                        alt="Faiz Ata Choirul Anaam" 
                        layout="fill" 
                        objectFit="cover" 
                        className="transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </div>
                    {/* Image 2 (Original) */}
                    <div className="flex-shrink-0 w-32 h-44 md:w-36 md:h-48 relative rounded-xl overflow-hidden shadow-xl group transform hover:scale-105 transition-transform duration-300 mx-2">
                      <Image 
                        src="/images/photo2.jpg" 
                        alt="Faiz Ata Choirul Anaam playing keyboard" 
                        layout="fill" 
                        objectFit="cover" 
                        className="transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </div>
                    {/* Image 1 (Duplicate for seamless loop) */}
                    <div className="flex-shrink-0 w-32 h-44 md:w-36 md:h-48 relative rounded-xl overflow-hidden shadow-xl group transform hover:scale-105 transition-transform duration-300 mx-2">
                      <Image 
                        src="/images/photo1.jpg" 
                        alt="Faiz Ata Choirul Anaam" 
                        layout="fill" 
                        objectFit="cover" 
                        className="transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </div>
                    {/* Image 2 (Duplicate for seamless loop) */}
                    <div className="flex-shrink-0 w-32 h-44 md:w-36 md:h-48 relative rounded-xl overflow-hidden shadow-xl group transform hover:scale-105 transition-transform duration-300 mx-2">
                      <Image 
                        src="/images/photo2.jpg" 
                        alt="Faiz Ata Choirul Anaam playing keyboard" 
                        layout="fill" 
                        objectFit="cover" 
                        className="transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </div>
                  </div>

                  {/* Right Gradient Overlay */}
                  <div className={`absolute top-0 bottom-0 right-0 w-16 md:w-20 z-10 pointer-events-none ${
                    isDarkMode 
                      ? 'bg-gradient-to-l from-[#0a0a0f] to-transparent' 
                      : 'bg-gradient-to-l from-white to-transparent'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </section>        {/* Education Section */}
        <section id="education" className="py-2 md:py-3"> {/* Further reduced padding */}
          <div className="max-w-6xl mx-auto px-4">
            {/* Header Removed */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mt-4"> {/* Reduced mt-10 to mt-4 */}
              {/* Politeknik */}
              <Card isDarkMode={isDarkMode}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <GraduationCap className={`mr-3 size-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Politeknik Negeri Semarang
                      </h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        2023 - Present
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-md font-semibold mt-3 mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                      Organisasi & Kegiatan:
                    </h4>
                    <ul className={`list-disc list-inside space-y-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <li>PCC ( Politeknik Computer Club )</li>
                      <li>Volunteer FKBSE ( as a companion )</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* MA (Madrasah Aliyah) */}
              <Card isDarkMode={isDarkMode}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <BookOpen className={`mr-3 size-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Muhammadiyah Islamic Boarding School in Kudus
                      </h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        2020 - 2023
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-md font-semibold mt-3 mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                      Organisasi & Kegiatan:
                    </h4>
                    <ul className={`list-disc list-inside space-y-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <li>IPM (Muhammadiyah Student Association) - Secretary</li>
                      <li>Latansa - Layout Divition</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>        {/* Certificates Section */}
        <section id="certificates" className="py-2 md:py-3"> {/* Further reduced padding */}
          <div className="max-w-6xl mx-auto px-4">
            {/* Header Removed */}            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4"> {/* Changed to 4 columns and smaller gap */}
              {/* Certificate 1: Database Programming with SQL */}
              <Card isDarkMode={isDarkMode} isSmall={true}>
                <div className="flex flex-col items-center text-center space-y-1"> {/* Reduced space-y-2 to space-y-1 */}
                  <div className="w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/images/ser1.jpg"
                      alt="Sertifikat Database Programming with SQL - Oracle Academy"
                      width={150} 
                      height={100}
                      layout="responsive"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Award className={'mr-1 size-1 ' + (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')} />
                      <h3 className={'text-xs font-semibold ' + (isDarkMode ? "text-white" : "text-gray-900")}>
                        Database Programming with SQL
                      </h3>
                    </div>
                    <p className={'text-xs mt-1 ' + (isDarkMode ? "text-gray-400" : "text-gray-600")}>
                      Oracle Academy
                    </p>
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    24 Desember 2024
                  </p>
                </div>
              </Card>

              {/* Certificate 2: Database Design */}
              <Card isDarkMode={isDarkMode} isSmall={true}>
                <div className="flex flex-col items-center text-center space-y-1"> {/* Reduced space-y-2 to space-y-1 */}
                  <div className="w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="/images/ser2.jpg"
                      alt="Sertifikat Database Design - Oracle Academy"
                      width={150}
                      height={100}
                      layout="responsive"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Award className={'mr-1 size-1 ' + (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')} />
                      <h3 className={'text-xs font-semibold ' + (isDarkMode ? "text-white" : "text-gray-900")}>
                        Database Design
                      </h3>
                    </div>                    <p className={'text-xs mt-1 ' + (isDarkMode ? "text-gray-400" : "text-gray-600")}>
                      Oracle Academy
                    </p>
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    22 Oktober 2024
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-2 md:py-3">
          <div className="max-w-6xl mx-auto px-4">
            {/* Changed grid to lg:grid-cols-4 and gap-3, added isSmall to Card, adjusted icon and text sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {skillsData.map((skillCategory) => (
                <Card key={skillCategory.category} isDarkMode={isDarkMode} isSmall={true}>
                  {/* Reduced margin bottom and icon size for category header */}
                  <div className="flex items-center mb-2">
                    <Icon icon={skillCategory.icon} className={`mr-2 size-3 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                    {/* Reduced text size for category title */}
                    <h3 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {skillCategory.category}
                    </h3>
                  </div>
                  {/* Reduced space between list items */}
                  <ul className="space-y-1">
                    {skillCategory.items.map((item) => (
                      <li key={item.name} className="flex items-center">
                        {/* Reduced margin right and icon size for item icon */}
                        <Icon icon={item.icon} className={`mr-1 size-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                        {/* Reduced text size for item name */}
                        <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
  
          {/* Footer */}
          <footer className={`py-8 px-6 text-center border-t ${isDarkMode ? "border-gray-700/50 bg-black/30" : "border-gray-200/70 bg-white/50"} backdrop-blur-sm`}>
            {/* Footer content removed */}
        </footer>

      {/* Modern Navbar with dark mode toggle */}
      <Navbar 
      isDarkMode={isDarkMode}
      additionalItems={[
        {
        href: "mailto:ismifaizata@gmail.com",
        label: "Contact",
        icon: <Mail className="size-4" />,
        isActive: false,
        external: true
        },
        {
        href: "#",
        label: "Toggle Theme",
        icon: isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />,
        onClick: toggleTheme
        }
      ]}
      />
    </div>
  );
};

export default AboutPage;


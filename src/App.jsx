import { useEffect, useRef, useState, useMemo } from 'react'
import { Menu, X } from 'lucide-react'
import GooeyNav from './components/GooeyNav'
import TargetCursor from './components/TargetCursor'
import TrueFocus from './components/TrueFocus'
import ScrollFloat from './components/ScrollFloat'
import BlurText from './components/BlurText'
import SectionWrapper from './components/SectionWrapper'

import { AnimatedGridBackground } from './components/portfolioBackgrounds'

// Constants - defined outside component to prevent re-creation on renders
const ROLES = ["Jr.Software Developer", "Software Tester", "Implementation Engineer"]

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const ABOUT_DETAILS = [
  { label: 'Age', value: '22', color: 'from-cyan-400 to-blue-500' },
  { label: 'Residence', value: 'Nashik', color: 'from-blue-400 to-purple-500' },
  { label: 'Address', value: 'F/6, Nirgun Enclave VijayNagar Devlali Camp, Nashik:422401.', color: 'from-purple-400 to-pink-500' },
  { label: 'Email', value: 'harshkadam222@gmail.com', href: 'mailto:harshkadam222@gmail.com', color: 'from-pink-400 to-rose-500' },
  { label: 'Phone', value: '8421461752', href: 'tel:+919421461752', color: 'from-rose-400 to-orange-500' },
]

const SKILLS = [
  { name: 'React', value: 85, color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
  { name: 'Node.js', value: 80, color: 'from-green-500 to-emerald-600', icon: '🟢' },
  { name: 'Django', value: 75, color: 'from-green-600 to-teal-600', icon: '🎯' },
  { name: 'Flask', value: 70, color: 'from-gray-400 to-gray-600', icon: '🌶️' },
  { name: 'HTML', value: 75, color: 'from-orange-500 to-red-500', icon: '🌐' },
  { name: 'CSS', value: 80, color: 'from-blue-500 to-cyan-500', icon: '🎨' },
  { name: 'JavaScript', value: 82, color: 'from-yellow-400 to-amber-500', icon: '⚙️' },
  { name: 'PYTHON', value: 80, color: 'from-blue-400 to-green-400', icon: '🐍' },
  { name: 'jQuery', value: 70, color: 'from-blue-600 to-indigo-600', icon: '⚡' },
  { name: 'MySQL', value: 78, color: 'from-orange-400 to-blue-500', icon: '🐬' },
  { name: 'PostgreSQL', value: 75, color: 'from-blue-400 to-indigo-500', icon: '🐘' },
  { name: 'MongoDB', value: 72, color: 'from-green-500 to-green-700', icon: '🍃' },
  { name: 'SQLite', value: 70, color: 'from-blue-300 to-blue-500', icon: '💾' },
]

const EDUCATION = [
  {
    title: 'Bachelor of Science (B.Sc.) in Computer Science',
    school: "Gokhale Education Society's RNC Arts, JDB Commerce & NSC Science College Nashik Road-422 101.",
    year: '2024',
    location: 'Nashik, India',
    color: 'from-purple-500 to-pink-500',
    icon: '🎓'
  },
  {
    title: 'Higher Secondary Certificate (HSC) - Science Stream',
    school: 'S.V.K.T College, Nashik.',
    year: '2021',
    location: 'Nashik, India',
    color: 'from-blue-500 to-cyan-500',
    icon: '📚'
  },
  {
    title: 'Secondary School Certificate (SSC)',
    school: 'St.Patrick Convent High School.',
    year: '2019',
    location: 'Nashik, India',
    color: 'from-green-500 to-emerald-500',
    icon: '🏫'
  },
]

const PROJECTS = [
  {
    name: 'ShopEasy',
    description: 'Full-stack e-commerce platform with modern UI, shopping cart, and secure checkout',
    image: '/shopeasy.png',
    link: 'https://example-ecommerce.com',
    tech: ['React', 'Node.js', 'Stripe'],
    color: 'from-pink-500 to-purple-500'
  },
  {
    name: 'Developer Portal',
    description: 'Career-oriented courses and certifications platform with domain search',
    image: '/Screenshot 2026-04-13 164859.png',
    link: 'https://example-devportal.com',
    tech: ['React', 'Django', 'PostgreSQL'],
    color: 'from-purple-600 to-indigo-600'
  },
  {
    name: 'Task Management App',
    description: 'Collaborative task manager with real-time updates',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    link: 'https://example-tasks.com',
    tech: ['React', 'Firebase', 'Tailwind'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Portfolio Dashboard',
    description: 'Analytics dashboard with data visualization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    link: 'https://example-dashboard.com',
    tech: ['Vue.js', 'D3.js', 'Python'],
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Weather Application',
    description: 'Real-time weather app with location services',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
    link: 'https://example-weather.com',
    tech: ['React', 'API', 'Geolocation'],
    color: 'from-emerald-500 to-teal-500'
  }
]

const EXPERIENCE = [
  {
    role: 'Implementation Engineer',
    company: 'Tech Solutions Pvt Ltd',
    period: 'Jan 2024 - Present',
    description: 'Leading software implementation for enterprise clients, managing deployment pipelines and system integrations.',
    skills: ['System Integration', 'Deployment', 'Client Management'],
    icon: '⚙️',
    side: 'left'
  },
  {
    role: 'Software Tester',
    company: 'Quality Assurance Inc',
    period: 'Jun 2023 - Dec 2023',
    description: 'Performed manual and automated testing, created test cases, and ensured software quality standards.',
    skills: ['Selenium', 'Test Cases', 'Bug Tracking'],
    icon: '🧪',
    side: 'right'
  },
  {
    role: 'Junior Developer',
    company: 'StartUp Hub',
    period: 'Jan 2023 - May 2023',
    description: 'Developed frontend components using React, collaborated with design team, and fixed production bugs.',
    skills: ['React', 'JavaScript', 'Git'],
    icon: '💻',
    side: 'left'
  },
  {
    role: 'Intern - Web Development',
    company: 'Digital Agency',
    period: 'Aug 2022 - Dec 2022',
    description: 'Built responsive websites, learned modern web technologies, and contributed to client projects.',
    skills: ['HTML/CSS', 'jQuery', 'Bootstrap'],
    icon: '🌐',
    side: 'right'
  }
]

const SOCIAL_LINKS = [
  { icon: 'twitter', href: '#', label: 'Twitter' },
  { icon: 'instagram', href: '#', label: 'Instagram' },
  { icon: 'linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'github', href: '#', label: 'GitHub' }
]

const CONTACT_SUBJECTS = ['General Inquiry', 'Job Opportunity', 'Freelance Project', 'Collaboration']

const SOCIAL_ICONS = {
  twitter: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
  instagram: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.122.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.122v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
  linkedin: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.393-3.369-1.393-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.195 22 16.415 22 12.017 22 6.484 17.522 2 12 2z'
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const mainRef = useRef(null)

  // Memoize current role to prevent unnecessary recalculations
  const currentRole = useMemo(() => ROLES[roleIndex], [roleIndex])

  // Role rotation effect
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length)
    }, 3000)
    return () => window.clearInterval(intervalId)
  }, [])

  // Mobile menu: handle escape key and body scroll lock
  useEffect(() => {
    if (!mobileMenuOpen) return
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <AnimatedGridBackground effect={0}>
      <main ref={mainRef} className="relative min-h-screen px-6">
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />
        {/* Sticky transparent navbar - blends with animated background */}
        <div className="fixed inset-x-0 top-0 z-50 px-6 backdrop-blur-[2px] bg-cyan-500/5 border-b border-white/5">
          <header className="mx-auto flex w-full items-center justify-between py-4">
            <TrueFocus
              sentence="HARSH KADAM"
              manualMode={false}
              blurAmount={1}
              borderColor="#dc2626"
              glowColor="rgba(220, 38, 38, 0.5)"
              animationDuration={0.3}
              pauseBetweenAnimations={1.5}
              wordColors={['inherit', '#ec4899']}
              textSize="text-xl md:text-2xl lg:text-3xl"
              marginLeft="60px"
            />

            <div className="hidden md:block">
              <GooeyNav
                items={NAV_ITEMS}
                particleCount={0}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>

            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex items-center justify-center md:hidden group"
              onClick={() => setMobileMenuOpen(true)}>
              <div className="relative">
                <Menu className="h-7 w-7 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full opacity-60 group-hover:opacity-100 group-hover:bg-cyan-300/40 transition-all duration-300 -z-10" />
              </div>
            </button>
          </header>
        </div>

        {/* Hero Section - added top padding for sticky navbar */}
        <section id="home" className="flex flex-col items-start justify-center min-h-screen px-4 md:px-12 lg:px-20 pt-32">
          <div className="max-w-4xl">
            <p className="text-xl md:text-6xl lg:text-5xl font-bold text-white mb-4">
              Hello, I'm <span className="text-pink-500">HARSH</span>
            </p>
            <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white mb-8 min-h-[5rem] md:min-h-[6rem] lg:min-h-[7rem]">
              I'm a <div className="inline-block text-4lg md:text-6xl lg:text-17xl min-w-[300px] md:min-w-[500px] lg:min-w-[700px]"><TrueFocus
                sentence={currentRole}
                manualMode={false}
                blurAmount={2}
                borderColor="#3b82f6"
                glowColor="rgba(59, 130, 246, 0.5)"
                animationDuration={0.4}
                pauseBetweenAnimations={1.2}
                wordColors={['#3b82f6', '#60a5fa']}
                textSize="text-inherit"
                marginLeft="10px"
              /></div>
            </h2>

            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 mt-10"
            >
              Download Resume
            </a>
          </div>
        </section>

        <SectionWrapper id="about">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1">
              <ScrollFloat
                containerClassName="text-5xl md:text-6xl font-bold text-white mb-6"
                textClassName="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=20%"
                scrollEnd="bottom bottom-=20%"
              >
                About Me
              </ScrollFloat>
              <ScrollFloat
                containerClassName="text-2xl md:text-3xl font-bold text-white mb-6"
                textClassName="text-white"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=20%"
                scrollEnd="bottom bottom-=20%"

              >
                I'm HARSH KADAM
              </ScrollFloat>
              <BlurText
                text="My name is Harsh Rajendra Kadam. I was born in Mumbai and currently reside in Nashik. I completed my schooling at St patrick convent high school in 2019. Subsequently, I pursued a Bachelor Degree in Computer Science from RNC College, Nashik, under Savitribai Phule Pune University, graduating in 2024."
                delay={50}
                animateBy="words"
                direction="top"
                className="text-slate-300 leading-relaxed text-base md:text-lg"
              />

              <div className="mt-8 grid grid-cols-1 gap-4">
                {ABOUT_DETAILS.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-semibold min-w-[80px]`}>
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-slate-300">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-start lg:justify-end">
              <div className="relative group w-full max-w-xl">
                {/* Animated gradient border */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-60 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-700" />
                
                {/* Main card container */}
                <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-white/10">
                  {/* Image with subtle zoom on hover */}
                  <div className="overflow-hidden">
                    <img 
                      src="/src/assets/hero.png" 
                      alt="About" 
                      className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  </div>
                  
                  {/* Professional diagonal shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="skills">
          <ScrollFloat
            containerClassName="text-5xl md:text-6xl font-bold text-white text-center mb-14"
            textClassName="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=20%"
          >
            Skills
          </ScrollFloat>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500`} />
                <div className="relative backdrop-blur-sm bg-black/10 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{skill.icon}</span>
                    <span className="text-white/60 text-sm font-medium">{skill.value}%</span>
                  </div>
                  <BlurText
                    text={skill.name}
                    delay={100}
                    animateBy="words"
                    direction="top"
                    className="text-center text-white font-bold text-lg tracking-wide mb-4"
                  />
                  <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ScrollFloat
            containerClassName="mt-16 text-5xl md:text-6xl font-bold text-white text-center mb-12"
            textClassName="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=20%"
          >
            Education
          </ScrollFloat>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${edu.color} rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500`} />
                <div className="relative backdrop-blur-sm bg-black/10 border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="text-4xl mb-4">{edu.icon}</div>
                  <BlurText
                    text={edu.title}
                    delay={80}
                    animateBy="words"
                    direction="top"
                    className="font-bold text-white text-lg mb-4"
                  />
                  <div className="text-slate-400 text-sm flex-grow">
                    {edu.school}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${edu.color} text-white`}>
                      {edu.year}
                    </span>
                    <span className="text-slate-500 text-xs ml-2">{edu.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Projects Section */}
        <SectionWrapper id="projects">
          <ScrollFloat
            containerClassName="text-5xl md:text-6xl font-bold text-white text-center mb-14"
            textClassName="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=20%"
          >
            Projects
          </ScrollFloat>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl"
              >
                {/* Animated gradient border on hover */}
                <div className={`absolute -inset-[2px] bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700`} />
                
                {/* Card container */}
                <div className="relative h-full overflow-hidden rounded-2xl bg-cyan-500/5 border border-white/10 group-hover:border-transparent transition-all duration-500">
                  {/* Image container with zoom effect */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* External link icon */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <BlurText
                      text={project.name}
                      delay={80}
                      animateBy="words"
                      direction="top"
                      className="font-bold text-white text-xl mb-2"
                    />
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.color} text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-${i * 100}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />
                </div>
              </a>
            ))}
          </div>
        </SectionWrapper>

        {/* Experience Section - 3D Floating Glass Cards */}
        <SectionWrapper id="experience">
          <ScrollFloat
            containerClassName="text-5xl md:text-6xl font-bold text-white text-center mb-20"
            textClassName="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=20%"
          >
            Experience
          </ScrollFloat>

          {/* 3D Perspective Container */}
          <div className="relative perspective-2000">
            {/* Central timeline beam */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent transform -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {EXPERIENCE.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`relative flex items-center ${exp.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-12`}
                    style={{
                      transform: `translateZ(${idx * -20}px) rotateX(${idx % 2 === 0 ? 2 : -2}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* 3D Floating Card */}
                    <div className={`relative group w-full md:w-5/12 ${exp.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                      {/* Holographic gradient border */}
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700" />
                      
                      {/* Glass card body */}
                      <div className="relative backdrop-blur-md bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-6 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                        {/* Floating icon with glow */}
                        <div className={`absolute -top-6 ${exp.side === 'left' ? 'right-6' : 'left-6'} w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                          {exp.icon}
                        </div>
                        
                        {/* Content */}
                        <div className={`mt-4 ${exp.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
                            {exp.period}
                          </span>
                          
                          <BlurText
                            text={exp.role}
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="font-bold text-white text-xl mb-1"
                          />
                          
                          <p className="text-cyan-400 text-sm font-medium mb-3">
                            {exp.company}
                          </p>
                          
                          <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                            {exp.description}
                          </p>
                          
                          {/* Skills as floating tags */}
                          <div className={`flex flex-wrap gap-2 ${exp.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>
                    </div>

                    {/* Timeline node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-2 border-white/20 shadow-lg shadow-cyan-500/50" />
                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-500 animate-ping opacity-30" />
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-5/12" />
                  </div>
                ))}
              </div>
            </div>
        </SectionWrapper>

        {/* Contact Section */}
        <SectionWrapper id="contact">
          <ScrollFloat
            containerClassName="text-5xl md:text-6xl font-bold text-white text-center mb-4"
            textClassName="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=20%"
          >
            Contact Us
          </ScrollFloat>
          
          <BlurText
            text="Any question or remarks? Just write us a message!"
            delay={80}
            animateBy="words"
            direction="top"
            className="text-slate-400 text-center text-lg mb-14"
          />

          {/* Contact Card with Floating Orbs */}
          <div className="relative">
            {/* Floating Gradient Orbs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 -left-20 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-500" />

              {/* Main Glass Card */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Left Panel - Contact Info */}
                  <div className="lg:col-span-2 p-8 md:p-10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-b lg:border-b-0 lg:border-r border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                    
                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Email</p>
                          <a href="mailto:harshkadam222@gmail.com" className="text-white hover:text-cyan-400 transition-colors">
                            harshkadam222@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Address</p>
                          <p className="text-white text-sm">
                            F/6, Nirgun Enclave VijayNagar,<br />
                            Devlali Camp, Nashik:422401,<br />
                            India
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Phone</p>
                          <a href="tel:+919421461752" className="text-white hover:text-cyan-400 transition-colors">
                            +91 8421461752
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                      <div className="flex gap-4">
                        {SOCIAL_LINKS.map((social) => (
                          <a
                            key={social.icon}
                            href={social.href}
                            aria-label={social.label}
                            className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300"
                          >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d={SOCIAL_ICONS[social.icon]} />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Contact Form */}
                  <div className="lg:col-span-3 p-8 md:p-10">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="John"
                          />
                        </div>
                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="john@example.com"
                          />
                        </div>
                        {/* Phone Number */}
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                            placeholder="+91 1234567890"
                          />
                        </div>
                      </div>

                      {/* Subject Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-3">Select Subject?</label>
                        <div className="flex flex-wrap gap-4">
                          {CONTACT_SUBJECTS.map((subject) => (
                            <label key={subject} className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name="subject"
                                value={subject}
                                className="w-4 h-4 accent-cyan-500 cursor-pointer"
                              />
                              <span className="text-sm text-slate-400 group-hover:text-cyan-400 transition-colors">{subject}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                          placeholder="Write your message..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-400 hover:to-purple-400 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </SectionWrapper>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            />

            <aside className="absolute right-0 top-0 flex h-full w-72 flex-col bg-black/40 px-6 pt-8 backdrop-blur-xl border-l border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between">
                <div
                  className="select-none text-lg font-semibold tracking-widest text-slate-200"
                  style={{ textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)' }}>
                  HARSH <span className="text-red-600">KADAM</span>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center text-white"
                  onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-8">
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block w-full rounded-lg px-3 py-2 text-base font-medium text-white"
                        onClick={() => setMobileMenuOpen(false)}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        ) : null}
      </main>
    </AnimatedGridBackground>
  )
}

export default App

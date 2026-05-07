'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Linkedin, Mail, Phone, ExternalLink, ChevronDown,
  Brain, Database, Award, BookOpen, Star, ArrowRight,
  MapPin, Zap, Shield, Activity, BarChart3, Wind, Trophy,
  GraduationCap, FileText, Microscope, Code2, Cpu, Users
} from 'lucide-react'

// ================================================================
// PORTFOLIO DATA
// ================================================================
const OWNER = {
  name: 'K S Sivaneshakumar',
  nick: 'SIVANESH',
  title: 'Biomedical AI Engineer',
  location: 'Coimbatore, India',
  email: 'ks.sivaneshakumar@gmail.com',
  phone: '+91',
  linkedin: 'https://linkedin.com/in/sivaneshakumar',
}

const STATS = [
  { value: '3', suffix: '+', label: 'Research Papers', sublabel: 'IEEE & Springer', icon: FileText, color: '#00D4FF' },
  { value: '94', suffix: '%', label: 'Diagnostic Accuracy', sublabel: 'Skin Cancer CNN', icon: Activity, color: '#7C3AED' },
  { value: '372', suffix: '', label: 'GATE Rank (AIR)', sublabel: 'Top 10% Nationwide', icon: Trophy, color: '#F59E0B' },
  { value: '10', suffix: '/10', label: 'Minor CGPA', sublabel: 'AI & Machine Learning', icon: GraduationCap, color: '#EC4899' },
  { value: '15', suffix: '+', label: 'Certifications', sublabel: 'MongoDB Certified', icon: Database, color: '#10B981' },
  { value: '8.83', suffix: '', label: 'Main CGPA', sublabel: 'Biomedical Engineering', icon: Star, color: '#00D4FF' },
]

const PROJECTS = [
  {
    id: 'medi-vault',
    name: 'Medi-Vault',
    subtitle: 'Unified Healthcare Ecosystem',
    description: 'Award-winning MERN-stack platform with AI-powered real-time medical record triage, intelligent patient management, and diagnostic insights.',
    tech: ['React', 'Node.js', 'MongoDB', 'AI/ML', 'Express'],
    impact: 'Winner SREC Innovate 2K26',
    metric: '#1',
    icon: Shield,
    color: '#7C3AED',
    size: 'large',
  },
  {
    id: 'eeg',
    name: 'EEG Cognitive Load',
    subtitle: 'IEEE ICBSII 2026',
    description: 'Hybrid CNN-LSTM architecture for 8-channel EEG cognitive load classification. Published research achieving state-of-the-art accuracy.',
    tech: ['CNN-LSTM', 'Python', 'EEG', 'Signal Processing'],
    impact: '89.88% Accuracy',
    metric: '89.88%',
    icon: Brain,
    color: '#00D4FF',
    size: 'medium',
  },
  {
    id: 'skin-cancer',
    name: 'Skin Cancer AI',
    subtitle: 'Published — IEEE Xplore',
    description: 'Multi-class CNN lesion classification for early skin cancer detection. Published in IEEE Xplore with breakthrough accuracy.',
    tech: ['CNN', 'TensorFlow', 'Python', 'Medical Imaging'],
    impact: '94% Accuracy | IEEE',
    metric: '94%',
    icon: Microscope,
    color: '#EC4899',
    size: 'medium',
  },
  {
    id: 'gyrobalance',
    name: 'GyroBalance',
    subtitle: 'Industrial IoT Platform',
    description: 'Telemetry system predicting Center of Gravity for 10MW+ wind turbine blades using edge ML and neural failure prediction.',
    tech: ['ESP32', 'IoT', 'LittleFS', 'Neural Net'],
    impact: '10MW+ Turbines',
    metric: '10MW+',
    icon: Wind,
    color: '#F59E0B',
    size: 'medium',
  },
  {
    id: 'metricx',
    name: 'MetricX',
    subtitle: 'AI Agent Automation',
    description: 'Automated NBA data filing system using AI Agents on Purple Fabric AI platform. Top 5 at national Design Spark Challenge.',
    tech: ['AI Agents', 'Purple Fabric', 'Automation'],
    impact: 'Top 5 – Design Spark',
    metric: 'Top 5',
    icon: BarChart3,
    color: '#10B981',
    size: 'medium',
  },
]

const SKILLS = {
  core: ['Python', 'JavaScript', 'C/C++', 'SQL', 'HTML/CSS'],
  tools: ['TensorFlow', 'React.js', 'Node.js', 'MongoDB', 'MATLAB', 'Power BI'],
  domains: ['AI/ML', 'Signal Processing', 'Industrial IoT', 'Healthcare AI', 'Deep Learning'],
}

const EXPERIENCE = [
  {
    role: 'Research Intern',
    company: 'Spinos Life Science Pvt Ltd',
    period: 'Jun 2024',
    type: 'Research',
    points: [
      'Streamlined data management and regulatory compliance for human clinical drug trials',
      'Studied trial phases, ethical approvals, and informed consent monitoring processes',
    ],
    color: '#7C3AED',
  },
  {
    role: 'Biomedical Equipment Intern',
    company: 'BRJ Ortho MAK Hospital',
    period: 'Dec 2023',
    type: 'Engineering',
    points: [
      'Managed calibration and preventive maintenance for CT, X-Ray, and ECG diagnostic systems',
      'Optimized equipment uptime through proactive troubleshooting and medical gas pipeline safety',
    ],
    color: '#00D4FF',
  },
]

const PUBLICATIONS = [
  {
    title: 'Skin Cancer Lesion Classification using Deep CNN',
    journal: 'IEEE Xplore',
    year: '2024',
    accuracy: '94%',
    badge: 'IEEE',
    description: 'Multi-class skin lesion detection achieving 94% accuracy for early cancer diagnostics',
    color: '#00D4FF',
  },
  {
    title: 'EEG Cognitive Load Detection with Hybrid CNN-LSTM',
    journal: 'IEEE ICBSII 2026',
    year: '2025',
    accuracy: '89.88%',
    badge: 'IEEE',
    description: 'Novel hybrid deep learning architecture for real-time cognitive state monitoring',
    color: '#7C3AED',
  },
  {
    title: 'Prediction of Liver Stiffness Using Elastographic Images Fibroscan',
    journal: 'Springer Nature',
    year: '2024',
    accuracy: '—',
    badge: 'Springer',
    description: 'Predicting liver stiffness using FibroScan elastographic data combined with machine learning techniques, aiming to support non-invasive, accurate, and early diagnosis of liver fibrosis.',
    color: '#EC4899',
  },
]

const ACHIEVEMENTS = [
  { title: 'GATE AIR 372', detail: 'All India Rank — Top 10% of all candidates nationwide', icon: Trophy, color: '#F59E0B', year: '2024' },
  { title: 'NPTEL Gold Medal', detail: 'Scored 97% in Incubation & Entrepreneurship at IIT Bombay', icon: Star, color: '#10B981', year: '2024' },
  { title: 'SREC Innovate Winner', detail: '1st Place — Medi-Vault Unified Healthcare Ecosystem', icon: Award, color: '#7C3AED', year: '2026' },
  { title: 'Design Spark Top 5', detail: 'MetricX AI Agent System — School of Design Thinking', icon: Zap, color: '#00D4FF', year: '2024' },
  { title: 'MongoDB Certified', detail: '15+ certifications in NoSQL Optimization, RAG & Vector Search', icon: Database, color: '#EC4899', year: '2024' },
  { title: 'AI Ambassador SREC', detail: 'Leading campus AI initiatives.', icon: Brain, color: '#F59E0B', year: '2024' },
]

// ================================================================
// PARTICLE CANVAS
// ================================================================
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = window.innerWidth < 768 ? 30 : 70
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.4 + 0.3,
        hue: 190 + Math.random() * 80,
      })
    }

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMouse)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,200,255,${0.07 * (1 - d / 120)})`
            ctx.lineWidth = 0.4
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
        const dx = particles[i].x - mouse.x
        const dy = particles[i].y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 170) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(124,58,237,${0.28 * (1 - d / 170)})`
          ctx.lineWidth = 0.7
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.6)`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ================================================================
// CUSTOM CURSOR
// ================================================================
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// ================================================================
// NAVBAR
// ================================================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Projects', 'Skills', 'Experience', 'Publications', 'Contact']

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(11, 15, 25, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-black text-xl tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          KSS.
        </motion.button>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm text-white/50 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <motion.a
          href={`mailto:${OWNER.email}`}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,212,255,0.25)' }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center gap-2 text-sm px-4 py-2 rounded-full font-medium"
          style={{
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#00D4FF',
          }}
        >
          <Mail size={13} />
          Hire Me
        </motion.a>
      </div>
    </motion.nav>
  )
}

// ================================================================
// HERO SECTION
// ================================================================
function HeroSection() {
  const floatingCards = [
    { label: 'Research Papers', value: '3+', icon: FileText, color: '#00D4FF', pos: { top: '8%', right: '2%' }, delay: 0 },
    { label: 'GATE All India Rank', value: '#372', icon: Trophy, color: '#F59E0B', pos: { top: '45%', right: '-4%' }, delay: 0.4 },
    { label: 'CNN Accuracy', value: '94%', icon: Activity, color: '#7C3AED', pos: { bottom: '12%', right: '5%' }, delay: 0.8 },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0B0F19' }}
    >
      {/* Background orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '55%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%', left: '40%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <ParticleCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 pt-24 pb-16">
        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-xs mb-6 px-3 py-1.5 rounded-full w-fit"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: '#10B981',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to Research & Dev Collaborations
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="font-light tracking-[0.4em] text-white/25 mb-2"
              style={{ fontSize: 'clamp(13px, 1.5vw, 17px)' }}
            >
              HEY, I&apos;M
            </div>
            <h1
              className="font-black leading-[0.9] mb-3"
              style={{ fontSize: 'clamp(60px, 9vw, 108px)' }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 25%, #00D4FF 50%, #818cf8 75%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-x 5s ease infinite',
                }}
              >
                SIVANESH
              </span>
            </h1>
            <h2
              className="font-thin text-white/30 tracking-[0.25em]"
              style={{ fontSize: 'clamp(14px, 1.8vw, 20px)' }}
            >
              K S SIVANESHAKUMAR
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-2 my-6"
          >
            {['Biomedical AI Engineer', 'Published Researcher', 'Full-Stack Developer'].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full text-white/55"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/45 leading-relaxed mb-8 max-w-md"
            style={{ fontSize: '15px', lineHeight: '1.9' }}
          >
            Building intelligent systems at the intersection of healthcare and AI.
            Published in{' '}
            <span className="text-cyan-400 font-medium">IEEE Xplore</span> &amp;{' '}
            <span className="text-violet-400 font-medium">Springer Nature</span>.
            GATE AIR 372 · Pre-final year at SREC.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(0,212,255,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7C3AED)', color: 'white' }}
            >
              View Projects <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm text-white/70"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-5"
          >
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${OWNER.email}`} className="text-white/35 hover:text-cyan-400 transition-colors">
              <Mail size={20} />
            </a>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5 text-white/30 text-xs">
              <MapPin size={11} />
              {OWNER.location}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — floating cards */}
        <div className="relative hidden lg:flex items-center justify-center">
          {/* Profile Photo / Central orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Glow backdrop */}
            <div
              className="absolute w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,212,255,0.14), rgba(124,58,237,0.09), transparent)',
                filter: 'blur(22px)',
              }}
            />

            {/* Photo frame */}
            <div
              className="relative w-60 h-60 rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(0,212,255,0.28)',
                boxShadow: '0 0 50px rgba(0,212,255,0.18), 0 0 100px rgba(124,58,237,0.1)',
              }}
            >
              {/* ✅ PROFILE PHOTO — place your image as /public/profile.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpeg"
                alt="K S Sivaneshakumar"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fb = e.currentTarget.nextElementSibling
                  if (fb) fb.style.display = 'flex'
                }}
              />
              {/* Subtle gradient overlay on photo edges for blending */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(11,15,25,0.35) 100%)',
                }}
              />
            </div>

            {/* Outer orbit ring */}
            <div
              className="absolute w-80 h-80 rounded-full pointer-events-none"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            />
          </motion.div>

          {/* Floating stat cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 + card.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute p-4 rounded-2xl min-w-[150px]"
              style={{
                ...card.pos,
                background: 'rgba(11,15,25,0.85)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${card.color}25`,
                boxShadow: `0 4px 40px ${card.color}10`,
                animation: `float ${3 + i * 0.6}s ease-in-out infinite ${i * 0.4}s`,
              }}
            >
              <card.icon size={16} style={{ color: card.color }} className="mb-2" />
              <div className="text-2xl font-black mb-0.5" style={{ color: card.color }}>
                {card.value}
              </div>
              <div className="text-xs text-white/45">{card.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20"
      >
        <div className="text-[10px] tracking-[0.3em] font-light">SCROLL</div>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  )
}

// ================================================================
// STATS CARD (to avoid hook-in-loop)
// ================================================================
function StatCard({ stat, index, sectionInView }) {
  const ref = useRef(null)
  const cardInView = useInView(ref, { once: true, threshold: 0.3 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!cardInView) return
    const isFloat = stat.value.includes('.')
    const end = parseFloat(stat.value)
    const totalFrames = 72
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const p = frame / totalFrames
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = end * eased
      setCount(isFloat ? parseFloat(cur.toFixed(2)) : Math.floor(cur))
      if (frame >= totalFrames) {
        setCount(isFloat ? parseFloat(end.toFixed(2)) : end)
        clearInterval(timer)
      }
    }, 1800 / totalFrames)
    return () => clearInterval(timer)
  }, [cardInView, stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="relative p-5 rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${stat.color}12, transparent 70%)`,
          border: `1px solid ${stat.color}22`,
        }}
      />
      <stat.icon size={20} className="mb-3 relative z-10" style={{ color: stat.color }} />
      <div className="text-3xl font-black relative z-10 mb-1 tabular-nums" style={{ color: stat.color }}>
        {count}{stat.suffix}
      </div>
      <div className="text-xs font-semibold text-white/65 relative z-10">{stat.label}</div>
      <div className="text-xs text-white/30 mt-0.5 relative z-10">{stat.sublabel}</div>
    </motion.div>
  )
}

// ================================================================
// STATS DASHBOARD (UNIQUE SECTION)
// ================================================================
function StatsDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B0F19 0%, #0d1220 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-3 font-light">BY THE NUMBERS</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            IMPACT{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              METRICS
            </span>
          </h2>
          <p className="text-white/35 max-w-lg mx-auto text-sm leading-relaxed">
            Quantified achievements across research publications, academic rankings, and technical excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} sectionInView={inView} />
          ))}
        </div>

        {/* Education strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={16} className="text-cyan-400" />
              <h3 className="text-white font-bold text-base">Sri Ramakrishna Engineering College</h3>
            </div>
            <p className="text-white/35 text-sm">B.E. Biomedical Engineering · Minor: AI &amp; ML · Aug 2023 – May 2027</p>
          </div>
          <div className="flex gap-6 flex-shrink-0">
            {[['8.83', 'Main CGPA', '#00D4FF'], ['10/10', 'Minor CGPA', '#7C3AED'], ['AIR 372', 'GATE Rank', '#F59E0B']].map(
              ([val, label, color]) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-black" style={{ color }}>{val}</div>
                  <div className="text-xs text-white/35">{label}</div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// PROJECT CARD
// ================================================================
function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const isLarge = project.size === 'large'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden"
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        gridRow: isLarge ? 'span 2' : 'span 1',
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid rgba(255,255,255,0.07)`,
        minHeight: isLarge ? '340px' : '175px',
        boxShadow: hovered ? `0 8px 60px ${project.color}12` : 'none',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Hover gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${project.color}07, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 rounded-xl" style={{ background: `${project.color}15` }}>
              <project.icon size={isLarge ? 26 : 20} style={{ color: project.color }} />
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
            >
              {project.impact.split(' ')[0]}
            </span>
          </div>
          <h3
            className="font-bold text-white mb-1"
            style={{ fontSize: isLarge ? '22px' : '15px' }}
          >
            {project.name}
          </h3>
          <p className="text-xs mb-3 font-medium" style={{ color: project.color }}>
            {project.subtitle}
          </p>
          <p
            className="text-white/45 leading-relaxed"
            style={{ fontSize: isLarge ? '14px' : '12.5px' }}
          >
            {project.description}
          </p>
        </div>

        <div>
          <AnimatePresence>
            {(hovered || isLarge) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-1.5 mb-3 mt-3"
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full text-white/45"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black" style={{ color: project.color }}>
              {project.metric}
            </span>
            <span className="text-xs text-white/35">{project.impact}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ================================================================
// PROJECTS SECTION
// ================================================================
function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.05 })

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: '#0B0F19' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 90%, rgba(124,58,237,0.04) 0%, transparent 50%), radial-gradient(circle at 90% 10%, rgba(0,212,255,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <div className="text-xs tracking-[0.3em] text-white/25 mb-3 font-light">SELECTED WORK</div>
            <h2 className="text-4xl lg:text-5xl font-black text-white">
              PROJECTS{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                &amp;
              </span>{' '}
              RESEARCH
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-white/20 text-sm">5 Projects</div>
            <div className="text-white/15 text-xs">3 IEEE/Springer</div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ================================================================
// SKILLS ORBIT + SECTION
// ================================================================
function SkillsOrbitCanvas() {
  const containerRef = useRef(null)
  const chipsRef = useRef({})
  const angleRef = useRef(0)
  const rafRef = useRef(null)
  const inView = useInView(containerRef, { once: false })

  const RINGS = useMemo(() => [
    { radius: 118, speed: 0.28, skills: SKILLS.core, color: '#00D4FF' },
    { radius: 185, speed: 0.18, skills: SKILLS.tools, color: '#7C3AED' },
    { radius: 252, speed: 0.11, skills: SKILLS.domains, color: '#EC4899' },
  ], [])

  useEffect(() => {
    if (!inView) return
    let lastTime = 0
    let running = true

    const animate = (time) => {
      if (!running) return
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
      lastTime = time
      angleRef.current += delta

      RINGS.forEach((ring, ri) => {
        ring.skills.forEach((skill, si) => {
          const baseAngle = (si / ring.skills.length) * Math.PI * 2 - Math.PI / 2
          const angle = baseAngle + angleRef.current * ring.speed
          const x = Math.cos(angle) * ring.radius
          const y = Math.sin(angle) * ring.radius
          const el = chipsRef.current[`${ri}-${si}`]
          if (el) el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
        })
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [inView, RINGS])

  return (
    <div ref={containerRef} className="relative w-[560px] h-[560px] flex-shrink-0">
      {/* Ring borders */}
      {RINGS.map((ring, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            marginLeft: -ring.radius,
            marginTop: -ring.radius,
            border: `1px solid ${ring.color}12`,
          }}
        />
      ))}

      {/* Center node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.18), rgba(124,58,237,0.1))',
            border: '1px solid rgba(0,212,255,0.28)',
            boxShadow: '0 0 40px rgba(0,212,255,0.18)',
          }}
        >
          <Code2 size={18} color="#00D4FF" />
          <div className="text-[10px] text-white/40">SKILLS</div>
        </div>
      </div>

      {/* Orbiting chips */}
      {RINGS.map((ring, ri) =>
        ring.skills.map((skill, si) => (
          <div
            key={`${ri}-${si}`}
            ref={(el) => { chipsRef.current[`${ri}-${si}`] = el }}
            className="absolute top-1/2 left-1/2"
            style={{ willChange: 'transform' }}
          >
            <motion.span
              whileHover={{ scale: 1.2 }}
              className="block text-xs px-2.5 py-1 rounded-full whitespace-nowrap select-none"
              style={{
                background: 'rgba(11,15,25,0.92)',
                border: `1px solid ${ring.color}28`,
                color: ring.color,
                backdropFilter: 'blur(12px)',
                boxShadow: `0 0 14px ${ring.color}08`,
                fontSize: ri === 2 ? '10.5px' : '11.5px',
              }}
            >
              {skill}
            </motion.span>
          </div>
        ))
      )}
    </div>
  )
}

function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.05 })

  const categories = [
    { title: 'Core Languages', items: SKILLS.core, color: '#00D4FF' },
    { title: 'Tools & Frameworks', items: SKILLS.tools, color: '#7C3AED' },
    { title: 'Domain Expertise', items: SKILLS.domains, color: '#EC4899' },
  ]

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B0F19 0%, #0a0d17 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-3 font-light">CAPABILITIES</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            TECH{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              STACK
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Orbit visualization — desktop only */}
          <div className="hidden lg:block">
            <SkillsOrbitCanvas />
          </div>

          {/* Categories — right side */}
          <div className="flex-1 w-full space-y-4">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: ci * 0.12 }}
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <span className="text-xs font-semibold tracking-wide text-white/40">{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.06 }}
                      className="text-sm px-3 py-1.5 rounded-full text-white/65 cursor-default"
                      style={{ background: `${cat.color}0d`, border: `1px solid ${cat.color}22` }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Extra detail */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-semibold tracking-wide text-white/40">Embedded & Hardware</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['ESP32', 'Arduino', 'Raspberry Pi', 'COMSOL', 'AutoDock', 'DAX'].map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.06 }}
                    className="text-sm px-3 py-1.5 rounded-full text-white/65 cursor-default"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ================================================================
// EXPERIENCE TIMELINE
// ================================================================
function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.05 })
  const [expanded, setExpanded] = useState(null)

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: '#0B0F19' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-3 font-light">REAL-WORLD</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">EXPERIENCE</h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Timeline line */}
          <div
            className="absolute left-[22px] top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(180deg, #00D4FF 0%, #7C3AED 50%, rgba(124,58,237,0.1) 100%)',
            }}
          />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative pl-14 mb-6"
            >
              {/* Dot */}
              <div
                className="absolute left-[14px] top-5 w-[18px] h-[18px] rounded-full border-2"
                style={{
                  background: '#0B0F19',
                  borderColor: exp.color,
                  boxShadow: `0 0 18px ${exp.color}70`,
                  color: exp.color,
                  animation: 'dot-pulse 2.5s ease-in-out infinite',
                }}
              />

              <motion.div
                onClick={() => setExpanded(expanded === i ? null : i)}
                whileHover={{ x: 4 }}
                className="p-5 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: expanded === i ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.02)',
                  border: expanded === i
                    ? `1px solid ${exp.color}35`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: expanded === i ? `0 0 30px ${exp.color}08` : 'none',
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-white/30 mb-1">{exp.period}</div>
                    <h3 className="font-bold text-white text-lg leading-tight">{exp.role}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${exp.color}12`, color: exp.color }}
                  >
                    {exp.type}
                  </span>
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      {exp.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-2 text-sm text-white/55">
                          <ArrowRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: exp.color }} />
                          {pt}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {expanded !== i && (
                  <div className="mt-2 text-xs text-white/25">Click to expand →</div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Education removed from experience — lives in Stats section */}
        </div>
      </div>
    </section>
  )
}

// ================================================================
// PUBLICATIONS SECTION
// ================================================================
function PublicationsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.05 })

  return (
    <section
      id="publications"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0d17 0%, #0B0F19 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-3 font-light">RESEARCH OUTPUT</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">PUBLICATIONS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PUBLICATIONS.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.14 }}
              whileHover={{ y: -8 }}
              className="relative p-6 rounded-2xl overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${pub.color}18`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${pub.color}10, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${pub.color}12`,
                      color: pub.color,
                      border: `1px solid ${pub.color}28`,
                    }}
                  >
                    {pub.badge}
                  </span>
                  <span className="text-xs text-white/25">{pub.year}</span>
                </div>

                <div className="text-5xl font-black mb-4" style={{ color: pub.color }}>
                  {pub.accuracy}
                </div>

                <h3 className="font-bold text-white text-sm leading-snug mb-2">{pub.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed mb-5">{pub.description}</p>

                <div className="flex items-center gap-1.5 text-xs" style={{ color: pub.color }}>
                  <BookOpen size={11} />
                  <span>{pub.journal}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ================================================================
// ACHIEVEMENTS SECTION
// ================================================================
function AchievementsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.05 })

  return (
    <section
      id="achievements"
      className="relative py-24 overflow-hidden"
      style={{ background: '#0B0F19' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-3 font-light">RECOGNITION</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white">ACHIEVEMENTS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-5 rounded-2xl overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${ach.color}07, transparent 70%)`,
                  border: `1px solid ${ach.color}18`,
                  borderRadius: 'inherit',
                }}
              />
              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="p-2.5 rounded-xl flex-shrink-0"
                  style={{ background: `${ach.color}14` }}
                >
                  <ach.icon size={18} style={{ color: ach.color }} />
                </div>
                <div>
                  <div className="text-xs text-white/25 mb-1">{ach.year}</div>
                  <h3 className="font-bold text-white text-sm mb-1">{ach.title}</h3>
                  <p className="text-xs text-white/38 leading-relaxed">{ach.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-4 font-light">LEADERSHIP</div>
          <div className="flex flex-wrap gap-4">
            {[
              { role: 'AI Ambassador', org: 'SREC', color: '#00D4FF' },
              { role: 'Joint Secretary', org: 'BMSOC', color: '#7C3AED' },
              { role: 'IEEE EMBS Co-Treasurer', org: 'IEEE Student Branch', color: '#EC4899' },
            ].map((l, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: `${l.color}07`, border: `1px solid ${l.color}18` }}
              >
                <Users size={14} style={{ color: l.color }} />
                <div>
                  <div className="text-sm font-semibold text-white">{l.role}</div>
                  <div className="text-xs text-white/35">{l.org}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// CONTACT SECTION
// ================================================================
function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.05 })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B0F19 0%, #07090e 100%)' }}
    >
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '350px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1), rgba(0,212,255,0.06), transparent)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-xs tracking-[0.3em] text-white/25 mb-4 font-light">GET IN TOUCH</div>
          <h2 className="font-black leading-none mb-5" style={{ fontSize: 'clamp(44px, 7vw, 80px)' }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00D4FF 45%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LET&apos;S BUILD
            </span>
            <br />
            <span className="text-white">SOMETHING.</span>
          </h2>
          <p className="text-white/35 max-w-md mx-auto text-sm leading-relaxed">
            Open to research collaborations, internship opportunities, and interesting AI/ML projects.
            Always excited to connect with fellow builders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Mail, label: 'Email', value: OWNER.email, href: `mailto:${OWNER.email}`, color: '#00D4FF' },
            { icon: Linkedin, label: 'LinkedIn', value: 'sivaneshakumar', href: OWNER.linkedin, color: '#7C3AED' },
            { icon: Phone, label: 'Phone', value: OWNER.phone, href: `tel:${OWNER.phone}`, color: '#EC4899' },
          ].map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              target={i === 1 ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: `0 12px 50px ${c.color}18` }}
              className="flex flex-col items-center p-6 rounded-2xl no-underline"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: `1px solid ${c.color}18`,
                textDecoration: 'none',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${c.color}12` }}
              >
                <c.icon size={22} style={{ color: c.color }} />
              </div>
              <div className="text-xs text-white/30 mb-1">{c.label}</div>
              <div className="text-sm font-medium text-white text-center break-all">{c.value}</div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <p className="text-white/18 text-xs tracking-wide">
            © 2026 K S Sivaneshakumar · Built with Next.js + Framer Motion · Coimbatore, India
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// SECTION DIVIDER
// ================================================================
function Divider({ from = '#7C3AED', to = '#00D4FF' }) {
  return (
    <div className="relative h-px overflow-visible">
      <div
        className="absolute inset-x-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${from} 30%, ${to} 70%, transparent 100%)`,
          opacity: 0.18,
        }}
      />
      <div
        className="absolute inset-x-0 h-px blur-sm"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${from} 30%, ${to} 70%, transparent 100%)`,
          opacity: 0.08,
        }}
      />
    </div>
  )
}

// ================================================================
// MAIN APP
// ================================================================
export default function App() {
  return (
    <main style={{ background: '#0B0F19', color: '#ffffff', overflowX: 'hidden' }}>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <Divider />
      <StatsDashboard />
      <Divider from="#00D4FF" to="#EC4899" />
      <ProjectsSection />
      <Divider from="#EC4899" to="#7C3AED" />
      <SkillsSection />
      <Divider from="#7C3AED" to="#F59E0B" />
      <ExperienceSection />
      <Divider from="#F59E0B" to="#00D4FF" />
      <PublicationsSection />
      <Divider />
      <AchievementsSection />
      <Divider from="#10B981" to="#7C3AED" />
      <ContactSection />
    </main>
  )
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Shield, Clock, MapPin, Phone, Mail, Globe, Menu, X, Cpu, HardHat, Settings, Zap, Laptop, Hammer, ChevronRight } from 'lucide-react';

// Import local assets
import logoImg from '../assets/logo.png';
import facultyGroupImg from '../assets/staff_group.png';
import courtyardImg from '../assets/campus_courtyard.jpg';
import frontImg from '../assets/campus_front.jpg';
import labImg from '../assets/computer_lab.jpg';
import classroomImg from '../assets/classroom_session.png';
import facultyMeetingImg from '../assets/faculty_meeting.png';
import badgesBannerImg from '../assets/badges_banner.png';

const Navbar = ({ onLogin }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Courses', href: '#courses' },
        { name: 'Placements', href: 'https://www.sgp.edu.in/index.php/placements/placement-training.html', target: '_blank', rel: 'noopener noreferrer' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <>
            <style>
                {`
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .login-btn-nav {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background-color: var(--nav-hover-color, #1e3a8a);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                `}
            </style>
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
                transition: 'all 0.4s ease-in-out',
                borderTop: isScrolled ? '4px solid #1e3a8a' : '4px solid transparent',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: isScrolled ? '0.75rem 2rem' : '1.5rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'padding 0.4s ease-in-out',
                }}>
                    {/* Left Side: Logo & Text */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <img 
                            src={logoImg} 
                            alt="SGP Logo" 
                            style={{ height: '45px', width: 'auto', objectFit: 'contain' }} 
                        />
                        <span style={{
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            color: isScrolled ? '#1e3a8a' : 'white',
                            letterSpacing: '-0.02em',
                            fontFamily: "'Inter', 'Segoe UI', sans-serif",
                            transition: 'color 0.4s ease'
                        }}>
                            SGP BALLARI
                        </span>
                    </div>

                    {/* Center: Desktop Nav Links */}
                    <nav className="desktop-nav" style={{
                        display: 'flex',
                        gap: '2.5rem',
                        alignItems: 'center',
                        '--nav-hover-color': isScrolled ? '#1e3a8a' : 'white'
                    }}>
                        {navItems.map((item) => (
                            <a 
                                key={item.name}
                                href={item.href}
                                target={item.target}
                                rel={item.rel}
                                className="nav-link"
                                style={{
                                    color: isScrolled ? '#4b5563' : 'rgba(255, 255, 255, 0.85)',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                    position: 'relative',
                                    padding: '0.2rem 0'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = isScrolled ? '#1e3a8a' : 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = isScrolled ? '#4b5563' : 'rgba(255, 255, 255, 0.85)';
                                }}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right Side: Login Button & Mobile Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button 
                            onClick={onLogin}
                            className="login-btn-nav"
                            style={{
                                backgroundColor: isScrolled ? '#1e3a8a' : 'rgba(255, 255, 255, 0.15)',
                                color: 'white',
                                padding: '0.6rem 1.75rem',
                                borderRadius: '100px',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                border: isScrolled ? '1px solid transparent' : '1px solid rgba(255,255,255,0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: isScrolled ? '0 4px 12px rgba(30, 58, 138, 0.25)' : 'none',
                                backdropFilter: isScrolled ? 'none' : 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                if (isScrolled) {
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 58, 138, 0.35)';
                                    e.currentTarget.style.backgroundColor = '#172554';
                                } else {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                if (isScrolled) {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.25)';
                                    e.currentTarget.style.backgroundColor = '#1e3a8a';
                                } else {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                                }
                            }}
                        >
                            Login
                        </button>
                        
                        <button 
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: isScrolled ? '#1e3a8a' : 'white',
                                padding: '0.5rem',
                                display: 'none',
                                transition: 'transform 0.2s ease, color 0.4s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mobile-menu-dropdown" 
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            borderTop: '1px solid #f1f5f9',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '1rem 2rem 2rem',
                            gap: '0.5rem',
                        }}
                    >
                        {navItems.map((item) => (
                            <a 
                                key={item.name}
                                href={item.href}
                                target={item.target}
                                rel={item.rel}
                                style={{
                                    color: '#1e293b',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: '1.1rem',
                                    padding: '1rem 0',
                                    borderBottom: '1px solid #f1f5f9',
                                    display: 'block'
                                }}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <button 
                            onClick={() => {
                                setIsMobileOpen(false);
                                onLogin();
                            }}
                            style={{
                                backgroundColor: '#1e3a8a',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '100px',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: '1.5rem',
                                textAlign: 'center',
                                width: '100%',
                                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#172554';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1e3a8a';
                            }}
                        >
                            Login
                        </button>
                    </motion.div>
                )}
            </header>
        </>
    );
};

const HomePage = ({ onLogin, onRegister, onDashboard, isAuthenticated }) => {
    return (
        <div style={{ position: 'relative' }}>
            <Navbar onLogin={onLogin} />
            {/* Hero Section */}
            <section id="home" className="hero animated-mesh" style={{ 
                minHeight: '100vh', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Decoration - Animated Floating Orbs */}
                <div className="floating-orb" style={{ top: '10%', right: '10%', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.15)', animationDelay: '0s' }}></div>
                <div className="floating-orb" style={{ bottom: '15%', left: '5%', width: '400px', height: '400px', background: 'rgba(0, 0, 0, 0.2)', animationDelay: '-5s' }}></div>
                <div className="floating-orb" style={{ top: '40%', left: '25%', width: '200px', height: '200px', background: 'rgba(236, 72, 153, 0.2)', animationDelay: '-10s' }}></div>
                <div className="floating-orb" style={{ bottom: '30%', right: '20%', width: '250px', height: '250px', background: 'rgba(6, 182, 212, 0.2)', animationDelay: '-15s' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        {/* Main Logo Container */}
                        <div style={{ 
                            width: 'min(90%, 500px)', 
                            height: 'auto', 
                            aspectRatio: '3/1',
                            marginBottom: '1rem', // Reduced margin
                            padding: '1.5rem',
                            background: 'white',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img 
                                src={logoImg} 
                                alt="Sanjay Gandhi Polytechnic Logo" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    objectFit: 'contain'
                                }} 
                            />
                        </div>

                        {/* Branding Badges Banner - Placeholder or removed until proper image is available */}

                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
                            fontWeight: 900, 
                            lineHeight: 1.1, 
                            marginBottom: '1.5rem', 
                            letterSpacing: '-0.04em',
                            textShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            Attendance <br />
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>Management System</span>
                        </h1>
                        
                        <p style={{ 
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', 
                            maxWidth: '750px', 
                            margin: '0 auto 3.5rem', 
                            opacity: 0.85, 
                            lineHeight: 1.7,
                            fontWeight: 500
                        }}>
                            The most advanced registry management system designed for speed, security, and scalability. 
                            Built with precision for Sanjay Gandhi Polytechnic.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {isAuthenticated ? (
                                <button 
                                    onClick={onDashboard}
                                    className="btn btn-hero-primary"
                                    style={{ 
                                        background: 'white', 
                                        color: 'var(--primary-color)', 
                                        padding: '1.25rem 2.75rem', 
                                        fontSize: '1.1rem', 
                                        borderRadius: '20px',
                                        fontWeight: 800,
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    Enter Dashboard
                                    <ArrowRight size={22} />
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={onRegister}
                                        className="btn btn-hero-primary"
                                        style={{ 
                                            background: 'white', 
                                            color: 'var(--primary-color)', 
                                            padding: '1.25rem 2.75rem', 
                                            fontSize: '1.1rem', 
                                            borderRadius: '20px',
                                            fontWeight: 800,
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        Get Started
                                        <ArrowRight size={22} />
                                    </button>
                                    <button 
                                        onClick={onLogin}
                                        className="btn btn-hero-outline"
                                        style={{ 
                                            background: 'rgba(255,255,255,0.1)', 
                                            backdropFilter: 'blur(15px)', 
                                            color: 'white', 
                                            border: '2px solid rgba(255,255,255,0.4)', 
                                            padding: '1.25rem 2.75rem', 
                                            fontSize: '1.1rem', 
                                            borderRadius: '20px',
                                            fontWeight: 700
                                        }}
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
 
             {/* Highlands Highlight Section */}
             <section className="highlight-section">
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="badges-container">
                        {/* First Item: NBA Accreditation */}
                        <div className="badge-wrapper">
                            <div className="badge-circle badge-nba">
                                <img src={badgesBannerImg} alt="NBA Accreditation" className="badge-image" />
                            </div>
                        </div>

                        {/* Second Item: 28th Anniversary Badge */}
                        <div className="badge-wrapper">
                            <div className="badge-circle badge-anniversary">
                                <img src={badgesBannerImg} alt="28th Anniversary" className="badge-image" />
                            </div>
                        </div>

                        {/* Third Item: Portrait of Elderly Woman */}
                        <div className="badge-wrapper">
                            <div className="badge-circle badge-portrait">
                                <img src={badgesBannerImg} alt="Portrait" className="badge-image" />
                            </div>
                        </div>
                    </div>
                </div>
             </section>

             {/* Institution Highlight Section */}


            <section style={{ padding: '40px 2rem', background: '#fcfdfe', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        style={{ 
                            borderRadius: '32px', 
                            overflow: 'hidden', 
                            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.2)',
                            background: 'white',
                            border: '1px solid var(--border-color)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ position: 'relative', width: '100%', height: 'min(60vh, 500px)', overflow: 'hidden' }}>
                            <img 
                                src={facultyGroupImg} 
                                alt="The Visionary Faculty of Sanjay Gandhi Polytechnic" 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    display: 'block'
                                }} 
                            />
                            <div style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '3rem'
                            }}>
                                <div style={{ color: 'white' }}>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>The Heart of SGP</h2>
                                    <p style={{ fontSize: '1.2rem', opacity: 0.9, fontWeight: 500 }}>Our dedicated faculty members, committed to excellence in engineering education.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Student Stats & Activity Section */}
            <section style={{ padding: '80px 2rem', background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>The Team Members</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Active profiles currently synchronized in the system</p>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1.5rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {[
                            "M Shiva Balaji Gouda",
                            "Shaik Irshan",
                            "Dasari Charan Venkat",
                            "Sidda Reddy",
                            "Harsha Reddy",
                            "Indravaraprasad"
                        ].map((name, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                style={{ 
                                    padding: '1.25rem', 
                                    background: '#f8fafc', 
                                    borderRadius: '16px', 
                                    textAlign: 'center',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    background: 'var(--primary-gradient)', 
                                    color: 'white', 
                                    borderRadius: '12px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    flexShrink: 0
                                }}>
                                    {name.charAt(0)}
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{name}</h4>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--success-color)', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>Verified Index</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Highlights Gallery */}
            <section style={{ padding: '80px 2rem', background: '#fcfdfe', overflow: 'hidden' }}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Campus Highlights</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>Explore the state-of-the-art facilities and vibrant community at Sanjay Gandhi Polytechnic.</p>
                    </motion.div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(12, 1fr)', 
                        gap: '1.5rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {/* Featured Large Image - Group Photo */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            style={{ 
                                gridColumn: 'span 12',
                                height: '400px',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                                border: '4px solid white'
                            }}
                        >
                            <img src={facultyGroupImg} alt="SGP Faculty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: 'white' }}>
                                <h4 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Our Visionary Faculty</h4>
                                <p style={{ opacity: 0.9 }}>Dedicated educators shaping the future of engineering.</p>
                            </div>
                        </motion.div>

                        {/* Courtyard - Large Side */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            style={{ 
                                gridColumn: 'span 8',
                                height: '350px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -5px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                position: 'relative'
                            }}
                        >
                            <img src={courtyardImg} alt="Vidya Soudha Courtyard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Vidya Soudha Courtyard</span>
                            </div>
                        </motion.div>

                        {/* Front View */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            style={{ 
                                gridColumn: 'span 4',
                                height: '350px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -5px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                position: 'relative'
                            }}
                        >
                            <img src={frontImg} alt="SGP Library Front View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>College Library</span>
                            </div>
                        </motion.div>

                        {/* Computer Lab */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            style={{ 
                                gridColumn: 'span 4',
                                height: '300px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -5px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                position: 'relative'
                            }}
                        >
                            <img src={labImg} alt="Advanced Computer Laboratory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Advanced Lab</span>
                            </div>
                        </motion.div>

                        {/* Classroom Session */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            style={{ 
                                gridColumn: 'span 4',
                                height: '300px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -5px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                position: 'relative'
                            }}
                        >
                            <img src={classroomImg} alt="Active Learning Session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Smart Classrooms</span>
                            </div>
                        </motion.div>

                        {/* Faculty Meeting */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            style={{ 
                                gridColumn: 'span 4',
                                height: '300px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 30px -5px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                position: 'relative'
                            }}
                        >
                            <img src={facultyMeetingImg} alt="Faculty Collaboration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Faculty Hub</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" style={{ padding: '80px 2rem', background: '#fcfdfe' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>About SGP</h2>
                        <div style={{ background: '#fbbf24', height: '4px', width: '60px', margin: '0 auto', borderRadius: '2px' }}></div>
                    </div>
                    <div style={{ 
                        background: 'white', 
                        padding: '4rem', 
                        borderRadius: '24px', 
                        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.02)',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 500 }}>
                            Sanjay Gandhi Polytechnic (SGP), Ballari, was established in 1991 as the first premier private co-educational polytechnic in the region.
                        </p>
                        <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 500 }}>
                            The institute is recognized by the Government of Karnataka, approved by AICTE, New Delhi, and affiliated with the Directorate of Technical Education (DTE), Bengaluru.
                        </p>
                        <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 500 }}>
                            SGP focuses on academic excellence, practical exposure, and overall student development.
                        </p>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" style={{ padding: '80px 2rem', background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '2.5rem' 
                    }}>
                        <CourseCard 
                            icon={<Cpu size={40} />} 
                            title="Electronics & Communication" 
                            desc="Advanced circuitry and communication systems." 
                        />
                        <CourseCard 
                            icon={<HardHat size={40} />} 
                            title="Civil Engineering" 
                            desc="Infrastructure, construction and design." 
                        />
                        <CourseCard 
                            icon={<Settings size={40} />} 
                            title="Mechanical Engineering" 
                            desc="Design, manufacturing, and mechanics." 
                        />
                        <CourseCard 
                            icon={<Zap size={40} />} 
                            title="Electrical & Electronics" 
                            desc="Power systems and electrical innovations." 
                        />
                        <CourseCard 
                            icon={<Laptop size={40} />} 
                            title="Computer Science" 
                            desc="Software development, coding, and algorithms." 
                        />
                        <CourseCard 
                            icon={<Hammer size={40} />} 
                            title="Metallurgy" 
                            desc="Material science and metal processing." 
                        />
                    </div>
                </div>
            </section>

            {/* Core Values / Trust Section */}
            <section style={{ padding: '60px 2rem', background: '#fcfdfe' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h3 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '2rem' }}>Core Values</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {['Commitment', 'Equity', 'Team Spirit', 'Transparency', 'Quality'].map(value => (
                            <div key={value} style={{ 
                                background: '#1e3a8a', 
                                color: 'white', 
                                padding: '0.6rem 1.5rem', 
                                borderRadius: '100px', 
                                fontWeight: 600,
                                fontSize: '0.95rem'
                            }}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer / Contact Section */}
            <footer id="contact" style={{ background: '#072e54', color: 'white', padding: '60px 2rem 30px' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '40px' }}>
                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Contact Us</h4>
                        <p style={{ fontWeight: 600, marginBottom: '1.5rem' }}>Sanjay Gandhi Polytechnic (SGP)</p>
                        
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', opacity: 0.9 }}>
                            <MapPin size={20} style={{ flexShrink: 0 }} />
                            <span>Ballari – 583104, Karnataka.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', opacity: 0.9 }}>
                            <Phone size={20} style={{ flexShrink: 0 }} />
                            <span>08392 266331</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', opacity: 0.9 }}>
                            <Mail size={20} style={{ flexShrink: 0 }} />
                            <span>sgpbellary@gmail.com</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a href="#about" style={{ color: 'white', textDecoration: 'none', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ChevronRight size={16} /> About Us
                            </a>
                            <a href="#courses" style={{ color: 'white', textDecoration: 'none', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ChevronRight size={16} /> Courses
                            </a>
                            <a href="https://www.sgp.edu.in/index.php/placements/placement-training.html" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ChevronRight size={16} /> Placements
                            </a>
                            <button onClick={onLogin} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'none', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: 0, fontSize: '1rem' }}>
                                <ChevronRight size={16} /> Portal Login
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    © 2024 Sanjay Gandhi Polytechnic, Ballari. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

const CourseCard = ({ icon, title, desc }) => (
    <motion.div 
        whileHover={{ translateY: -10, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}
        style={{ 
            background: 'white', 
            padding: '2.5rem 2rem', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
            border: '2px solid rgba(0,0,0,0.03)',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}
    >
        <div style={{ 
            color: '#1e3a8a', 
            marginBottom: '1.5rem',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>{desc}</p>
    </motion.div>
);

export default HomePage;

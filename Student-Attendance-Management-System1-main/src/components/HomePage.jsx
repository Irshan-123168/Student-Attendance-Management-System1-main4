import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Shield, Clock, MapPin, Phone, Mail, Globe, Menu, X } from 'lucide-react';

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

    const navLinks = ['Home', 'About', 'Courses', 'Placements', 'Contact'];

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
                        {navLinks.map((link) => (
                            <a 
                                key={link}
                                href={`#${link.toLowerCase()}`}
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
                                {link}
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
                        {navLinks.map((link) => (
                            <a 
                                key={link}
                                href={`#${link.toLowerCase()}`}
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
                                {link}
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
            <section className="hero animated-mesh" style={{ 
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

            {/* About Us & Contact Section */}
            <section style={{ padding: '100px 2rem', background: '#fcfdfe', borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
                        {/* About Us Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>About Us</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Sanjay Gandhi Polytechnic is a premier institution dedicated to excellence in technical education. 
                                Our state-of-the-art infrastructure and experienced faculty foster an environment that encourages 
                                innovation and growth, preparing our students for global leadership in engineering.
                            </p>
                            <a 
                                href="https://www.sgp.edu.in/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    color: 'var(--primary-color)', 
                                    fontWeight: 700, 
                                    textDecoration: 'none',
                                    marginBottom: '2rem'
                                }}
                                className="hover-underline"
                            >
                                Learn more at our official website
                                <ArrowRight size={18} />
                            </a>
                            <div style={{ background: 'var(--primary-gradient)', height: '4px', width: '80px', borderRadius: '2px' }}></div>
                        </motion.div>

                        {/* Contact Address */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)' }}
                        >
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem' }}>Reach Us</h3>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ minWidth: '50px', height: '50px', background: '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                                    <MapPin size={24} />
                                </div>
                                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Location</strong>
                                    "Vidya Soudha", Sanjay Gandhinagar,<br />
                                    Ballari - 583104,<br />
                                    Karnataka State
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ minWidth: '50px', height: '50px', background: '#fef2f2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                                    <Phone size={24} />
                                </div>
                                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Phones</strong>
                                    Landline: 08392 266331 / 267833<br />
                                    Mobile: 9008066235 / 8197778607
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ minWidth: '50px', height: '50px', background: '#f0fdf4', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                                    <Mail size={24} />
                                </div>
                                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email</strong>
                                    sgpbellary@gmail.com
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ minWidth: '50px', height: '50px', background: '#fef3c7', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                                    <Globe size={24} />
                                </div>
                                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Official Website</strong>
                                    <a href="https://www.sgp.edu.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>www.sgp.edu.in</a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '100px 2rem', background: '#f8fafc' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>Enterprise Features</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Powerful tools to manage your institution's registry with ease.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        <FeatureCard 
                            icon={<Clock className="text-blue-600" />} 
                            title="Real-time Tracking" 
                            desc="Monitor attendance records instantly with our high-speed node synchronization." 
                        />
                        <FeatureCard 
                            icon={<Shield className="text-purple-600" />} 
                            title="SECURE Protocol" 
                            desc="Enterprise-grade security ensuring all institutional data remains encrypted and safe." 
                        />
                        <FeatureCard 
                            icon={<Users className="text-indigo-600" />} 
                            title="Global Directory" 
                            desc="A centralized hub for all faculty and member identities across the entire campus." 
                        />
                    </div>
                </div>
            </section>



            {/* Trust Section */}
            <section style={{ padding: '60px 2rem', background: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', opacity: 0.6, flexWrap: 'wrap' }}>
                        <TrustItem label="ISO 9001:2015" />
                        <TrustItem label="NBA Accredited" />
                        <TrustItem label="AICTE Approved" />
                        <TrustItem label="DTE Affiliated" />
                    </div>
                </div>
            </section>


        </div>
    );
};



const FeatureCard = ({ icon, title, desc }) => (
    <motion.div 
        whileHover={{ translateY: -10 }}
        className="card" 
        style={{ padding: '3rem', cursor: 'default' }}
    >
        <div style={{ width: '60px', height: '60px', background: 'var(--bg-secondary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{desc}</p>
    </motion.div>
);

const TrustItem = ({ label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <CheckCircle size={20} className="text-green-500" />
        <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>{label}</span>
    </div>
);

export default HomePage;

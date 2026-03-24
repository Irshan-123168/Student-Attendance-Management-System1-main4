import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Shield, Clock } from 'lucide-react';

const HomePage = ({ onLogin, onRegister, onDashboard, isAuthenticated }) => {
    return (
        <div style={{ position: 'relative' }}>
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
                        {/* Enhanced Logo Container - Rectangular for Wide Logo */}
                        <div style={{ 
                            width: 'min(90%, 500px)', 
                            height: 'auto', 
                            aspectRatio: '3/1',
                            marginBottom: '3.5rem',
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
                                src="/src/assets/logo.png" 
                                alt="Sanjay Gandhi Polytechnic Logo" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    objectFit: 'contain'
                                }} 
                            />
                        </div>

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
                            <img src="/src/assets/staff_group.png" alt="SGP Staff and Faculty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <img src="/src/assets/campus_courtyard.jpg" alt="Vidya Soudha Courtyard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <img src="/src/assets/campus_front.jpg" alt="SGP Library Front View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <img src="/src/assets/computer_lab.jpg" alt="Advanced Computer Laboratory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <img src="/src/assets/classroom_session.jpg" alt="Active Learning Session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                            <img src="/src/assets/faculty_meeting.jpg" alt="Faculty Collaboration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Faculty Hub</span>
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
                            desc="A centralized hub for all staff and member identities across the entire campus." 
                        />
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section style={{ padding: '80px 2rem', background: 'white', borderTop: '1px solid var(--border-color)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', opacity: 0.5, flexWrap: 'wrap' }}>
                        <TrustItem label="ISO 27001 Certified" />
                        <TrustItem label="99.9% Uptime SLA" />
                        <TrustItem label="24/7 Security Ops" />
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

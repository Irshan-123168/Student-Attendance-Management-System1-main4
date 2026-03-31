import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LayoutGrid, Menu, X, Globe, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home',       href: '#home',                                       external: false },
    { label: 'About',      href: 'https://www.sgp.edu.in/about-us/',            external: true  },
    { label: 'Courses',    href: 'https://www.sgp.edu.in/courses-offered/',     external: true  },
    { label: 'Placements', href: 'https://www.sgp.edu.in/placements/',          external: true  },
    { label: 'Contact',    href: 'https://www.sgp.edu.in/contact-us/',          external: true  },
];

const Navbar = ({ onNavigateToLogin, onNavigateToRegister, onNavigateToDashboard, isAuthenticated }) => {
    const [scrolled, setScrolled]       = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkColor = scrolled ? 'var(--text-primary)' : 'white';

    return (
        <nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(15,23,42,0.55)',
                backdropFilter: 'blur(14px)',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                padding: '0.85rem 2rem'
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>

                {/* ── Logo ── */}
                <div
                    className="nav-logo"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                    <div style={{ width: '100px', height: '36px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '4px' }}>
                        <img src="/src/assets/logo.png" alt="SGP Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: linkColor }}>
                        Attend<span style={{ color: scrolled ? 'var(--primary-color)' : '#60a5fa' }}>Flow</span>
                    </span>
                </div>

                {/* ── Desktop Nav Links (matches SGP site) ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
                    {NAV_LINKS.map(({ label, href, external }) => (
                        <a
                            key={label}
                            href={href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            onClick={label === 'Home' ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}
                            style={{
                                color: linkColor,
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                padding: '0.5rem 0.85rem',
                                borderRadius: '8px',
                                transition: 'background 0.2s, color 0.2s',
                                opacity: 0.9,
                                whiteSpace: 'nowrap'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.15)'; e.currentTarget.style.opacity = 1; }}
                            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = 0.9; }}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* ── CTA Buttons ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden md:flex">
                    {isAuthenticated ? (
                        <button
                            onClick={onNavigateToDashboard}
                            className="btn btn-primary"
                            style={{ padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem' }}
                        >
                            <LayoutGrid size={16} />
                            Dashboard
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={onNavigateToLogin}
                                style={{
                                    color: linkColor,
                                    background: 'none', border: scrolled ? '1.5px solid rgba(0,0,0,0.2)' : '1.5px solid rgba(255,255,255,0.4)',
                                    borderRadius: '10px', padding: '0.6rem 1.4rem',
                                    fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s'
                                }}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={onNavigateToRegister}
                                className="btn btn-primary"
                                style={{ padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem' }}
                            >
                                <LogIn size={16} />
                                Login
                            </button>
                        </>
                    )}
                </div>

                {/* ── Mobile Hamburger ── */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ background: 'none', border: 'none', color: linkColor, cursor: 'pointer' }}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-nav"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.22 }}
                        style={{
                            position: 'absolute', top: '100%', left: 0, right: 0,
                            background: 'white', padding: '1rem 1.5rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                            borderTop: '1px solid rgba(0,0,0,0.06)'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {NAV_LINKS.map(({ label, href, external }) => (
                                <a
                                    key={label}
                                    href={href}
                                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                        color: 'var(--text-primary)', textDecoration: 'none',
                                        fontWeight: 600, fontSize: '1rem',
                                        padding: '0.75rem 1rem', borderRadius: '10px',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    {label}
                                    {external && <Globe size={13} style={{ opacity: 0.4 }} />}
                                </a>
                            ))}
                            <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', margin: '0.5rem 0' }} />
                            {isAuthenticated ? (
                                <button onClick={onNavigateToDashboard} className="btn btn-primary w-full">Dashboard</button>
                            ) : (
                                <>
                                    <button onClick={onNavigateToLogin} className="btn btn-secondary w-full" style={{ marginBottom: '0.5rem' }}>Sign In</button>
                                    <button onClick={onNavigateToRegister} className="btn btn-primary w-full">Login</button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;



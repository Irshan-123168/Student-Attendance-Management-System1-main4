import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const SchedulePage = () => {
    const [activeDay, setActiveDay] = useState('MON');
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const classes = [
        { time: '09:00 AM - 10:00 AM', subject: 'Advanced Mathematics', room: 'RL-301', staff: 'Dr. S. Sharma', color: '#6366f1' },
        { time: '10:00 AM - 11:00 AM', subject: 'Cloud Computing Infrastructure', room: 'LAB-04', staff: 'Prof. A. Verma', color: '#10b981' },
        { time: '11:00 AM - 12:00 PM', subject: 'Network Security', room: 'RL-305', staff: 'Prof. R. Kumar', color: '#8b5cf6' },
        { time: '12:00 PM - 01:00 PM', subject: 'Institutional Protocol', room: 'HALL-A', staff: 'Dr. K. Gupta', color: '#f59e0b' },
        { time: '01:00 PM - 02:00 PM', subject: 'LUNCH BREAK', room: 'CAFETERIA', staff: 'N/A', color: '#64748b', isBreak: true },
        { time: '02:00 PM - 03:00 PM', subject: 'Cryptography & Security', room: 'RL-302', staff: 'Prof. M. Khan', color: '#ef4444' },
        { time: '03:00 PM - 04:00 PM', subject: 'Project Lab Session', room: 'LAB-02', staff: 'Prof. J. Singh', color: '#ec4899' },
        { time: '04:00 PM - 05:00 PM', subject: 'Seminar / Mentoring', room: 'HALL-B', staff: 'Dr. P. Patil', color: '#06b6d4' }
    ];

    return (
        <div className="animate-fade space-y-8">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Academic Routine</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Centralized schedule and node occupancy trace</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', background: 'white', padding: '0.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronLeft size={20} /></button>
                    <div style={{ padding: '0 1rem', display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '0.875rem' }}>WEEK 12</div>
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronRight size={20} /></button>
                </div>
            </header>

            {/* Day Selector */}
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        style={{
                            minWidth: '100px', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)',
                            background: activeDay === day ? 'var(--primary-gradient)' : 'white',
                            color: activeDay === day ? 'white' : 'var(--text-primary)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                            cursor: 'pointer', transition: 'all 0.3s', boxShadow: activeDay === day ? 'var(--shadow-md)' : 'none'
                        }}
                    >
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: activeDay === day ? 0.9 : 0.6 }}>SESSION</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>{day}</span>
                    </button>
                ))}
            </div>

            {/* Class Cards */}
            <div className="space-y-4">
                {classes.map((cls, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="card"
                        style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '1.5rem 2rem' }}
                    >
                        <div style={{ width: '120px', borderRight: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>
                                <Clock size={16} />
                                <span style={{ fontSize: '0.875rem', fontWeight: 800 }}>TIME</span>
                            </div>
                            <p style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{cls.time}</p>
                        </div>

                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ width: '12px', height: '40px', background: cls.color, borderRadius: '4px' }}></div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{cls.subject}</h4>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.8125rem', fontWeight: 600 }}>
                                        <BookOpen size={14} /> {cls.staff}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.8125rem', fontWeight: 600 }}>
                                        <MapPin size={14} /> {cls.room}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-secondary" style={{ fontSize: '0.75rem', fontWeight: 800 }}>VIEW SYLLABUS</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SchedulePage;

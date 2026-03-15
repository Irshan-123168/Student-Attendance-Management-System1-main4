import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, ShieldCheck, Mail, Smartphone, ChevronRight } from 'lucide-react';

const MemberDirectory = ({ students, searchQuery, setSearchQuery }) => {
    const [activeSector, setActiveSector] = useState('All');
    
    const filteredStudents = (students || []).filter(s => {
        const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           s.roll.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = activeSector === 'All' || s.studentClass === activeSector;
        return matchesQuery && matchesSector;
    });

    const sectors = ['All', ...new Set((students || []).map(s => s.studentClass))];

    return (
        <div className="animate-fade space-y-8">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Member Directory</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Institutional User Registry & Node Ledger</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={18} />
                        <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '3rem', width: '300px' }}
                            placeholder="Search Identifier..." 
                            value={searchQuery || ''}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Sector Matrix */}
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {sectors.map(sector => (
                    <button
                        key={sector}
                        onClick={() => setActiveSector(sector)}
                        style={{
                            padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                            background: activeSector === sector ? 'var(--primary-gradient)' : 'white',
                            color: activeSector === sector ? 'white' : 'var(--text-secondary)',
                            fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.3s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {sector === 'All' ? 'ALL NODES' : sector}
                    </button>
                ))}
            </div>

            {/* Member Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredStudents.map((s, idx) => (
                        <motion.div 
                            key={s.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="card"
                            style={{ padding: '1.5rem', position: 'relative' }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                                    <Users size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{s.name}</h4>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', letterSpacing: '0.05em' }}>ID: {s.roll}</p>
                                </div>
                                <div style={{ color: 'var(--success-color)' }}>
                                    <ShieldCheck size={20} />
                                </div>
                            </div>

                            <div className="space-y-2" style={{ marginBottom: '1.5rem' }}>
                                <MemberMeta icon={<Mail size={14} />} label="node-access@sgp.edu" />
                                <MemberMeta icon={<Smartphone size={14} />} label="+91 XXXXX XXXXX" />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                <span className="badge badge-info">{s.studentClass}</span>
                                <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    VIEW TRACE <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MemberMeta = ({ icon, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-light)', fontSize: '0.8125rem', fontWeight: 600 }}>
        {icon}
        <span>{label}</span>
    </div>
);

export default MemberDirectory;

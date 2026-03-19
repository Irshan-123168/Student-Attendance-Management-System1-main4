import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, FileText, Settings, Activity, Download, User, Lock, XCircle, Send, CheckCircle } from 'lucide-react';
import { generateStudentReport, generateRegistryExport } from '../utils/exportUtils';
import { api } from '../api';
import ClassSchedule from './ClassSchedule';

const AdminDashboard = ({ user, users = [], students = [], onNavigate, searchQuery = '' }) => {
    const [isUpdatingKey, setIsUpdatingKey] = useState(false);
    const [oldKey, setOldKey] = useState('');
    const [newKey, setNewKey] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleUpdateKey = async (e) => {
        e.preventDefault();
        if (!oldKey || !newKey) return;
        
        try {
            await api.updatePassword(user.id, oldKey, newKey);
            setStatus({ type: 'success', message: 'Access Key updated successfully' });
            setOldKey('');
            setNewKey('');
            setTimeout(() => {
                setIsUpdatingKey(false);
                setStatus({ type: '', message: '' });
            }, 2000);
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    const teamMembers = [
        "M Shiva Balaji Gouda",
        "Shaik Irshan",
        "Dasari Charan Venkat",
        "Sidda Reddy",
        "Harsha Reddy",
        "Indravaraprasad"
    ].filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));

    const globalAttendance = students.length > 0 
        ? Math.round((students.reduce((acc, s) => acc + (s.presentCount || 0), 0) / 
          students.reduce((acc, s) => acc + (s.presentCount || 0) + (s.absentCount || 0) || 1, 0)) * 100) 
        : 0;

    const filteredStudents = students.filter(s => 
        searchQuery && (
            (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
            (s.roll || '').toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="animate-fade space-y-6">
            <header>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>System Administration</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Central control hub for Institutional Nodes</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AdminCard icon={<Users />} title="Total Users" value={users.length || "0"} color="#6366f1" />
                <AdminCard icon={<Shield />} title="Total Students" value={students.length || "0"} color="#10b981" />
                <AdminCard icon={<Activity />} title="Global Attendance" value={`${globalAttendance}%`} color="#10b981" />
                <AdminCard icon={<FileText />} title="Active Records" value={students.filter(s => s.status !== 'Pending').length} color="#f59e0b" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Management Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Management Quick Links</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <QuickLink label="Download Registry" desc="Export CSV" onClick={() => generateRegistryExport(students)} />
                            <QuickLink label="Generate Report" desc="Full Ledger" onClick={() => generateStudentReport(students)} />
                            <QuickLink label="Security Audit" desc="Verified Trace" onClick={() => onNavigate('reports')} />
                            <QuickLink label="System Config" desc="Portal settings" onClick={() => onNavigate('settings')} />
                            <QuickLink label="Syllabus C-25 (PDF)" desc="DTEK C-25 Draft" onClick={() => window.open('https://dtek.karnataka.gov.in/storage/pdf-files/ACM/C_25_Draft_1_4_ComputerScience&Engineering.pdf', '_blank')} />
                            <QuickLink label="Syllabus C-20 (Web)" desc="C-20 Web Portal" onClick={() => window.open('https://dtek.karnataka.gov.in/52/c-20-syllabus/en', '_blank')} />
                            <QuickLink label="Syllabus EEE C-25 (PDF)" desc="EEE C-25 Draft" onClick={() => window.open('https://dtek.karnataka.gov.in/storage/pdf-files/ACM/C_25_Draft_EE_1_4_Electrical&ElectronicsEngineering.pdf', '_blank')} />
                            <QuickLink label="Syllabus ME C-25 (PDF)" desc="Mechanical C-25 Draft" onClick={() => window.open('https://dtek.karnataka.gov.in/storage/pdf-files/ACM/C_25_Draft_ME_1_4_MechanicalEngineering.pdf', '_blank')} />
                            <QuickLink label="Syllabus MT C-25 (PDF)" desc="Metallurgical C-25 Draft" onClick={() => window.open('https://dtek.karnataka.gov.in/storage/pdf-files/ACM/C_25_Draft_MT_1_4_MetallurgicalEngineering.pdf', '_blank')} />
                            <QuickLink label="Syllabus CE C-25 (PDF)" desc="Civil Engg C-25 Draft" onClick={() => window.open('https://dtek.karnataka.gov.in/storage/pdf-files/ACM/C_25_Draft_CE_1_4_CivilEngineering.pdf', '_blank')} />
                        </div>
                    </div>
                    
                    <div className="card">
                        <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Node Security Alert</h3>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                            <p style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 600 }}>
                                Institutional protocol version 2.4.0 is active. All security patches have been deployed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Identity Column */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--primary-color)' }}>
                            <User size={24} />
                        </div>
                        <h3 style={{ fontWeight: 700 }}>My Identity</h3>
                    </div>

                    <div className="space-y-4">
                        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>Admin Alias</p>
                            <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{user?.username}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 700, marginTop: '0.25rem' }}>ROOT LEVEL AUTHORITY</p>
                        </div>

                        <button 
                            onClick={() => setIsUpdatingKey(true)}
                            className="btn btn-secondary w-full" style={{ justifyContent: 'space-between', padding: '1.25rem', borderStyle: 'dashed' }}
                        >
                            <div className="flex gap-3">
                                <Lock size={18} />
                                <span style={{ fontWeight: 600 }}>Update Access Key</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)' }}>PIN</span>
                        </button>
                    </div>
                </div>
            </div>

            <ClassSchedule />

            {searchQuery && (
                <div className="card animate-in slide-in-from-bottom-4 duration-500">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>Global Registry Search Results</h3>
                    <div className="overflow-x-auto">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Learner Identity</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Attendance</th>
                                    <th style={{ padding: '1rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student, i) => {
                                        const total = (student.presentCount || 0) + (student.absentCount || 0);
                                        const percentage = total > 0 ? ((student.presentCount / total) * 100).toFixed(1) : '0.0';
                                        
                                        return (
                                            <tr key={student.id || i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 700 }}>{student.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{student.roll}</div>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span className={`badge badge-${student.status === 'Present' ? 'success' : student.status === 'Absent' ? 'danger' : 'warning'}`}>
                                                        {student.status || 'Pending'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 800, color: 'var(--primary-color)' }}>{percentage}%</div>
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                    <button 
                                                        onClick={() => onNavigate('students')}
                                                        className="text-xs font-bold text-indigo-600 underline"
                                                    >
                                                        Visit Node
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>Node identification failed. No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>The Team Members</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {teamMembers.length > 0 ? teamMembers.map((name, idx) => (
                        <div key={idx} style={{ 
                            padding: '1rem', 
                            background: 'var(--bg-secondary)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ 
                                width: '32px', 
                                height: '32px', 
                                background: 'var(--primary-gradient)', 
                                color: 'white', 
                                borderRadius: '8px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontWeight: 800,
                                fontSize: '0.8rem'
                            }}>
                                {name.charAt(0)}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{name}</h4>
                                <p style={{ fontSize: '0.65rem', color: 'var(--success-color)', fontWeight: 700, margin: 0 }}>SGP STUDENT</p>
                            </div>
                        </div>
                    )) : (
                        <p style={{ padding: '1rem', color: 'var(--text-light)', fontStyle: 'italic' }}>No matching team members found.</p>
                    )}
                </div>
            </div>

            {/* Access Key Update Modal */}
            <AnimatePresence>
                {isUpdatingKey && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card" 
                            style={{ maxWidth: '400px', width: '100%', padding: '2.5rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontWeight: 800, fontSize: '1.25rem' }}>Access Key Protocol</h3>
                                <button onClick={() => setIsUpdatingKey(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                                    <XCircle size={24} />
                                </button>
                            </div>
                            
                            <form className="space-y-4" onSubmit={handleUpdateKey}>
                                <div className="form-group">
                                    <label className="form-label">Old Access Key</label>
                                    <input 
                                        type="password" 
                                        className="form-input" 
                                        placeholder="Enter current PIN..." 
                                        value={oldKey}
                                        onChange={(e) => setOldKey(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New Access Key</label>
                                    <input 
                                        type="password" 
                                        className="form-input" 
                                        placeholder="Enter new 6-digit PIN..." 
                                        value={newKey}
                                        onChange={(e) => setNewKey(e.target.value)}
                                        required 
                                    />
                                </div>
                                
                                {status.message && (
                                    <div style={{ 
                                        padding: '0.75rem', 
                                        borderRadius: '8px', 
                                        background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: status.type === 'success' ? 'var(--success-color)' : 'var(--error-color)',
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {status.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                        {status.message}
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary w-full" style={{ height: '52px', marginTop: '1rem' }}>
                                    <Send size={18} />
                                    Synchronize Key
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AdminCard = ({ icon, title, value, color }) => (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: color + '15', color, borderRadius: '12px' }}>{icon}</div>
            <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>{title}</p>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{value}</h4>
            </div>
        </div>
    </div>
);

const QuickLink = ({ label, desc, onClick }) => (
    <button 
        onClick={onClick}
        className="btn btn-secondary" 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '1.25rem', height: 'auto', textAlign: 'left' }}
    >
        <span style={{ fontWeight: 800, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{label}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{desc}</span>
    </button>
);

export default AdminDashboard;

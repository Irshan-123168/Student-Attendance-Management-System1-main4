import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ClipboardList, TrendingUp, UserCheck, AlertTriangle, Download, FileText } from 'lucide-react';
import { generateStudentReport, generateRegistryExport } from '../utils/exportUtils';

const HodDashboard = ({ user, students = [], onNavigate }) => {
    // Dynamic Analysis
    const totalStudents = students.length;
    const presentRate = totalStudents > 0 
        ? Math.round((students.filter(s => s.status === 'Present').length / totalStudents) * 100) 
        : 0;

    return (
        <div className="animate-fade space-y-6">
            <header>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Dept. Intelligence Hub</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.username} | Institutional Oversight</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HODMetricCard icon={<Users />} title="Identified Learners" value={totalStudents} color="#6366f1" />
                <HODMetricCard icon={<TrendingUp />} title="Presence Rate" value={`${presentRate}%`} color="#10b981" />
                <HODMetricCard icon={<AlertTriangle />} title="Action Required" value={students.filter(s => s.status === 'Absent').length} color="#ef4444" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Node Activity Stream</h3>
                    <div className="space-y-4">
                        <DeptActivityItem msg="CSE Seminar attendance sync completed" time="15m ago" type="INFO" />
                        <DeptActivityItem msg="High absence alert in Node: SEM-04-B" time="2h ago" type="WARNING" />
                        <DeptActivityItem msg="Faculty authorization updated for MECH-01" time="4h ago" type="SUCCESS" />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Quick Protocols</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <ProtocolButton icon={<Download />} label="Download Registry" onClick={() => generateRegistryExport(students)} />
                        <ProtocolButton icon={<FileText />} label="Generate Report" onClick={() => generateStudentReport(students)} />
                        <ProtocolButton icon={<Activity />} label="Analytics" onClick={() => onNavigate('reports')} />
                        <ProtocolButton icon={<Users />} label="Leave Gateway" onClick={() => onNavigate('leave')} />
                    </div>
                </div>
            </div>
            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Institutional Registry</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[
                        "M Shiva Balaji Gouda",
                        "Shaik Irshan",
                        "Dasari Charan Venkat",
                        "Sidda Reddy",
                        "Harsha Reddy",
                        "Indravaraprasad"
                    ].map((name, idx) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
};

const HODMetricCard = ({ icon, title, value, color }) => (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ padding: '0.75rem', background: color + '15', color, borderRadius: '12px' }}>{icon}</div>
            <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>{title}</p>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</h4>
            </div>
        </div>
    </div>
);

const DeptActivityItem = ({ msg, time, type }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
        <div style={{ 
            width: '8px', height: '8px', borderRadius: '50%', 
            background: type === 'WARNING' ? 'var(--error-color)' : type === 'SUCCESS' ? 'var(--success-color)' : 'var(--primary-color)' 
        }}></div>
        <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{msg}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{time}</p>
        </div>
    </div>
);

const ProtocolButton = ({ icon, label, onClick }) => (
    <button 
        onClick={onClick}
        className="btn btn-secondary" 
        style={{ height: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}
    >
        <span style={{ color: 'var(--primary-color)' }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>{label}</span>
    </button>
);

export default HodDashboard;

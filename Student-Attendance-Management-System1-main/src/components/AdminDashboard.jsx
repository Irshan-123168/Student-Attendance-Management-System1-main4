import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, FileText, Settings, Activity, Download } from 'lucide-react';
import { generateStudentReport, generateRegistryExport } from '../utils/exportUtils';

const AdminDashboard = ({ users = [], students = [], onNavigate, searchQuery = '' }) => {
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Management Quick Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <QuickLink label="Download Registry" desc="Export CSV" onClick={() => generateRegistryExport(students)} />
                        <QuickLink label="Generate Report" desc="Full Ledger" onClick={() => generateStudentReport(students)} />
                        <QuickLink label="Security Audit" desc="Verified Trace" onClick={() => onNavigate('reports')} />
                        <QuickLink label="System Config" desc="Portal settings" onClick={() => onNavigate('settings')} />
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

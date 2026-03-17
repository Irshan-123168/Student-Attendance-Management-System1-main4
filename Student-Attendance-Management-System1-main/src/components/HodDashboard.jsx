import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ClipboardList, TrendingUp, UserCheck, AlertTriangle, Download, FileText, CheckCircle } from 'lucide-react';
import { generateStudentReport, generateRegistryExport } from '../utils/exportUtils';
import ClassSchedule from './ClassSchedule';

const HodDashboard = ({ user, students = [], onNavigate, searchQuery = '' }) => {
    // Dynamic Analysis
    const totalStudents = students.length;
    const presentRate = totalStudents > 0 
        ? Math.round((students.filter(s => s.status === 'Present').length / totalStudents) * 100) 
        : 0;

    const filteredStudents = students.filter(s => 
        (s.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
        (s.roll || '').toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    const teamMembers = [
        "M Shiva Balaji Gouda",
        "Shaik Irshan",
        "Dasari Charan Venkat",
        "Sidda Reddy",
        "Harsha Reddy",
        "Indravaraprasad"
    ].filter(name => (name || '').toLowerCase().includes((searchQuery || '').toLowerCase()));

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
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <ProtocolButton icon={<CheckCircle />} label="Mark Attendance" onClick={() => onNavigate('attendance')} />
                        <ProtocolButton icon={<FileText />} label="Generate Report" onClick={() => generateStudentReport(students)} />
                        <ProtocolButton icon={<Download />} label="Download Registry" onClick={() => generateRegistryExport(students)} />
                        <ProtocolButton icon={<Users />} label="Member Directory" onClick={() => onNavigate('students')} />
                        <ProtocolButton icon={<Activity />} label="Analytics" onClick={() => onNavigate('reports')} />
                        <ProtocolButton icon={<Users />} label="Leave Gateway" onClick={() => onNavigate('leave')} />
                    </div>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: 700 }}>Attendance Monitor</h3>
                    <button 
                        onClick={() => onNavigate('attendance')}
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    >
                        Mark Attendance
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Learner Identity</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Branch/Sem</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Subject</th>
                                 <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Protocol Status</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Academic Performance</th>
                                <th style={{ padding: '1rem', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Sync Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.slice(0, 5).map((student, i) => {
                                    const total = (student.presentCount || 0) + (student.absentCount || 0);
                                    const percentage = total > 0 ? ((student.presentCount / total) * 100).toFixed(1) : '0.0';
                                    
                                    return (
                                        <tr key={student.id || i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 700 }}>{student.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{student.roll}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{student.branch || 'CSE'}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>SEM-0{student.semester || '1'}</div>
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 600 }}>{student.subject || '-'}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span className={`badge badge-${student.status === 'Present' ? 'success' : student.status === 'Absent' ? 'danger' : 'warning'}`}>
                                                    {student.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--primary-color)', fontSize: '0.85rem' }}>{percentage}%</span>
                                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 600 }}>P:{student.presentCount || 0} A:{student.absentCount || 0}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>{student.time || '-'}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>No matching metrics found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ClassSchedule />

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

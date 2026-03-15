import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, CheckCircle, Clock, Download, FileText, FileSpreadsheet, Contact } from 'lucide-react';
import { generateStudentReport, generateRegistryExport, generateMasterReport } from '../utils/exportUtils';

const StaffDashboard = ({ user, students = [], onNavigateToAttendance }) => {
    // Dynamic Stats
    const totalStudents = students.length;
    const pendingActions = students.filter(s => s.status === 'Pending').length;
    
    // Derived activity log from actual student status updates
    const recentActivity = students
        .filter(s => s.status && s.time !== '-')
        .slice(0, 3)
        .map(s => ({
            label: `Attendance marked for ${s.name} (${s.roll})`,
            time: s.time,
            status: s.status === 'Present' ? 'COMPLETED' : 'ABSENT'
        }));

    return (
        <div className="animate-fade space-y-6">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome, {user?.username}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Faculty Dashboard & Management Terminal</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={() => generateMasterReport(students)}
                        className="btn btn-secondary"
                        style={{ height: '48px', padding: '0 1.5rem', fontWeight: 700, borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                    >
                        <FileSpreadsheet size={18} />
                        Export Master
                    </button>
                    <button 
                        onClick={() => onNavigateToAttendance('reports')}
                        className="btn btn-primary"
                        style={{ height: '48px', padding: '0 1.5rem', fontWeight: 700 }}
                    >
                        <Activity size={18} />
                        View Reports
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard icon={<Activity />} title="Live Classes" value="04" color="#6366f1" />
                <DashboardCard icon={<Users />} title="Total Students" value={totalStudents || "..."} color="#10b981" />
                <DashboardCard icon={<Clock />} title="Pending Records" value={pendingActions} color="#f59e0b" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Recent Class Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((act, i) => (
                                <ActivityItem key={act.label + i} label={act.label} time={act.time} status={act.status} />
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontWeight: 600 }}>No recent activity vectors detected.</p>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Session Protocols</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <ActionButton icon={<Users />} label="Student Registry" onClick={() => onNavigateToAttendance('students')} />
                        <ActionButton icon={<CheckCircle />} label="Mark Attendance" onClick={() => onNavigateToAttendance('attendance')} />
                        <ActionButton icon={<Contact size={20} />} label="Member Directory" onClick={() => onNavigateToAttendance('students')} />
                        <ActionButton icon={<Download />} label="Download Registry" onClick={() => generateRegistryExport(students)} />
                        <ActionButton icon={<FileText />} label="Generate Report" onClick={() => generateStudentReport(students)} />
                        <ActionButton icon={<Clock />} label="Leave Gateway" onClick={() => onNavigateToAttendance('leave')} />
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

const DashboardCard = ({ icon, title, value, color }) => (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: color + '15', color, borderRadius: '12px' }}>{icon}</div>
            <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-light)' }}>{title}</p>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</h4>
            </div>
        </div>
    </div>
);

const ActivityItem = ({ label, time, status }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div>
            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{time}</p>
        </div>
        <span className={`badge ${status === 'COMPLETED' ? 'badge-success' : 'badge-danger'}`}>{status}</span>
    </div>
);

const ActionButton = ({ icon, label, onClick }) => (
    <button 
        onClick={onClick}
        className="btn btn-secondary" 
        style={{ height: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}
    >
        <span style={{ color: 'var(--primary-color)' }}>{icon}</span>
        <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>{label}</span>
    </button>
);

export default StaffDashboard;

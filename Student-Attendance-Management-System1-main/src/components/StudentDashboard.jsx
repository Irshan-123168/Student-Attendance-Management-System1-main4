import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, UserCheck, Calendar, FileText, PieChart, Download } from 'lucide-react';
import { generateStudentReport, generateRegistryExport } from '../utils/exportUtils';
import { api } from '../api';

const StudentDashboard = ({ user, students = [], onNavigate }) => {
    // Attempt to find the current student's record in the registry
    const studentRecord = students.find(s => s.name === user?.username || s.roll === user?.rollNumber);
    
    // Aggregated Metrics
    const totalPresent = students.filter(s => s.status === 'Present').length;
    const totalStudents = students.length || 1;
    const globalAttendance = Math.round((totalPresent / totalStudents) * 100);

    const metrics = {
        personalStatus: studentRecord?.status || "Pending",
        personalTime: studentRecord?.time !== '-' ? studentRecord?.time : "N/A",
        globalTrend: `${globalAttendance}%`,
        totalNodes: totalStudents
    };

    return (
        <div className="animate-fade space-y-6">
            <header>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Student Portal: {user?.username}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Central Learning Terminal & Academic Trace</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard icon={<PieChart />} title="My Status" value={metrics.personalStatus} color={metrics.personalStatus === 'Present' ? '#10b981' : '#f59e0b'} />
                <MetricCard icon={<Clock />} title="Last Verified" value={metrics.personalTime} color="#6366f1" />
                <MetricCard icon={<Activity />} title="Global Trend" value={metrics.globalTrend} color="#8b5cf6" />
                <MetricCard icon={<UserCheck />} title="Total Registry" value={metrics.totalNodes} color="#10b981" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Weekly Attendance Trace</h3>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem' }}>
                        <Bar day="Mon" height="90%" active />
                        <Bar day="Tue" height="85%" active />
                        <Bar day="Wed" height="70%" />
                        <Bar day="Thu" height="95%" active />
                        <Bar day="Fri" height="80%" active />
                        <Bar day="Sat" height="40%" />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Registry Actions</h3>
                    <div className="space-y-3">
                        <ActionButton icon={<Download />} label="Download Registry" color="#6366f1" onClick={() => generateRegistryExport(students)} />
                        <ActionButton icon={<FileText />} label="Generate Report" color="#f59e0b" onClick={() => generateStudentReport(students)} />
                        <ActionButton icon={<UserCheck />} label="Update Identity" color="#10b981" onClick={() => onNavigate('profile')} />
                    </div>
                </div>
            </div>
            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Peer Registry</h3>
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

const MetricCard = ({ icon, title, value, color }) => (
    <div className="card" style={{ borderLeft: `4px solid ${color}` }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color }}>{icon}</div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</h4>
        </div>
    </div>
);

const Bar = ({ day, height, active }) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '100%', height: height, background: active ? 'var(--primary-gradient)' : 'var(--bg-tertiary)', borderRadius: '6px' }}></div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)' }}>{day}</span>
    </div>
);

const ActionButton = ({ icon, label, color, onClick }) => (
    <button 
        onClick={onClick}
        className="btn btn-secondary w-full" 
        style={{ justifyContent: 'flex-start', padding: '1.25rem', borderStyle: 'dashed', display: 'flex', alignItems: 'center', gap: '1rem' }}
    >
        <div style={{ color }}>{icon}</div>
        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{label}</span>
    </button>
);

export default StudentDashboard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, UserCheck, Calendar, FileText, PieChart, Download } from 'lucide-react';
import { generateStudentReport, generateRegistryExport } from '../utils/exportUtils';
import { api } from '../api';

const StudentDashboard = ({ user, students = [], onNavigate, searchQuery = '' }) => {
    // Attempt to find the current student's record in the registry
    const studentRecord = students.find(s => s.name === user?.username || s.roll === user?.rollNumber);
    
    // Aggregated Metrics
    const totalPresent = students.filter(s => s.status === 'Present').length;
    const totalStudents = students.length || 1;
    const globalAttendance = Math.round((totalPresent / totalStudents) * 100);

    const teamMembers = [
        "M Shiva Balaji Gouda",
        "Shaik Irshan",
        "Dasari Charan Venkat",
        "Sidda Reddy",
        "Harsha Reddy",
        "Indravaraprasad"
    ].filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));

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
                    <div style={{ height: '300px', padding: '1rem' }}>
                        <LineGraph data={[
                            { day: "Mon", value: 90 },
                            { day: "Tue", value: 85 },
                            { day: "Wed", value: 70 },
                            { day: "Thu", value: 95 },
                            { day: "Fri", value: 80 },
                            { day: "Sat", value: 40 }
                        ]} />
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
                        <p style={{ padding: '1rem', color: 'var(--text-light)', fontStyle: 'italic' }}>No matching peers found.</p>
                    )}
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

const LineGraph = ({ data }) => {
    const points = data.map((d, i) => `${(i * 100) / (data.length - 1)},${100 - d.value}`).join(' ');
    
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', paddingTop: '2rem' }}>
            <svg viewBox="0 0 100 110" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Area under line */}
                <polyline
                    fill="url(#lineGradient)"
                    stroke="none"
                    points={`0,100 ${points} 100,100`}
                />
                
                {/* Main Trace Line */}
                <polyline
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(99, 102, 241, 0.3))' }}
                />
                
                {/* Data Nodes */}
                {data.map((d, i) => (
                    <g key={i}>
                        <circle
                            cx={(i * 100) / (data.length - 1)}
                            cy={100 - d.value}
                            r="3"
                            fill="white"
                            stroke="var(--primary-color)"
                            strokeWidth="2"
                        />
                        <text
                            x={(i * 100) / (data.length - 1)}
                            y="112"
                            textAnchor="middle"
                            style={{ fontSize: '5px', fontWeight: 800, fill: 'var(--text-light)' }}
                        >
                            {d.day}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

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

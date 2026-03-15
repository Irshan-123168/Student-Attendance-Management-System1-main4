import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutGrid,
    Activity,
    FileBarChart,
    ClipboardList,
    Users,
    LogOut,
    ShieldCheck,
    Settings,
    UserCheck,
    Calendar,
    Menu,
    X,
    Bell,
    User,
    Home,
    Search,
    Trash2
} from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab, logout, user, onDeleteAccount, searchQuery, setSearchQuery }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const role = user?.role || 'STUDENT';

    const navItems = {
        ADMIN: [
            { id: 'admin-dashboard', label: 'Admin Hub', icon: <ShieldCheck size={20} /> },
            { id: 'students', label: 'Student Directory', icon: <Users size={20} /> },
            { id: 'reports', label: 'System Reports', icon: <FileBarChart size={20} /> },
            { id: 'curriculum', label: 'Curriculum Hub', icon: <Book size={20} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
        ],
        HOD: [
            { id: 'hod-dashboard', label: 'Overview', icon: <Home size={20} /> },
            { id: 'dashboard', label: 'Attendance Hub', icon: <LayoutGrid size={20} /> },
            { id: 'leave', label: 'Leave Gateway', icon: <ClipboardList size={20} /> },
            { id: 'curriculum', label: 'Curriculum', icon: <Book size={20} /> },
            { id: 'reports', label: 'Analytics', icon: <Activity size={20} /> },
            { id: 'profile', label: 'My Identity', icon: <User size={20} /> },
        ],
        TEACHER: [
            { id: 'staff-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
            { id: 'attendance', label: 'Mark Attendance', icon: <UserCheck size={20} /> },
            { id: 'leave', label: 'Leave Requests', icon: <ClipboardList size={20} /> },
            { id: 'curriculum', label: 'Curriculum Hub', icon: <Book size={20} /> },
            { id: 'reports', label: 'Class Analytics', icon: <FileBarChart size={20} /> },
            { id: 'profile', label: 'Account Settings', icon: <User size={20} /> },
        ],
        STUDENT: [
            { id: 'student-dashboard', label: 'My Terminal', icon: <Home size={20} /> },
            { id: 'schedule', label: 'Academic Routine', icon: <Calendar size={20} /> },
            { id: 'curriculum', label: 'Curriculum', icon: <Book size={20} /> },
            { id: 'leave', label: 'Leave Application', icon: <ClipboardList size={20} /> },
            { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
        ]
    };

    const currentNav = navItems[role] || navItems.STUDENT;

    return (
        <div className="app-container">
            {/* Mobile Toggle */}
            <button 
                className="lg:hidden" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 60, padding: '10px', background: 'white', borderRadius: '10px', border: '1px solid var(--border-color)' }}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                <div className="brand-logo">
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Activity size={24} />
                    </div>
                    <span>AttendFlow</span>
                </div>

                <div className="nav-section">
                    <p className="section-label">Institutional Portal</p>
                    <nav>
                        {currentNav.map(item => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div style={{ padding: '2rem', borderTop: '1px solid var(--border-color)' }}>
                    <p className="section-label">Account Controls</p>
                    <button onClick={logout} className="nav-item">
                        <LogOut size={20} />
                        Logout Session
                    </button>
                    <button onClick={onDeleteAccount} className="nav-item danger">
                        <Trash2 size={20} />
                        Terminate Node
                    </button>
                    
                    <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--primary-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>
                            {user?.username?.substring(0, 1).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>{user?.username || 'User'}</p>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>{role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                {/* Header */}
                <header className="top-header">
                    <div style={{ position: 'relative', width: '300px' }} className="hidden md:block">
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={18} />
                        <input 
                            type="text" 
                            className="form-input" 
                            style={{ paddingLeft: '3rem', height: '44px', background: 'var(--bg-secondary)', border: 'none' }}
                            placeholder="Search Node..." 
                            value={searchQuery || ''}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Bell size={22} className="text-gray-400" />
                            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: 'var(--error-color)', border: '2px solid white', borderRadius: '50%' }}></div>
                        </div>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg-secondary)', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={24} className="text-gray-400" />
                        </div>
                    </div>
                </header>

                <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;

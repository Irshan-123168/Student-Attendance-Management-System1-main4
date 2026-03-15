import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Eye, Trash2, Globe, Cpu, Lock } from 'lucide-react';

const PortalSettings = ({ onDeleteAccount }) => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="animate-fade space-y-8">
            <header>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Portal Configuration</h2>
                <p style={{ color: 'var(--text-secondary)' }}>System preferences and operational parameters</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Protocols */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--primary-color)' }}>
                            <Cpu size={24} />
                        </div>
                        <h3 style={{ fontWeight: 700 }}>Interface Protocols</h3>
                    </div>

                    <div className="space-y-6">
                        <ToggleItem 
                            icon={<Bell />} label="Telemetry Alerts" 
                            desc="Receive real-time notifications about node status"
                            active={notifications} onToggle={() => setNotifications(!notifications)}
                        />
                        <ToggleItem 
                            icon={<Eye />} label="Dark Interface" 
                            desc="Optimize visual output for low-light environments"
                            active={darkMode} onToggle={() => setDarkMode(!darkMode)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Globe size={20} className="text-gray-400" />
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Global Language</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Portal regional configuration</p>
                                </div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>ENGLISH (US)</span>
                        </div>
                    </div>
                </div>

                {/* Security Matrix */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--primary-color)' }}>
                            <Shield size={24} />
                        </div>
                        <h3 style={{ fontWeight: 700 }}>Security Matrix</h3>
                    </div>

                    <div className="space-y-4">
                        <button className="btn btn-secondary w-full" style={{ justifyContent: 'space-between', padding: '1.25rem' }}>
                            <div className="flex gap-3">
                                <Lock size={18} />
                                <span style={{ fontWeight: 600 }}>Update Access Key</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)' }}>PIN REQUIRED</span>
                        </button>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fef2f2', borderRadius: '16px', border: '1px solid #fee2e2' }}>
                            <h4 style={{ color: '#991b1b', fontWeight: 700, marginBottom: '0.5rem' }}>Critical Zone</h4>
                            <p style={{ fontSize: '0.8125rem', color: '#991b1b', opacity: 0.8, marginBottom: '1rem' }}>
                                Account termination is an irreversible operational command.
                            </p>
                            <button 
                                onClick={onDeleteAccount}
                                style={{ width: '100%', padding: '0.75rem', background: 'white', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}
                            >
                                <Trash2 size={16} />
                                Terminate Account Node
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToggleItem = ({ icon, label, desc, active, onToggle }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ color: 'var(--text-light)' }}>{icon}</div>
            <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{desc}</p>
            </div>
        </div>
        <button 
            onClick={onToggle}
            style={{ 
                width: '44px', height: '24px', borderRadius: '12px', 
                background: active ? 'var(--primary-gradient)' : '#e5e7eb',
                position: 'relative', border: 'none', cursor: 'pointer', transition: 'all 0.3s'
            }}
        >
            <div style={{ 
                width: '18px', height: '18px', background: 'white', borderRadius: '50%',
                position: 'absolute', top: '3px', left: active ? '23px' : '3px', transition: 'all 0.3s'
            }}></div>
        </button>
    </div>
);

export default PortalSettings;

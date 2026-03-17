import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bell, Eye, Trash2, Globe, Cpu, Lock, XCircle, Send, CheckCircle } from 'lucide-react';
import { api } from '../api';

const PortalSettings = ({ user, settings, setSettings, onDeleteAccount }) => {
    const [isUpdatingKey, setIsUpdatingKey] = useState(false);
    const [newKey, setNewKey] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleUpdateKey = async (e) => {
        e.preventDefault();
        if (!newKey) return;
        
        try {
            await api.updatePassword(user.id, newKey);
            setStatus({ type: 'success', message: 'Access Key updated successfully' });
            setNewKey('');
            setTimeout(() => {
                setIsUpdatingKey(false);
                setStatus({ type: '', message: '' });
            }, 2000);
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    const toggleNotification = () => {
        setSettings(prev => ({ ...prev, notifications: !prev.notifications }));
    };

    const toggleDarkMode = () => {
        setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
    };

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
                            active={settings.notifications} onToggle={toggleNotification}
                        />
                        <ToggleItem 
                            icon={<Eye />} label="Dark Interface" 
                            desc="Optimize visual output for low-light environments"
                            active={settings.darkMode} onToggle={toggleDarkMode}
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
                            <Lock size={24} />
                        </div>
                        <h3 style={{ fontWeight: 700 }}>Security Matrix</h3>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={() => setIsUpdatingKey(true)}
                            className="btn btn-secondary w-full" style={{ justifyContent: 'space-between', padding: '1.25rem' }}
                        >
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
                                style={{ width: '100%', padding: '0.75rem', background: 'white', border: '1px solid #fca5a5', borderRadius: '10px', color: '#dc2626', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                                Terminate Account Node
                            </button>
                        </div>
                    </div>
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

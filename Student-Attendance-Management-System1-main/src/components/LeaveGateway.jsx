import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Plus, Clock, CheckCircle, XCircle, FileText, Send } from 'lucide-react';

const LeaveGateway = ({ user }) => {
    const [isApplying, setIsApplying] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [requests, setRequests] = useState([
        { id: 1, type: 'Medical', reason: 'Institutional Health Recovery', status: 'Approved', date: '2024-03-10' },
        { id: 2, type: 'Personal', reason: 'External Node Synchronization', status: 'Pending', date: '2024-03-14' }
    ]);

    const [formData, setFormData] = useState({
        type: 'Educational Sync',
        duration: 1,
        startDate: new Date().toISOString().split('T')[0],
        reason: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            id: Date.now(),
            type: formData.type.split(' ')[0], // Extract first word
            reason: formData.reason,
            status: 'Approved',
            date: formData.startDate
        };
        setRequests([newRequest, ...requests]);
        setSuccessMessage(true);
        setIsApplying(false);
        setFormData({ type: 'Educational Sync', duration: 1, reason: '' });
        
        setTimeout(() => setSuccessMessage(false), 3000);
    };

    const handleApprove = (id) => {
        setRequests(requests.map(req => 
            req.id === id ? { ...req, status: 'Approved' } : req
        ));
    };

    const isAuthority = user?.role === 'HOD' || user?.role === 'ADMIN';

    return (
        <div className="animate-fade space-y-8">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Leave Gateway</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage permission protocols and absence telemetry</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <AnimatePresence>
                        {successMessage && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                style={{ color: 'var(--success-color)', fontWeight: 800, fontSize: '0.875rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px' }}
                            >
                                <CheckCircle size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Sent Successfully
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button 
                        onClick={() => setIsApplying(true)}
                        className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '14px' }}
                    >
                        <Plus size={20} />
                        New Permission
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Ledger */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Active Ledger</h3>
                    {requests.map((req, idx) => (
                        <motion.div 
                            key={req.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card"
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                <div style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '1rem' }}>{req.type} Authorization</p>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-light)', fontWeight: 500 }}>{req.reason}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={`badge badge-${req.status === 'Approved' ? 'success' : 'warning'}`}>
                                        {req.status}
                                    </span>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem', fontWeight: 600 }}>{req.date}</p>
                                </div>
                                {isAuthority && req.status === 'Pending' && (
                                    <button 
                                        onClick={() => handleApprove(req.id)}
                                        className="btn btn-primary"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', borderRadius: '8px' }}
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Gateway Stats */}
                <div className="space-y-6">
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Oversight Stats</h3>
                    <div className="card" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none' }}>
                        <p style={{ opacity: 0.8, fontSize: '0.875rem', fontWeight: 600 }}>Authorized Absence</p>
                        <h4 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem' }}>14 Days</h4>
                        <div style={{ marginTop: '1.5rem', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
                            <div style={{ width: '70%', height: '100%', background: 'white', borderRadius: '3px' }}></div>
                        </div>
                        <p style={{ fontSize: '0.75rem', marginTop: '1rem', fontWeight: 600 }}>REMAINING QUOTA: 06 DAYS</p>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {isApplying && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="card" 
                            style={{ maxWidth: '500px', width: '100%', padding: '2.5rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontWeight: 800, fontSize: '1.25rem' }}>Permission Protocol</h3>
                                <button onClick={() => setIsApplying(false)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                                    <XCircle size={24} />
                                </button>
                            </div>
                            
                             <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Classification</label>
                                    <select 
                                        className="form-input"
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    >
                                        <option>Educational Sync</option>
                                        <option>Medical Override</option>
                                        <option>Personal Node Lag</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="form-label">Start Date</label>
                                        <input 
                                            type="date" className="form-input"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Duration (Days)</label>
                                        <input 
                                            type="number" className="form-input" placeholder="1" 
                                            value={formData.duration}
                                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Justification Memo</label>
                                    <textarea 
                                        className="form-input" rows="3" placeholder="Describe the reason for absence..."
                                        value={formData.reason}
                                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full" style={{ height: '52px', marginTop: '1rem' }}>
                                    <Send size={18} />
                                    Initiate Request
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LeaveGateway;

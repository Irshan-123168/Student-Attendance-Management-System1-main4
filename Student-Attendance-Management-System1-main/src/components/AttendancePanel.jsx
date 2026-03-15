import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ClipboardList, CheckCircle2, XCircle, Clock, Users, Edit2, Save, X } from 'lucide-react';

const AttendancePanel = ({ students, updateStatus, searchQuery, onUpdateStudent }) => {
    const [editingStudent, setEditingStudent] = React.useState(null);
    const [editForm, setEditForm] = React.useState({ name: '', roll: '', studentClass: '', status: '' });

    const handleEditStart = (s) => {
        setEditingStudent(s.id);
        setEditForm({ name: s.name, roll: s.roll, studentClass: s.studentClass, status: s.status });
    };

    const handleSaveEdit = async () => {
        if (onUpdateStudent) {
            await onUpdateStudent(editingStudent, editForm);
        } else if (updateStatus && editForm.status !== students.find(s => s.id === editingStudent)?.status) {
            await updateStatus(editingStudent, editForm.status);
        }
        setEditingStudent(null);
    };

    const query = (searchQuery || '').toLowerCase();
    const filteredStudents = (students || []).filter(s => 
        (s.name || '').toLowerCase().includes(query) || 
        (s.roll || '').toLowerCase().includes(query)
    );

    const stats = {
        total: filteredStudents.length,
        present: filteredStudents.filter(s => s.status === 'Present').length,
        absent: filteredStudents.filter(s => s.status === 'Absent').length,
        late: filteredStudents.filter(s => s.status === 'Late').length
    };

    return (
        <div className="animate-fade space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Attendance Central</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage and synchronize student attendance records</p>
                </div>
                <div className="badge badge-info shadow-sm">Updated Just Now</div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard icon={<Users size={24} />} title="Registry Nodes" value={stats.total} color="#6366f1" />
                <StatCard icon={<CheckCircle2 size={24} />} title="Authorized" value={stats.present} color="#10b981" />
                <StatCard icon={<XCircle size={24} />} title="Restricted" value={stats.absent} color="#ef4444" />
                <StatCard icon={<Clock size={24} />} title="Delayed" value={stats.late} color="#f59e0b" />
            </div>

            {/* Registry Table */}
            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Student Registry Ledger</h3>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', fontWeight: 600 }}>SYNC STATUS: OPTIMAL</div>
                </div>
                
                <div className="table-container" style={{ border: 'none' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Identity Plate</th>
                                <th>Registry Roll</th>
                                <th>Operational Class</th>
                                <th>Status Vector</th>
                                <th>Command Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredStudents.map((s, idx) => (
                                    <motion.tr 
                                        key={s.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <User size={18} className="text-gray-400" />
                                                </div>
                                                <span style={{ fontWeight: 600 }}>{s.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 700, color: 'var(--text-light)' }}>{s.roll}</td>
                                        <td style={{ fontWeight: 600 }}>{s.studentClass}</td>
                                        <td>
                                            <span className={`badge badge-${s.status === 'Present' ? 'success' : s.status === 'Absent' ? 'danger' : 'warning'}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <ControlButton type="Present" active={s.status === 'Present'} onClick={() => updateStatus(s.id, 'Present')} />
                                                <ControlButton type="Absent" active={s.status === 'Absent'} onClick={() => updateStatus(s.id, 'Absent')} />
                                                <ControlButton type="Late" active={s.status === 'Late'} onClick={() => updateStatus(s.id, 'Late')} />
                                                <button 
                                                    onClick={() => handleEditStart(s)}
                                                    className="btn btn-secondary" 
                                                    style={{ width: '36px', height: '36px', padding: 0, borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--primary-color)' }}
                                                    title="Edit Node Details"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal Overlay */}
            <AnimatePresence>
                {editingStudent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
                            backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', 
                            alignItems: 'center', justifyContent: 'center', padding: '1rem'
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="card"
                            style={{ width: '100%', maxWidth: '450px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Edit Student Node</h3>
                                <button onClick={() => setEditingStudent(null)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', marginBottom: '0.5rem' }}>IDENTITY NAME</label>
                                    <input 
                                        type="text" className="form-input" 
                                        value={editForm.name} 
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', marginBottom: '0.5rem' }}>REGISTRY ROLL</label>
                                    <input 
                                        type="text" className="form-input" 
                                        value={editForm.roll} 
                                        onChange={(e) => setEditForm({...editForm, roll: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', marginBottom: '0.5rem' }}>OPERATIONAL CLASS</label>
                                    <input 
                                        type="text" className="form-input" 
                                        value={editForm.studentClass} 
                                        onChange={(e) => setEditForm({...editForm, studentClass: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', marginBottom: '0.5rem' }}>STATUS VECTOR</label>
                                    <select 
                                        className="form-input" 
                                        value={editForm.status} 
                                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                    >
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                        <option value="Late">Late</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setEditingStudent(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                                <button onClick={handleSaveEdit} className="btn btn-primary" style={{ flex: 1 }}>
                                    <Save size={18} /> Sync Update
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
    <div className="card stat-card" style={{ borderLeft: `4px solid ${color}` }}>
        <div className="icon-box" style={{ background: color + '15', color }}>
            {icon}
        </div>
        <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{value}</p>
        </div>
    </div>
);

const ControlButton = ({ type, active, onClick }) => {
    const colors = {
        Present: { bg: '#dcfce7', text: '#166534', icon: <CheckCircle2 size={16} /> },
        Absent: { bg: '#fee2e2', text: '#991b1b', icon: <XCircle size={16} /> },
        Late: { bg: '#fef3c7', text: '#92400e', icon: <Clock size={16} /> }
    };
    
    return (
        <button 
            onClick={onClick}
            style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: active ? 'none' : '1px solid var(--border-color)',
                background: active ? colors[type].bg : 'white',
                color: active ? colors[type].text : 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
            title={type}
        >
            {colors[type].icon}
        </button>
    );
};

export default AttendancePanel;

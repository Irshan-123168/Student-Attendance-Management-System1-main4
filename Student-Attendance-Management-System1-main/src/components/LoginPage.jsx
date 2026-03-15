import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, Eye, EyeOff, ArrowRight, Mail } from 'lucide-react';
import { api } from '../api';

const LoginPage = ({ onLogin, onSwitchToRegister, onBackToHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [recoveryMessage, setRecoveryMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await api.login(email, password);
            if (user) onLogin(user);
            else setError('Authentication failed. Please verify your credentials.');
        } catch (err) {
            setError(err.message || 'Server connection failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setRecoveryMessage('');
        setIsLoading(true);
        try {
            const result = await api.forgotPassword(email);
            setRecoveryMessage(result.message || 'If your email is registered, you will receive your credentials shortly.');
        } catch (err) {
            setError(err.message || 'Recovery request failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            style={{ 
                minHeight: '100vh', 
                background: 'var(--primary-gradient)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Orbs */}
            <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', top: '-250px', right: '-100px', filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', bottom: '-200px', left: '-100px', filter: 'blur(80px)' }}></div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ 
                    maxWidth: '450px', 
                    width: '100%', 
                    padding: '3rem', 
                    background: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '100%', maxWidth: '280px', height: 'auto', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', padding: '12px' }}>
                        <img src="/src/assets/logo.png" alt="Sanjay Gandhi Polytechnic Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        {isForgotMode ? 'Recover Access' : 'Welcome Back'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {isForgotMode ? 'Enter your email to retrieve your key' : 'Sign in to access your portal'}
                    </p>
                </div>

                {!isForgotMode ? (
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="form-group">
                            <label className="form-label">Role Configuration</label>
                            <select 
                                className="form-input"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ background: 'white' }}
                            >
                                <option value="STUDENT">Institutional Learner</option>
                                <option value="TEACHER">Staff Faculty</option>
                                <option value="HOD">Department Head</option>
                                <option value="ADMIN">System Administrator</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input 
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '3rem' }}
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setIsForgotMode(true);
                                        setError('');
                                    }}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-input"
                                    style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div style={{ padding: '0.75rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#991b1b', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full" 
                            style={{ height: '52px', fontSize: '1rem', marginTop: '1rem' }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-5">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input 
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '3rem' }}
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {recoveryMessage && (
                            <div style={{ padding: '0.75rem', background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px', color: '#065f46', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                                {recoveryMessage}
                            </div>
                        )}

                        {error && (
                            <div style={{ padding: '0.75rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#991b1b', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full" 
                            style={{ height: '52px', fontSize: '1rem', marginTop: '1rem' }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending Access Key...' : 'Request Credentials'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>

                        <button 
                            type="button" 
                            onClick={() => {
                                setIsForgotMode(false);
                                setError('');
                                setRecoveryMessage('');
                            }}
                            style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                            Back to Sign In
                        </button>
                    </form>
                )}

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Don't have an account? {' '}
                        <button onClick={onSwitchToRegister} style={{ color: 'var(--primary-color)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                            Get Started
                        </button>
                    </p>
                    <button onClick={onBackToHome} style={{ marginTop: '1.5rem', color: 'var(--text-light)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>
                        &larr; Return to Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

import React, { useState, useRef } from 'react'

import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {
const [selectedFile, setSelectedFile] = useState(null)
    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

const handleGenerateReport = async (e) => {
  e.preventDefault()

  if (loading) return  // 🔥 prevents double click

  console.log("BUTTON CLICKED")

  const resumeFile = selectedFile

  console.log("FILE 👉", resumeFile)

  if (!resumeFile && !selfDescription) {
    alert("Upload resume or write self description")
    return
  }

 const data = await generateReport({
  jobDescription,
  selfDescription,
  resumeFile
})

console.log("RESPONSE 👉", data)

// 🔥 fix navigation
if (data && (data._id || data.id)) {
  const id = data._id || data.id
  navigate(`/interview/${id}`)
} else {
  console.error("❌ ID not found in response", data)
}
}
    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-12'>

            {/* Page Header */}
            <header className='text-center mb-12'>
                <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3'>
                    Create Your Custom{' '}
                    <span className='highlight bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent'>
                        Interview Plan
                    </span>
                </h1>
                <p className='text-slate-400 text-lg max-w-lg mx-auto'>
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className='interview-card max-w-6xl mx-auto rounded-2xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-black/50 mb-12'>
                <div className='interview-card__body flex flex-col lg:flex-row'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left flex-1 p-8 lg:border-r border-slate-700/50'>
                        <div className='panel__header flex items-center gap-3 mb-5'>
                            <span className='panel__icon w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className='text-lg font-bold text-white'>Target Job Description</h2>
                            <span className='badge badge--required ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea w-full rounded-xl p-4 text-sm bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600 resize-none outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all leading-relaxed'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                            rows={14}
                        />
                        <div className='char-counter text-xs text-slate-600 text-right mt-2'>0 / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider hidden lg:block' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right flex-1 p-8'>
                        <div className='panel__header flex items-center gap-3 mb-5'>
                            <span className='panel__icon w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className='text-lg font-bold text-white'>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section mb-5'>
                            <label className='section-label flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2.5'>
                                Upload Resume
                                <span className='badge badge--best text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'>Best Results</span>
                            </label>
                            <label className='dropzone flex flex-col items-center justify-center gap-2 rounded-xl p-7 text-center cursor-pointer border-2 border-dashed border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-200' htmlFor='resume'>
                                <span className='dropzone__icon w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='dropzone__title text-sm font-semibold text-slate-300'>Click to upload or drag &amp; drop</p>
                                <p className='dropzone__subtitle text-xs text-slate-500'>PDF or DOCX (Max 5MB)</p>
                                {selectedFile && (
  <p className="text-green-400 text-xs mt-2">
    Selected: {selectedFile.name}
  </p>
)}
                         <input
  ref={resumeInputRef}
  hidden
  type='file'
  id='resume'
  name='resume'
  accept='.pdf,.docx'
  onChange={(e) => {
    const file = e.target.files[0]
    console.log("Selected file:", file)
    setSelectedFile(file)
  }}
/>
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider flex items-center gap-3 my-5'>
                            <div className='flex-1 h-px bg-slate-700/60' />
                            <span className='text-xs font-bold text-slate-600 tracking-widest uppercase'>OR</span>
                            <div className='flex-1 h-px bg-slate-700/60' />
                        </div>

                        {/* Quick Self-Description */}
                        <div className='self-description mb-5'>
                            <label className='section-label block text-sm font-semibold text-slate-300 mb-2.5' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short w-full rounded-xl p-4 text-sm bg-slate-800/60 border border-slate-700/50 text-slate-200 placeholder-slate-600 resize-none outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all leading-relaxed'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                rows={5}
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box flex items-start gap-3 rounded-xl p-4 bg-blue-500/5 border border-blue-500/15'>
                            <span className='info-box__icon mt-0.5 shrink-0 text-blue-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#0f172a" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#0f172a" strokeWidth="2" /></svg>
                            </span>
                            <p className='text-xs text-slate-400 leading-relaxed'>Either a <strong className='text-slate-200 font-semibold'>Resume</strong> or a <strong className='text-slate-200 font-semibold'>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 border-t border-slate-700/50 bg-slate-950/40'>
                    <span className='footer-info flex items-center gap-2 text-xs text-slate-500'>
                        <span className='w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse' />
                        AI-Powered Strategy Generation &bull; Approx 30s
                    </span>
                    <button
                     type="button"
                        onClick={handleGenerateReport}
                        className='generate-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-900/40 hover:shadow-blue-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports max-w-6xl mx-auto'>
                    <h2 className='text-xl font-bold text-white mb-5'>My Recent Interview Plans</h2>
                    <ul className='reports-list grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item rounded-xl p-5 cursor-pointer border border-slate-700/50 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-800/60 hover:-translate-y-0.5 transition-all duration-200 shadow-md' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 className='text-sm font-bold text-white mb-1 leading-snug'>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta text-xs text-slate-500 mb-3'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${report.matchScore >= 80 ? 'score--high bg-emerald-500/10 border-emerald-500/25 text-emerald-400' : report.matchScore >= 60 ? 'score--mid bg-amber-500/10 border-amber-500/25 text-amber-400' : 'score--low bg-rose-500/10 border-rose-500/25 text-rose-400'}`}>
                                    Match Score: {report.matchScore}%
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer flex items-center justify-center gap-6 mt-14 pt-6 border-t border-slate-800 max-w-6xl mx-auto'>
                <a href='#' className='text-xs text-slate-600 hover:text-slate-300 transition-colors'>Privacy Policy</a>
                <a href='#' className='text-xs text-slate-600 hover:text-slate-300 transition-colors'>Terms of Service</a>
                <a href='#' className='text-xs text-slate-600 hover:text-slate-300 transition-colors'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home
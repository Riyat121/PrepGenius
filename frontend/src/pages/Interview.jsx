import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate, useParams } from 'react-router'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div
                className="flex items-start gap-3 p-4 cursor-pointer select-none"
                onClick={() => setOpen(o => !o)}
            >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center">
                    Q{index + 1}
                </span>
                <p className="flex-1 text-slate-800 font-medium text-sm leading-relaxed pt-1">
                    {item.question}
                </p>
                <span className={`flex-shrink-0 mt-1 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 space-y-4">
                    <div className="space-y-1.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 tracking-wide">
                            Intention
                        </span>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.intention}</p>
                    </div>
                    <div className="space-y-1.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 tracking-wide">
                            Model Answer
                        </span>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {day.day}
            </span>
            <h3 className="text-slate-800 font-semibold text-base">{day.focus}</h3>
        </div>
        <ul className="space-y-2 pl-1">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { interviewId } = useParams()
    const { report, getReportById, getResumePdf, loading } = useInterview()

  useEffect(() => {
    if (!interviewId) return;

    const fetchData = async () => {
        await getReportById(interviewId)
    }

    fetchData()
}, [interviewId])
if (loading && !report) {
  return <h1>Loading...</h1>
}


    if (!report) {
        return <h1 className="text-center mt-20 text-slate-700 text-xl font-semibold">No Report Found</h1>
    }
console.log("ID:", interviewId)
console.log("Report:", report)
console.log("Loading:", loading)
    const scoreColor =
        report.matchScore >= 80 ? 'text-emerald-600' :
            report.matchScore >= 60 ? 'text-amber-500' : 'text-rose-500'

    const scoreBg =
        report.matchScore >= 80 ? 'border-emerald-400 shadow-emerald-100' :
            report.matchScore >= 60 ? 'border-amber-400 shadow-amber-100' : 'border-rose-400 shadow-rose-100'

    const severityColor = (severity) => {
        if (severity === 'high') return 'bg-rose-50 text-rose-700 border border-rose-200'
        if (severity === 'mid') return 'bg-amber-50 text-amber-700 border border-amber-200'
        return 'bg-sky-50 text-sky-700 border border-sky-200'
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex h-screen overflow-hidden">

                {/* ── Left Nav ── */}
                <nav className="w-56 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between py-6 px-3">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
                            Sections
                        </p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                                    ${activeNav === item.id
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                    }`}
                            >
                                <span className={activeNav === item.id ? 'text-indigo-500' : 'text-slate-400'}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold transition-colors duration-150 shadow-sm"
                    >
                        <svg height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                        </svg>
                        Download Resume
                    </button>
                </nav>

                {/* ── Center Content ── */}
                <main className="flex-1 overflow-y-auto px-8 py-8">
                    {activeNav === 'technical' && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Technical Questions</h2>
                                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                                    {report.technicalQuestions.length} questions
                                </span>
                            </div>
                            <div className="space-y-3">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Behavioral Questions</h2>
                                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                                    {report.behavioralQuestions.length} questions
                                </span>
                            </div>
                            <div className="space-y-3">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Preparation Road Map</h2>
                                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                                    {report.preparationPlan.length}-day plan
                                </span>
                            </div>
                            <div className="space-y-3">
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Right Sidebar ── */}
                <aside className="w-60 flex-shrink-0 bg-white border-l border-slate-200 py-8 px-5 flex flex-col gap-6">

                    {/* Match Score */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Match Score</p>
                        <div className={`w-28 h-28 rounded-full border-4 ${scoreBg} shadow-lg flex flex-col items-center justify-center`}>
                            <span className={`text-3xl font-extrabold leading-none ${scoreColor}`}>{report.matchScore}</span>
                            <span className={`text-sm font-semibold ${scoreColor}`}>%</span>
                        </div>
                        <p className="text-xs text-slate-500 text-center">Strong match for this role</p>
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* Skill Gaps */}
                    <div className="space-y-3">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Skill Gaps</p>
                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${severityColor(gap.severity)}`}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview
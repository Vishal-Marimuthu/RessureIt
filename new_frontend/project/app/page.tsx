"use client";

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, XCircle, AlertTriangle, ArrowRight, BookOpen, Download, HelpCircle, Loader2 } from 'lucide-react';

export default function DemoPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [results, setResults] = useState<any>(null);
  const [evalScores, setEvalScores] = useState<Record<number, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jdFile) {
      alert("Please upload both a Resume and a Job Description.");
      return;
    }

    setLoading(true);
    setResults(null);
    setShowScore(false);
    setEvalScores({});

    try {
      const statuses = [
        "Extracting documents...",
        "Analyzing job requirements...",
        "Analyzing candidate skills...",
        "Comparing skills...",
        "Preparing recommendations...",
        "Generating resume..."
      ];
      
      let step = 0;
      const statusInterval = setInterval(() => {
        if (step < statuses.length) {
          setStatusText(statuses[step]);
          step++;
        }
      }, 3000);

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jd", jdFile);

      const response = await fetch("http://localhost:8002/api/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(statusInterval);
      
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      alert(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResume = () => {
    if (!results?.ats_friendly_resume) return;
    const blob = new Blob([results.ats_friendly_resume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.candidate_profile.name.replace(/\s+/g, '_')}_ATS_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calculateScore = () => {
    const total = results.knowledge_evaluation.length;
    const correct = Object.values(evalScores).filter(v => v).length;
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center font-sans">
        <div className="w-24 h-24 relative mb-8">
          <div className="absolute inset-0 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-l-4 border-r-4 border-purple-500 rounded-full animate-spin animate-reverse"></div>
          <Loader2 className="absolute inset-0 m-auto text-white w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
          {statusText || "Processing..."}
        </h2>
      </div>
    );
  }

  if (results) {
    const matchedCount = results.skill_matches.filter((m: any) => m.category === 'MATCHED').length;
    const partialCount = results.skill_matches.filter((m: any) => m.category === 'PARTIAL').length;
    const missingCount = results.skill_matches.filter((m: any) => m.category === 'MISSING').length;
    const requiredTotal = results.jd_profile.required_skills.length;

    return (
      <div className="min-h-screen bg-[#0A0A0B] text-slate-300 font-sans p-8 md:p-16">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">YOUR RESSURE REPORT</h1>
            <p className="text-xl text-slate-400">Target Role: <span className="text-blue-400 font-semibold">{results.jd_profile.role}</span></p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-bold text-white mb-2">{requiredTotal}</span>
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Required Skills</span>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-900/50 p-6 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-bold text-emerald-400 mb-2">{matchedCount}</span>
              <span className="text-sm font-medium text-emerald-500/80 uppercase tracking-wider">Matched</span>
            </div>
            <div className="bg-amber-950/30 border border-amber-900/50 p-6 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-bold text-amber-400 mb-2">{partialCount}</span>
              <span className="text-sm font-medium text-amber-500/80 uppercase tracking-wider">Partial</span>
            </div>
            <div className="bg-rose-950/30 border border-rose-900/50 p-6 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-bold text-rose-400 mb-2">{missingCount}</span>
              <span className="text-sm font-medium text-rose-500/80 uppercase tracking-wider">Missing</span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-purple-500/20 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <AlertTriangle className="text-purple-400" />
              MAKE YOUR RESUME A SURE HIT
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {results.top_3_actions.map((action: str, idx: number) => (
                <div key={idx} className="bg-black/40 p-6 rounded-2xl border border-white/5 relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold border border-purple-500/30">
                    0{idx + 1}
                  </div>
                  <p className="text-slate-200 font-medium mt-2">{action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><CheckCircle className="text-emerald-400 w-5 h-5"/> MATCHED SKILLS</h3>
              <div className="flex flex-wrap gap-3">
                {results.gap_analysis.strong_matches.map((s: str, i: number) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                    {s}
                  </span>
                ))}
                {results.gap_analysis.strong_matches.length === 0 && <span className="text-slate-500">None</span>}
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2 pt-4"><AlertTriangle className="text-amber-400 w-5 h-5"/> PARTIAL SKILLS</h3>
              <div className="flex flex-wrap gap-3">
                {results.gap_analysis.partial_matches.map((s: str, i: number) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium">
                    {s}
                  </span>
                ))}
                {results.gap_analysis.partial_matches.length === 0 && <span className="text-slate-500">None</span>}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><XCircle className="text-rose-400 w-5 h-5"/> MISSING SKILLS</h3>
              <div className="flex flex-wrap gap-3">
                {results.gap_analysis.missing_required_skills.map((s: str, i: number) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-sm font-medium">
                    {s}
                  </span>
                ))}
                {results.gap_analysis.missing_required_skills.length === 0 && <span className="text-slate-500">None</span>}
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2 pt-4"><HelpCircle className="text-blue-400 w-5 h-5"/> PREFERRED GAPS</h3>
              <div className="flex flex-wrap gap-3">
                {results.gap_analysis.missing_preferred_skills.map((s: str, i: number) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium">
                    {s}
                  </span>
                ))}
                {results.gap_analysis.missing_preferred_skills.length === 0 && <span className="text-slate-500">None</span>}
              </div>
            </div>
          </div>

          {/* ATS Resume & Learning Roadmap Actions */}
          <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-slate-800">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">ATS-Friendly Resume</h3>
                <p className="text-slate-400 mb-6">A clean, truthful, structure optimized for automated tracking systems.</p>
              </div>
              <button 
                onClick={handleDownloadResume}
                className="flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-full font-bold transition-all"
              >
                <Download className="w-5 h-5" />
                View ATS-Friendly Resume
              </button>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Learning Roadmap</h3>
                <p className="text-slate-400 mb-6">Targeted resources to quickly close your specific skill gaps.</p>
              </div>
              <button 
                onClick={() => document.getElementById('learning-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-full font-bold transition-all"
              >
                <BookOpen className="w-5 h-5" />
                View Learning Roadmap
              </button>
            </div>
          </div>

          {/* Learning Roadmap Section */}
          <div id="learning-section" className="pt-16 pb-8">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Learning Roadmap</h2>
            <div className="space-y-8">
              {results.learning_roadmap.map((lr: any, idx: number) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h3 className="text-2xl font-bold text-blue-400">{lr.skill}</h3>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-300">Current: {lr.current_level}</span>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                      <span className="text-sm bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300">Target: {lr.target_level}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-6 text-lg">{lr.learning_objective}</p>
                  
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Resources</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {lr.resources.map((res: any, rIdx: number) => (
                      <a 
                        key={rIdx} 
                        href={res.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between bg-black/40 hover:bg-black/60 border border-white/5 p-4 rounded-xl transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{res.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{res.type}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {results.learning_roadmap.length === 0 && (
                <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4 opacity-50" />
                  <p className="text-lg text-slate-400">No major gaps identified! You are highly qualified.</p>
                </div>
              )}
            </div>
          </div>

          {/* Assessment Section */}
          <div className="pt-8 pb-24 border-t border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-2">Knowledge Evaluation</h2>
            <p className="text-slate-400 mb-8">A lightweight demo evaluation based on the required skills for this role.</p>
            
            <div className="space-y-6 mb-10">
              {results.knowledge_evaluation.map((q: any, idx: number) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 block">{q.skill}</span>
                      <p className="text-lg text-slate-200">{q.question}</p>
                    </div>
                    {showScore && (
                      <div className="ml-4 flex-shrink-0">
                        {evalScores[idx] ? (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">
                            <XCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {!showScore && (
                    <div className="mt-6 flex gap-4">
                      <button 
                        onClick={() => setEvalScores(prev => ({ ...prev, [idx]: true }))}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${evalScores[idx] === true ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                      >
                        I know this
                      </button>
                      <button 
                        onClick={() => setEvalScores(prev => ({ ...prev, [idx]: false }))}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${evalScores[idx] === false ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                      >
                        I need to review
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showScore ? (
              <button 
                onClick={() => setShowScore(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20"
              >
                Submit Assessment
              </button>
            ) : (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-4 border-purple-500/30 mb-6">
                  <span className="text-4xl font-black text-white">{calculateScore().percentage}%</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Assessment Score: {calculateScore().correct} / {calculateScore().total}</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">Based on the questions answered in this evaluation. This is a demo-level assessment to identify review areas.</p>
                <button 
                  onClick={() => { setShowScore(false); setEvalScores({}); }}
                  className="bg-white text-black hover:bg-slate-200 px-8 py-3 rounded-full font-bold transition-all"
                >
                  Retake Assessment
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // Initial Landing State
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none"></div>

      <div className="text-center space-y-4 mb-16 relative z-10">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
          RESSURE <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">AI</span>
        </h1>
        <p className="text-2xl text-slate-400 font-medium tracking-wide">Make your resume a sure hit.</p>
      </div>

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Upload your Resume
            </h3>
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 rounded-2xl cursor-pointer transition-all">
              {resumeFile ? (
                <div className="text-center p-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-300 font-medium truncate max-w-[200px]">{resumeFile.name}</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">Choose PDF</p>
                </div>
              )}
              <input type="file" accept=".pdf" className="hidden" onChange={e => e.target.files && setResumeFile(e.target.files[0])} />
            </label>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Target Job Description
            </h3>
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-700 hover:border-purple-500 hover:bg-purple-500/5 rounded-2xl cursor-pointer transition-all">
              {jdFile ? (
                <div className="text-center p-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-300 font-medium truncate max-w-[200px]">{jdFile.name}</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">Choose PDF</p>
                </div>
              )}
              <input type="file" accept=".pdf" className="hidden" onChange={e => e.target.files && setJdFile(e.target.files[0])} />
            </label>
          </div>

        </div>

        <button 
          onClick={handleAnalyze}
          className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
        >
          Analyze My Fit
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}

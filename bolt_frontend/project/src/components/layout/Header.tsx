'use client';

import { Menu, CheckCircle2, Building2, Briefcase, Clock, Loader2, BrainCircuit } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { mainNav, bottomNav } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { targetRole, candidate } from '@/data/mockData';

interface HeaderProps {
  onMobileMenuOpen: () => void;
  mobileMenuOpen: boolean;
}

import { useState, useEffect } from 'react';

export function Header({ onMobileMenuOpen, mobileMenuOpen }: HeaderProps) {
  const pathname = usePathname();
  const [showUpload, setShowUpload] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ressure_history");
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const switchAnalysis = (indexStr: string) => {
    if (indexStr === "") return;
    const idx = parseInt(indexStr);
    const item = history[idx];
    if (item) {
      localStorage.setItem("ressure_analysis", JSON.stringify(item.data));
      window.location.reload();
    }
  };

  const handleUpload = async () => {
    if (!resumeFile || !jdFile) {
      alert("Please upload both Resume and JD PDFs.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jd", jdFile);
      
      const response = await fetch("http://localhost:8002/api/analyze", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        let errStr = "Analysis failed";
        try {
          const errData = await response.json();
          if (errData.detail) errStr = errData.detail;
        } catch (e) {}
        throw new Error(errStr);
      }
      
      const data = await response.json();
      localStorage.setItem("ressure_analysis", JSON.stringify(data));
      
      const newHistoryItem = {
        name: data.candidate_profile?.name || "Candidate",
        role: data.jd_profile?.role || "Role",
        date: new Date().toLocaleString(),
        data: data
      };
      
      const newHistory = [...history, newHistoryItem];
      localStorage.setItem("ressure_history", JSON.stringify(newHistory));
      
      window.location.reload();
    } catch (e: any) {
      alert(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
      {/* Left: mobile menu + target info */}
      <div className="flex items-center gap-3">
        <Sheet open={mobileMenuOpen} onOpenChange={onMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[260px] p-0">
            <MobileNav pathname={pathname} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{targetRole.company}</span>
            <span className="text-muted-foreground">·</span>
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{targetRole.role}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span>{targetRole.analysisStatus}</span>
            <span>·</span>
            <Clock className="h-3 w-3" />
            <span>Last analyzed {targetRole.lastAnalyzed}</span>
          </div>
        </div>
      </div>

      {/* Right: history + button + avatar */}
      <div className="flex items-center gap-3">
        {history.length > 0 && (
          <select 
            className="hidden sm:block text-sm border rounded p-1.5 bg-background max-w-[150px] truncate"
            onChange={(e) => switchAnalysis(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>History...</option>
            {history.map((h, i) => (
              <option key={i} value={i}>{h.name} - {h.role} ({h.date})</option>
            ))}
          </select>
        )}
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setShowUpload(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          New Analysis
        </Button>
        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-tight">{candidate.name}</p>
            <p className="text-xs text-muted-foreground leading-tight">
              {candidate.experienceLevel}
            </p>
          </div>
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-secondary text-sm font-semibold">
              {candidate.avatarInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      </header>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background border rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4">Run New Analysis</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Upload Resume (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={e => setResumeFile(e.target.files?.[0] || null)}
                  className="w-full text-sm border rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Upload Job Description (PDF)</label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={e => setJdFile(e.target.files?.[0] || null)}
                  className="w-full text-sm border rounded-md p-2"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowUpload(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white">
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in fade-in duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/30" style={{ animationDuration: '3s' }} />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                <BrainCircuit className="h-14 w-14 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">AI is analyzing your profile</h2>
            <div className="h-6">
              <p className="text-muted-foreground animate-pulse text-lg">
                Extracting requirements and evaluating experience...
              </p>
            </div>
            <div className="mt-10 flex items-center gap-3 px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full font-medium">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>This usually takes 15-30 seconds</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const allNav = [...mainNav, ...bottomNav];
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <span className="text-sm font-bold">R</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">Ressure AI</span>
          <span className="text-[11px] text-muted-foreground leading-tight">
            Make your resume a sure hit.
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-0.5">
          {allNav.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

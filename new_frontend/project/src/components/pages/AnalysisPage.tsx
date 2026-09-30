import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { analysisData } from '@/data/mockData';
import {
  CheckCircle2,
  Circle,
  FileText,
  Briefcase,
  ListChecks,
  Boxes,
  ShieldCheck,
  TriangleAlert,
  Target,
  User,
} from 'lucide-react';
import {
  SkillStateBadge,
  MatchStateBadge,
  ImportanceBadge,
} from '@/components/shared/StatusBadges';
import { cn } from '@/lib/utils';

export function AnalysisPage() {
  const {
    candidate,
    target,
    jobState,
    timeline,
    candidateProfile,
    roleProfile,
    requirements,
    evidence,
    gaps,
    nextBestActions,
  } = analysisData;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Resume & Job Analysis"
        description="Detailed breakdown of the analysis between your resume and the target job description."
      />

      {/* Status */}
      <div className="flex items-center gap-3">
        <Badge className="border-success/20 bg-success-soft text-success">
          {target.analysisStatus}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Job state: <code className="font-mono text-xs">{jobState}</code>
        </span>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analysis Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            {timeline.map((step, i) => (
              <div key={step.step} className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm',
                    step.status === 'complete'
                      ? 'border-success/20 bg-success-soft text-success'
                      : 'border-border bg-muted text-muted-foreground'
                  )}
                >
                  {step.status === 'complete' ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                  {step.label}
                </div>
                {i < timeline.length - 1 && (
                  <div className="h-px w-4 bg-border sm:w-8" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidate + Role profiles */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Candidate Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">{candidateProfile.name}</p>
              <p className="text-xs text-muted-foreground">
                {candidateProfile.experienceLevel}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {candidateProfile.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Projects
              </p>
              <div className="space-y-2">
                {candidateProfile.projects.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-md border bg-card p-3"
                  >
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {p.technologies.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Role Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">{roleProfile.role}</p>
              <p className="text-xs text-muted-foreground">
                {roleProfile.company}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Required
              </p>
              <div className="flex flex-wrap gap-1.5">
                {roleProfile.required.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="border-foreground/15 text-xs"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Preferred
              </p>
              <div className="flex flex-wrap gap-1.5">
                {roleProfile.preferred.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="border-border text-xs text-muted-foreground"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requirements summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {requirements.map((req) => (
            <div
              key={req.skill}
              className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-card px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{req.skill}</span>
                <ImportanceBadge importance={req.importance} />
              </div>
              <div className="flex items-center gap-2">
                <SkillStateBadge state={req.candidateState} />
                <MatchStateBadge state={req.matchState} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Evidence + Gaps */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Evidence</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {evidence.map((ev) => (
              <div
                key={ev.id}
                className="rounded-md border bg-card p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{ev.skill}</span>
                  <SkillStateBadge state={ev.skillState} />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{ev.source}</span>{' '}
                  — {ev.evidence}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Gaps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {gaps.map((gap) => (
              <div
                key={gap.skill}
                className="rounded-md border border-danger/15 bg-danger-soft/20 p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{gap.skill}</span>
                  <ImportanceBadge importance={gap.importance} />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {gap.whyItMatters}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Next best actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Next Best Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {nextBestActions.map((action) => (
            <div
              key={action.id}
              className="rounded-md border border-primary/15 bg-card p-4"
            >
              <p className="text-sm font-medium">{action.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{action.why}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted-foreground">Action:</span>
                <span>{action.action}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

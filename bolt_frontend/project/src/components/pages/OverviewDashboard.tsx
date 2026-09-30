import Link from 'next/link';
import {
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TriangleAlert,
  Boxes,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Metric } from '@/components/shared/Metric';
import {
  SkillStateBadge,
  MatchStateBadge,
  ImportanceBadge,
} from '@/components/shared/StatusBadges';
import { RequirementCoverage } from '@/components/shared/RequirementCoverage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dashboardData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function OverviewDashboard() {
  const { summary, requirements, gaps, nextBestAction, learning, assessments } =
    dashboardData;

  const requiredReqs = requirements.filter((r) => r.importance === 'Required');
  const preferredReqs = requirements.filter((r) => r.importance === 'Preferred');

  const requiredCoverage = [
    { label: 'Fully matched', count: summary.fullyMatched, color: 'bg-success' },
    { label: 'Partial match', count: summary.partialMatch, color: 'bg-warning' },
    { label: 'Gap / no evidence', count: summary.skillGaps, color: 'bg-danger' },
  ];

  const preferredCoverage = [
    { label: 'Matched', count: summary.preferredMatched, color: 'bg-success' },
    { label: 'Partial', count: summary.preferredPartial, color: 'bg-warning' },
    { label: 'No evidence', count: summary.preferredNoEvidence, color: 'bg-muted-foreground' },
  ];

  const skillStateCounts = {
    VERIFIED: requirements.filter((r) => r.candidateState === 'VERIFIED').length,
    DEMONSTRATED: requirements.filter((r) => r.candidateState === 'DEMONSTRATED').length,
    CLAIMED: requirements.filter((r) => r.candidateState === 'CLAIMED').length,
    NO_EVIDENCE: requirements.filter((r) => r.candidateState === 'NO_EVIDENCE').length,
  };

  const learningInProgress = learning.filter((l) => l.status === 'In Progress').length;
  const assessmentsCompleted = assessments.filter((a) => a.status === 'Completed').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Overview"
        description="Your resume has been analyzed against this role."
      >
        <Badge variant="outline" className="border-warning/30 bg-warning-soft text-warning">
          Sample Analysis
        </Badge>
      </PageHeader>

      {/* Target role banner */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          {summary.target.role}
        </h2>
        <p className="text-sm text-muted-foreground">{summary.target.company}</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Metric label="Required Skills" value={summary.requiredSkills} />
        <Metric label="Fully Matched" value={summary.fullyMatched} tone="success" />
        <Metric label="Partial Match" value={summary.partialMatch} tone="warning" />
        <Metric label="Skill Gaps" value={summary.skillGaps} tone="danger" />
        <Metric
          label="Evidence-backed"
          value={summary.evidenceBackedSkills}
          tone="info"
        />
        <Metric
          label="Verified"
          value={summary.verifiedSkills}
          tone="success"
        />
      </div>

      {/* Requirement Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Requirement Coverage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RequirementCoverage
            title="Required requirements"
            segments={requiredCoverage}
            total={requiredReqs.length}
          />
          <Separator />
          <RequirementCoverage
            title="Preferred requirements"
            segments={preferredCoverage}
            total={preferredReqs.length}
          />
        </CardContent>
      </Card>

      {/* Two column: Skill state distribution + Next best action */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Skill state distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skill State Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <SkillStateRow
              label="Demonstrated"
              count={skillStateCounts.DEMONSTRATED}
              total={requirements.length}
              color="bg-info"
            />
            <SkillStateRow
              label="Verified"
              count={skillStateCounts.VERIFIED}
              total={requirements.length}
              color="bg-success"
            />
            <SkillStateRow
              label="Claimed"
              count={skillStateCounts.CLAIMED}
              total={requirements.length}
              color="bg-warning"
            />
            <SkillStateRow
              label="No Evidence"
              count={skillStateCounts.NO_EVIDENCE}
              total={requirements.length}
              color="bg-muted-foreground"
            />
          </CardContent>
        </Card>

        {/* Next best action */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Next Best Action</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-base font-medium">{nextBestAction.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {nextBestAction.why}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Current state:</span>
              <SkillStateBadge state={nextBestAction.currentState} />
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm">
                <Link href="/next-best-action">
                  Start Action
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/requirements">View Requirement</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink
          href="/skills"
          icon={Boxes}
          title="Skills"
          subtitle={`${summary.evidenceBackedSkills} demonstrated`}
        />
        <QuickLink
          href="/evidence"
          icon={ShieldCheck}
          title="Evidence"
          subtitle={`${dashboardData.evidence.length} items`}
        />
        <QuickLink
          href="/gaps"
          icon={TriangleAlert}
          title="Gaps"
          subtitle={`${gaps.length} identified`}
        />
        <QuickLink
          href="/learning"
          icon={GraduationCap}
          title="Learning"
          subtitle={`${learningInProgress} in progress`}
        />
      </div>

      {/* Bottom: learning progress + verification */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Learning Progress</CardTitle>
            <Link
              href="/learning"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {learning.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.estimatedEffort} · {item.relatedSkill}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'shrink-0 text-xs',
                    item.status === 'In Progress' && 'border-info/30 text-info',
                    item.status === 'Recommended' && 'border-warning/30 text-warning',
                    item.status === 'Not Started' && 'text-muted-foreground',
                    item.status === 'Optional' && 'text-muted-foreground'
                  )}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Interview Readiness Signals</CardTitle>
            <Link
              href="/interview"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReadinessRow
              icon={CheckCircle2}
              label="Evidence-backed skills"
              value={`${summary.evidenceBackedSkills} skills`}
              tone="success"
            />
            <ReadinessRow
              icon={ShieldCheck}
              label="Verified skills"
              value={`${summary.verifiedSkills} skill`}
              tone="info"
            />
            <ReadinessRow
              icon={ClipboardCheck}
              label="Assessments completed"
              value={`${assessmentsCompleted}/${assessments.length}`}
              tone={assessmentsCompleted === assessments.length ? 'success' : 'warning'}
            />
            <ReadinessRow
              icon={TrendingUp}
              label="Learning in progress"
              value={`${learningInProgress} active`}
              tone="info"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SkillStateRow({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{count}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  subtitle,
}: {
  href: string;
  icon: typeof Target;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary/50"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

function ReadinessRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  tone: 'success' | 'info' | 'warning';
}) {
  const toneClass = {
    success: 'text-success',
    info: 'text-info',
    warning: 'text-warning',
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <Icon className={cn('h-4 w-4', toneClass)} />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-medium tabular-nums">{value}</span>
    </div>
  );
}

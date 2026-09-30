import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  assessments as assessmentData,
  verificationHistory,
} from '@/data/mockData';
import type { AssessmentStatus } from '@/types';
import { cn } from '@/lib/utils';
import {
  ClipboardCheck,
  PlayCircle,
  CheckCircle2,
  CircleDashed,
  ShieldCheck,
  ArrowRight,
  History,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

const statusConfig: Record<
  AssessmentStatus,
  { label: string; className: string; icon: LucideIcon }
> = {
  'Not Started': {
    label: 'Not Started',
    className: 'text-muted-foreground',
    icon: CircleDashed,
  },
  'In Progress': {
    label: 'In Progress',
    className: 'border-info/30 text-info',
    icon: PlayCircle,
  },
  Completed: {
    label: 'Completed',
    className: 'border-success/30 text-success',
    icon: CheckCircle2,
  },
};

export function AssessmentsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Skill Verification"
        description="Assessments verify your skills. A demonstrated skill can transition to verified after passing."
      />

      {/* Progression note */}
      <div className="flex items-center gap-2 rounded-lg border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-info" />
        <span>
          Progression: <strong className="text-foreground">Demonstrated</strong> →{' '}
          <strong className="text-success">Verified</strong>
        </span>
      </div>

      {/* Assessments */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {assessmentData.map((a) => {
          const config = statusConfig[a.status];
          const StatusIcon = config.icon;
          return (
            <Card key={a.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn('text-xs', config.className)}
                  >
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {config.label}
                  </Badge>
                </div>

                <h3 className="mt-3 text-sm font-semibold">{a.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {a.questionCount} questions · {a.skill}
                </p>

                {a.status === 'Completed' && a.score !== null && (
                  <div className="mt-3 rounded-md border border-success/20 bg-success-soft/30 p-2.5">
                    <p className="text-xs text-success">
                      <CheckCircle2 className="mr-1 inline h-3 w-3" />
                      Passed — {a.score}/{a.questionCount}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Completed {a.completedDate}
                    </p>
                  </div>
                )}

                <div className="mt-4">
                  {a.status === 'Completed' ? (
                    <Button size="sm" variant="outline" className="w-full">
                      Retake
                    </Button>
                  ) : a.status === 'In Progress' ? (
                    <Button size="sm" className="w-full">
                      <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                      Continue
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full">
                      <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                      Start Assessment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Verification history */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Verification History</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {verificationHistory.length > 0 ? (
            <div className="space-y-2">
              {verificationHistory.map((v) => (
                <div
                  key={v.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-card px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm font-medium">{v.skill}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.method} · {v.date}
                      </p>
                    </div>
                  </div>
                  <Badge className="border-success/20 bg-success-soft text-success">
                    {v.result}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No verifications yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Link to skills */}
      <div className="flex justify-center">
        <Button asChild variant="ghost" size="sm">
          <Link href="/skills">
            View all skills
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

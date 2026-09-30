import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SkillStateBadge, ImportanceBadge } from '@/components/shared/StatusBadges';
import { nextBestAction } from '@/data/mockData';
import {
  Target,
  ArrowRight,
  CheckCircle2,
  ListChecks,
  GraduationCap,
  ClipboardCheck,
  Lightbulb,
  CircleCheck,
} from 'lucide-react';

export function NextBestActionPage() {
  const action = nextBestAction;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Next Best Action"
        description="The single most impactful action you can take right now to close a gap."
      />

      {/* Primary action card */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-semibold tracking-tight">
                {action.title}
              </h2>
              <p className="text-sm text-muted-foreground">{action.why}</p>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Current state
              </p>
              <div className="flex items-center gap-2">
                <SkillStateBadge state={action.currentState} />
                <ImportanceBadge importance={action.relatedImportance} />
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Related skill
              </p>
              <p className="text-sm font-medium">{action.relatedSkill}</p>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">Action</p>
              <div className="flex items-start gap-2 rounded-md border bg-card p-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <p className="text-sm">{action.action}</p>
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">
                Verification
              </p>
              <div className="flex items-start gap-2 rounded-md border bg-card p-3">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <p className="text-sm">{action.verification}</p>
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">
                After completion
              </p>
              <div className="flex items-center gap-2 rounded-md border border-success/20 bg-success-soft/30 p-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                <p className="text-sm font-medium text-success">
                  {action.afterCompletion}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm">
              Start Action
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/requirements">
                <ListChecks className="mr-1.5 h-3.5 w-3.5" />
                View Requirement
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/learning">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
                Learning Path
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/assessments">
                <ClipboardCheck className="mr-1.5 h-3.5 w-3.5 w-3.5" />
                Assess
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related context */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4 text-muted-foreground" />
              Why this action
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Docker is a required skill with no evidence. Containerizing an
              existing project is the fastest path to demonstrated evidence.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              Learn first
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with Docker Fundamentals, then Dockerize FastAPI to apply
              the concepts.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              Then verify
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Complete a Docker assessment to move from demonstrated to verified.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

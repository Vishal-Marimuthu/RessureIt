import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  SkillStateBadge,
  ImportanceBadge,
} from '@/components/shared/StatusBadges';
import { gaps as gapData } from '@/data/mockData';
import { ArrowRight, TriangleAlert, Target, CircleDot } from 'lucide-react';

export function GapsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Skill Gaps"
        description="Requirements that are missing, unverified, or only partially met — with why they matter and what to do."
      />

      <div className="space-y-4">
        {gapData.map((gap) => (
          <Card key={gap.skill} className="border-danger/15">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-4 w-4 text-danger" />
                  <h3 className="text-base font-semibold">{gap.skill}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <ImportanceBadge importance={gap.importance} />
                  <SkillStateBadge state={gap.currentState} />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Why it matters
                  </p>
                  <p className="text-sm">{gap.whyItMatters}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Current state
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {gap.currentStateDescription}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Target state
                  </p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <CircleDot className="h-3.5 w-3.5 text-success" />
                    {gap.targetState}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Suggested action
                  </p>
                  <p className="text-sm">{gap.suggestedAction}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/learning">
                    <Target className="mr-1.5 h-3.5 w-3.5" />
                    View Learning Path
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/next-best-action">
                    Next Best Action
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

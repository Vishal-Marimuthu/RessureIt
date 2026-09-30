import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SkillStateBadge } from '@/components/shared/StatusBadges';
import { evidence as evidenceData } from '@/data/mockData';
import type { EvidenceStrength } from '@/types';
import { cn } from '@/lib/utils';
import { FolderGit2, Award, Briefcase, BookOpen, Trophy, Link2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const sourceTypeIcon: Record<string, LucideIcon> = {
  Project: FolderGit2,
  Experience: Briefcase,
  Achievement: Trophy,
  Course: BookOpen,
  Certification: Award,
};

const strengthConfig: Record<EvidenceStrength, string> = {
  Strong: 'border-success/20 bg-success-soft text-success',
  Moderate: 'border-warning/20 bg-warning-soft text-warning',
  Weak: 'border-border bg-muted text-muted-foreground',
};

export function EvidencePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Skill Evidence"
        description="See why Ressure AI believes a skill is demonstrated. Every claim is traceable to a source."
      >
        <Badge variant="outline" className="border-warning/30 bg-warning-soft text-warning">
          Sample Analysis
        </Badge>
      </PageHeader>

      <div className="grid gap-3 lg:grid-cols-2">
        {evidenceData.map((ev) => {
          const SourceIcon = sourceTypeIcon[ev.sourceType] || FolderGit2;
          return (
            <Card key={ev.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                      <SourceIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ev.skill}</p>
                      <p className="text-xs text-muted-foreground">
                        {ev.source}
                      </p>
                    </div>
                  </div>
                  <SkillStateBadge state={ev.skillState} />
                </div>

                <Separator className="my-4" />

                <p className="text-sm leading-relaxed">{ev.evidence}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    <span>Source type: {ev.sourceType}</span>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
                      strengthConfig[ev.strength]
                    )}
                  >
                    {ev.strength}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

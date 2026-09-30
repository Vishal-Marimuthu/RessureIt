import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { learning as learningData } from '@/data/mockData';
import type { LearningStatus } from '@/types';
import { cn } from '@/lib/utils';
import {
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  CircleDashed,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const statusConfig: Record<
  LearningStatus,
  { className: string; icon: LucideIcon }
> = {
  'Not Started': { className: 'text-muted-foreground', icon: CircleDashed },
  Recommended: { className: 'border-warning/30 text-warning', icon: Sparkles },
  'In Progress': { className: 'border-info/30 text-info', icon: PlayCircle },
  Completed: { className: 'border-success/30 text-success', icon: CheckCircle2 },
  Optional: { className: 'text-muted-foreground', icon: CircleDashed },
};

export function LearningPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Learning Path"
        description="Learning recommendations directly connected to your identified job requirements."
      />

      <div className="space-y-3">
        {learningData.map((item, i) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;
          return (
            <Card key={item.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card text-sm font-semibold tabular-nums">
                    {i + 1}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn('shrink-0 text-xs', config.className)}
                      >
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {item.status}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {item.estimatedEffort}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5" />
                          {item.relatedSkill}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {item.url && (
                          <Button asChild size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              GeeksForGeeks Guide
                              <ExternalLink className="ml-1.5 h-3 w-3" />
                            </a>
                          </Button>
                        )}
                        <Button asChild size="sm" variant="ghost">
                          <Link href="/gaps">
                            Related gap: {item.relatedGap}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

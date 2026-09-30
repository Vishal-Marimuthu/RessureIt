'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  SkillStateBadge,
  MatchStateBadge,
  ImportanceBadge,
} from '@/components/shared/StatusBadges';
import { skills as skillData, evidence as evidenceData } from '@/data/mockData';
import type { Skill } from '@/types';
import { cn } from '@/lib/utils';
import {
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  CircleDashed,
  CircleAlert,
} from 'lucide-react';

type Filter = 'all' | 'required' | 'preferred' | 'demonstrated' | 'verified' | 'gaps';

export function SkillsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Skill | null>(null);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'required':
        return skillData.filter((s) => s.importance === 'Required');
      case 'preferred':
        return skillData.filter((s) => s.importance === 'Preferred');
      case 'demonstrated':
        return skillData.filter((s) => s.state === 'DEMONSTRATED');
      case 'verified':
        return skillData.filter((s) => s.state === 'VERIFIED');
      case 'gaps':
        return skillData.filter(
          (s) => s.state === 'CLAIMED' || s.state === 'NO_EVIDENCE'
        );
      default:
        return skillData;
    }
  }, [filter]);

  const selectedEvidence = selected
    ? evidenceData.filter((e) => e.skill === selected.name)
    : [];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Skills"
        description="Every skill from your resume, categorized by state. Skill mentioned ≠ demonstrated ≠ verified."
      />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="required">Required</TabsTrigger>
          <TabsTrigger value="preferred">Preferred</TabsTrigger>
          <TabsTrigger value="demonstrated">Demonstrated</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="gaps">Gaps</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Skill matrix */}
      <div className="grid gap-2 sm:grid-cols-2">
        {filtered.map((skill) => (
          <button
            key={skill.name}
            onClick={() => setSelected(skill)}
            className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-4 text-left transition-colors hover:bg-secondary/50"
          >
            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{skill.name}</span>
                {skill.importance && (
                  <ImportanceBadge importance={skill.importance} />
                )}
              </div>
              <div className="flex items-center gap-2">
                <SkillStateBadge state={skill.state} />
                {skill.matchState !== 'NO_EVIDENCE' && (
                  <MatchStateBadge state={skill.matchState} />
                )}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">
                {skill.evidenceCount} evidence
              </p>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No skills match this filter.
          </CardContent>
        </Card>
      )}

      {/* Skill detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>
                  Skill detail and evidence traceability
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* States */}
                <div className="flex flex-wrap items-center gap-2">
                  <SkillStateBadge state={selected.state} />
                  {selected.importance && (
                    <ImportanceBadge importance={selected.importance} />
                  )}
                  <MatchStateBadge state={selected.matchState} />
                </div>

                {/* Progression */}
                <div className="rounded-lg border bg-card p-4">
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Skill Progression
                  </p>
                  <div className="flex items-center gap-2">
                    <ProgressionStep
                      label="Claimed"
                      active={selected.state === 'CLAIMED'}
                      done={
                        selected.state === 'DEMONSTRATED' ||
                        selected.state === 'VERIFIED'
                      }
                      icon={CircleDashed}
                    />
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                    <ProgressionStep
                      label="Demonstrated"
                      active={selected.state === 'DEMONSTRATED'}
                      done={selected.state === 'VERIFIED'}
                      icon={CheckCircle2}
                    />
                    <ArrowDown className="h-3 w-3 text-muted-foreground" />
                    <ProgressionStep
                      label="Verified"
                      active={selected.state === 'VERIFIED'}
                      done={false}
                      icon={ShieldCheck}
                    />
                  </div>
                </div>

                <Separator />

                {/* Evidence */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Evidence
                  </p>
                  {selectedEvidence.length > 0 ? (
                    selectedEvidence.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-md border bg-card p-3"
                      >
                        <p className="text-sm font-medium">{ev.source}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {ev.evidence}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 rounded-md border border-dashed bg-muted/30 p-3">
                      <CircleAlert className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No evidence found for this skill.
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Verification */}
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Verification
                  </p>
                  {selected.verified ? (
                    <p className="text-sm text-success">
                      This skill has been verified.
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Not yet verified. Recommended: complete a{' '}
                      {selected.name} assessment to verify this skill.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProgressionStep({
  label,
  active,
  done,
  icon: Icon,
}: {
  label: string;
  active: boolean;
  done: boolean;
  icon: typeof ShieldCheck;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
          active
            ? 'border-primary bg-primary text-primary-foreground'
            : done
            ? 'border-success bg-success-soft text-success'
            : 'border-border bg-muted text-muted-foreground'
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span
        className={cn(
          'text-xs',
          active ? 'font-medium text-foreground' : 'text-muted-foreground'
        )}
      >
        {label}
      </span>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  SkillStateBadge,
  MatchStateBadge,
  ImportanceBadge,
} from '@/components/shared/StatusBadges';
import { RequirementCoverage } from '@/components/shared/RequirementCoverage';
import { Separator } from '@/components/ui/separator';
import { requirements as reqData } from '@/data/mockData';
import type { Requirement } from '@/types';
import { ShieldCheck, FileX } from 'lucide-react';

export function RequirementsPage() {
  const [selected, setSelected] = useState<Requirement | null>(null);

  const requiredReqs = reqData.filter((r) => r.importance === 'Required');
  const preferredReqs = reqData.filter((r) => r.importance === 'Preferred');

  const requiredCoverage = [
    {
      label: 'Fully matched',
      count: requiredReqs.filter((r) => r.matchState === 'MATCH').length,
      color: 'bg-success',
    },
    {
      label: 'Partial match',
      count: requiredReqs.filter((r) => r.matchState === 'PARTIAL_MATCH').length,
      color: 'bg-warning',
    },
    {
      label: 'Gap / no evidence',
      count: requiredReqs.filter(
        (r) => r.matchState === 'NO_EVIDENCE' || r.matchState === 'SKILL_GAP'
      ).length,
      color: 'bg-danger',
    },
  ];

  const preferredCoverage = [
    {
      label: 'Matched',
      count: preferredReqs.filter((r) => r.matchState === 'MATCH').length,
      color: 'bg-success',
    },
    {
      label: 'Partial',
      count: preferredReqs.filter((r) => r.matchState === 'PARTIAL_MATCH').length,
      color: 'bg-warning',
    },
    {
      label: 'No evidence',
      count: preferredReqs.filter(
        (r) => r.matchState === 'NO_EVIDENCE' || r.matchState === 'SKILL_GAP'
      ).length,
      color: 'bg-muted-foreground',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Requirements"
        description="Every requirement from the job description mapped against your candidate state and evidence."
      />

      {/* Coverage */}
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

      {/* Requirements table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Requirements Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Importance</TableHead>
                  <TableHead>Candidate State</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead className="hidden md:table-cell">Evidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reqData.map((req) => (
                  <TableRow
                    key={req.skill}
                    className="cursor-pointer"
                    onClick={() => setSelected(req)}
                  >
                    <TableCell className="font-medium">{req.skill}</TableCell>
                    <TableCell>
                      <ImportanceBadge importance={req.importance} />
                    </TableCell>
                    <TableCell>
                      <SkillStateBadge state={req.candidateState} />
                    </TableCell>
                    <TableCell>
                      <MatchStateBadge state={req.matchState} />
                    </TableCell>
                    <TableCell className="hidden max-w-xs md:table-cell">
                      {req.evidence ? (
                        <span className="text-sm text-muted-foreground">
                          {req.evidence}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">
                          No evidence
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Click any requirement to view details.
          </p>
        </CardContent>
      </Card>

      {/* Detail panel */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.skill}</SheetTitle>
                <SheetDescription>
                  Requirement detail for {selected.skill}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <ImportanceBadge importance={selected.importance} />
                  <SkillStateBadge state={selected.candidateState} />
                  <MatchStateBadge state={selected.matchState} />
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Evidence
                  </p>
                  {selected.evidence ? (
                    <div className="flex items-start gap-2 rounded-md border bg-card p-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-info" />
                      <p className="text-sm">{selected.evidence}</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 rounded-md border border-dashed bg-muted/30 p-3">
                      <FileX className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No evidence found for this skill in your resume.
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Candidate State
                  </p>
                  <p className="text-sm">
                    {stateDescription(selected.candidateState)}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Match State
                  </p>
                  <p className="text-sm">
                    {matchDescription(selected.matchState)}
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function stateDescription(state: Requirement['candidateState']): string {
  switch (state) {
    case 'VERIFIED':
      return 'This skill has been validated through an assessment, interview, or other verification process.';
    case 'DEMONSTRATED':
      return 'You have evidence such as a project, experience, or implementation that demonstrates this skill.';
    case 'CLAIMED':
      return 'You mention this skill, but there is insufficient evidence to demonstrate it.';
    case 'NO_EVIDENCE':
      return 'No evidence of this skill was found in your resume.';
  }
}

function matchDescription(state: Requirement['matchState']): string {
  switch (state) {
    case 'MATCH':
      return 'Your evidence fully satisfies this requirement.';
    case 'PARTIAL_MATCH':
      return 'You have some evidence, but it does not fully satisfy the requirement.';
    case 'NO_EVIDENCE':
      return 'You mention this skill, but there is no supporting evidence.';
    case 'SKILL_GAP':
      return 'This skill is missing from your resume entirely.';
  }
}

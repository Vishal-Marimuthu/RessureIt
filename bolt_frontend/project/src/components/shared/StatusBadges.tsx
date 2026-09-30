import { cn } from '@/lib/utils';
import type { SkillState, MatchState } from '@/types';
import {
  CheckCircle2,
  CircleDashed,
  ShieldCheck,
  CircleAlert,
  AlertTriangle,
  Minus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BadgeConfig {
  label: string;
  className: string;
  icon: LucideIcon;
}

const skillStateConfig: Record<SkillState, BadgeConfig> = {
  VERIFIED: {
    label: 'Verified',
    className: 'bg-success-soft text-success border-success/20',
    icon: ShieldCheck,
  },
  DEMONSTRATED: {
    label: 'Demonstrated',
    className: 'bg-info-soft text-info border-info/20',
    icon: CheckCircle2,
  },
  CLAIMED: {
    label: 'Claimed',
    className: 'bg-warning-soft text-warning border-warning/20',
    icon: CircleDashed,
  },
  NO_EVIDENCE: {
    label: 'No Evidence',
    className: 'bg-muted text-muted-foreground border-border',
    icon: CircleAlert,
  },
};

const matchStateConfig: Record<MatchState, BadgeConfig> = {
  MATCH: {
    label: 'Match',
    className: 'bg-success-soft text-success border-success/20',
    icon: CheckCircle2,
  },
  PARTIAL_MATCH: {
    label: 'Partial Match',
    className: 'bg-warning-soft text-warning border-warning/20',
    icon: Minus,
  },
  NO_EVIDENCE: {
    label: 'No Evidence',
    className: 'bg-muted text-muted-foreground border-border',
    icon: CircleAlert,
  },
  SKILL_GAP: {
    label: 'Gap',
    className: 'bg-danger-soft text-danger border-danger/20',
    icon: AlertTriangle,
  },
};

export function SkillStateBadge({
  state,
  className,
}: {
  state: SkillState;
  className?: string;
}) {
  const config = skillStateConfig[state];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

export function MatchStateBadge({
  state,
  className,
}: {
  state: MatchState;
  className?: string;
}) {
  const config = matchStateConfig[state];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

export function ImportanceBadge({
  importance,
  className,
}: {
  importance: 'Required' | 'Preferred';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        importance === 'Required'
          ? 'border-foreground/15 bg-secondary text-foreground'
          : 'border-border bg-muted text-muted-foreground',
        className
      )}
    >
      {importance}
    </span>
  );
}

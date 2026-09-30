import { cn } from '@/lib/utils';

interface MetricProps {
  label: string;
  value: number | string;
  hint?: string;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const toneClasses: Record<NonNullable<MetricProps['tone']>, string> = {
  default: 'text-foreground',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
};

export function Metric({
  label,
  value,
  hint,
  tone = 'default',
  className,
}: MetricProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-lg border bg-card p-4',
        className
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className={cn('text-2xl font-semibold tabular-nums tracking-tight', toneClasses[tone])}>
        {value}
      </span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

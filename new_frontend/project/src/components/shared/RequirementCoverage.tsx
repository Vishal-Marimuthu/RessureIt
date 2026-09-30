import { cn } from '@/lib/utils';

interface CoverageSegment {
  label: string;
  count: number;
  color: string;
}

interface RequirementCoverageProps {
  title: string;
  segments: CoverageSegment[];
  total: number;
}

export function RequirementCoverage({
  title,
  segments,
  total,
}: RequirementCoverageProps) {
  const hasData = total > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {total} total
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        {hasData ? (
          segments.map((seg, i) => {
            const pct = (seg.count / total) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={i}
                className={cn('h-full transition-all duration-500', seg.color)}
                style={{ width: `${pct}%` }}
                title={`${seg.label}: ${seg.count}`}
              />
            );
          })
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={cn('h-2.5 w-2.5 rounded-full', seg.color)} />
            <span className="text-xs text-muted-foreground">{seg.label}</span>
            <span className="text-xs font-medium tabular-nums">{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

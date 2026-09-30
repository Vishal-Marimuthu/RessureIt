import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { resumeOptimization } from '@/data/mockData';
import {
  FileText,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  Link2,
} from 'lucide-react';

export function ResumePage() {
  const { currentResume, targetJobDescription, suggestions } =
    resumeOptimization;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Resume Optimization"
        description="Evidence-backed suggestions to improve your resume. No skills, technologies, or achievements are invented."
      >
        <Badge variant="outline" className="border-warning/30 bg-warning-soft text-warning">
          Sample Analysis
        </Badge>
      </PageHeader>

      {/* Current resume + JD */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Current Resume</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-md border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              {currentResume}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Target Job Description</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-md border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              {targetJobDescription}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" />
          <h2 className="text-base font-semibold">
            Evidence-backed Suggestions
          </h2>
          <Badge variant="secondary">{suggestions.length}</Badge>
        </div>

        <div className="space-y-4">
          {suggestions.map((s, i) => (
            <Card key={s.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular-nums">
                    {i + 1}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {s.section}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {/* Current */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Current
                    </p>
                    <div className="rounded-md border border-dashed bg-muted/30 p-3">
                      <p className="text-sm text-muted-foreground italic">
                        &ldquo;{s.current}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Suggested */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-success">
                      Suggested
                    </p>
                    <div className="rounded-md border border-success/20 bg-success-soft/20 p-3">
                      <p className="text-sm">{s.suggested}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-info" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Reason
                    </p>
                    <p className="mt-0.5 text-sm">{s.reason}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Evidence: {s.evidenceRef}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

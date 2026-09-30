import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { interviewPrep, interviewQuestions } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Code,
  FolderGit2,
  Building2,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
  Technical: { icon: Code, color: 'text-info' },
  Project: { icon: FolderGit2, color: 'text-success' },
  Company: { icon: Building2, color: 'text-warning' },
};

export function InterviewPage() {
  const technical = interviewQuestions.filter((q) => q.category === 'Technical');
  const project = interviewQuestions.filter((q) => q.category === 'Project');
  const company = interviewQuestions.filter((q) => q.category === 'Company');

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Interview Preparation"
        description={`Target: ${interviewPrep.company} — ${interviewPrep.role}`}
      >
        <Badge variant="outline" className="border-warning/30 bg-warning-soft text-warning">
          Sample Data
        </Badge>
      </PageHeader>

      {/* Technical topics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-info" />
            <CardTitle className="text-base">Technical Topics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interviewPrep.technicalTopics.map((t) => (
              <Badge key={t} variant="secondary" className="text-sm">
                {t}
              </Badge>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            {technical.map((q) => (
              <QuestionRow key={q.id} question={q.question} topic={q.topic} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project questions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-success" />
            <CardTitle className="text-base">Project Questions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {interviewPrep.projectQuestions.map((pq) => (
            <div key={pq.project}>
              <p className="text-sm font-medium">{pq.project}</p>
              <div className="mt-2 space-y-2">
                {pq.questions.map((q, i) => (
                  <QuestionRow
                    key={`${pq.project}-${i}`}
                    question={q}
                    topic={pq.project}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Company questions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-warning" />
            <CardTitle className="text-base">
              Company-specific Questions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {company.map((q) => (
            <div key={q.id}>
              <QuestionRow
                question={q.question}
                topic={q.topic}
                context={q.context}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function QuestionRow({
  question,
  topic,
  context,
}: {
  question: string;
  topic: string;
  context?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md border bg-card px-4 py-3 transition-colors hover:bg-secondary/40'
      )}
    >
      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {topic}
          </span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        </div>
        <p className="mt-0.5 text-sm">{question}</p>
        {context && (
          <p className="mt-1 text-xs italic text-muted-foreground">
            Context: {context}
          </p>
        )}
      </div>
    </div>
  );
}

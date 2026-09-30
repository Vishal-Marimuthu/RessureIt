import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { candidate, targetRole, projects } from '@/data/mockData';
import { Mail, MapPin, FileText, Briefcase, GraduationCap } from 'lucide-react';

export function ProfilePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Profile" description="Your candidate profile and resume information." />

      {/* Profile header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-16 w-16 border">
              <AvatarFallback className="bg-secondary text-lg font-semibold">
                {candidate.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold tracking-tight">
                {candidate.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {candidate.experienceLevel}
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  arun.kumar@example.com
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Bengaluru, India
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Target role */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Current Target Role</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{targetRole.role}</p>
              <p className="text-xs text-muted-foreground">
                {targetRole.company}
              </p>
            </div>
            <Badge variant="outline" className="border-success/20 text-success">
              {targetRole.analysisStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Python', 'FastAPI', 'Machine Learning', 'SQL', 'React', 'Java', 'Docker', 'AWS'].map(
              (s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Projects</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {projects.map((p) => (
            <div key={p.name}>
              <div className="rounded-md border bg-card p-3">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator className="my-2 last:hidden" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

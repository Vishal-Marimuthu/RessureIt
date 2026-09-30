import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { candidate, targetRole } from '@/data/mockData';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Database,
  Shield,
  Building2,
  Briefcase,
} from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Settings"
        description="Manage your account, analysis targets, and preferences."
      />

      {/* Account */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{candidate.name}</p>
              <p className="text-xs text-muted-foreground">
                {candidate.experienceLevel}
              </p>
            </div>
            <Button size="sm" variant="outline">
              Edit Profile
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground">
                arun.kumar@example.com
              </p>
            </div>
            <Button size="sm" variant="outline">
              Change
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Target */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Current Target</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{targetRole.company}</span>
          </div>
          <p className="text-sm text-muted-foreground">{targetRole.role}</p>
          <Button size="sm" variant="outline">
            Change Target
          </Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingRow
            label="Analysis complete"
            description="Notify when a resume analysis finishes."
            defaultChecked
          />
          <Separator />
          <SettingRow
            label="New gaps detected"
            description="Notify when new skill gaps are identified."
            defaultChecked
          />
          <Separator />
          <SettingRow
            label="Learning reminders"
            description="Weekly reminders for in-progress learning."
          />
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">
                Light mode (default)
              </p>
            </div>
            <Badge variant="outline">Light</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Data & Privacy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingRow
            label="Store analysis history"
            description="Keep past analyses for comparison."
            defaultChecked
          />
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Export data</p>
              <p className="text-xs text-muted-foreground">
                Download your analysis data.
              </p>
            </div>
            <Button size="sm" variant="outline">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">About</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Ressure AI</p>
              <p className="text-xs text-muted-foreground">
                Evidence-first AI career intelligence
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-warning/30 text-warning">
                Frontend Prototype
              </Badge>
              <SettingsIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingRow({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

import {
  LayoutDashboard,
  FileSearch,
  Boxes,
  ShieldCheck,
  ListChecks,
  TriangleAlert,
  Target,
  GraduationCap,
  ClipboardCheck,
  MessageSquare,
  FileText,
  Settings,
  User,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNav: NavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Analysis', href: '/analysis', icon: FileSearch },
  { label: 'Skills', href: '/skills', icon: Boxes },
  { label: 'Evidence', href: '/evidence', icon: ShieldCheck },
  { label: 'Requirements', href: '/requirements', icon: ListChecks },
  { label: 'Gaps', href: '/gaps', icon: TriangleAlert },
  { label: 'Next Best Action', href: '/next-best-action', icon: Target },
  { label: 'Learning', href: '/learning', icon: GraduationCap },
  { label: 'Assessments', href: '/assessments', icon: ClipboardCheck },
  { label: 'Interview', href: '/interview', icon: MessageSquare },
  { label: 'Resume', href: '/resume', icon: FileText },
];

export const bottomNav: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Profile', href: '/profile', icon: User },
];

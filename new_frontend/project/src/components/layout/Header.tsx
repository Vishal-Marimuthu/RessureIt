'use client';

import { Menu, CheckCircle2, Building2, Briefcase, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { mainNav, bottomNav } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { targetRole, candidate } from '@/data/mockData';

interface HeaderProps {
  onMobileMenuOpen: () => void;
  mobileMenuOpen: boolean;
}

export function Header({ onMobileMenuOpen, mobileMenuOpen }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
      {/* Left: mobile menu + target info */}
      <div className="flex items-center gap-3">
        <Sheet open={mobileMenuOpen} onOpenChange={onMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[260px] p-0">
            <MobileNav pathname={pathname} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{targetRole.company}</span>
            <span className="text-muted-foreground">·</span>
            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{targetRole.role}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span>{targetRole.analysisStatus}</span>
            <span>·</span>
            <Clock className="h-3 w-3" />
            <span>Last analyzed {targetRole.lastAnalyzed}</span>
          </div>
        </div>
      </div>

      {/* Right: sample badge + avatar */}
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className="hidden sm:inline-flex border-warning/30 bg-warning-soft text-warning"
        >
          Sample Analysis
        </Badge>
        <div className="flex items-center gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium leading-tight">{candidate.name}</p>
            <p className="text-xs text-muted-foreground leading-tight">
              {candidate.experienceLevel}
            </p>
          </div>
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-secondary text-sm font-semibold">
              {candidate.avatarInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const allNav = [...mainNav, ...bottomNav];
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <span className="text-sm font-bold">R</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">Ressure AI</span>
          <span className="text-[11px] text-muted-foreground leading-tight">
            Make your resume a sure hit.
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-0.5">
          {allNav.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

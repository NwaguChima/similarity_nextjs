'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { DropdownMenu } from '@/ui/DropdownMenu';
import Button from '@/ui/Button';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Sun className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100" />
          <Moon className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ThemeToggle;

'use client';
import { useTheme } from 'next-themes';
import React from 'react';

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const { setTheme } = useTheme();

  return <div>ThemeToggle</div>;
};

export default ThemeToggle;

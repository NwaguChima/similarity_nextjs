'use client';

import React, { useEffect, useState } from 'react';
import { type Language } from 'prism-react-renderer';
import { useTheme } from 'next-themes';

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}

const Code: React.FC<CodeProps> = ({
  code,
  show,
  language,
  animationDelay = 0,
  animated = true,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState<string>(animated ? '' : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;

      setTimeout(() => {
        const interval = setInterval(() => {
          setText(code.substring(0, i));
          i++;

          if (i > code.length) {
            clearInterval(interval);
          }
        }, 15);

        return () => clearInterval(interval);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  return <div>Code</div>;
};

export default Code;

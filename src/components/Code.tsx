'use client';

import React, { useEffect, useState } from 'react';
import Highlight, { defaultProps, type Language } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/nightOwl';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
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

  const lines = text.split(/\r\n|\r|\n/).length;
  const theme = applicationTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar`}
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            // eslint-disable-next-line no-unused-vars
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div
                key={`line-${i}`}
                style={{
                  position: 'relative',
                }}
                {...rest}
              >
                {line.map((token, index) => {
                  // eslint-disable-next-line no-unused-vars
                  const { key, ...rest } = getTokenProps({ token, i });

                  return <span key={index} {...rest} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;

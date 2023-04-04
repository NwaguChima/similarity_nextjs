import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs';
import Code from '@/components/Code';

interface DocumentationTabsProps {}

const DocumentationTabs: React.FC<DocumentationTabsProps> = ({}) => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <Code language="javascript" />
      </TabsContent>
      <TabsContent value="python"></TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;

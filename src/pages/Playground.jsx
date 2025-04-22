// Code written and maintained by Elisee Kajingu
import React from 'react';
import CodeQuestPlaygroundIntegration from '../CodeQuestPlaygroundIntegration';

export default function Playground({ session }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Code Playground</h1>
      <CodeQuestPlaygroundIntegration session={session} />
    </div>
  );
}

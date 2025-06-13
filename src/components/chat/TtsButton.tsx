import React from 'react';
import { Button } from '../ui/button';
import { Volume2 } from 'lucide-react';

const TtsButton = () => {
  return (
    <div>
      <Button variant="ghost" size="sm" className="ml-2 p-1 h-auto">
        <Volume2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default TtsButton;
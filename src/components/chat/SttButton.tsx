import React from 'react';
import { Button } from '../ui/button';
import { Mic } from 'lucide-react';

const SttButton = () => {
  return (
    <div>
      <Button variant="outline" size="icon" className="border-[#81C784] text-[#388E3C]">
        <Mic className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SttButton;
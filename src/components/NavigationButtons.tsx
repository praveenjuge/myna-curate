import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from '@mynaui/icons-react';
import { PanelLeftClose } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Custom history stack
  const [historyStack, setHistoryStack] = useState<string[]>([]);

  useEffect(() => {
    // Update history stack on location change
    setHistoryStack((prev) => [...prev, location.pathname]);
  }, [location]);

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  // Calculate if back or forward actions are possible
  const canGoBack = historyStack.length > 1;

  return (
    <>
      <Button
        className="text-slate-500"
        size="icon"
        variant="link"
        onClick={goBack}
        disabled={!canGoBack}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        className="text-slate-500"
        size="icon"
        variant="link"
        onClick={goForward}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      <Button className="text-slate-500" size="icon" variant="link">
        <PanelLeftClose className="h-5 w-5" strokeWidth={1.3} />
      </Button>
    </>
  );
};

export default NavigationButtons;

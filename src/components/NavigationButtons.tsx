import { ChevronLeft, ChevronRight } from "@mynaui/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      <Button size="icon" variant="link" onClick={goBack} disabled={!canGoBack}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button size="icon" variant="link" onClick={goForward}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </>
  );
};

export default NavigationButtons;

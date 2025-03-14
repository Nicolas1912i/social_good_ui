"use client";

import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {ArrowUp10, BadgeCheck, Terminal} from "lucide-react";
import {ProcessesEnum} from "@/enums/processes-enum";

interface Props {
  title: string;
  message: string;
  time: number;
  process: ProcessesEnum;
  onClose: () => void;
}

export function TemporalAlert(props: Props) {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const getIcon = () => {
    switch (props.process) {
      case ProcessesEnum.StartingImportNotification:
        return <ArrowUp10 className="h-4 w-4" />;
      case ProcessesEnum.ImportStartedNotification:
        return <Terminal className="h-4 w-4" />;
      case ProcessesEnum.ImportFinishedNotification:
        return <BadgeCheck className="h-4 w-4" />;
      default:
        return <Terminal className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(props.onClose, 300);    }, props.time);

    return () => clearTimeout(timer);
  }, [props.onClose, props.time]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isClosing ? 'animate-fadeOut' : 'animate-slideIn'}`}>
      <Alert>
        {getIcon()}
        <Terminal className="h-4 w-4"/>
        <AlertTitle>{props.title}</AlertTitle>
        <AlertDescription>
          {props.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
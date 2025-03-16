"use client";

import { Input } from "./input";
import { Label } from "./label";
import { ChangeEvent } from "react";

interface Props {
  setFileContentOnParent: (fileContent: string) => void;
}

export function InputFile(props: Props) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string;
        props.setFileContentOnParent(content);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="absolute top-0 left-0 transform -translate-y-full py-2">
      <Label htmlFor="csv">CSV Contacts File</Label>
      <Input id="csv" type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}

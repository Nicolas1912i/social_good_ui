"use client";

import DataTable from "@/components/ui/data-table";
import {InputFile} from "@/components/ui/input-file";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {getContacts, uploadCsv} from "@/services/api-service";
import {Contact} from "@/types/contact";
import {TemporalAlert} from "@/components/ui/temporal-alert";
import {ProcessesEnum} from "@/enums/processes-enum";

function extractAccessToken(authResponse: string): string {
  const match = authResponse.match(/access_token=([^&]+)/);
  if (match && match[1]) {
    return match[1];
  }

  throw new Error("Unable to extract access token");
}

function parseCsvToJson(fileContent: string): string {
  fileContent = fileContent.replace("\r", "");
  const lines= fileContent.split("\n");

  const result = [];

  const headers= lines[0].split(";");

  for (let i = 1; i < lines.length; i++) {

    const obj = {};
    const currentLine = lines[i].split(";");

    for (let j = 0; j < headers.length; j++) {
      // @ts-ignore
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result);
}

export default function Home() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET!;
  const authUrl = "http://localhost:4000/authorize?clientId={client-id}&clientSecret={client-secret}&redirectUrl=http://localhost:3000".replace("{client-id}", clientId).replace("{client-secret}", clientSecret);

  const [fileContent, setFileContent] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertProcess, setAlertProcess] = useState<ProcessesEnum>(ProcessesEnum.StartingImportNotification);

  const handleFileSubmission = () => {
    const contactData = parseCsvToJson(fileContent);
    uploadCsv(contactData, sessionStorage.getItem("accessToken")!).then((response) => {
      if (response.ok) {
        setShowAlert(true);
        setAlertTitle("Successfully started import process!");
        setAlertMessage("The process is running in the background, we'll notify you when the import is complete");
        setAlertProcess(ProcessesEnum.StartingImportNotification);
      }
    });
  }

  useEffect(() => {
    if (!window.location.href.includes("token")) {
      window.location.assign(authUrl);
    } else {
      const accessToken = extractAccessToken(window.location.hash.slice(1));
      sessionStorage.setItem("accessToken", accessToken);
      if (!tableData.length) {
        getContacts(accessToken).then(response => response.json().then(data => setTableData(data)));
      }
    }
  });

  const data: Contact[] = [
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
    {
      email: "anonymmajora@gmail.com",
      firstName: "Nicolas",
      lastName: "Arias",
      address: "Calle 51 A # 3 F 30, Manizales",
      phoneNumber: "3009901976"
    },
  ]

  return (
    <div className="bg-[rgb(223,229,242)] p-5 h-screen flex justify-center items-center relative">
        <div className="w-full items-center justify-center z-[15]
      border-2 mb-5 border-border dark:border-darkBorder bg-white
      bg-[radial-gradient(#80808080_1px,transparent_1px)]
      px-10 shadow-light [background-size:16px_16px] m750:px-5 m750:py-10 relative">
          <div className="w-full h-full">
            <InputFile setFileContentOnParent={setFileContent}/>
            <Button disabled={!fileContent.length}
                    onClick={handleFileSubmission}
                    className="absolute top-0 right-0 transform -translate-y-[53px]">
              Publish CSV
            </Button>
          </div>
          <DataTable data={data}/>
        </div>
      {showAlert && <TemporalAlert onClose={() => setShowAlert(false)}
                                   process={alertProcess} title={alertTitle}
                                   message={alertMessage} time={10000}/>}
    </div>
  );
}
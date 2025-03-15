"use client";

import DataTable from "@/components/ui/data-table";
import {InputFile} from "@/components/ui/input-file";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {getContacts, uploadCsv} from "@/services/api-service";
import {Contact} from "@/types/contact";
import {TemporalAlert} from "@/components/ui/temporal-alert";
import {ProcessesEnum} from "@/enums/processes-enum";
import {parseCsvToJson} from "@/services/parse-service";
import {extractAccessToken} from "@/services/extract-service";
import {setContactsParameters} from "@/services/contact-parameters-service";
import {ActivityStatus} from "@/enums/activity-status-enum";
import {uploadStatus} from "@/services/upload-status-service";

export default function Home() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET!;
  const authUrl = "http://localhost:4000/authorize?clientId={client-id}&clientSecret={client-secret}&redirectUrl=http://localhost:3000".replace("{client-id}", clientId).replace("{client-secret}", clientSecret);

  const [fileContent, setFileContent] = useState<string>("");
  const [tableData, setTableData] = useState<Contact[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertProcess, setAlertProcess] = useState<ProcessesEnum>(ProcessesEnum.StartingImportNotification);

  const handleFileSubmission = () => {
    const accessToken = sessionStorage.getItem("accessToken")!;
    const contactData = parseCsvToJson(fileContent);
    uploadCsv(contactData, accessToken)
      .then((response) => response.json()
        .then(async data => {
          const activityId: string = data.activity_id;
          if (activityId) {
            setShowAlert(true);
            setAlertTitle("Successfully started import process!");
            setAlertMessage("The process is running in the background, we'll notify you when the import is complete");
            setAlertProcess(ProcessesEnum.StartingImportNotification);

            let activityStatus = await uploadStatus(accessToken, activityId, setShowAlert, setAlertTitle, setAlertMessage, setAlertProcess);
            while (activityStatus !== ActivityStatus.completed) {
              setTimeout(() => {}, 3000);
              activityStatus = await uploadStatus(accessToken, activityId, setShowAlert, setAlertTitle, setAlertMessage, setAlertProcess);
            }

            window.location.reload();
          }
        }));
  }

  useEffect(() => {
    if (!window.location.href.includes("token")) {
      window.location.assign(authUrl);
      return;
    }

    if (tableData.length)
      return;

    const accessToken = extractAccessToken();
    sessionStorage.setItem("accessToken", accessToken);
  });

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    let abortController: AbortController;

    const fetchContacts = async () => {
      if (!isMounted)
        return;

      abortController = new AbortController();

      const response = await getContacts(extractAccessToken());

      let contacts: Contact[] = await response.json();

      if (isMounted && contacts.length !== tableData.length) {
        contacts = contacts.map(contact => setContactsParameters(contact));
        setTableData(contacts);
      }

      if (isMounted) {
        timeoutId = setTimeout(fetchContacts, 5000);
      }
    };

    fetchContacts();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (abortController) {
        abortController.abort();
      }
    };
  }, [tableData.length]);

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
          <DataTable data={tableData}/>
        </div>
      {showAlert && <TemporalAlert onClose={() => setShowAlert(false)}
                                   process={alertProcess} title={alertTitle}
                                   message={alertMessage} time={5000}/>}
    </div>
  );
}
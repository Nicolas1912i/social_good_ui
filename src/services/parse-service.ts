export function parseCsvToJson(fileContent: string): string {
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
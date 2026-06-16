import { DownloadCloud, FileText } from "lucide-react";
import React, { useState } from "react";
import { ContractDocument } from "../../data/types/PropertyPlanDetailTypes";
import { useToastStore } from "../../zustand/useToastStore";
import Button from "../Button";
interface Props {
  contractDocuments: ContractDocument[];
  title?: string;
}
const DownloadPropertyDocuments: React.FC<Props> = ({
  contractDocuments,
  title,
}) => {
  const [fileID, setFileID] = useState("");
  const { showToast } = useToastStore();
  // Extract filename from URL
  const getFileName = (url: string, defaultName: string) => {
    try {
      const segments = url.split("/");
      const rawName = segments[segments.length - 1];
      // Remove query params if any
      const cleanName = rawName.split("?")[0];
      // If it's a generated name like "1781511498_Screenshot...", try to make it readable
      if (cleanName.includes("_Screenshot")) {
        return (
          defaultName ||
          cleanName
            .split("_")
            .slice(1)
            .join("_")
            .replace(/\.(png|jpg|jpeg|gif|pdf|txt)$/i, "")
        );
      }
      return cleanName;
    } catch {
      return defaultName;
    }
  };

  // Handle file download
  const downloadFile = async (fileUrl: string, fileName: string) => {
    setFileID(fileUrl);
    try {
      // For cross-origin files, we'll use fetch with blob to handle downloads properly
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      showToast("Download successfully", "success");
    } catch (error) {
      showToast("Download failed", "error");
      // Fallback: open in new tab
      window.open(fileUrl, "_blank");
    } finally {
      setFileID("");
    }
  };

  return (
    <div className="w-sm">
      <h4 className="absolute top-4 left-4 font-bold text-lg">
        {title || "Download Property Documents"}
      </h4>
      <div className="flex flex-col gap-2 pt-10">
        {contractDocuments.map((item, index) => (
          <div
            className="flex justify-between items-center w-full p-2 text-sm gap-2 border rounded-xl border-gray-200"
            key={index}
          >
            <div className="text-adron-green bg-adron-green/20 flex items-center justify-center p-2 rounded-full">
              <FileText size={18} />
            </div>
            <div className="flex-1 w-fit min-w-0">
              <div className="text-xs text-gray-500">Document name:</div>
              <div className="truncate">
                {getFileName(item.download_link, item.document_name)}
              </div>
            </div>
            <div className="">
              <Button
                label="Download"
                disabled={fileID === item.download_link}
                className="w-fit! px-4 text-xs"
                onClick={() =>
                  downloadFile(
                    item.download_link || item.document_file,
                    getFileName(item.download_link, item.document_name)
                  )
                }
                icon={<DownloadCloud size={18} />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadPropertyDocuments;

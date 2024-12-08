import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";

interface DeleteMessageProps {
  message: string;
}

export default function DeletedMessage({ message }: DeleteMessageProps) {
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    setDeleteMessage(message);

    const timer = setTimeout(() => {
      setDeleteMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [3000]);

  return (
    <>
      {deleteMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <XCircle className="h-5 w-5 text-red-400" />
              <p className="text-sm font-medium text-red-800">
                {deleteMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

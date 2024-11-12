import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setSuccessMessage(message);

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [3000]);

  return (
    <>
      {successMessage && (
        <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <p className="text-sm font-medium text-emerald-800">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

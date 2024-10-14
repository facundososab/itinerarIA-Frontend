import { PlusIcon } from "@heroicons/react/24/solid";

export function NewActivityButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="group flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      onClick={onClick}
    >
      <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
      <span className="font-medium text-sm">New Activity</span>
    </button>
  );
}

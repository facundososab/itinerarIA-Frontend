import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link to={to} className="bg-indigo-500 px-1 py-1 rounded-md">
    {children}
  </Link>
);

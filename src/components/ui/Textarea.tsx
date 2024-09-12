import { forwardRef, LegacyRef } from "react";

export const Textarea = forwardRef((props, ref: LegacyRef<HTMLTextAreaElement>, rows = 2) => (
    <textarea
        {...props}
        ref={ref}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        rows={rows}
    />
));

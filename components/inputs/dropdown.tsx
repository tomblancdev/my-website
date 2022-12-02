import { useState } from "react";

interface DropdownProps {
  children: React.ReactNode[];
  className?: string;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export default function Dropdown({
  children,
  className,
  selected,
  setSelected,
}: DropdownProps) {
  let [open, setOpen] = useState(false);

  // Styling using TailwindCSS

  return (
    <div className="relative">
      <ul className={"absolute " + className}>
        {children.map((child: any, index: number) =>
          open ? (
            <li
              key={index}
              onClick={() => {
                setSelected(index);
                setOpen(false);
              }}
            >
              {child}
            </li>
          ) : (
            index === selected && (
              <li
                key={index}
                onClick={() => {
                  setOpen(true);
                }}
              >
                {child}
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

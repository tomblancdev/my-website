import { useState } from "react";

function DropdownDisplay(props: { [key: string]: any }) {
  let [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <ul className={"absolute " + props.className}>
        {props.children.map((child: any, index: number) =>
          open ? (
            <li
              key={index}
              onClick={() => {
                setOpen(false);
                child.props.selected = true;
              }}
            >
              {child}
            </li>
          ) : (
            child.props.selected && (
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

function ImputSelect({
  children,
  selected = false,
}: {
  children: React.ReactNode;
  selected?: boolean;
}) {
  return <>{children}</>;
}

function DropDown() {
  return (
    <div>
      <h1>Dropdown</h1>
      <DropdownDisplay>
        <ImputSelect selected>test 1</ImputSelect>
        <ImputSelect>test 2</ImputSelect>
        <ImputSelect>test 3</ImputSelect>
      </DropdownDisplay>
    </div>
  );
}

export default function Tests() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-2 select-none">
      <div className="h-full py-40">
        <h1 className="m-10">Tests</h1>
        <DropDown />
      </div>
    </div>
  );
}

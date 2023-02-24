import { ReactNode, useEffect, useState } from "react";

interface ReactScrollProp {
  targetID: string;
  baseLineOption?: BaseLineOption;
  elementOption?: ElementOption;
  execOnStart?: boolean;
  activeClassName?: string;
  className?: string;
  children?: ReactNode;
}

interface BaseLineOption {
  position?: string;
  offset?: number;
}

interface ElementOption {
  topOffset?: number;
  bottomOffset?: number;
}

function ReactScroll(prop: ReactScrollProp) {
  const [active, setActive] = useState(false);

  const targetID = prop.targetID;
  const baseLineOption = {
    position: "top",
    offset: 0,
    ...prop.baseLineOption,
  };

  const elementOption = {
    topOffset: 0,
    bottomOffset: 0,
    ...prop.elementOption,
  };

  const execOnStart = prop.execOnStart ?? true;
  const activeClassName = prop.activeClassName ?? "";
  const className = prop.className ?? "";

  const onScrollEvent = () => {
    const elementRect = document
      .querySelector("#" + targetID)
      ?.getBoundingClientRect();
    if (elementRect == null) return;

    const topScroll =
      elementRect.top + window.scrollY + elementOption.topOffset;
    const bottomScroll =
      elementRect.bottom + window.scrollY + elementOption.bottomOffset;
    const baseLinePos =
      window.scrollY +
      (baseLineOption.position == "bottom"
        ? window.innerHeight
        : baseLineOption.position == "middle"
        ? window.innerHeight / 2
        : 0) +
      baseLineOption.offset;

    setActive(topScroll <= baseLinePos && baseLinePos <= bottomScroll);
  };

  const onClickEvent = () => {
    const elementRect = document
      .querySelector("#" + targetID)
      ?.getBoundingClientRect();
    if (elementRect == null) return;

    window.scrollTo({
      top: elementRect.top + window.scrollY - baseLineOption.offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollEvent);
    if (execOnStart) onScrollEvent();
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
    };
  });

  return (
    <div
      className={className + " " + (active ? activeClassName : "")}
      onClick={onClickEvent}
    >
      {prop.children}
    </div>
  );
}

export { ReactScroll };
export type { ReactScrollProp, BaseLineOption, ElementOption };

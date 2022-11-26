import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  ReactPropTypes,
} from "react";

// Ref : https://atomizedobjects.com/blog/quick-fixes/how-to-pass-props-to-children-in-react/

export function addPropsToReactElement(
  element: ReactNode,
  props: { [key: string]: any }
) {
  if (isValidElement(element)) {
    return cloneElement(element, props);
  }
  return element;
}

export function addPropsToChildren(
  children: ReactNode,
  props: { [key: string]: any }
) {
  if (!Array.isArray(children)) {
    return addPropsToReactElement(children, props);
  }
  return children.map((childElement) =>
    addPropsToReactElement(childElement, props)
  );
}

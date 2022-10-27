import { Component } from "../models/Component";
import { MouseEvent } from "react";

export type EditableComponentProps = {
  component: Component;
  onClick?: (e: MouseEvent) => void;
}

export function EditableComponent({ component, onClick }: EditableComponentProps) {

  return (
    <div onClick={onClick}>
      {component.type === 'title' && <h1>{component.findProp('text')?.value}</h1>}
    </div>
  )
}
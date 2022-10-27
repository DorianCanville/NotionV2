import { Component } from "../models/Component";
import { MouseEvent } from "react";

export type EditableComponentProps = {
  component: Component;
  onClick?: (e: MouseEvent) => void;
  deleteComp: (e: MouseEvent) => void;
}

export function EditableComponent({ component, onClick, deleteComp }: EditableComponentProps) {

  return (
    <div onClick={onClick}>
      <div><input type='button' value="X" onClick={deleteComp} /></div>
      {component.type === 'label' && <p>{component.findProp('text')?.value}</p>}
      {component.type === 'button' && <button>{component.findProp('text')?.value}</button>}
    </div>
  )
}
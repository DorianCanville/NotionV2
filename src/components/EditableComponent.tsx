import { Component } from "../models/Component";
import { MouseEvent } from "react";

export type EditableComponentProps = {
  component: Component;
  onClick?: (e: MouseEvent) => void;
  onDelete: (e: MouseEvent) => void;
}

export function EditableComponent({ component, onClick, onDelete }: EditableComponentProps) {

  return (
    <div onClick={onClick} className='editableComponent'>
      <div className="closeButton"><input type='button' value="X" onClick={onDelete} /></div>
      {component.type === 'label' && <p>{component.findProp('text')?.value}</p>}
      {component.type === 'title' && <h1>{component.findProp('text')?.value}</h1>}
      {component.type === 'button' && <button>{component.findProp('text')?.value}</button>}
    </div>
  )
}
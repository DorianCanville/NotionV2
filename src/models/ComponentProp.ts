import { ComponentPropType } from "./ComponentPropType";

export class ComponentProp {
  name: string;
  value: string;
  type: ComponentPropType;

  constructor(name: string, type: ComponentPropType, value: string) {
    this.name = name;
    this.type = type;
    this.value = value;
  }

  clone(): ComponentProp {
    return new ComponentProp(this.name, this.type, this.value);
  }

}
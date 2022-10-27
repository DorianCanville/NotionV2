import { ComponentProp } from "./ComponentProp";
import { ComponentType } from "./ComponentType";

export class Component {

  static currentId: number = 0;

  id: number;

  type: ComponentType;
  props: ComponentProp[];

  constructor(type: ComponentType, props: ComponentProp[]) {
    this.id = Component.currentId++;
    this.type = type;
    this.props = props;
  }

  findProp(name: string): ComponentProp | undefined {
    return this.props.find(prop => prop.name === name);
  }

  clone(): Component {
    return new Component(this.type, this.props.map(prop => prop.clone()));
  }

}
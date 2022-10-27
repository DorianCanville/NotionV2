import { ComponentProp } from "./ComponentProp";
import { ComponentType } from "./ComponentType";

export class Component {

  type: ComponentType;
  props: ComponentProp[];

  constructor(type: ComponentType, props: ComponentProp[]) {
    this.type = type;
    this.props = props;
  }

  findProp(name: string): ComponentProp | undefined {
    return this.props.find(prop => prop.name === name);
  }

}
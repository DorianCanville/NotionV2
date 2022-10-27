import { ComponentProp } from "./ComponentProp";
import { ComponentType } from "./ComponentType";

export class Component {
  static ButtonComponent = new Component('button', [ new ComponentProp('text', 'string', 'Click me'), new ComponentProp('color', 'color', '#F9F9F9') ]);
  static CarouselComponent = new Component('carousel', [ new ComponentProp('images', 'images', 'https://www.nyc.fr/wp-content/uploads/2015/07/New_York_City-scaled.jpg\nhttps://www.nyc.fr/wp-content/uploads/2015/07/New_York_City-scaled.jpg') ]);
  static LabelComponent = new Component('label', [ new ComponentProp('text', 'string', 'Hello world') ]);

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

  findProps(name: string): ComponentProp[] {
    return this.props.filter(prop => prop.name.includes(name));
  }

  updateProp(name: string, value: string) {
    const prop = this.findProp(name);
    
    if (prop) {
      prop.value = value;
    }
  }

  clone(): Component {
    return new Component(this.type, this.props.map(prop => prop.clone()));
  }

}
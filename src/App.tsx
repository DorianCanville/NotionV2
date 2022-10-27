import React, { useState } from 'react';
import { EditableComponent } from './components/EditableComponent';
import { Component } from './models/Component';
import { ComponentProp } from './models/ComponentProp';
import { MouseEvent } from "react";
import './styles/index.scss';
import Export from './components/ExportTest'

function App() {
  const [components, setComponents] = useState<Component[]>([new Component('title', [new ComponentProp('text', 'string', 'Test')])]);
  const [currentComponent, setCurrentComponent] = useState<Component | null>(null);

  const handleRemoveItem = (idx: number) => {
    setComponents(components.filter(item => item.id !== idx));
    };
  

  function handleComponentClick(e: MouseEvent, component: Component) {
    e.preventDefault();
    setCurrentComponent(component);
  }

  function handleStringPropertiesChange(e: React.FormEvent<HTMLInputElement>, component: Component, prop: ComponentProp) {
    e.preventDefault();
    const newComponent = component.clone();
    if (newComponent.findProp('text')) {
      console.log('test')
      newComponent.findProp('text')!.value = 'Test';
    }
    console.log(components);
    console.log(components.map(c => c.id === newComponent.id ? newComponent : c))
    setComponents(components.map(c => c.id === newComponent.id ? newComponent : c));
    console.log(components);
  }

  
  function printDocument (id : string) {
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    mywindow!.document.write(`<html><head><title>NotionV2</title>`);
    mywindow!.document.write('</head><body >');
    mywindow!.document.write(document.getElementById("worksheet")!.innerHTML);
    mywindow!.document.write('</body></html>');
  
    mywindow!.document.close(); // necessary for IE >= 10
    mywindow!.focus(); // necessary for IE >= 10*/
    mywindow!.print();
    mywindow!.close();   
}

  return (
    <div className="App">
      <div className='navbar'>
        <img className='logo_cesi' src='./logo_cesi.png'/>
        <input type="submit" onClick={(e) =>{ printDocument("worksheet")}} />
      </div>
      <div className='wrapper'>
        <div className='worksheet' id='worksheet'>
          {components.map((component, index) => (
            <EditableComponent key={index} component={component} onClick={(e: MouseEvent) => { handleComponentClick(e, component) }} deleteComp={(e: MouseEvent) => { handleRemoveItem(component.id)}} />
          ))}
        </div>
        <div className='toolbox'>
          {currentComponent && (
            <div>
              <h1>{currentComponent.type}</h1>
              <ul>
                {currentComponent.props.map((prop, index) => (
                  <li key={index}>{prop.name}: 
                    { prop.type === 'string' && <input type="text" value={prop.value} onChange={(e) => { handleStringPropertiesChange(e, currentComponent, prop) }} /> }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

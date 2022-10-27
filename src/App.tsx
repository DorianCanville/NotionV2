import React, { useState, useEffect } from 'react';
import { EditableComponent } from './components/EditableComponent';
import { Component } from './models/Component';
import { ComponentProp } from './models/ComponentProp';
import { MouseEvent } from "react";
import { ChartBarSquareIcon, ChatBubbleBottomCenterIcon, CursorArrowRaysIcon, ListBulletIcon, MapIcon, PhotoIcon, RectangleGroupIcon, TagIcon, TrashIcon } from '@heroicons/react/24/outline';
import './styles/index.scss';
import { ComponentType } from './models/ComponentType';

function App() {
  const [components, setComponents] = useState<Component[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem('components') || '[]'); // get components from local storage
    let tempComponents = temp.map((c: any) => {
      let props = c.props.map((p: any) => {
        return new ComponentProp(p.name, p.type, p.value);
      });
      return new Component(c.type, props);
    });

    setComponents(tempComponents);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('components', JSON.stringify(components)); // save components to local storage
    }
  }, [components, loaded]);

  const [currentComponent, setCurrentComponent] = useState<Component | null>(null);

  function handleRemoveItem(e: MouseEvent, idx: number) {
    e.stopPropagation();
    setComponents(components.filter(item => item.id !== idx));
    setCurrentComponent(null);
  };

  function handleComponentClick(e: MouseEvent, component: Component) {
    e.preventDefault();
    setCurrentComponent(component);
  }

  function updateComponent(oldComponent: Component, newComponent: Component) {
    setComponents(components.map(c => c === oldComponent ? newComponent : c));
    if (currentComponent === oldComponent) {
      setCurrentComponent(newComponent);
    }
  }

  function handleStringPropertiesChange(e: React.FormEvent<HTMLInputElement>, component: Component, prop: ComponentProp) {
    e.preventDefault();
    const newComponent = component.clone();
    newComponent.updateProp(prop.name, e.currentTarget.value);
    updateComponent(component, newComponent);
  }

  function handleTextareaPropertiesChange(e: React.FormEvent<HTMLTextAreaElement>, component: Component, prop: ComponentProp) {
    e.preventDefault();
    const newComponent = component.clone();
    newComponent.updateProp(prop.name, e.currentTarget.value);
    updateComponent(component, newComponent);
  }

  function handleToolbarAdd(type: ComponentType) {
    switch (type) {
      case 'button':
        setComponents([...components, Component.ButtonComponent.clone()]);
        break;
      case 'carousel':
        setComponents([...components, Component.CarouselComponent.clone()]);
        break;
      case 'label':
        setComponents([...components, Component.LabelComponent.clone()]);
        break;
    }
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
            <EditableComponent key={index} component={component} onClick={(e: MouseEvent) => { handleComponentClick(e, component) }} onDelete={(e: MouseEvent) => { handleRemoveItem(e, component.id)}} />
          ))}
        </div>
        <div className='toolbox'>
          <div className='iconComponents'>
              <CursorArrowRaysIcon className='icon' onClick={() => handleToolbarAdd('button')} />
              <ChatBubbleBottomCenterIcon className='icon' onClick={() => handleToolbarAdd('label')}/>
              <PhotoIcon className='icon' />
              <ListBulletIcon className='icon' />
              <RectangleGroupIcon className='icon' onClick={() => handleToolbarAdd('carousel')} />
              <TagIcon className='icon' />
              <ChartBarSquareIcon className='icon' />
              <MapIcon className='icon' />
              <TrashIcon className='icon delete' onClick={() => setComponents([])}/>
          </div>
          {currentComponent && (
            <div className='properties'>
              <h1>Propriétés de <span>{currentComponent.type}</span></h1>
              <ul className='propsList'>
                {currentComponent.props.map((prop, index) => (
                  <li key={index}><span className='propName'>{prop.name}</span>
                    { prop.type === 'string' && <input type="text" value={prop.value} onChange={(e) => { handleStringPropertiesChange(e, currentComponent, prop) }} /> }
                    { prop.type === 'images' && <textarea value={prop.value} className='editImages' onChange={(e) => { handleTextareaPropertiesChange(e, currentComponent, prop) }} /> }
                    { prop.type === 'color' && <input type="color" value={prop.value} onChange={(e) => { handleStringPropertiesChange(e, currentComponent, prop) }} /> }
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

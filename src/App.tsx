import React, { useState, useEffect } from 'react';
import { EditableComponent } from './components/EditableComponent';
import { Component } from './models/Component';
import { ComponentProp } from './models/ComponentProp';
import { MouseEvent } from "react";
import { ChartBarSquareIcon, ChatBubbleBottomCenterIcon, CursorArrowRaysIcon, ListBulletIcon, MapIcon, PhotoIcon, RectangleGroupIcon, TagIcon } from '@heroicons/react/24/outline';
import './styles/index.scss';

function App() {
  const [components, setComponents] = useState<Component[]>([]);

  let temp = JSON.parse(localStorage.getItem('components') || '[]'); // get components from local storage
  let tempComponents = temp.map((c: any) => {
    let props = c.props.map((p: any) => {
      return new ComponentProp(p.name, p.type, p.value);
    });
    return new Component(c.type, props);
  });

  useEffect(() => {
    setComponents(tempComponents);
  }, []);

  const [currentComponent, setCurrentComponent] = useState<Component | null>(null);

  function handleComponentClick(e: MouseEvent, component: Component) {
    e.preventDefault();
    setCurrentComponent(component);
  }

  function updateComponent(oldComponent: Component, newComponent: Component) {
    setComponents(components.map(c => c === oldComponent ? newComponent : c));
    if (currentComponent === oldComponent) {
      setCurrentComponent(newComponent);
    }

    localStorage.setItem('components', JSON.stringify(components.map(c => c === oldComponent ? newComponent : c))); // save components to local storage
  }

  function handleStringPropertiesChange(e: React.FormEvent<HTMLInputElement>, component: Component, prop: ComponentProp) {
    e.preventDefault();
    const newComponent = component.clone();
    newComponent.updateProp(prop.name, e.currentTarget.value);
    updateComponent(component, newComponent);
  }

  return (
    <div className="App">
      <div className='navbar'>
        <img className='logo_cesi' src='./logo_cesi.png'/>
      </div>
      <div className='wrapper'>
        <div className='worksheet'>
          {components.map((component, index) => (
            <EditableComponent key={index} component={component} onClick={(e: MouseEvent) => { handleComponentClick(e, component) }} />
          ))}
        </div>
        <div className='toolbox'>
          <div className='iconComponents'>
              <CursorArrowRaysIcon className='icon' />
              <ChatBubbleBottomCenterIcon className='icon' />
              <PhotoIcon className='icon' />
              <ListBulletIcon className='icon' />
              <RectangleGroupIcon className='icon' />
              <TagIcon className='icon' />
              <ChartBarSquareIcon className='icon' />
              <MapIcon className='icon' />
          </div>
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

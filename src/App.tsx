import React, { useState } from 'react';
import { EditableComponent } from './components/EditableComponent';
import { Component } from './models/Component';
import { ComponentProp } from './models/ComponentProp';
import { MouseEvent } from "react";
import { ChartBarSquareIcon, ChatBubbleBottomCenterIcon, CursorArrowRaysIcon, ListBulletIcon, MapIcon, PhotoIcon, RectangleGroupIcon, TagIcon } from '@heroicons/react/24/outline';
import './styles/index.scss';

function App() {
  const [components, setComponents] = useState<Component[]>([new Component('title', [new ComponentProp('text', 'string', 'Test')])]);
  const [currentComponent, setCurrentComponent] = useState<Component | null>(null);

  function handleComponentClick(e: MouseEvent, component: Component) {
    e.preventDefault();
    setCurrentComponent(component);
  }

  function handleStringPropertiesChange(e: React.FormEvent<HTMLInputElement>, component: Component, prop: ComponentProp) {
    e.preventDefault();
    const newComponent = component.clone();
    if (newComponent.findProp('text')) {
      newComponent.findProp('text')!.value = 'Test';
    }
    setComponents(components.map(c => c.id === newComponent.id ? newComponent : c));
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

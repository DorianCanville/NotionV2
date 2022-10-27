import { useState } from 'react';
import { Component } from './models/Component';
import { ComponentProp } from './models/ComponentProp';

function App() {
  const [components, setComponents] = useState<Component[]>([new Component('title', [new ComponentProp('text', 'Test')])]);

  return (
    <div className="App">
      {components.map((component, index) => (
        <div key={index}>
          {component.type === 'title' && <h1>{component.findProp('text')?.value}</h1>}
        </div>
      ))}
    </div>
  );
}

export default App;

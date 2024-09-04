import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import './Home.css';

import realMadridVideo from './real-madrid.mp4';

const Home = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [textConfig, setTextConfig] = useState({ 
    fontSize: 16, 
    color: '#FF0000', 
    fontFamily: 'Arial',
    stroke: '#000000',
    strokeWidth: 0,
  });
  const [nextId, setNextId] = useState(1);
  const [selectedTextBox, setSelectedTextBox] = useState(null);
  const videoRef = useRef(null);

  const addTextBox = () => {
    setTextBoxes([]);

    const newBox = { 
      id: nextId, 
      x: 50, 
      y: 50, 
      width: 100, 
      height: 50, 
      text: 'Text Sample',
      ...textConfig
    };
    setTextBoxes([newBox]); 
    setNextId(nextId + 1);
    setSelectedTextBox(newBox.id);
  };

  const updateTextBox = (id, newProps) => {
    setTextBoxes(textBoxes.map(box => (box.id === id ? { ...box, ...newProps } : box)));
  };

  const deleteTextBox = (id) => {
    setTextBoxes(textBoxes.filter(box => box.id !== id));
    if (selectedTextBox === id) setSelectedTextBox(null);
  };

  const handleTextConfigChange = (key, value) => {
    setTextConfig({ ...textConfig, [key]: value });
    if (selectedTextBox) {
      updateTextBox(selectedTextBox, { [key]: value });
    }
  };

  return (
    <div className="home">
      <div className="video-section">
        <video ref={videoRef} controls width="600" height="400">
          <source src={realMadridVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="text-overlay">
          {textBoxes.map(box => (
            <Draggable
              key={box.id}
              defaultPosition={{x: box.x, y: box.y}}
              onStop={(e, data) => updateTextBox(box.id, { x: data.x, y: data.y })}
            >
              <ResizableBox
                width={box.width}
                height={box.height}
                minConstraints={[50, 30]}
                maxConstraints={[500, 300]}
                onResizeStop={(e, data) => {
                  updateTextBox(box.id, { width: data.size.width, height: data.size.height });
                }}
                className={`resizable-box ${selectedTextBox === box.id ? 'selected' : ''}`}
                onClick={() => setSelectedTextBox(box.id)}
              >
                <div 
                  className="text-box-content"
                  style={{
                    fontSize: `${box.fontSize}px`,
                    fontFamily: box.fontFamily,
                    color: box.color,
                    WebkitTextStroke: `${box.strokeWidth}px ${box.stroke}`,
                  }}
                >
                  {box.text}
                </div>
              </ResizableBox>
            </Draggable>
          ))}
        </div>
      </div>
      <div className="config-section">
        <button onClick={addTextBox}>Add Text</button>
        <div className="config-controls">
          <label>
            Text:
            <input
              type="text"
              value={selectedTextBox ? textBoxes.find(box => box.id === selectedTextBox)?.text : ''}
              onChange={(e) => selectedTextBox && updateTextBox(selectedTextBox, { text: e.target.value })}
            />
          </label>
          <label>
            Position:
            <div>
              X: <input type="number" value={selectedTextBox ? textBoxes.find(box => box.id === selectedTextBox)?.x : ''} onChange={(e) => selectedTextBox && updateTextBox(selectedTextBox, { x: parseInt(e.target.value) })} />
              Y: <input type="number" value={selectedTextBox ? textBoxes.find(box => box.id === selectedTextBox)?.y : ''} onChange={(e) => selectedTextBox && updateTextBox(selectedTextBox, { y: parseInt(e.target.value) })} />
            </div>
          </label>
          <label>
            Font:
            <select
              value={textConfig.fontFamily}
              onChange={(e) => handleTextConfigChange('fontFamily', e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </label>
          <label>
            Font Size:
            <input
              type="number"
              value={textConfig.fontSize}
              onChange={(e) => handleTextConfigChange('fontSize', parseInt(e.target.value))}
            />
          </label>
          <label>
            Fill:
            <input
              type="color"
              value={textConfig.color}
              onChange={(e) => handleTextConfigChange('color', e.target.value)}
            />
          </label>
          <label>
            Stroke:
            <input
              type="color"
              value={textConfig.stroke}
              onChange={(e) => handleTextConfigChange('stroke', e.target.value)}
            />
          </label>
          <label>
            Stroke Width:
            <input
              type="number"
              value={textConfig.strokeWidth}
              onChange={(e) => handleTextConfigChange('strokeWidth', parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Home;




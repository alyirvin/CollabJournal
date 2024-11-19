// src/components/Journal.js
import React, { useRef, useEffect, useState } from 'react';
import './miniJournal.css';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';

const JournalEdit = () => {
  const { journalId } = useParams();
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [color, setColor] = useState('black'); // State for selected color
  const [text, setText] = useState(''); // State for input text
  const [textPosition, setTextPosition] = useState(50); // Starting Y position for text
  const [shape, setShape] = useState('line'); // State for selected shape
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 }); // Starting coordinates for shapes
  const [shapes, setShapes] = useState([]); // Array to store shapes

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/journals/${journalId}`);
        const journal = response.data;
        setColor(journal.color);
        setText(journal.text);
        setTextPosition(journal.textPosition);
        setShape(journal.shape);
        setShapes(journal.shapes);
      } catch (error) {
        console.error('Error fetching journal:', error);
      }
    };
    fetchJournal();

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 200;
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawShapes(); // Draw existing shapes on load
  }, [journalId]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    setStartCoords({ x, y });
  };

  const endDrawing = (e) => {
    if (!isDrawing) return;
    const endX = e.clientX - canvasRef.current.offsetLeft;
    const endY = e.clientY - canvasRef.current.offsetTop;

    // Save the shape with the end coordinates
    const newShape = {
      shape,
      startX: startCoords.x,
      startY: startCoords.y,
      endX,
      endY,
      color, // Save the selected color
    };
    setShapes([...shapes, newShape]);
    setIsDrawing(false);
    ctx.beginPath(); // Reset the path
    drawShapes(); // Redraw all shapes including the new one
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Redraw background

    // Redraw existing text and shapes
    drawShapes();
    ctx.fillStyle = color;
    ctx.font = '20px Arial';
    ctx.fillText(text, 50, textPosition);

    // Draw the selected shape temporarily
    ctx.fillStyle = color; // Use the selected color for shapes
    ctx.strokeStyle = color; // Use the selected color for stroke
    if (shape === 'line') {
      ctx.beginPath();
      ctx.moveTo(startCoords.x, startCoords.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (shape === 'rectangle') {
      ctx.fillRect(startCoords.x, startCoords.y, x - startCoords.x, y - startCoords.y);
    } else if (shape === 'circle') {
      const radius = Math.sqrt(Math.pow(x - startCoords.x, 2) + Math.pow(y - startCoords.y, 2));
      ctx.beginPath();
      ctx.arc(startCoords.x, startCoords.y, radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(startCoords.x, startCoords.y);
      ctx.lineTo(x, y);
      ctx.lineTo(startCoords.x, y);
      ctx.closePath();
      ctx.fill();
    }
  };

  const drawShapes = () => {
    shapes.forEach(({ shape, startX, startY, endX, endY, color }) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      if (shape === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      } else if (shape === 'rectangle') {
        ctx.fillRect(startX, startY, endX - startX, endY - startY);
      } else if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(startX, endY);
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setTextPosition(50); // Reset text position when clearing the canvas
    setShapes([]); // Clear shapes array
  };

  const saveJournal = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/api/journals/${journalId}`, {
        color,
        text,
        textPosition,
        shape,
        shapes,
      });
      console.log('Save response:', response.data);
      navigate('/Groups');
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };
  return (
    <div className="miniJournalContainer">
      <div className="journal-container">
        <h1>Your Journal</h1>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} // Update color state
        />
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} // Update text state
          placeholder="Type your text here..."
          rows="4"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <div className="add-button">
        <button onClick={clearCanvas}>Clear Canvas</button>
        </div>
        <select
          className="select-shape"
          onChange={(e) => setShape(e.target.value)} 
          value={shape}
        >
          <option value="line">Line</option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          style={{ border: '1px solid black' }}
        />
        <div className="add-button">
          <button onClick={saveJournal}>Save</button>
        </div>
        </div>
    </div>
  );
};

export default JournalEdit;
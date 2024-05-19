import React, { useEffect, useRef, useState } from "react";
import { templateData } from "./templateData";
import ColorPicker from "./ColorPicker";

const CanvasEditor = () => {
    const canvasRef = useRef(null);
    const [caption, setCaption] = useState(templateData.caption.text);
    const [cta, setCta] = useState(templateData.cta.text);
    const [bgColor, setBgColor] = useState("#0369A1");
    const [colorHistory, setColorHistory] = useState([]);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const updateBgColor = (color) => {
        setBgColor(color);
        setColorHistory((prev) => {
            const updated = [color, ...prev.filter((c) => c !== color)];
            return updated.slice(0, 5);
        });
    };

    const handleColorPickerToggle = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleColorSelect = (color) => {
        updateBgColor(color);
        setShowColorPicker(false); // Close color picker after selection
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleCtaChange = (e) => {
        setCta(e.target.value);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const imageMask = new Image();
        const maskStroke = new Image();
        const designPattern = new Image();
    
        const drawCanvas = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
    
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            // 1. Draw Background Color
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            // 2. Draw Design Pattern (Second Layer)
            designPattern.onload = () => {
                ctx.drawImage(designPattern, 0, 0, canvas.width, canvas.height);
                drawMaskAndStroke(); // After design pattern is loaded, we draw the mask and stroke
            };
            designPattern.src = `${templateData.urls.design_pattern}?random=${Math.random()}`;
        };
    
        const drawMaskAndStroke = () => {
            // 3. Draw Image Mask (Third Layer)
            imageMask.onload = () => {
                ctx.globalCompositeOperation = "destination-in";
                ctx.drawImage(
                    imageMask,
                    templateData.image_mask.x,
                    templateData.image_mask.y,
                    templateData.image_mask.width,
                    templateData.image_mask.height
                );
                ctx.globalCompositeOperation = "source-over";
                drawMaskStroke(); // After mask is drawn, draw the stroke
            };
            imageMask.src = `${templateData.urls.mask}?random=${Math.random()}`;
        };
    
        const drawMaskStroke = () => {
            // 4. Draw Mask Stroke (Fourth Layer)
            maskStroke.onload = () => {
                ctx.drawImage(maskStroke, 0, 0, canvas.width, canvas.height);
                drawTexts(); // After stroke is drawn, draw the texts
            };
            maskStroke.src = `${templateData.urls.stroke}?random=${Math.random()}`;
        };
    
        const drawTexts = () => {
            // Clear canvas before drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // Draw Background Color
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        
            // Draw Design Pattern (Second Layer)
            designPattern.onload = () => {
                ctx.drawImage(designPattern, 0, 0, canvas.width, canvas.height);
                drawMaskAndStroke(); // After design pattern is loaded, draw the mask and stroke
            };
            designPattern.src = `${templateData.urls.design_pattern}?random=${Math.random()}`;
        
            const captionX = templateData.caption.position.x;
            const captionY = templateData.caption.position.y;
        
            // Draw Caption
            ctx.font = `${templateData.caption.font_size}px Arial`;
            ctx.fillStyle = templateData.caption.text_color;
            ctx.textAlign = templateData.caption.alignment;
            wrapText(
                ctx,
                caption,
                captionX,
                captionY,
                templateData.caption.max_characters_per_line * (templateData.caption.font_size / 2),
                templateData.caption.font_size + 5
            );
        
            // Draw CTA
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
        
            const ctaWidth = ctx.measureText(cta).width + 48;
            const ctaHeight = 60;
            const ctaX = templateData.cta.position.x - ctaWidth / 2;
            const ctaY = templateData.cta.position.y - ctaHeight / 2;
        
            ctx.fillStyle = templateData.cta.background_color;
            ctx.beginPath();
            ctx.moveTo(ctaX + 10, ctaY);
            ctx.lineTo(ctaX + ctaWidth - 10, ctaY);
            ctx.quadraticCurveTo(
                ctaX + ctaWidth,
                ctaY,
                ctaX + ctaWidth,
                ctaY + 10
            );
            ctx.lineTo(ctaX + ctaWidth, ctaY + ctaHeight - 10);
            ctx.quadraticCurveTo(
                ctaX + ctaWidth,
                ctaY + ctaHeight,
                ctaX + ctaWidth - 10,
                ctaY + ctaHeight
            );
            ctx.lineTo(ctaX + 10, ctaY + ctaHeight);
            ctx.quadraticCurveTo(ctaX, ctaY + ctaHeight, ctaX, ctaY + ctaHeight - 10);
            ctx.lineTo(ctaX, ctaY + 10);
            ctx.quadraticCurveTo(ctaX, ctaY, ctaX + 10, ctaY);
            ctx.closePath();
            ctx.fill();
        
            ctx.fillStyle = templateData.cta.text_color;
            ctx.fillText(cta, templateData.cta.position.x, templateData.cta.position.y);
        }; 
        drawCanvas();
    
    }, [caption, cta, bgColor, colorHistory, showColorPicker]);
    
    
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(" ");
        let line = "";
        let lines = [];
        let yPos = y;
    
        words.forEach(word => {
            const testLine = line + word + " ";
            const testWidth = context.measureText(testLine).width;
            if (testWidth > maxWidth && line !== "") {
                lines.push(line);
                line = word + " ";
                yPos += lineHeight;
            } else {
                line = testLine;
            }
        });
    
        lines.push(line);
        lines.forEach((line, index) => {
            context.fillText(line, x, yPos + index * lineHeight);
        });
    
        return lines.length; // Return the number of lines
    };
    

    // checking the Log the value of caption.text
    useEffect(() => {
        console.log("Caption text:", caption);
    }, [caption]);

    return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="p-4">
                <canvas
                    ref={canvasRef}
                    width={1080}
                    height={1080}
                    style={{ width: 400, height: 400 }}
                    className="border border-gray-300"
                ></canvas>
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    value={caption}
                    onChange={handleCaptionChange}
                    className="border p-2 mr-2"
                    placeholder="Edit caption"
                />
                <input
                    type="text"
                    value={cta}
                    onChange={handleCtaChange}
                    className="border p-2 mr-2"
                    placeholder="Edit CTA"
                />
                <div className="flex items-center">
                    {colorHistory.map((color, index) => (
                        <div
                            key={index}
                            className="w-6 h-6 border-2 border-gray-300 cursor-pointer mr-1"
                            style={{ backgroundColor: color }}
                            onClick={() => setBgColor(color)}
                        ></div>
                    ))}
                    <button className="bg-gray-200 w-6 h-6 border-2 border-gray-300 cursor-pointer mr-1" onClick={handleColorPickerToggle}>
                        +
                    </button>
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => updateBgColor(e.target.value)}
                        className="border p-2"
                    />
                </div>
            </div>
            {showColorPicker && (
                <ColorPicker
                    onSelectColor={handleColorSelect}
                    onClose={() => setShowColorPicker(false)}
                />
            )}
        </div>
    );
};

export default CanvasEditor;

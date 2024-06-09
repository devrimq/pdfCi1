import React, { useEffect, useRef } from "react";

const CanvasTitle = ({ text, fontSize }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const container = canvas.parentNode;
      canvas.width = container.clientWidth;
      canvas.height = fontSize * 2;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#00c6ff");
      gradient.addColorStop(1, "#0072ff");

      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = gradient;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 5;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [text, fontSize]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasTitle;

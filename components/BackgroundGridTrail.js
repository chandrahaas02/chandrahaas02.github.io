import React, { useEffect, useRef, useState } from "react";

const BackgroundGridTrail = ({ rows = 20, cols = 36, trailLength = 5 }) => {
  const gridRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const idleTimeout = useRef(null);

  const clearTrailAfterIdle = () => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      setTrail([]);
    }, 50); // 🕐 Clear trail after 500ms of inactivity
  };

  // Create cells
  const totalCells = rows * cols;
  const cells = Array.from({ length: totalCells }, (_, i) => i);

  // Mouse tracking
  const handleMouseMove = (e) => {
    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * cols);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * rows);
    const index = y * cols + x;

    if (index >= 0 && index < totalCells && trail[trail.length - 1] !== index) {
      setTrail((prev) => {
        const next = [...prev, index];
        if (next.length > trailLength) next.shift();
        return next;
      });
    }
    clearTrailAfterIdle();
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trail]);

  return (
    <div
      ref={gridRef}
      className="absolute inset-0 grid grid-cols-30 grid-rows-30 pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells.map((i) => (
        <div
          key={i}
          className={`transition duration-300 border border-[#0a0a0a] ${
            trail.includes(i) ? "bg-green-950" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default BackgroundGridTrail;

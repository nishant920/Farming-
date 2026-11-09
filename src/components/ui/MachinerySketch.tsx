import React from 'react';

interface MachinerySketchProps {
  name: string;
  imageSrc?: string;
  className?: string;
}

export const MachinerySketch: React.FC<MachinerySketchProps> = ({
  name,
  imageSrc,
  className = '',
}) => {
  // If a real cropped sketch or photo is provided and isn't Drone Spray (which was blank in the original app screenshot), render it cleanly
  if (imageSrc && !imageSrc.includes('svg-drone')) {
    return (
      <div
        className={`bg-white flex items-center justify-center overflow-hidden ${className}`}
      >
        <img
          src={imageSrc}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-2"
        />
      </div>
    );
  }

  // Custom Black & Leaf-Green Technical Line-Art Sketch (matching image_44b04a5b.png style) for Drone Spray or fallback
  return (
    <div
      className={`bg-white flex items-center justify-center p-3 overflow-hidden ${className}`}
      role="img"
      aria-label={`${name} technical sketch`}
    >
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-40"
      >
        {/* Crop row green sketch lines underneath */}
        <path
          d="M25 142 C40 132, 55 132, 70 142 M80 142 C95 132, 110 132, 125 142 M135 142 C150 132, 165 132, 180 142"
          stroke="#86EFAC"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M35 150 C50 142, 65 142, 80 150 M95 150 C110 142, 125 142, 140 150"
          stroke="#4ADE80"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Spray mist cones in soft green */}
        <path
          d="M65 92 L42 132 M75 92 L82 132 M125 92 L118 132 M135 92 L158 132"
          stroke="#22C55E"
          strokeWidth="1.75"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        {/* Agricultural Drone Tank (Green Fill Accent like the sketches) */}
        <rect
          x="78"
          y="54"
          width="44"
          height="28"
          rx="8"
          fill="#86EFAC"
          fillOpacity="0.45"
          stroke="#1E293B"
          strokeWidth="2.2"
        />
        {/* Drone Top Cap & GPS Dome */}
        <path
          d="M88 54 V46 C88 42, 112 42, 112 46 V54"
          fill="#4ADE80"
          stroke="#1E293B"
          strokeWidth="2.2"
        />
        {/* Quad Arms */}
        <path
          d="M78 62 L32 48 M122 62 L168 48 M78 72 L42 82 M122 72 L158 82"
          stroke="#1E293B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Rotor Motors & Propellers */}
        <circle cx="32" cy="46" r="4" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
        <ellipse cx="32" cy="42" rx="22" ry="4" stroke="#1E293B" strokeWidth="1.8" />
        <circle cx="168" cy="46" r="4" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
        <ellipse cx="168" cy="42" rx="22" ry="4" stroke="#1E293B" strokeWidth="1.8" />
        <circle cx="42" cy="80" r="3.5" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
        <ellipse cx="42" cy="76" rx="16" ry="3" stroke="#1E293B" strokeWidth="1.6" />
        <circle cx="158" cy="80" r="3.5" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
        <ellipse cx="158" cy="76" rx="16" ry="3" stroke="#1E293B" strokeWidth="1.6" />
        {/* Landing Skids & Spray Boom */}
        <path
          d="M84 82 L74 106 M116 82 L126 106 M64 106 H136"
          stroke="#1E293B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M60 90 H140"
          stroke="#1E293B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="70" cy="90" r="2.5" fill="#22C55E" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="130" cy="90" r="2.5" fill="#22C55E" stroke="#1E293B" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

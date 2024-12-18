import { useState, useRef, useEffect } from 'react';

export default () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ y: 50 });
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const windowHeight = window.innerHeight;
      const percentage = (e.clientY / windowHeight) * 100;
      // 限制拖动范围在5%到95%之间
      const clampedPercentage = Math.min(Math.max(percentage, 5), 95);
      setPosition({ y: clampedPercentage });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleOpenSidePanel = () => {
    browser.runtime.sendMessage({ action: 'open_side_panel' });
  }

  return (
    <div
      ref={dragRef}
      onMouseDown={() => setIsDragging(true)}
      onClick={handleOpenSidePanel}
      style={{
        top: `${position.y}%`,
        userSelect: 'none', // 防止拖动时选中文字
      }}
      className={`
        fixed right-0 -translate-y-1/2 
        w-[40px] h-[40px] 
        flex items-center justify-center
        bg-gradient-to-r from-purple-500/80 to-pink-500/80
        text-white font-bold text-lg
        hover:w-[50px] hover:from-purple-500 hover:to-pink-500 cursor-pointer
        hover:-translate-x-1 hover:scale-105
        transition-all duration-300 ease-out
        border-l-2 border-white/20 backdrop-blur-sm
        shadow-[-2px_0_10px_rgba(0,0,0,0.1)]
        group
        rounded-l-full   
        ${isDragging ? 'from-purple-600 to-pink-600' : ''}
      `}
    >
      <span className="opacity-70 group-hover:opacity-100">
        m
      </span>
    </div>
  );
};
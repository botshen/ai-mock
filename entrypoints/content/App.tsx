import { useState, useRef, useEffect } from 'react';

export default () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const mouseOffset = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;

      // 直接使用鼠标位置减去偏移量
      const newY = e.clientY - mouseOffset.current;

      // 限制范围
      const maxY = window.innerHeight - dragRef.current.offsetHeight / 2;
      const minY = dragRef.current.offsetHeight / 2;
      const clampedY = Math.min(Math.max(newY, minY), maxY);

      // 直接设置位置，不使用 transform
      dragRef.current.style.top = `${clampedY}px`;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseup', handleMouseUp, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={dragRef}
      onMouseDown={(e) => {
        if (!dragRef.current) return;

        // 计算鼠标在元素内的相对位置
        const rect = dragRef.current.getBoundingClientRect();
        mouseOffset.current = e.clientY - rect.top;
        setIsDragging(true);
      }}
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        userSelect: 'none',
      }}
      onClick={() => {
        browser.runtime.sendMessage({ action: 'open_side_panel' });
      }}
      className={`
        w-[40px] h-[40px] 
        flex items-center justify-start
        bg-gradient-to-r from-purple-500/80 to-pink-500/80
        text-white font-bold text-lg
        hover:w-[50px] hover:from-purple-500 hover:to-pink-500 cursor-pointer
        transform-gpu
        origin-right
        transition-all duration-300 ease-out
        border-l-2 border-white/20 backdrop-blur-sm
        shadow-[-2px_0_10px_rgba(0,0,0,0.1)]
        group
        rounded-l-full   
        z-9999
        ${isDragging ? 'from-purple-600 to-pink-600' : ''}
      `}
    >
      <span className="ml-[10px] text-[16px]">m</span>
    </div>
  );
};
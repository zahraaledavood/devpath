import { RefObject, useEffect, useState } from "react";


export function useIntersection(ref: RefObject<Element | null>): boolean {
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.15 }
      );
  
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, [ref]);
  
    return visible;
  }
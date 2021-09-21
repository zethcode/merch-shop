import { useLayoutEffect, useState } from 'react';

const useWindowPosition = (id) => {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      const offsetSetHeight = (id === 'reviews-section' ? window.document.getElementById(id).offsetHeight + 1800: window.document.getElementById(id).offsetHeight);
      if (window.pageYOffset > offsetSetHeight * 0.7) {
        setAnimation(true);
      }
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);

  return animation;
};

export default useWindowPosition;
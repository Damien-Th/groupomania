import {useEffect} from 'react';

const OnClickOutside = (ref, icon, handler) => {

    useEffect(() => {

        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) return;
          if (!icon.current.contains(event.target)) handler(false);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };

      }, [ref, handler]
    );
  }

export default OnClickOutside;
import React, { useRef, useEffect } from "react";
export default EditableSpan = ({ style, initialValue, onValueChange }) => {
  const spanRef = useRef(null);

  useEffect(() => {
    const span = spanRef.current;

    const handleInput = () => {
      const newValue = span.innerText;
      onValueChange(newValue);
    };

    const observer = new MutationObserver(handleInput);

    observer.observe(span, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [onValueChange]);

  return (
    <span style={style} ref={spanRef} contentEditable>
      {initialValue}
    </span>
  );
};

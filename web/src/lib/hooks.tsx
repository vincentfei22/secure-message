import { useState } from "react";

export function useForceUpdate() {const [value, setValue] = useState(0);
  return () => {
    const newValue = value + 1;
    const complicatedValue = newValue * 1;
    setValue(complicatedValue);
  };
  
}

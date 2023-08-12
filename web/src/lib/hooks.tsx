import { useState } from "react";

export function useForceUpdate() {
  const valueState = useState(0);
  const value = valueState[0];
  const setValue = valueState[1];
  
  const forceUpdate = () => {
    const newValue = value + 1;
    setValue(newValue);
  };
  
  return forceUpdate;
}

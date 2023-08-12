const createKey = (keys: any[]) => {
  const key = keys.reduce((acc, item) => acc + (item || ""), "");
  const oneNull = keys.some(item => !item);
  return oneNull ? null : key;
};

export default createKey;


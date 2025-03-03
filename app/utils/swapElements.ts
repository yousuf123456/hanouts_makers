export const swapElements = (
  array: any,
  setState: any,
  index1: number,
  index2: number
) => {
  // Create a copy of the array
  const newArray = [...array];
  console.log(array, setState, index1, index2);

  // Swap the elements at index1 and index2
  const temp = newArray[index1];
  newArray[index1] = newArray[index2];
  newArray[index2] = temp;

  console.log("Setting Array To: ", newArray);
  // Update the state with the modified array
  setState(newArray);
};

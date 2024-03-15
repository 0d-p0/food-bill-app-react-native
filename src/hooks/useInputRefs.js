import {useRef} from 'react';

// Custom hook to manage an array of input refs
const useInputRefs = count => {
  const inputRefs = Array.from({length: count}, () => useRef(null));

  // Function to focus on the next input field
  const focusNextInput = index => {
    console.log('first');

    if (index < count - 1) {
      console.log('second');
      inputRefs[index + 1].current.focus();
    }
    console.log('last');
  };

  return {inputRefs, focusNextInput};
};

export default useInputRefs;

import { useEffect } from "react"

const useEventListener = ( 
    event,
    handler,
    passive = false,
    depsArray
    ) => {
// export default function useEventListener({
//   event,
//   handler,
//   passive = false,
//   depsArray,
// }) {

  useEffect(() => {
    // create the event handler
    window.addEventListener(event, handler, passive);

    // any time a state variable or prop changes, remove the listener in preparation for a new one to be set.
    return () => {
      window.removeEventListener(event, handler);
    }
  },

  // define what state variables and prop changes should run the above code.
  [ ...depsArray, handler, event, passive]);

}

export default useEventListener;
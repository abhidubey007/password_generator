import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePass = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&()*+-/:<=>?@[]^_{|}`";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 20) // if we want fixed length selection only show
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    generatePass();
  }, [length, numberAllowed, charAllowed, generatePass]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-4xl text-center text-white my-3">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-3 outline-none bg-blue-700 hover:bg-orange-700 text-white py-1 shrink-0"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 items-center">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// link related to sources
// useEffect vs useCallback vs useMemo
// https://www.geeksforgeeks.org/when-to-use-usecallback-usememo-and-useeffect/

// Conclusion: Hence, a useCallback hook should be used when we want to memoize a callback, and to memoize the result of a function to avoid expensive computation we can use useMemo. useEffect is used to produce side effects to some state changes. One thing to remember is that one should not overuse hooks.

// random password generator ideas
// https://www.geeksforgeeks.org/how-to-generate-a-random-password-using-javascript/

// useCallback ***
//  is a React Hook that lets you cache a function definition between re-renders.
// const cachedFn = useCallback(fn, dependencies)

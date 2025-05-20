import React, { useState } from "react";
import { money } from "../../public/assets";
import Button from "./Button";
const Balance = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="fixed top-20 w-[100%] flex items-center
      z-3 justify-end space-x-4 bg-n-9/40 backdrop-blur px-10 
      "
    >
      <img src={money} width={50} height={50}></img>
      <p className="text-xl font-bold my-2">{count} $</p>
      <Button
        white
        onClick={() => setCount(count + 1000)}
        className="px-4 py-2 text-black rounded "
      >
        +
      </Button>
    </div>
  );
};

export default Balance;

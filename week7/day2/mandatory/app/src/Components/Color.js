import { useEffect, useState } from "react";
function Color() {
    const [favoriteColor, setFavoriteColor] = useState("red");
    
    useEffect(() => {
      alert("useEffect reached");
    }, []);
    
    const changeColor = () => {
      setFavoriteColor("blue");
    };
    
    return (
      <div className="p-4 mb-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Exercise 4: useEffect Hook</h2>
        <h3 className="text-lg mb-3">My Favorite Color is {favoriteColor}</h3>
        <button 
          onClick={changeColor}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Color to Blue
        </button>
      </div>
    );
}

export default Color;
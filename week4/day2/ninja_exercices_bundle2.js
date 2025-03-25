//1
const menu = [
    {
      type: "starter",
      name: "Houmous with Pita"
    },
    {
      type: "starter",
      name: "Vegetable Soup with Houmous peas"
    },
    {
      type: "dessert",
      name: "Chocolate Cake"
    }
  ];
  
  const hasDessert = menu.some(item => item.type === "dessert") ? true : false;
  const allStarters = menu.every(item => item.type === "starter");
  
  const hasMainCourse = menu.some(item => item.type === "main course");
  if (!hasMainCourse) {
    menu.push({
      type: "main course",
      name: "Grilled Salmon with Rice"
    });
  }
  
  // Add vegetarian key to menu items
  const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];
  const menuWithVegetarianKey = menu.map(item => {
    const isVegetarian = vegetarian.some(vegItem => 
      item.name.toLowerCase().includes(vegItem.toLowerCase())
    );
    return { ...item, vegetarian: isVegetarian };
  });
  console.log("Menu with vegetarian key:", menuWithVegetarianKey);
  
  
  
  //2
  function string_chop(str, size) {
    if (str === null || str === undefined || size <= 0) {
      return [];
    }
    
    const chunks = [];
    for (let i = 0; i < str.length; i += size) {
      chunks.push(str.slice(i, i + size));
    }
    return chunks;
  }
  
  
  //3
  function search_word(text, word) {
    const words = text.toLowerCase().replace(/[^\w\s]/g, "").split(" ");
    const count = words.filter(w => w === word.toLowerCase()).length;
    
    return `'${word}' was found ${count} times.`;
  }
  
  
  
  //4
  function reverseArray(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      const temp = arr[i];
      arr[i] = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = temp;
    }
    return arr;
  }
  
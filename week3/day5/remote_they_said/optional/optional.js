//Q1
function cleanRoom(input) {
    const numbers = input.filter(item => typeof item === 'number');
    const strings = input.filter(item => typeof item === 'string');
    
    const numResult = processItems(numbers);
    const strResult = processItems(strings);
    
    if (strings.length === 0) {
        return numResult;
    } else {
        return [numResult, strResult].flat();
    }
}

function processItems(items) {
    const grouped = {};
    
    items.forEach(item => {
        if (!grouped[item]) {
            grouped[item] = [];
        }
        grouped[item].push(item);
    });
    
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
        return typeof items[0] === 'number' ? a - b : a.localeCompare(b);
    });
    
    return sortedKeys.map(key => {
        const group = grouped[key];
        return group.length === 1 ? group[0] : group;
    });
}

//Q2
function findTwoSum(numbers, target) {
    const numMap = new Map();
    
    for (let i = 0; i < numbers.length; i++) {
      const complement = target - numbers[i];
      
      if (numMap.has(complement)) {
        return [complement, numbers[i]];
      }
      
      numMap.set(numbers[i], i);
    }
    
    return null; 
}

//Q3
function colorConverter(color) {
  if (color.startsWith('#') || /^[0-9A-Fa-f]{6}$/.test(color)) {
    return hexToRgb(color);
  } 
  else if (
    (typeof color === 'string' && color.startsWith('rgb')) || 
    (Array.isArray(color) && color.length === 3)
  ) {
    return rgbToHex(color);
  } 
  else {
    return "Invalid color format";
  }
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb) {
  let r, g, b;
  if (typeof rgb === 'string') {
    const matches = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (matches) {
      r = parseInt(matches[1]);
      g = parseInt(matches[2]);
      b = parseInt(matches[3]);
    } else {
      return "Invalid RGB string format";
    }
  } else if (Array.isArray(rgb)) {
    [r, g, b] = rgb;
  }
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

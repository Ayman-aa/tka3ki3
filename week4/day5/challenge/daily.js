function isAnagram(str1, str2) {
    const cleanStr1 = str1.replace(/[^\w]/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^\w]/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
      return false;
    }
    
    const charCount1 = {};
    const charCount2 = {};
    
    for (const char of cleanStr1) {
      charCount1[char] = (charCount1[char] || 0) + 1;
    }
    for (const char of cleanStr2) {
      charCount2[char] = (charCount2[char] || 0) + 1;
    }
    
    for (const char in charCount1) {
      if (charCount1[char] !== charCount2[char]) {
        return false;
      }
    }
    
    return true;
}
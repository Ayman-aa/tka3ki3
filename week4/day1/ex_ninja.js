function mergeWords(word) {
    return function(nextWord) {
      if (nextWord === undefined) {
        return word;
      }
      return mergeWords(word + ' ' + nextWord);
    };
  }
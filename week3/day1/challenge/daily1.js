sentence = "The movie is not that bad, I like it";
wordNot = sentence.search("not");
wordBad = sentence.search("bad");
if (wordBad > wordNot) {
    sentence = sentence.replace(/not.*bad/, "good");
}
console.log(sentence);
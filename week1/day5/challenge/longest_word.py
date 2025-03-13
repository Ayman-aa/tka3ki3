def longest_word(line):
    all_words = [word.strip() for word in line.split(' ')]
    word = all_words[0]
    for words in all_words:
        if len(words) > len(word):
            word = words
    return word
def remove_consecutive_duplicates(word):
    result = ""

    for i in range(len(word)):
        if i == 0 or word[i] != word[i - 1]:
            result += word[i]
            
    return result

user_word = input("Enter a word: ")

new_word = remove_consecutive_duplicates(user_word)
print(f"New word without consecutive duplicates: {new_word}")
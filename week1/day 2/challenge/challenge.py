def letter_indices(word):
    result = {}
    
    for index, letter in enumerate(word):
        if letter in result:
            result[letter].append(index)
        else:
            result[letter] = [index]
            
    return result

def main():
    word = input("Please enter a word: ")
    indices_dict = letter_indices(word)
    print(indices_dict)

    print("\nExamples:")
    print("dodo", "➞", letter_indices("dodo"))
    print("froggy", "➞", letter_indices("froggy"))
    print("grapes", "➞", letter_indices("grapes"))

if __name__ == "__main__":
    main()
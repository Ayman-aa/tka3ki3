def sort_list(input_string):
    new_list = sorted([word.strip() for word in input_string.split(',')])
    return ','.join(new_list)

def main():
    input_string = input("Enter a sequence seperated by comma : ")
    input_string = sort_list(input_string)
    print(input_string)

if __name__ == "__main__":
    main()
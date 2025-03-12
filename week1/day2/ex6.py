def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'")

print("\n2. Large shirt with default message:")
make_shirt()

print("\n3. Medium shirt with default message:")
make_shirt(size="medium")

print("\n4. Custom size and message:")
make_shirt("small", "Python Developer")

print("\n5. Using keyword arguments:")
make_shirt(text="Code is Life", size="x-large")
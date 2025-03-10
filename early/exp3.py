from utils import unzip_with_7z
import itertools
import string

zip_file_path = 'congrats.7z'  # keep as is
dest_path = '.'  # keep as is

# Possible characters for the missing two letters
characters = string.ascii_lowercase

# Brute-force approach to find the missing letters
for letters in itertools.product(characters, repeat=2):
    find_me = ''.join(letters)
    secret_password = find_me + 'bcmpda'
    
    if unzip_with_7z(zip_file_path, dest_path, secret_password):
        print(f"Password found: {secret_password}")
        break

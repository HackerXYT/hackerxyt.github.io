import os

# Replace 'your_directory_path' with the path of the directory you want to list
directory = 'ait_assets'

# List all files and directories
files = os.listdir(directory)
print(files)
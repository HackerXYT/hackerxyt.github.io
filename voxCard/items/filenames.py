import os
import json

# Define the path to the 'assets' folder
folder_path = 'assets'

# Get all filenames in the 'assets' folder
try:
    filenames = os.listdir(folder_path)
except FileNotFoundError:
    print(f"Error: The folder '{folder_path}' does not exist.")
    exit(1)

# Filter out SVG files and remove the .svg extension
svg_filenames = [os.path.splitext(filename)[0] for filename in filenames if filename.lower().endswith('.svg')]

# Convert the list to JSON format
json_output = json.dumps(svg_filenames, indent=4)

# Print the JSON output
print(json_output)
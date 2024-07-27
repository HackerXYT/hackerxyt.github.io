import os
from svgpathtools import svg2paths, wsvg
from xml.etree import ElementTree as ET

def convert_svg_to_dark_mode(svg_content):
    # Parse the SVG content
    tree = ET.ElementTree(ET.fromstring(svg_content))
    root = tree.getroot()

    # Define dark mode colors
    dark_background_color = "#000000"
    light_color_to_dark = "#FFFFFF"  # Assuming white is the primary light color to be inverted

    # Update the background color if present
    for elem in root.iter():
        if 'style' in elem.attrib:
            styles = elem.attrib['style'].split(';')
            for i, style in enumerate(styles):
                if 'fill:' in style:
                    color = style.split(':')[1]
                    if color == light_color_to_dark:
                        styles[i] = f'fill:{dark_background_color}'
            elem.attrib['style'] = ';'.join(styles)

    # Recursively update fill and stroke attributes
    def update_color(elem):
        for child in elem:
            if 'fill' in child.attrib and child.attrib['fill'] == light_color_to_dark:
                child.attrib['fill'] = dark_background_color
            if 'stroke' in child.attrib and child.attrib['stroke'] == light_color_to_dark:
                child.attrib['stroke'] = dark_background_color
            update_color(child)

    update_color(root)
    
    # Return modified SVG content as string
    return ET.tostring(root, encoding='unicode')

def process_svgs_in_folder(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".svg"):
            filepath = os.path.join(folder_path, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                svg_content = file.read()
            
            dark_svg_content = convert_svg_to_dark_mode(svg_content)
            
            dark_filepath = os.path.join(folder_path, f'dark_{filename}')
            with open(dark_filepath, 'w', encoding='utf-8') as file:
                file.write(dark_svg_content)
            print(f'Converted {filename} to dark mode and saved as {dark_filepath}')

if __name__ == "__main__":
    folder_path = os.getcwd()  # Current working directory
    process_svgs_in_folder(folder_path)
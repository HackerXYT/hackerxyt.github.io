from googletrans import Translator
from bs4 import BeautifulSoup

# Initialize the translator
translator = Translator()

# Function to translate HTML content
def translate_html(input_file, output_file, chunk_size=5000):
    # Read the HTML file
    with open(input_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Translate text in the HTML
    for element in soup.find_all(string=True):
        # Skip non-visible elements
        if element.parent.name not in ['style', 'script', 'head', 'title']:
            text = element.strip()
            if text:  # Check if the text is not empty
                # Split text into smaller chunks
                chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
                translated_chunks = []

                for chunk in chunks:
                    try:
                        translated_text = translator.translate(chunk, dest='el').text
                        translated_chunks.append(translated_text)
                    except Exception as e:
                        print(f"Error translating chunk: {chunk}. Error: {e}")

                # Replace the original text with the translated text
                element.replace_with(' '.join(translated_chunks))

    # Write the translated HTML to a new file
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(str(soup))

# Usage
input_html_file = 'index_en.html'  # Replace with your input HTML file
output_html_file = 'translated_output.html'  # Output file
translate_html(input_html_file, output_html_file)

print(f"Translation complete! Translated HTML saved to {output_html_file}.")

import { Plugin, Editor } from 'obsidian';

export default class HighlightEscapePlugin extends Plugin {
  async onload() {
    console.log('HighlightEscapePlugin: Plugin loaded');

    // Add a command to escape highlighted text, no default hotkey
    this.addCommand({
      id: 'escape-html-characters',
      name: 'Escape HTML characters',
      editorCheckCallback: (editor: Editor) => {
        this.escapeHighlightedText(editor);
      },
    });
  }

  // Function to escape HTML characters
  escapeHighlightedText(editor: Editor) {
    const selectedText = editor.getSelection();

    // If no text is selected, we don't do anything
    if (selectedText.length > 0) {
      const escapedText = this.escapeHTML(selectedText);
      editor.replaceSelection(escapedText);
      console.log("No text selected, nothing replaced.");
    } else {
      console.log("No text selected, nothing replaced.");
    }
  }

  // Helper function to escape HTML characters
  escapeHTML(text: string): string {
    const htmlEntities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
  }

  onunload() {
    console.log('HighlightEscapePlugin: Plugin unloaded');
  }
}


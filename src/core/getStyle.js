export function getStyle(type) {
  switch (type) {
    case 'strong':
      return { bold: true };
    case 'em':
      return { italics: true };
    case 'codespan':
      return {
        background: '#f0f0f0',
        fontSize: 10,
        margin: [0, 5, 0, 5],
      };
    case 'del':
      return { decoration: 'lineThrough' };
    case 'link':
      return { color: 'blue', decoration: 'underline' };
    case 'code':
      return {
        fontSize: 10, // Smaller font size for code
        color: '#333333', // Darker text color
        preserveLeadingSpaces: true, // Preserve indentation
        lineHeight: 1.2, // Adjust line height for better readability
      };
    default:
      return {};
  }
}

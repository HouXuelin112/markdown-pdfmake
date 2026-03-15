import { addToParent } from './addToParent';

export const handleCodeblock = async (stack, token, { context }) => {
  // Define the style for the code text
  const codeTextStyle = context.hook.getStyle('code');

  const codeText = {
    columns: [
      {
        width: '90%',
        text: token.content,
        ...codeTextStyle,
        margin: [5, 5, 5, 5], // Adjust margin as needed
      },
    ],
  };

  // Highlight the language name (if available)
  let languageHeader = {};
  if (token.info) {
    languageHeader = {
      text: token.info,
      color: '#004252', // Highlight color for the language
      fontSize: 8,
      bold: true,
      margin: [0, 5, 0, 2], // Adjust margin as needed
    };
  }

  // Define the structure of the codeblock with optional language header
  const codeblockStructure = {
    stack: [
      languageHeader,
      {
        table: {
          widths: ['*'], // Ensure the table uses the full available width
          body: [[codeText]],
        },
        layout: {
          hLineColor: () => '#dddddd',
          vLineColor: () => '#dddddd',
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 0,
        },
      },
    ],
    margin: 0,
  };

  addToParent(stack, codeblockStructure);

  return codeblockStructure;
};

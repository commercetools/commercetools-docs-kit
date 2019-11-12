export default (code = [], highlightLines = []) => {
  const generatePrompts = numberOfLines => {
    let prompts = ``;
    for (let i = 0; i < numberOfLines; i += 1) {
      if (highlightLines.includes(i + 1)) {
        prompts += `<span></span>`;
      } else {
        prompts += `<span data-prompt=true></span>`;
      }
    }
    return prompts;
  };
  const numberOfLines =
    code.length === 0
      ? 0
      : // Remove the empty new line char
        code.split(`\n`).length - 1;

  const promptsWrapper =
    `<span class="command-line-prompt">` +
    `${generatePrompts(numberOfLines)}` +
    `</span>`;
  return promptsWrapper;
};

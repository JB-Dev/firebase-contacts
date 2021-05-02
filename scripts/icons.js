const fs = require('fs');

const imageFileNames = () => {
  const array = fs
    .readdirSync('src/assets/icons')
    .filter((file) => {
      return file.endsWith('.png');
    })
    .map((file) => {
      return file.replace('@2x.png', '.png').replace('@3x.png', '.png');
    });

  return Array.from(new Set(array));
};

const generate = () => {
  let properties = imageFileNames()
    .map((name) => {
      let filename = name.replace('.png', '');

      return `${filename}: require('./${filename}.png'),`;
    })
    .join('\n  ');
  const string = `export const Icons = {
  ${properties}
};
`;

  fs.writeFileSync('src/assets/icons/index.js', string, 'utf8');
};

generate();

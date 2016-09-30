const api = require('./API.json');

const start = 1;
const jsonIndent = 2;

const bulletList = (list, depth = 0) => {
  const indent = Array(depth + start + 1).join('  ');

  Object.keys(list).forEach((key) => {
    if (typeof list[key] === 'object') {
      console.log(`${Array(depth + 1).join(' ')}* **${key}**\n`);

      if (list[key].code && list[key].text) {
        const text = list[key].text.split('\n')
          .join(`\n${indent}${indent}`);

        console.log(`${indent}\`\`\`${list[key].code}`);
        console.log(`${indent}${indent}${text}`);
        console.log(`${indent}\`\`\`\n`);
      }

      if (list[key].code && list[key].object) {
        const text = JSON.stringify(list[key].object, null, jsonIndent)
          .split('\n').join(`\n${indent}${indent}`);

        console.log(`${indent}\`\`\`${list[key].code}`);
        console.log(indent + indent + text);
        console.log(`${indent}\`\`\`\n`);
      }

      const sublist = Object.assign({}, list[key]);

      Reflect.deleteProperty(sublist, 'object');
      Reflect.deleteProperty(sublist, 'text');
      Reflect.deleteProperty(sublist, 'code');
      bulletList(sublist, depth + 1);

    } else {
      console.log(`${Array(depth + 1).join(' ')}* **${key}** ${list[key]}\n`);
    }
  });
};

const toMarkdown = (obj, depth = 0) => {
  console.log(`${Array(depth + start + 1).join('#')} ${obj.title}\n`);

  if (obj.description) {
    console.log(`${obj.description}\n`);
  }

  const bullets = Object.assign({}, obj);

  Reflect.deleteProperty(bullets, 'title');
  Reflect.deleteProperty(bullets, 'description');
  Reflect.deleteProperty(bullets, 'sections');

  bulletList(bullets);

  if (obj.sections) {
    obj.sections.forEach((section) => {
      toMarkdown(section, depth + 1);
    });
  }
};

toMarkdown(api);

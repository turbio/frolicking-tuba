const api = require('./api.json');

const start = 1;
const jsonIndent = 2;

const printer = {
  code(language, text, depth) {
    const indent = Array(depth + start + 1).join('  ');

    console.log(`${indent}\`\`\`${language}`);
    console.log(indent + indent + text);
    console.log(`${indent}\`\`\`\n`);
  },
  bullet(text, depth) {
    const indent = Array(depth).join('  ');

    console.log(`${indent}* ${text}`);
  },
  heading(title, depth) {
    console.log(`\n${Array(depth + start + 1).join('#')} ${title}\n`);
  },
  buildLink(as, to) {
    return `[${as}](${to})`;
  },
  buildBold(str) {
    return `**${str}**`;
  }
};

const filterObject = (obj, ...rest) => {
  const copy = Object.assign({}, obj);

  rest.forEach((key) => {
    Reflect.deleteProperty(copy, key);
  });

  return copy;
};

const bulletObj = (item, value, depth) => {
  const indent = Array(depth + start + 1).join('  ');

  printer.bullet(printer.buildBold(item), depth);

  if (value.code && value.text) {
    const text = value.text.split('\n').join(`\n${indent}${indent}`);

    printer.code(value.code, text, depth);
  }

  if (value.code && value.object) {
    const text = JSON.stringify(value.object, null, jsonIndent)
      .split('\n').join(`\n${indent}${indent}`);

    printer.code(value.code, text, depth);
  }
};

const bulletList = (list, depth = 0) => {
  Object.keys(list).forEach((key) => {
    if (typeof list[key] === 'object') {
      bulletObj(key, list[key], depth + 1);
      bulletList(filterObject(list[key], 'object', 'text', 'code'), depth + 1);

    } else {
      printer.bullet(`${printer.buildBold(key)} ${list[key]}`);
    }
  });
};

const tableOfContents = (skele, depth = 0) => {

  if (depth !== 0) {
    const link = printer.buildLink(
    skele.title,
    skele.title.toLowerCase().replace(' ', '-'));

    printer.bullet(link, depth);
  }

  if (skele.sections) {
    skele.sections.forEach((sec) => {
      tableOfContents(sec, depth + 1);
    });
  }
};

const toMarkdown = (obj, depth = 0) => {
  printer.heading(obj.title, depth);

  if (depth === 0) {
    tableOfContents(obj);
    console.log();
  }

  if (obj.description) {
    console.log(`${obj.description}\n`);
  }

  bulletList(filterObject(obj, 'title', 'description', 'sections'));

  if (obj.sections) {
    obj.sections.forEach((section) => {
      toMarkdown(section, depth + 1);
    });
  }
};

toMarkdown(api);

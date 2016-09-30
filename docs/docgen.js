const fs = require('fs');

const start = 1;
const jsonIndent = 2;

const filterObject = (obj, ...rest) => {
  const copy = Object.assign({}, obj);

  rest.forEach((key) => {
    Reflect.deleteProperty(copy, key);
  });

  return copy;
};

class Printer {
  constructor() {
    this.buffer = '';
    this.build = {
      link(as, to) {
        return `[${as}](#${to})`;
      },
      bold(str) {
        return `**${str}**`;
      }
    };
  }

  code(language, text, depth) {
    const indent = Array(depth + start + 1).join('  ');

    this.buffer += (`${indent}\`\`\`${language}\n`);
    this.buffer += (`${indent}${indent}${text}\n`);
    this.buffer += (`${indent}\`\`\`\n\n`);
  }

  bullet(text, depth) {
    const indent = Array(depth).join('  ');

    this.buffer += (`${indent}* ${text}\n`);
  }

  heading(title, depth) {
    this.buffer += (`\n${Array(depth + start + 1).join('#')} ${title}\n\n`);
  }

  nl() {
    this.buffer += ('\n');
  }

  text(str) {
    this.buffer += (`${str}\n`);
  }
}

class ToMarkdown {
  constructor() {
    this.printer = new Printer();
  }

  str() {
    return this.printer.buffer;
  }

  convert(obj, depth = 0) {
    this.printer.heading(obj.title, depth);

    if (depth === 0) {
      this.tableOfContents(obj);
      this.printer.nl();
    }

    if (obj.description) {
      this.printer.text(obj.description);
    }

    this.bulletList(filterObject(obj, 'title', 'description', 'sections'));

    if (obj.sections) {
      obj.sections.forEach((section) => {
        this.convert(section, depth + 1);
      });
    }
  }

  bulletObj(item, value, depth) {
    const indent = Array(depth + start + 1).join('  ');

    this.printer.bullet(this.printer.build.bold(item), depth);

    if (value.code && value.text) {
      const text = value.text.split('\n').join(`\n${indent}${indent}`);

      this.printer.code(value.code, text, depth);
    }

    if (value.code && value.object) {
      const text = JSON.stringify(value.object, null, jsonIndent)
        .split('\n').join(`\n${indent}${indent}`);

      this.printer.code(value.code, text, depth);
    }
  }

  bulletList(list, depth = 0) {
    Object.keys(list).forEach((key) => {
      if (typeof list[key] === 'object') {
        this.bulletObj(key, list[key], depth + 1);
        this.bulletList(
          filterObject(list[key], 'object', 'text', 'code'),
          depth + 1);

      } else {
        this.printer.bullet(`${this.printer.build.bold(key)} ${list[key]}`);
      }
    });
  }

  tableOfContents(skele, depth = 0) {

    if (depth !== 0) {
      const link = this.printer.build.link(
      skele.title,
      skele.title.toLowerCase().replace(' ', '-'));

      this.printer.bullet(link, depth);
    }

    if (skele.sections) {
      skele.sections.forEach((sec) => {
        this.tableOfContents(sec, depth + 1);
      });
    }
  }
}

const writeFile = (path, str) => {
  fs.writeFile(path, str, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`done ${path}`);
    }
  });
};

const loadFile = (path) => {
  fs.readFile(path, 'utf8', (err, text) => {
    if (err) {
      console.log(err);

      return;
    }

    const lastIndex = -1;

    //convert from `/path/to/doc.json` -> `DOC.md`
    const newPath = path
      .split('/')
      .slice(lastIndex)[0]
      .split('.')
      .map((val, ind) => (ind ? 'md' : val.toUpperCase()))
      .join('.');

    console.log(`compiling ${path} -> ${newPath}`);

    const obj = JSON.parse(text);
    const md = new ToMarkdown();

    md.convert(obj);

    writeFile(newPath, md.str());
  });
};

const argOffset = 2;

process.argv.splice(0, argOffset);
process.argv.forEach(loadFile);

const program = require("commander");
const fs = require("fs");
const marked = require("marked");
var path = require("path");

const main = () => {
  program.parse(process.argv);
  const targetDir = program.args[0];
  console.log("targetDir", targetDir);
  const filenames = fs.readdirSync(targetDir);
  console.log("filenames", filenames);
  // const filePath = program.args[0];
  const length = filenames.length;
  for (var i = 0; i < length; i++) {
    const targetFile = filenames[i];
    var ext = path.extname(targetFile);
    console.log(ext);
    console.log("basename", path.basename(targetFile, ext));

    if (ext !== ".md") {
      continue;
    }
    fs.readFile(path.join(targetDir, targetFile), "utf8", (err, file) => {
      console.log("file", file);
      if (err) {
        console.error(err);
        process.exit(err.code);
        return;
      }
      const body = marked(file); // HTML文字列に変換する
      // console.log(html);
      fs.writeFileSync(
        path.join("dist", `${path.basename(targetFile, ext)}.html`),
        buildHtml(body)
      );
    });
  }
};

main();

const buildHtml = body => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>Document</title>
    </head>
    <body>
      ${body}
    </body>
    </html>
  `;
};

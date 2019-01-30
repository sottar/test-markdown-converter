const program = require("commander");
const fs = require("fs");
const marked = require("marked");
var path = require("path");

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
    const html = marked(file); // HTML文字列に変換する
    // console.log(html);
    fs.writeFileSync(
      path.join("dist", `${path.basename(targetFile, ext)}.html`),
      html
    );
  });
}

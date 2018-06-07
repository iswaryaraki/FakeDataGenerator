const argv = require('yargs').argv
const jsf = require('json-schema-faker');
const faker = require('faker');
const fs = require('fs');

const callback = (err) => {
  if(err) {
    return console.error(err);
  }
};
const schema = {
  "type": "array",
  "items": {
    "$ref": "./schema.json"
  },
  minItems: argv.count
}

jsf.extend('faker', () => {
  return require('faker');
})
.resolve(schema)
.then((sample) => {
  fs.writeFile('output.json', JSON.stringify(sample), 'utf8', callback);
    console.log("The file was saved!", sample);
});

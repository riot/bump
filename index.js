#!/usr/bin/env node

/*
  Usage: ./node_modules/.bin/riot-bump [directory [searchString]]

  Replaces all occurrences of a string within the JavaScript files
  in the given directory with the version number in package.json.
  directory defaults to "dist/", searchString defaults to "WIP"
*/
var
  path = require('path'),
  fs   = require('fs')

var
  count   = 0,
  version = getVersion(),
  fpath   = process.argv[2] || 'dist/',
  re      = getRE(process.argv[3])

process.on('exit', function (code) {
  process.exit(code | 0)
})

if (version) {

  console.log('bump %s for %s', version, path.join(fpath, '*.js'))

  fs.readdirSync(fpath).forEach(function (name) {
    if (path.extname(name) === '.js') {
      ++count
      name = path.join(fpath, name)
      console.log(name)

      fs.readFile(name, 'utf8', function (err, src) {
        if (err)
          errorExit(err)
        else
          fs.writeFile(name, src.replace(re, version), 'utf8', function (err2) {
            if (err2) errorExit(err2)
          })
      })
    }
  })

  if (!count) errorExit('Error: There\'s no .js files in ' + fpath)
}

function errorExit(s) {
  console.error('' + s)
  process.exit(1)
}

function getVersion() {
  var
    fname = path.join(process.cwd(), 'package.json'),
    vernum

  try {
    var req = require(fname)
    if (req.name !== 'riot-bump') vernum = req.version
  }
  catch (e) {
  }

  if (!vernum) {
    errorExit(fname + ' not found or does not has version.')
  }
  return 'v' + vernum
}

function getRE(s) {
  var re = /\bWIP(?![$\w])/g
  return s ?
    RegExp(re.source.replace('WIP', s.replace(/(?=[[\]()*+?.^$|{])/g, '\\')), 'g') :
    re
}

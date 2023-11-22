#!/usr/bin/env node

const git = require("degit")
const path = require("path")
const fs = require("fs")

const [argDir, argForce] = process.argv.slice(2)

if (!argDir) {
  console.log("Please specify a directory")
  return process.exit(1)
}

const dir = path.resolve(argDir)
const force = argForce === "-f" || argForce === "--force"

if (fs.existsSync(dir)) {
  if (fs.readdirSync(dir).length > 0 && !force) {
    console.log("Directory is not empty")
    return process.exit(1)
  }
} else {
  fs.mkdirSync(dir, { recursive: true })
}

const source = "GhomKrosmonaute/game"
const emitter = git(source, { cache: false, force: true, verbose: true })

emitter.on("info", (info) => console.log(info))

try {
  await emitter.clone(dir)
  console.log("Successfully installed @ghom/game")
} catch (err) {
  console.log(err)
  return process.exit(1)
}

/**
 * todo:
 *  - update package.json name
 *  - update the readme
 *  - update html title
 *  - update demo
 */

process.exit(0)

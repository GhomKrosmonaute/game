#!/usr/bin/env node

const git = require("degit")
const path = require("path")
const fs = require("fs")
const exec = require("child_process").exec

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
;(async () => {
  try {
    await emitter.clone(dir)
  } catch (err) {
    console.log(err)
    return process.exit(1)
  }

  // install dependencies
  exec(`cd "${dir}" && npm install`, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return process.exit(1)
    }
    console.log(stdout)
    console.log(stderr)
    console.log(`Successfully installed @ghom/game in ${dir}`)
    process.exit(0)
  })
})()

/**
 * todo:
 *  - update package.json name
 *  - update the readme
 *  - update html title
 *  - update demo
 */

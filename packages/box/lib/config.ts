import fse from "fs-extra";
import type { boxConfig } from "typings";

function setDefaults(config: any = {}): boxConfig {
  const hooks = config.hooks || {};
  const modifiers = config.modifiers || {};

  return {
    ignore: config.ignore || [],
    commands: config.commands || {
      compile: "truffle compile",
      migrate: "truffle migrate",
      test: "truffle test"
    },
    hooks: {
      "post-unpack": hooks["post-unpack"] || ""
    },
    modifiers
  };
}

function read(path: string): Promise<boxConfig> {
  return fse
    .readFile(path)
    .catch(() => "{}")
    .then(JSON.parse)
    .then(setDefaults);
}

export = {
  read,
  setDefaults
};

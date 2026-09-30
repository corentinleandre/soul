import config from "./config/_module.mjs";

const SOUL = {};

/* Populate the config using all the configs in the config folder */

for(const key in config){
  SOUL[key] = config[key];
}

export default SOUL;

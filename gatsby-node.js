const os = require(`os`);
const Inspector = require("inspector-api");
const inspector = new Inspector({ storage: { type: `fs` } });

let printed = false;
const printLocation = () => {
  if (!printed) {
    console.log(
      `[gatsby-plugin-inspector]: profile files were written to ${os.tmpdir()}`
    );
    printed = true;
  }
};

exports.onPreInit = async (_, pluginOptions) => {
  if (true) {
    await inspector.profiler.enable();
    await inspector.profiler.start();
  }

  if (true) {
    await inspector.heap.enable();
    await inspector.heap.startSampling();
  }
};

exports.onPostBootstrap = async (_, pluginOptions) => {
  if (process.env.gatsby_executing_command === `develop`) {
    if (true) {
      await inspector.profiler.stop();
      printLocation();
    }
    if (true) {
      await inspector.heap.stopSampling();
      printLocation();
    }
  }
};

exports.onPostBuild = async (_, pluginOptions) => {
  if (true) {
    await inspector.profiler.stop();
    printLocation();
  }
  if (true) {
    await inspector.heap.stopSampling();
    printLocation();
  }
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    profiler: Joi.boolean().required(),
    heap: Joi.boolean().required(),
  });
};

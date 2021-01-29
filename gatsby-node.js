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
  if (pluginOptions.cpu || pluginOptions.heap) {
    console.log(`[gatsby-plugin-inspector]: The Node.js inspector is enabled. This should only
    be enabled for testing purposes as it slows down development and builds significantly`);
  }

  if (pluginOptions.cpu) {
    await inspector.profiler.enable();
    await inspector.profiler.start();
  }

  if (pluginOptions.heap) {
    await inspector.heap.enable();
    await inspector.heap.startSampling();
  }
};

exports.onPostBootstrap = async (_, pluginOptions) => {
  if (process.env.gatsby_executing_command === `develop`) {
    if (pluginOptions.cpu) {
      await inspector.profiler.stop();
      printLocation();
    }
    if (pluginOptions.heap) {
      await inspector.heap.stopSampling();
      printLocation();
    }
  }
};

exports.onPostBuild = async (_, pluginOptions) => {
  if (pluginOptions.cpu) {
    await inspector.profiler.stop();
    printLocation();
  }
  if (pluginOptions.heap) {
    await inspector.heap.stopSampling();
    printLocation();
  }
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    cpu: Joi.boolean().required(),
    heap: Joi.boolean().required(),
  });
};

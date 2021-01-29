# gatsby-plugin-inspector
Use Node.js inspector API to sample CPU/memory of a Gatsby build

## Install
npm i gatsby-plugin-inspector

## Use

Add the plugin to your gatsby-config.js file and enable one or both the CPU and memory profiling:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-inspector`,
      options: {
        cpu: true,
        heap: true,
      }
    }
  ]
}
```

This should *only* be enabled for testing as it slows down development and builds by 5-10%.

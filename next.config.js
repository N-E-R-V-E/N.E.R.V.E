const basePath = process.env.PAGES_BASE_PATH || ""

module.exports = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? basePath : undefined,

  images: {
    unoptimized: true
  },

  reactStrictMode: true
}

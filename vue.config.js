module.exports = {
  devServer: {
    https: false,
    port: 8081,
    proxy: {
      "/mpi": {
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { "^/": "" },
      }
    }
  }
}
const logger = {
  error: (msg) => {
    console.log(`[error] ${new Date().toISOString()}: ${msg}`);
  },
  debug: (msg) => {
    console.log(`[debug] ${new Date().toISOString()}: ${msg}`);
  }
}

export default logger;
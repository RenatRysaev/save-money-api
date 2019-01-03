export const withErrorHandling = fn => (...args) => fn(...args).catch(args[2])

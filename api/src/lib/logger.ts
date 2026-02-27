import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',

  // Use structured base metadata
  base: {
    service: 'api',
    env: process.env.NODE_ENV,
  },

  // Remove default pid & hostname if not needed
  // (reduces log noise in containerized environments)
  ...(isProd && { base: null }),

  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.token',
      '*.password',
      '*.token',
    ],
    remove: true,
  },

  formatters: {
    level(label) {
      return { level: label };
    },
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  // Remove unnecessary properties
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        id: req.id,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
        message: res.message,
      };
    },
  },

  transport: !isProd
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname,req.headers,res.headers',
        },
      }
    : undefined,
});

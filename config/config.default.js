/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    mysql: {
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'admin',
        // 密码
        password: '123123',
        // 数据库名
        database: 'mlyb',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    onerror: {
      all(err, ctx) {
        switch (err.message) {
          case 'Validation Failed':
            ctx.body = 'Validation Failed';
            ctx.status = 400;
            ctx.logger.error('Validation Failed');
          break;
          default:
            ctx.body = 'error';
            ctx.status = 500;
            ctx.logger.error('500');
        }
      },
    },
    httpclient: {
      beforeRequest: options => {
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553149786436_6115';

  // add your middleware config here
  config.middleware = [];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

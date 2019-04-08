'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, server, is run';
    ctx.status = 200;
  }
}

module.exports = HomeController;

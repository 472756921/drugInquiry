'use strict';
const { createDrugRule } = require('../public/common');
const numCPUs = require('os').cpus().length;

const Controller = require('egg').Controller;
class SpiderController extends Controller {
    async getInfo() {
        const ctx = this.ctx;
        const spider = await ctx.service.spider.Spider();
        ctx.body = spider;
        ctx.status = 200;
    }
}

module.exports = SpiderController;
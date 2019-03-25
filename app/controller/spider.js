'use strict';
const { createDrugRule } = require('../public/common');
const numCPUs = require('os').cpus().length;

const Controller = require('egg').Controller;
class SpiderController extends Controller {
    async getInfo() {
        const ctx = this.ctx;
        // ctx.validate(createDrugRule);
        // const body = JSON.stringify(ctx.request.body);
        // const drugs = await ctx.service.drug.addDrug(body);
        ctx.app.messenger.sendToApp('spider', ctx);
        ctx.body = numCPUs;
        ctx.status = 200;
    }
}

module.exports = SpiderController;
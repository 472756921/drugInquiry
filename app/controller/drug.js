'use strict';
const { createDrugRule } = require('../public/common');

const Controller = require('egg').Controller;


class DrugController extends Controller {
    async find() {
        const ctx = this.ctx;
        const query = ctx.query;
        const drugs = await ctx.service.drug.find(query);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async list() {
        const ctx = this.ctx;
        const query = ctx.query;
        const drugs = await ctx.service.drug.list(query);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async listAdmin() {
        const ctx = this.ctx;
        const query = ctx.query;
        const result = await ctx.app.mysql.beginTransactionScope(async conn => {
            // don't commit or rollback by yourself
            const drugs = await ctx.service.drug.listAdmin(query);
            const page = await ctx.service.drug.getPageInfo(query);
            return { drugs, page };
        }, ctx);
        ctx.body = result;
        ctx.status = 200;
    }
    async add() {
        const ctx = this.ctx;
        ctx.validate(createDrugRule);
        const body = JSON.stringify(ctx.request.body);
        const drugs = await ctx.service.drug.addDrug(body);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async del() {
        const ctx = this.ctx;
        const query = ctx.query;
        const drugs = await ctx.service.drug.delDrug(query);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async update() {
        const ctx = this.ctx;
        ctx.validate(createDrugRule);
        const body = JSON.stringify(ctx.request.body);
        const drugs = await ctx.service.drug.update(body);
        ctx.body = drugs;
        ctx.status = 200;
    }

    async listFDA() {
        const ctx = this.ctx;
        const query = ctx.query;
        const drugs = await ctx.service.drug.listFDA(query);
        ctx.body = drugs;
        ctx.status = 200;
    }
}

module.exports = DrugController;
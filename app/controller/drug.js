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
        const drugs = await ctx.service.drug.listAdmin(query);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async add() {
        const ctx = this.ctx;
        ctx.validate(createDrugRule, ctx.request.body);
        const drugs = await ctx.service.drug.addDrug(ctx.request.body);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async del() {
        const ctx = this.ctx;
        const data = ctx.request.body;
        let id = data.id;
        try {
            id = Number(id);
        } catch (e) {
            ctx.body = {data: 'is not id'};
            ctx.status = 400;
        }
        const drugs = await ctx.service.drug.delDrug({id: id});
        ctx.body = drugs;
        ctx.status = 200;
    }
    async update() {
        const ctx = this.ctx;
        ctx.validate(createDrugRule, ctx.request.body);
        const drugs = await ctx.service.drug.update(ctx.request.body, ctx.session.user.id);
        ctx.body = drugs;
        ctx.status = 200;
    }

    async listFDA() {
        const ctx = this.ctx;
        const drugs = await ctx.service.drug.listFDA();
        ctx.body = drugs;
        ctx.status = 200;
    }
    async updateFDA() {
        const ctx = this.ctx;
        const drugs = await ctx.service.drug.updateFDA(ctx.request.body);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async drugCount() {
        const ctx = this.ctx;
        const data = ctx.request.body;
        const drugs = await ctx.service.drug.drugCount({id: data.id, checkCount:data.checkCount + 1});
        ctx.body = drugs;
        ctx.status = 200;
    }
    async drugCountByPhone() {
        const ctx = this.ctx;
        const query = ctx.query;
        const drugs = await ctx.service.drug.drugCountByPhone({id: query.id, checkCount:query.checkCount + 1});
        ctx.body = drugs;
        ctx.status = 200;
    }
    async getHotDrug() {
        const ctx = this.ctx;
        const drugs = await ctx.service.drug.getHotDrug();
        ctx.body = drugs;
        ctx.status = 200;
    }
}

module.exports = DrugController;
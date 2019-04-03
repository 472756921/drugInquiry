'use strict';
const { createDrugRule } = require('../public/common');

const Controller = require('egg').Controller;


class DiseaseController extends Controller {
    async update() {
        const ctx = this.ctx;
        const disease = await ctx.service.disease.update(ctx.request.body);
        ctx.body = disease;
        ctx.status = 200;
    }
    async add() {
        const ctx = this.ctx;
        const disease = await ctx.service.disease.add(ctx.request.body);
        ctx.body = disease;
        ctx.status = 200;
    }
    async del() {
        const ctx = this.ctx;
        const disease = await ctx.service.disease.del(ctx.request.body);
        ctx.body = disease;
        ctx.status = 200;
    }
    async list() {
        const ctx = this.ctx;
        const disease = await ctx.service.disease.list();
        ctx.body = disease;
        ctx.status = 200;
    }

}
module.exports = DiseaseController;
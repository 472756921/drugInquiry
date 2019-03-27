'use strict';

const Controller = require('egg').Controller;
class AdminController extends Controller {
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.admin.list();
        ctx.body = res;
        ctx.status = 200;
    }
    async add() {
        const ctx = this.ctx;
        const body = JSON.stringify(ctx.request.body);
        const res = await ctx.service.admin.add(body);
        ctx.body = res;
        ctx.status = 200;
    }
    async del() {
        const ctx = this.ctx;
        const query = ctx.query;
        const drugs = await ctx.service.admin.delAdmin(query);
        ctx.body = drugs;
        ctx.status = 200;
    }
    async update() {
        const ctx = this.ctx;
        const body = JSON.stringify(ctx.request.body);
        const drugs = await ctx.service.admin.update(body);
        ctx.body = drugs;
        ctx.status = 200;
    }
}

module.exports = AdminController;
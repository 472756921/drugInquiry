'use strict';
const Controller = require('egg').Controller;
const ms = require('ms');

class AdminController extends Controller {
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.admin.list();
        ctx.body = res;
        ctx.status = 200;
    }
    async add() {
        const ctx = this.ctx;
        const res = await ctx.service.admin.add(ctx.request.body);
        ctx.body = res;
        ctx.status = 200;
    }
    async del() {
        const ctx = this.ctx;
        const admin = await ctx.service.admin.delAdmin(ctx.request.body);
        ctx.body = admin;
        ctx.status = 200;
    }
    async update() {
        const ctx = this.ctx;
        const admin = await ctx.service.admin.update(ctx.request.body);
        ctx.body = admin;
        ctx.status = 200;
    }
    async check() {
        const ctx = this.ctx;
        if(ctx.session.user === undefined) { //未登录
            ctx.body = {success: false};
            ctx.status = 403;
        } else {
            ctx.body = {success: true};
            ctx.status = 200;
        }
    }
    async login() {
        const ctx = this.ctx;
        const res = await ctx.service.admin.login(ctx.request.body);

        if(res === null){ //账号密码错误
            ctx.body = {message: '账号或密码错误', code: 403};
            ctx.status = 200;
        } else {
            if(res.status === 0) {
                ctx.body = {message: '账号已被禁用', code: 402};
                ctx.status = 200;
            } else {
                ctx.session.user = res;
                if(ctx.request.body.remember) {
                    ctx.session.maxAge = ms('30d');
                }
                ctx.rotateCsrfSecret();
                ctx.body = {data:res, code: 200, success: true};
                ctx.status = 200;
            }
        }
    }
    async loginOut() {
        const ctx = this.ctx;
        ctx.session.user = undefined;
        ctx.body = {success: true};
        ctx.status = 200;
    }
}

module.exports = AdminController;
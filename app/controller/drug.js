'use strict';

const Controller = require('egg').Controller;


const createDrugRule = {
    name1: {
        required: true,
    },
    name2: {
        required: true,
    },
    factory: {
        required: true,
    },
    Indication: {
        required: true,
    },
    Dosage: {
        required: true,
    },
    Precautions: {
        required: true,
    },
    AdverseReactions: {
        required: true,
    },
    FormulationSpecification: {
        required: true,
    },
    AddDate: {
        required: true,
    },
    optiong: {
        required: true,
    },
};


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
}

module.exports = DrugController;
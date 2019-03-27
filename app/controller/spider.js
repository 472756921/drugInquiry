'use strict';

const Controller = require('egg').Controller;
class SpiderController extends Controller {
    async getInfo() {
        const ctx = this.ctx;
        const {data, code} = await ctx.service.spider.Spider();
        if(code === 200) {
            // 获取数据库中的FDA新闻
            let firstData = await ctx.service.drug.FdaFirst();
            firstData = firstData.results;
            const tempData = data[0];
            if((firstData.length==0 ? 0 : firstData[0].tempDateFromFDA) === tempData.USdate){
                // 无需更新DB
                ctx.body = {data: '服务数据与FDA数据目前一致'};
                ctx.status = code;
            } else{
                ctx.app.messenger.sendToApp('insert_batch', { data: data, date: firstData.length==0 ? 0 : firstData[0].tempDateFromFDA });
                ctx.body = { data: 'FDA链接成功，后台正在更新数据，稍后可查看' };
                ctx.status = code;
            }
        } else {
            ctx.body = {data: 'FDA 链接失败，请稍后再试'};
            ctx.status = code;
        }
    }
}

module.exports = SpiderController;
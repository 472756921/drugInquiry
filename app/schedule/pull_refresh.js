module.exports = {
    schedule: {
        interval: '24h', // 24小時钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        const {data, code} = await ctx.service.spider.Spider();
        let firstData = await ctx.service.drug.FdaFirst();
        firstData = firstData.results;
        const tempData = data[0];
        if((firstData.length==0 ? 0 : firstData[0].tempDateFromFDA) !== tempData.USdate){
            ctx.app.messenger.sendToApp('insert_batch', { data: data, date: firstData.length==0 ? 0 : firstData[0].tempDateFromFDA });
            ctx.logger.info('auto schedule to get FDA data');
        }
    },
};
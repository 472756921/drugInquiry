'use strict';
module.exports = app => {

    app.messenger.once('all_ready', data => {
        console.log(data);
    });

    app.messenger.on('insert_batch', ({data, date}) => {
        const ctx = app.createAnonymousContext();
        ctx.runInBackground(async () => {
            let temp = [];
            if(date !== 0) { // 空数据库
                for (let item of data) {
                    if ( item.USdate === date) {
                        break;  //跳出循环
                    }
                    temp.push(item);
                }
            } else {
                temp = data;
            }
            await ctx.service.spider.Update(temp);
        });
    });
};
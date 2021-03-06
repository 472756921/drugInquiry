'use strict';
const Service = require('egg').Service;
const superagent = require('superagent');

const pageUrl = 'https://www.fda.gov/drugs/resources-information-approved-drugs/hematologyoncology-cancer-approvals-safety-notifications';


class SpiderService extends Service {
    async Spider() {
        try {
            const webData = await superagent.get(pageUrl);
            const data = webData.text;
            const start = data.indexOf('<main>');
            const end = data.indexOf('</main>');
            let article = data.slice(start+6, end).replace(/[\r\n\t]/g, "");
            article = article.replace(/<header>([\S\s\t]*?)<\/header>/g, '');
            console.log(article);
            article = article.replace(/<div([\S\s\t]*?)>([\S\s\t]*?)<\/div>/g, '');
            article = article.replace(/<p([\S\s\t]*?)>([\S\s\t]*?)<\/p>/g, '');
            article = article.split(/<ul>([\S\s\t]*?)<\/ul>/);
            article = article.filter(_ => _ != '');
            article.pop();
            let listData = [];
            article.map( (it, i) => {
               let arr = it.split(/<li([\S\s\t]*?)>([\S\s\t]*?)<\/li>/);
               arr = arr.filter(_ => _ != '');
               arr.map((it) => {
                   listData.push(it);
               })
            });
            let objData = listData.map( (it) => {
                const re = /<a[^>]*href=['"]([^"]*)['"][^>]*>(.*?)<\/a>/g;
                const temp = it.split(/<a([\S\s\t]*?)>([\S\s\t]*?)<\/a>/);
                const date = temp[temp.length-1].replace(/(^\W*)|(\W*$)|[$nbsp; ]/g, '');
                return { links:re.exec(it)[1], USdate: date, desDatile: temp[0]};
            })
            return { data: objData, code: 200 };
        } catch (e) {
            return { data: 'can not get the FDA message', code: 503 };
        }
    }

    async Update(data) {
        try {
            const ctx = this.ctx;
            const result = await ctx.app.mysql.beginTransactionScope(async conn => {
                for(let i=0; i<data.length;i++){
                    await conn.insert('fdamessage', data[i]);
                }
                await conn.update('fdatemp', {id: 1, tempDateFromFDA: data[0].USdate});
                return { success: true };
            }, ctx);
            return result;
        } catch (e) {
            return {code: 500, data: 'error'};
        }
    }
}

module.exports = SpiderService;
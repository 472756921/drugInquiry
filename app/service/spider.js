'use strict';
const Service = require('egg').Service;
const cheerio = require('cheerio');
const superagent = require('superagent');

const pageUrl = 'https://www.fda.gov/Drugs/InformationOnDrugs/ApprovedDrugs/ucm279174.htm';


class SpiderService extends Service {
    async Spider() {
        // ctx.app.messenger.sendToApp('spider', ctx);
        const webData = await superagent.get(pageUrl);
        const data = webData.text;
        const start = data.indexOf('<article>');
        const end = data.indexOf('</article>');
        let article = data.slice(start+9, end).replace(/[\r\n\t]/g, "");
        article = article.replace(/<header>([\S\s\t]*?)<\/header>/g, '');
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
            const date = temp[temp.length-1];
            return { links:re.exec(it)[1], USdate: date, desDatile: temp[0]};
        })
        return { data: objData };
    }
}

module.exports = SpiderService;
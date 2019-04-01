'use strict';
const Service = require('egg').Service;
class DrugService extends Service {
    async list({name='', offset = 20, limit = 0}) {
        const drugs = await this.app.mysql.query('select d.*, di.name from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) ORDER BY d.AddDate DESC LIMIT ?, ?',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', limit, offset]);
        return { drugs };
    }
    async listAdmin({name='', offset = 20, limit = 0, n = 1}) {
        let drugs = await this.app.mysql.query('select d.*, di.name from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) ORDER BY d.AddDate DESC LIMIT ?, ?',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', limit, offset]);
        if(n === 2) { //国内未上市
            drugs = await this.app.mysql.query('select d.*, di.name from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) and d.CHData is null ORDER BY d.AddDate DESC LIMIT ?, ?',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', limit, offset]);
        }
        if(n === 3) {//国内上市
            drugs = await this.app.mysql.query('select d.*, di.name from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) and d.CHData is not null ORDER BY d.AddDate DESC LIMIT ?, ?',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', limit, offset]);
        }
        return drugs ;
    }
    async find({id}) {
        const drug = await this.app.mysql.get('drug', { id: id });
        return { drug };
    }
    async addDrug(data) {
        const drug = await this.app.mysql.insert('drug', data);
        const updateSuccess = drug.affectedRows === 1;
        return { success: updateSuccess };
    }
    async delDrug(data) {
        const drug = await this.app.mysql.delete('drug', data);
        const updateSuccess = drug.affectedRows === 1;
        return { success: updateSuccess };
    }
    async update(data) {
        const drug = await this.app.mysql.update('drug', data);
        const updateSuccess = drug.affectedRows === 1;
        return { success: updateSuccess };
    }
    async listFDA() {
        const results = await this.app.mysql.select('fdamessage');
        return { results };
    }
    async FdaFirst() {
        const results = await this.app.mysql.select('fdatemp');
        return { results };
    }

    async getPageInfo({name='', n = 1}) {
        let drugs = await this.app.mysql.query('select count(*) as total from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) ORDER BY d.AddDate DESC',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
        if(n === 2) { //国内未上市
            drugs = await this.app.mysql.query('select count(*) as total di.name from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) and d.CHData is null ORDER BY d.AddDate DESC',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
        }
        if(n === 3) {//国内上市
            drugs = await this.app.mysql.query('select count(*) as total di.name from drug d, drug_disease dd, disease di where d.id=dd.drugID and dd.disease=di.id and (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ? or di.name like?) and d.CHData is not null ORDER BY d.AddDate DESC',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
        }
        return {
            total: drugs[0].total,
        };
    }

}

module.exports = DrugService;
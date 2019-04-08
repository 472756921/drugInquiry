'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class DrugService extends Service {
    async list({name=''}) {
        try {
            const result = await this.ctx.app.mysql.beginTransactionScope(async conn => {
                const disease = await conn.select('disease',{where:{name: name}});
                if(disease.length != 0){ //输入的是疾病类型
                    const drugs = await conn.query('SELECT d.*, di.name as diseaseName from disease di, drug d, drug_disease dd where dd.drugID=d.id and di.id=dd.disease and di.id=? ORDER BY d.AddDate DESC',[disease[0].id]);
                    return drugs
                } else {
                    const drugs = await conn.query('select GROUP_CONCAT(di.name SEPARATOR " , ") as diseaseName ,d.* from drug d, drug_disease dd, disease di where (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ?) and d.id=dd.drugID and dd.disease=di.id GROUP BY d.id',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
                    return drugs
                }
            });
            return {data: result}
        } catch (e) {
            return { success: false, code: 500, error: e.message};
        }
    }
    async listAdmin({name='', n = 1}) {
        let drugs = await this.app.mysql.query('select GROUP_CONCAT(di.id SEPARATOR " , ") as diseaseID ,GROUP_CONCAT(di.name SEPARATOR " , ") as diseaseName ,d.* from drug d, drug_disease dd, disease di where (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ?) and d.id=dd.drugID and dd.disease=di.id GROUP BY d.id',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
        if(n == 2) { //国内未上市
            drugs = await this.app.mysql.query('select GROUP_CONCAT(di.id SEPARATOR " , ") as diseaseID ,GROUP_CONCAT(di.name SEPARATOR " , ") as diseaseName ,d.* from drug d, drug_disease dd, disease di where (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ?) and d.id=dd.drugID and dd.disease=di.id and d.CHData is null group by d.id ORDER BY d.AddDate DESC',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
        }
        if(n == 3) {//国内上市
            drugs = await this.app.mysql.query('select GROUP_CONCAT(di.id SEPARATOR " , ") as diseaseID ,GROUP_CONCAT(di.name SEPARATOR " , ") as diseaseName ,d.* from drug d, drug_disease dd, disease di where (d.name1 like ? or d.name2 like ? or d.name3 like ? or d.name4 like ?) and d.id=dd.drugID and dd.disease=di.id and d.CHData is not null group by d.id ORDER BY d.AddDate DESC',['%'+name+'%', '%'+name+'%', '%'+name+'%', '%'+name+'%']);
        }
        return drugs ;
    }
    async find({id}) {
        const drug = await this.app.mysql.get('drug', { id: id });
        return { drug };
    }
    async addDrug(data) {
        data.AddDate = moment(new Date()).format('YYYY-MM-DD');
        data.optiong = 1;
        const type = data.classType;
        data.classType = 0;
        try {
            const result = await this.ctx.app.mysql.beginTransactionScope(async conn => {
                const drug = await conn.insert('drug', data);
                for(let i=0; i<type.length;i++){
                    await conn.insert('drug_disease',{drugID:drug.insertId, disease: type[i]});
                };
                const drug_success = drug.affectedRows === 1;
                return { success: drug_success , code: drug_success ? 200 : 500 };
            });
            return result;
        } catch (e) {
            return { success: false, code: 500, error: e.message};
        }
    }
    async delDrug({id}) {
        try {
            const result = await this.ctx.app.mysql.beginTransactionScope(async conn => {
                const drug = await conn.delete('drug', {id: id});
                const drug_disease = await conn.delete('drug_disease', {drugID: id});
                const drug_success = drug.affectedRows === 1;
                const drug_disease_success = drug_disease.affectedRows != 0;
                return { success: drug_success && drug_disease_success, code: drug_success && drug_disease_success ? 200 : 500 };
            });
            return result;
        } catch (e) {
            return { success: false, code: 500, error: e.message};
        }
    }
    async update(data) {
        const type = data.classType;
        data.classType = 0;
        try{
            const result = await this.ctx.app.mysql.beginTransactionScope(async conn => {
                const drug = await this.app.mysql.update('drug', data);
                const updateSuccess = drug.affectedRows === 1;
                const drug_diseaseR = await conn.delete('drug_disease', {drugID: data.id});
                for(let i=0; i<type.length;i++){
                    await conn.insert('drug_disease',{drugID:data.id, disease: type[i]});
                };
                const R = drug_diseaseR.affectedRows > 0;
                return { success: updateSuccess && R , code: updateSuccess && R ? 200 : 500 };
            });
            return result;
        } catch (e) {
            return { success: false, code: 500, error: e.message};
        }
    }
    async listFDA() {
        const results = await this.app.mysql.select('fdamessage');
        return { results, code: 200 };
    }
    async updateFDA(data) {
        const results = await this.app.mysql.update('fdamessage', data);
        const success = results.affectedRows === 1;
        return { success: success, code: 200 };
    }
    async FdaFirst() {
        const results = await this.app.mysql.select('fdatemp');
        return { results };
    }
    async drugCount(data) {
        const results = await this.app.mysql.update('drug', data);
        return { results };
    }
    async getHotDrug() {
        const results = await this.app.mysql.select('drug', {orders:[['checkCount','desc']], limit: 6});
        return { results };
    }

}

module.exports = DrugService;
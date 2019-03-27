'use strict';
const Service = require('egg').Service;
class DrugService extends Service {
    async list({name, offset = 20, limit = 0}) {
        const drugs = await this.app.mysql.query('select * from drug where name1=? or name2=? ORDER BY AddDate DESC LIMIT ?, ?',[name, name, limit, offset]);
        return { drugs };
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
}

module.exports = DrugService;
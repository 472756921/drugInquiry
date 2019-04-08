'use strict';
const Service = require('egg').Service;
const moment = require('moment');

class DiseaseService extends Service {
    async list() {
        const results = await this.app.mysql.select('disease');
        return { data: results };
    }
    async add(data) {
        const results = await this.app.mysql.insert('disease',data);
        const disease_success = results.affectedRows === 1;
        return { success: disease_success, code: 200 };
    }
    async del({id}) {
        try {
            const results = await this.app.mysql.delete('disease',{id: id});
            const disease_success = results.affectedRows === 1;
            return { success: disease_success, code: 200 };
        } catch (e) {
            return { success: false, code: 400 };
        }
    }
    async update(data) {
        const results = await this.app.mysql.update('disease', data);
        const disease_success = results.affectedRows === 1;
        return { success: disease_success, code: 200 };
    }
}

module.exports = DiseaseService;
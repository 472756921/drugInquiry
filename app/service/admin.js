'use strict';
const Service = require('egg').Service;
class AdaminService extends Service {
    async list() {
        return await this.app.mysql.select('admin');
    }
    async add(data) {
        const drug = await this.app.mysql.insert('admin', data);
        const updateSuccess = drug.affectedRows === 1;
        return { success: updateSuccess };
    }
    async delAdmin(data) {
        const drug = await this.app.mysql.delete('admin', data);
        const updateSuccess = drug.affectedRows === 1;
        return { success: updateSuccess };
    }
    async update(data) {
        const drug = await this.app.mysql.update('admin', data);
        const updateSuccess = drug.affectedRows === 1;
        return { success: updateSuccess };
    }
}

module.exports = AdaminService;
'use strict';
const Service = require('egg').Service;
const moment = require('moment');
const crypto = require('crypto');

class AdaminService extends Service {
    async login(data) {
        data.password = this.createPassword(data.userName, data.password);
        const results =  await this.app.mysql.get('admin', {account:data.userName, pws: data.password});
        if(results != null){
            this.saveDate(results);
        }
        return results
    }

    async saveDate(data) {
        this.app.mysql.update('admin', {id:data.id, loginDate: moment(new Date()).format('YYYY-MM-DD')});
    }

    async list() {
        const results =  await this.app.mysql.select('admin', {columns:['account', 'createDate', 'loginDate', 'role', 'status', 'id']});
        return { data: results };
    }
    async add(data) {
        data.createDate = moment(new Date()).format('YYYY-MM-DD');
        const results =  await this.app.mysql.get('admin', {account:data.account});
        if(results != null && results != '') {
            return { success: false, code: 403 }
        } else {
            data.pws = this.createPassword(data.account, data.pws);
            const admin = await this.app.mysql.insert('admin', data);
            const updateSuccess = admin.affectedRows === 1;
            return { success: updateSuccess, code: updateSuccess?200:500 };
        }
    }
    async delAdmin({id}) {
        const admin = await this.app.mysql.delete('admin', {id: id});
        const updateSuccess = admin.affectedRows === 1;
        return { success: updateSuccess, code: updateSuccess?200:500  };
    }
    async update(data) {
        data.pws = this.createPassword(data.account, data.pws);
        const admin = await this.app.mysql.update('admin', data);
        const updateSuccess = admin.affectedRows === 1;
        return { success: updateSuccess, code: updateSuccess?200:500  };
    }

    createPassword(account, pws){
        return crypto.createHash('md5').update(account + pws, 'utf8').digest('hex');
    }
}

module.exports = AdaminService;
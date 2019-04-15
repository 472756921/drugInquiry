'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;


    router.get('/drugSystem/', controller.home.index);
    router.get('/drugSystem/user/info', controller.user.info);


    // 爬虫
    router.get('/drugSystem/spider/getInfo', controller.spider.getInfo);

    // fda 管理
    router.get('/drugSystem/drug/fda', controller.drug.listFDA);
    router.put('/drugSystem/drug/fda', controller.drug.updateFDA);

    // 疾病管理
    router.get('/drugSystem/disease/list', controller.disease.list);
    router.put('/drugSystem/disease/put', controller.disease.update);
    router.post('/drugSystem/disease/add', controller.disease.add);
    router.delete('/drugSystem/disease/del', controller.disease.del);

    // 药品管理
    router.get('/drugSystem/drug/listAdmin', controller.drug.listAdmin);
    router.get('/drugSystem/drug/list', controller.drug.list);
    router.get('/drugSystem/drug/find', controller.drug.find);
    router.post('/drugSystem/drug/add', controller.drug.add);
    router.delete('/drug/del', controller.drug.del);
    router.put('/drugSystem/drug/put', controller.drug.update);


    // 统计 热门
    router.get('/drugSystem/drug/drugCountByPhone', controller.drug.drugCountByPhone);
    router.put('/drugSystem/drug/drugCount', controller.drug.drugCount);
    router.get('/drugSystem/drug/getHotDrug', controller.drug.getHotDrug);

    // 用户管理
    router.get('/drugSystem/admin/list', controller.admin.list);
    router.post('/drugSystem/admin/add', controller.admin.add);
    router.delete('/drugSystem/admin/del', controller.admin.del);
    router.put('/drugSystem/admin/update', controller.admin.update);
    router.post('/drugSystem/admin/login', controller.admin.login);
    router.get('/drugSystem/admin/checkUserStatus', controller.admin.check);
    router.get('/drugSystem/admin/loginOut', controller.admin.loginOut);
};
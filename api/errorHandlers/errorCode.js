module.exports = {
    10000: {
        message: '缺少欄位',
        statusCode: 400
    },

    10001: {
        message: 'API Header Key 不正確',
        statusCode: 400
    },

    // User Create Validate
    11001: {
        message: '[User Create] 缺少 name 這個欄位',
        statusCode: 400
    },
    11002: {
        message: '[User Create] 缺少 staffId 這個欄位',
        statusCode: 400
    },
    11003: {
        message: '[User Create] 缺少 Role 這個欄位',
        statusCode: 400
    },
    11004: {
        message: '[User Create] 缺少 email 這個欄位',
        statusCode: 400
    },
    11005: {
        message: '[User Create] 缺少 password 這個欄位',
        statusCode: 400
    },
    11006: {
        message: '[User Create] 缺少 Center 這個欄位',
        statusCode: 400
    },
    11007: {
        message: '[User Create] 缺少 Department 這個欄位',
        statusCode: 400
    },
    11008: {
        message: '[User Create] 缺少 jobTitle 這個欄位',
        statusCode: 400
    },
    11009: {
        message: '[User Create] 缺少 CreatedBy 這個欄位',
        statusCode: 400
    },
    110010: {
        message: '[User Create] 缺少 UpdatedBy 這個欄位',
        statusCode: 400
    },
    110011: {
        message: '[User Create] email 已經註冊過了',
        statusCode: 400
    },
    12001: {
        message: '[Role Create] 缺少 name 這個欄位',
        statusCode: 400
    },
    12002: {
        message: '[Role Create] policies 不能為空',
        statusCode: 400
    },
    12003: {
        message: '[Role Create] role 的 name 已經重複了',
        statusCode: 400
    },
    12004: {
        message: '[Role Create] 缺少 CreatedBy 這個欄位',
        statusCode: 400
    },
    12005: {
        message: '[Role Create] 缺少 UpdatedBy 這個欄位',
        statusCode: 400
    },
    12006: {
        message: '[Role Create] polocies 裡面的 item 必須為 String',
        statusCode: 400
    }
};
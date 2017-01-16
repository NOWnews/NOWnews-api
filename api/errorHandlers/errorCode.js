module.exports = {
    10000: {
        message: '缺少欄位',
        statusCode: 400
    },

    10001: {
        message: 'API Header Key 不正確',
        statusCode: 400
    },

    10002: {
        message: '你沒有權限對超級管理者做此操作',
        statusCode: 403
    },


    // User Create Validate
    11001: {
        message: '[User Create] 缺少 name 這個欄位',
        statusCode: 400
    },
    // 11002: {
    //     message: '[User Create] 缺少 staffId 這個欄位',
    //     statusCode: 400
    // },
    // 11003: {
    //     message: '[User Create] 缺少 Role 這個欄位',
    //     statusCode: 400
    // },
    11004: {
        message: '[User Create] 缺少 email 這個欄位',
        statusCode: 400
    },
    11005: {
        message: '[User Create] 缺少 password 這個欄位',
        statusCode: 400
    },
    // 11006: {
    //     message: '[User Create] 缺少 Center 這個欄位',
    //     statusCode: 400
    // },
    // 11007: {
    //     message: '[User Create] 缺少 Department 這個欄位',
    //     statusCode: 400
    // },
    // 11008: {
    //     message: '[User Create] 缺少 jobTitle 這個欄位',
    //     statusCode: 400
    // },
    11009: {
        message: '[User Create] 缺少 CreatedBy 這個欄位',
        statusCode: 400
    },
    // 110010: {
    //     message: '[User Create] 缺少 UpdatedBy 這個欄位',
    //     statusCode: 400
    // },
    11010: {
        message: '[User Create] email 已經註冊過了',
        statusCode: 400
    },

    11011: {
        message: '[User findOne] 找不到這個 User',
        statusCode: 404
    },

    11012: {
        message: '[User Update] url 格式不正確',
        statusCode: 400
    },

    11013: {
        message: '[User Update] 缺少 UpdatedBy 這個欄位',
        statusCode: 400
    },

    // Role Create Validate
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
    },

    12007: {
        message: '[Role FindOne] 找不到這個角色',
        statusCode: 404
    },

    // Center Create Validate
    13001: {
        message: '[Center Create] 這個中心名稱已經被使用過了',
        statusCode: 400
    },

    13002: {
        message: '[Center Create] 找不到這個中心',
        statusCode: 404
    },

    // Department Create Validate
    14001: {
        message: '[Department Create] 這個部門名稱已經被使用過了',
        statusCode: 400
    },

    // Department FindOne Validate
    14002: {
        message: '[Department FindOne] 找不到這個部門',
        statusCode: 404
    }
};

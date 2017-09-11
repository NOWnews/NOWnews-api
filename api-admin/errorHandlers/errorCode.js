module.exports = {
    10000: {
        message: '缺少欄位',
        statusCode: 400
    },

    10001: {
        message: 'API Header Key 不正確',
        statusCode: 403
    },

    10002: {
        message: '你沒有權限對超級管理者做此操作',
        statusCode: 403
    },


    // User Create Validate
    11001: {
        message: '[User] 缺少 name 這個欄位',
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
        message: '[User] 缺少 email 這個欄位',
        statusCode: 400
    },
    11005: {
        message: '[User] 缺少 password 這個欄位',
        statusCode: 400
    },
    // 11006: {
    //     message: '[User Create] 缺少 Department 這個欄位',
    //     statusCode: 400
    // },
    // 11007: {
    //     message: '[User Create] 缺少 Center 這個欄位',
    //     statusCode: 400
    // },
    // 11008: {
    //     message: '[User Create] 缺少 jobTitle 這個欄位',
    //     statusCode: 400
    // },
    11009: {
        message: '[User] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },
    // 110010: {
    //     message: '[User Create] 缺少 UpdatedBy 這個欄位',
    //     statusCode: 400
    // },
    11010: {
        message: '[User] email 已經註冊過了',
        statusCode: 400
    },

    11011: {
        message: '[User] 找不到這個 User',
        statusCode: 404
    },

    11012: {
        message: '[User] url 格式不正確',
        statusCode: 400
    },

    11013: {
        message: '[User] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    11014: {
        message: '[User] 找不到使用者或是帳號已經停權，建議檢查帳號密碼或是聯絡管理員',
        statusCode: 404
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
        message: '[Role Create] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },
    12005: {
        message: '[Role Create] 缺少 UpdatedBy 這個欄位或是格式不正確',
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

    // Department Create Validate
    13001: {
        message: '[Department Create] 這個部門名稱已經被使用過了',
        statusCode: 400
    },

    13002: {
        message: '[Department Create] 找不到這個部門',
        statusCode: 404
    },

    // Center Create Validate
    14001: {
        message: '[Center Create] 這個中心名稱已經被使用過了',
        statusCode: 400
    },

    // Center FindOne Validate
    14002: {
        message: '[Center FindOne] 找不到這個中心',
        statusCode: 404
    },

    // Image
    15001: {
        message: '[Image] 找不到這個圖片資料',
        statusCode: 404
    },

    15002: {
        message: '[Image] 缺少 desc 這個欄位',
        statusCode: 400
    },

    15003: {
        message: '[Image] 缺少 id 這個欄位',
        statusCode: 400
    },

    15004: {
        message: '[Image] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    15005: {
        message: '[Image] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    // News
    16001: {
        message: '[News] 缺少 title 這個欄位',
        statusCode: 400
    },

    16002: {
        message: '[News] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    16003: {
        message: '[News] 找不到新聞',
        statusCode: 404
    },

    16004: {
        message: '[News] 缺少 content 這個欄位',
        statusCode: 400
    },

    16005: {
        message: '[News] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    16006: {
        message: '[News] 缺少 Author 這個欄位或是格式不正確',
        statusCode: 400
    },

    16007: {
        message: '[News] 缺少 LastReviewer 這個欄位或是格式不正確',
        statusCode: 400
    },

    16008: {
        message: '[News] 審核者與送審者不能為同一個人',
        statusCode: 403
    },

    16009: {
        message: '[News] 此新聞現在的狀態無法送審，請回復至草稿',
        statusCode: 403
    },

    16010: {
        message: '[News] 自己無法發布自己的新聞，請審核者協助發佈',
        statusCode: 403
    },

    16011: {
        message: '[News] 缺少 MainMenu 這個欄位或是格式不正確',
        statusCode: 400
    },

    16012: {
        message: '[News] 缺少 newsBy 這個欄位',
        statusCode: 400
    },
    16013: {
        message: '[News] 自己無法審核自己的新聞，請選擇其他審核者',
        statusCode: 403
    },
    // NewsMemo
    17001: {
        message: '[NewsMemo] 缺少 News 這個欄位或是格式不正確',
        statusCode: 400
    },

    17002: {
        message: '[NewsMemo] 缺少 content 這個欄位或是格式不正確',
        statusCode: 400
    },

    17003: {
        message: '[NewsMemo] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    // Tag
    18001: {
        message: '[Tag] Tag 名稱重複，請輸入其他名稱',
        statusCode: 400
    },

    18002: {
        message: '[Tag] Tags 不為陣列的格式，或是陣列為空，或是陣列多於 7 個 item',
        statusCode: 400
    },

    18003: {
        message: '[Tag] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    18004: {
        message: '[Tag] 找不到 Tag',
        statusCode: 404
    },

    // Menu
    19001: {
        message: '[Menu] 缺少 name 這個欄位',
        statusCode: 400
    },

    19002: {
        message: '[Menu] 缺少 url 這個欄位',
        statusCode: 400
    },

    19003: {
        message: '[Menu] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    19004: {
        message: '[Menu] 已經有相同名稱的選單',
        statusCode: 400
    },

    19005: {
        message: '[Menu] 已經有相同連結的選單',
        statusCode: 400
    },

    19006: {
        message: '[Menu] 找不到這個 menu',
        statusCode: 404
    },

    19007: {
        message: '[Menu] 已經有相同的 category name',
        statusCode: 400
    },

    // SpecialTopic
    20001: {
        message: '[SpecialTopic] 找不到此專題',
        statusCode: 404
    },

    20002: {
        message: '[SpecialTopic] 缺少 title 這個欄位',
        statusCode: 400
    },

    20003: {
        message: '[SpecialTopic] 缺少 url 這個欄位',
        statusCode: 400
    },

    20004: {
        message: '[SpecialTopic] 缺少 MainPhoto 這個欄位或是格式不正確',
        statusCode: 400
    },

    20005: {
        message: '[SpecialTopic] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    20006: {
        message: '[SpecialTopic] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    // SpecialChannel
    21001: {
        message: '[SpecialChannel] 找不到此特輯',
        statusCode: 404
    },

    21002: {
        message: '[SpecialChannel] 缺少 title 這個欄位',
        statusCode: 400
    },

    21003: {
        message: '[SpecialChannel] 缺少 MainPhoto 這個欄位或是格式不正確',
        statusCode: 400
    },

    21004: {
        message: '[SpecialChannel] newsList 必須為 Array',
        statusCode: 400
    },

    21005: {
        message: '[SpecialChannel] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    21006: {
        message: '[SpecialChannel] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    // IndexPage
    22001: {
        message: '[IndexPage] carousels 必須為 Array',
        statusCode: 400
    },

    22002: {
        message: '[IndexPage] specialChannels 必須為 Array',
        statusCode: 400
    },

    22003: {
        message: '[IndexPage] specialTopics 必須為 Array',
        statusCode: 400
    },

    22004: {
        message: '[IndexPage] videos 必須為 Array',
        statusCode: 400
    },

    22005: {
        message: '[IndexPage] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    22006: {
        message: '[IndexPage] Array Length 大於限制',
        statusCode: 400
    },

    // Video
    23001: {
        message: '[Video] 找不到此影片',
        statusCode: 404
    },

    23002: {
        message: '[Video] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    23003: {
        message: '[Video] 缺少 UpdatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    23004: {
        message: '[Video] 缺少 url 這個欄位',
        statusCode: 400
    },

    // PostBoard
    24001: {
        message: '[PostBoard] 缺少 content 這個欄位或是格式不正確',
        statusCode: 400
    },

    24002: {
        message: '[PostBoard] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 400
    },

    24003: {
        message: '[PostBoard] 找不到這則 post',
        statusCode: 404
    },

    // DailyPlan
    25001: {
        message: '[DailyPlan] 缺少 title 這個欄位或是格式不正確',
        statusCode: 400
    },

    25002: {
        message: '[DailyPlan] 缺少 Content 這個欄位或是格式不正確',
        statusCode: 400
    },

    25003: {
        message: '[DailyPlan] 缺少 CreatedBy 這個欄位或是格式不正確',
        statusCode: 404
    },

    25004: {
        message: '[DailyPlan] 找不到這則稿單',
        statusCode: 404
    },

    25005: {
        message: '[DailyPlan] 缺少 startedAt 這個欄位或是格式不正確',
        statusCode: 404
    },

    25006: {
        message: '[DailyPlan] 缺少 Center 這個欄位或是格式不正確',
        statusCode: 404
    },

    26001: {
        message: '[AppVersion] downloadLink 這個欄位格式不正確',
        statusCode: 400
    },

    27001: {
        message: '[Policy] 找不到對應的權限',
        statusCode: 400
    },

    27002: {
        message: '[Policy] 您沒有權限訪問此頁，如有疑慮請洽詢管理員',
        statusCode: 403
    },

    // OTT
    28001: {
        message: '此分類在此平台內已經存在',
        statusCode: 400
    },

    28002: {
        message: '找不到此平台',
        statusCode: 404
    },

    28003: {
        message: '此平台此分類已經有這個頻道了',
        statusCode: 400
    },

    28004: {
        message: '此平台已經存在',
        statusCode: 400
    },
};

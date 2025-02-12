<?php

return [
    /*
     * 接口地址
     */
    'api_url' => env('API_URL', 'http://localhost'),

    /*
     * 接口频率限制
     */
    'rate_limits' => [
        // 访问频率限制，次数/分钟
        'access' =>  env('RATE_LIMITS', '60,1'),
        // 登录相关，次数/分钟
        'sign' =>  env('SIGN_RATE_LIMITS', '15,1'),
    ],

    /**
     * 数据分页大小
     */
    'page_size' => env('PAGE_SIZE', 10),

    'storage_disk' => env('STORAGE_DISK', 'uploads')
];

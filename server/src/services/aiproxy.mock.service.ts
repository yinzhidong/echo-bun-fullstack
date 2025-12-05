

export interface ChartDataPoint {
    cache_creation_tokens: number
    cached_tokens: number
    exception_count: number
    input_tokens: number
    max_rpm: number
    max_rps: number
    max_tpm: number
    max_tps: number
    output_tokens: number
    request_count: number
    timestamp: number
    total_tokens: number
    used_amount: number
    web_search_count: number
}

export interface DashboardData {
    cache_creation_tokens: number
    cached_tokens: number
    channels: number[]
    chart_data: ChartDataPoint[]
    exception_count: number
    input_tokens: number
    max_rpm: number
    max_rps: number
    max_tpm: number
    max_tps: number
    models: string[]
    output_tokens: number
    rpm: number
    total_count: number
    total_tokens: number
    tpm: number
    used_amount: number
    web_search_count: number
}

export interface DashboardFilters {
    keyName?: string
    model?: string
    start_timestamp?: number
    end_timestamp?: number
    timezone?: string
    timespan?: 'day' | 'hour'
}


// 10条DashboardData数据（chart_data符合新接口）
export const mockDashboardDataList: DashboardData[] = [
    // 第1条
    {
        cache_creation_tokens: 4520,
        cached_tokens: 12890,
        channels: [3, 7, 12],
        chart_data: [{
            cache_creation_tokens: 4520,
            cached_tokens: 12890,
            exception_count: 3,
            input_tokens: 28500,
            max_rpm: 350,
            max_rps: 6,
            max_tpm: 85000,
            max_tps: 1420,
            output_tokens: 16200,
            total_tokens: 44950,
            used_amount: 356.89,
            web_search_count: 210,

            request_count: 123,
            timestamp: 1111111,
        }],

        exception_count: 3,
        input_tokens: 28500,
        max_rpm: 350,
        max_rps: 6,
        max_tpm: 85000,
        max_tps: 1420,
        models: ['gpt-3.5-turbo', 'claude-2'],
        output_tokens: 16200,
        rpm: 280,
        total_count: 4560,
        total_tokens: 44950,
        tpm: 72300,
        used_amount: 356.89,
        web_search_count: 210,
    },
    // 第2条
    {
        cache_creation_tokens: 8760,
        cached_tokens: 18450,
        channels: [1, 5],
        chart_data: [{
            cache_creation_tokens: 8760,
            cached_tokens: 18450,
            exception_count: 7,
            input_tokens: 42800,
            max_rpm: 520,
            max_rps: 9,
            max_tpm: 105000,
            max_tps: 1750,
            output_tokens: 28500,
            total_tokens: 71530,
            used_amount: 890.45,
            web_search_count: 420,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 7,
        input_tokens: 42800,
        max_rpm: 520,
        max_rps: 9,
        max_tpm: 105000,
        max_tps: 1750,
        models: ['gpt-4', 'gemini-pro', 'llama-2'],
        output_tokens: 28500,
        rpm: 480,
        total_count: 8920,
        total_tokens: 71530,
        tpm: 98700,
        used_amount: 890.45,
        web_search_count: 420,
    },
    // 第3条
    {
        cache_creation_tokens: 2340,
        cached_tokens: 6780,
        channels: [8, 15, 19, 2],
        chart_data: [{
            cache_creation_tokens: 2340,
            cached_tokens: 6780,
            exception_count: 1,
            input_tokens: 15600,
            max_rpm: 180,
            max_rps: 3,
            max_tpm: 32000,
            max_tps: 530,
            output_tokens: 8900,
            total_tokens: 24620,
            used_amount: 156.78,
            web_search_count: 95,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 1,
        input_tokens: 15600,
        max_rpm: 180,
        max_rps: 3,
        max_tpm: 32000,
        max_tps: 530,
        models: ['gpt-3.5-turbo'],
        output_tokens: 8900,
        rpm: 120,
        total_count: 1850,
        total_tokens: 24620,
        tpm: 28500,
        used_amount: 156.78,
        web_search_count: 95,
    },
    // 第4条
    {
        cache_creation_tokens: 9870,
        cached_tokens: 23450,
        channels: [10, 14, 7, 3, 18],
        chart_data: [{
            cache_creation_tokens: 9870,
            cached_tokens: 23450,
            exception_count: 12,
            input_tokens: 58900,
            max_rpm: 600,
            max_rps: 10,
            max_tpm: 120000,
            max_tps: 2000,
            output_tokens: 34200,
            total_tokens: 93480,
            used_amount: 1056.92,
            web_search_count: 520,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 12,
        input_tokens: 58900,
        max_rpm: 600,
        max_rps: 10,
        max_tpm: 120000,
        max_tps: 2000,
        models: ['gpt-4', 'claude-2', 'gemini-pro', 'llama-2'],
        output_tokens: 34200,
        rpm: 560,
        total_count: 10850,
        total_tokens: 93480,
        tpm: 112300,
        used_amount: 1056.92,
        web_search_count: 520,
    },
    // 第5条
    {
        cache_creation_tokens: 5670,
        cached_tokens: 14320,
        channels: [4, 9, 13],
        chart_data: [{
            cache_creation_tokens: 5670,
            cached_tokens: 14320,
            exception_count: 5,
            input_tokens: 32400,
            max_rpm: 420,
            max_rps: 7,
            max_tpm: 78000,
            max_tps: 1300,
            output_tokens: 19800,
            total_tokens: 52540,
            used_amount: 489.36,
            web_search_count: 285,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 5,
        input_tokens: 32400,
        max_rpm: 420,
        max_rps: 7,
        max_tpm: 78000,
        max_tps: 1300,
        models: ['gpt-3.5-turbo', 'gpt-4', 'claude-2'],
        output_tokens: 19800,
        rpm: 380,
        total_count: 6720,
        total_tokens: 52540,
        tpm: 71200,
        used_amount: 489.36,
        web_search_count: 285,
    },
    // 第6条
    {
        cache_creation_tokens: 3210,
        cached_tokens: 9870,
        channels: [6, 11],
        chart_data: [{
            cache_creation_tokens: 3210,
            cached_tokens: 9870,
            exception_count: 2,
            input_tokens: 21500,
            max_rpm: 250,
            max_rps: 4,
            max_tpm: 45000,
            max_tps: 750,
            output_tokens: 12300,
            total_tokens: 34050,
            used_amount: 278.54,
            web_search_count: 160,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 2,
        input_tokens: 21500,
        max_rpm: 250,
        max_rps: 4,
        max_tpm: 45000,
        max_tps: 750,
        models: ['gemini-pro', 'llama-2'],
        output_tokens: 12300,
        rpm: 210,
        total_count: 3450,
        total_tokens: 34050,
        tpm: 39800,
        used_amount: 278.54,
        web_search_count: 160,
    },
    // 第7条
    {
        cache_creation_tokens: 7650,
        cached_tokens: 19870,
        channels: [1, 5, 12, 17],
        chart_data: [{
            cache_creation_tokens: 7650,
            cached_tokens: 19870,
            exception_count: 9,
            input_tokens: 49800,
            max_rpm: 580,
            max_rps: 9,
            max_tpm: 112000,
            max_tps: 1870,
            output_tokens: 27600,
            total_tokens: 77730,
            used_amount: 945.72,
            web_search_count: 480,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 9,
        input_tokens: 49800,
        max_rpm: 580,
        max_rps: 9,
        max_tpm: 112000,
        max_tps: 1870,
        models: ['gpt-4', 'claude-2', 'gemini-pro'],
        output_tokens: 27600,
        rpm: 530,
        total_count: 9870,
        total_tokens: 77730,
        tpm: 105600,
        used_amount: 945.72,
        web_search_count: 480,
    },
    // 第8条
    {
        cache_creation_tokens: 1890,
        cached_tokens: 5670,
        channels: [16],
        chart_data: [{
            cache_creation_tokens: 1890,
            cached_tokens: 5670,
            exception_count: 0,
            input_tokens: 12300,
            max_rpm: 150,
            max_rps: 2,
            max_tpm: 28000,
            max_tps: 470,
            output_tokens: 7600,
            total_tokens: 20080,
            used_amount: 132.45,
            web_search_count: 75,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 0,
        input_tokens: 12300,
        max_rpm: 150,
        max_rps: 2,
        max_tpm: 28000,
        max_tps: 470,
        models: ['gpt-3.5-turbo'],
        output_tokens: 7600,
        rpm: 110,
        total_count: 1280,
        total_tokens: 20080,
        tpm: 24500,
        used_amount: 132.45,
        web_search_count: 75,
    },
    // 第9条
    {
        cache_creation_tokens: 6540,
        cached_tokens: 16780,
        channels: [2, 8, 14, 19],
        chart_data: [{
            cache_creation_tokens: 6540,
            cached_tokens: 16780,
            exception_count: 8,
            input_tokens: 38700,
            max_rpm: 480,
            max_rps: 8,
            max_tpm: 92000,
            max_tps: 1530,
            output_tokens: 23400,
            total_tokens: 62390,
            used_amount: 678.91,
            web_search_count: 340,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 8,
        input_tokens: 38700,
        max_rpm: 480,
        max_rps: 8,
        max_tpm: 92000,
        max_tps: 1530,
        models: ['gpt-3.5-turbo', 'gpt-4', 'llama-2'],
        output_tokens: 23400,
        rpm: 430,
        total_count: 7650,
        total_tokens: 62390,
        tpm: 85700,
        used_amount: 678.91,
        web_search_count: 340,
    },
    // 第10条
    {
        cache_creation_tokens: 8760,
        cached_tokens: 21450,
        channels: [3, 7, 10, 15, 18],
        chart_data: [{
            cache_creation_tokens: 8760,
            cached_tokens: 21450,
            exception_count: 15,
            input_tokens: 55600,
            max_rpm: 590,
            max_rps: 10,
            max_tpm: 118000,
            max_tps: 1970,
            output_tokens: 32100,
            total_tokens: 87980,
            used_amount: 1023.45,
            web_search_count: 510,

            request_count: 123,
            timestamp: 1111111,
        }],
        exception_count: 15,
        input_tokens: 55600,
        max_rpm: 590,
        max_rps: 10,
        max_tpm: 118000,
        max_tps: 1970,
        models: ['gpt-4', 'claude-2', 'gemini-pro', 'llama-2', 'gpt-3.5-turbo'],
        output_tokens: 32100,
        rpm: 550,
        total_count: 10230,
        total_tokens: 87980,
        tpm: 110500,
        used_amount: 1023.45,
        web_search_count: 510,
    },
];







// ==============================
export interface ModelConfigDetail {
    max_input_tokens?: number
    max_output_tokens?: number
    max_context_tokens?: number
    vision?: boolean
    tool_choice?: boolean
    support_formats?: string[]
    support_voices?: string[]
}

export interface ModelPrice {
    input_price: number
    output_price: number
    per_request_price: number
    cache_creation_price?: number
    cache_creation_price_unit?: number
    cached_price?: number
    cached_price_unit?: number
    image_input_price?: number
    image_input_price_unit?: number
    image_output_price?: number
    image_output_price_unit?: number
    web_search_price?: number
    web_search_price_unit?: number
}

export interface ModelConfig {
    config?: ModelConfigDetail
    created_at: number
    updated_at: number
    image_prices: number[] | null
    model: string
    owner: string
    image_batch_size?: number
    type: number
    price: ModelPrice
    rpm: number
    tpm?: number
    retry_times?: number
    timeout?: number
    max_error_rate?: number
    force_save_detail?: boolean
    plugin: Plugin
}

type Plugin = {
    cache: CachePlugin // 缓存插件
    "web-search": WebSearchPlugin // 网络搜索插件
    "think-split": ThinkSplitPlugin // 思考拆分插件
    "stream-fake": StreamFakePlugin // 流式伪装插件
}

type CachePlugin = {
    enable: boolean
    ttl?: number
    item_max_size?: number
    add_cache_hit_header?: boolean
    cache_hit_header?: string
}

type WebSearchPlugin = {
    enable: boolean
    force_search?: boolean
    max_results?: number
    search_rewrite?: {
        enable?: boolean
        model_name?: string
        timeout_millisecond?: number
        max_count?: number
        add_rewrite_usage?: boolean
        rewrite_usage_field?: string
    }
    need_reference?: boolean
    reference_location?: string
    reference_format?: string
    default_language?: string
    prompt_template?: string
    search_from: EngineConfig[]
}

type ThinkSplitPlugin = {
    enable: boolean
}

type StreamFakePlugin = {
    enable: boolean
}

type EngineConfig = {
    type: 'bing' | 'google' | 'arxiv' | 'searchxng'
    max_results?: number
    spec?: GoogleSpec | BingSpec | ArxivSpec | SearchXNGSpec
}

type GoogleSpec = {
    api_key?: string
    cx?: string
}

type BingSpec = {
    api_key?: string
}

type ArxivSpec = object

type SearchXNGSpec = {
    base_url?: string
}

export interface ModelCreateRequest {
    model: string
    type: number
    plugin?: Plugin
}

// Export all types for use in other modules
export type {
    Plugin,
    CachePlugin,
    WebSearchPlugin,
    ThinkSplitPlugin,
    StreamFakePlugin,
    EngineConfig,
    GoogleSpec,
    BingSpec,
    ArxivSpec,
    SearchXNGSpec
}



// 模拟5条ModelConfig完整数据
export const mockModelConfigList: ModelConfig[] = [
  // 第1条：OpenAI GPT-3.5 Turbo（文本模型，支持缓存+网页搜索）
  {
    config: {
      max_input_tokens: 4096,
      max_output_tokens: 2048,
      max_context_tokens: 4096,
      vision: false,
      tool_choice: true,
      support_formats: ['text/plain', 'application/json'],
      support_voices: []
    },
    created_at: 1780000000000, // 2026-02-25
    updated_at: 1780500000000, // 2026-03-01
    image_prices: null,
    model: 'gpt-3.5-turbo',
    owner: 'openai',
    type: 1, // 1=文本聊天模型
    price: {
      input_price: 0.0015, // 每1000 tokens 0.0015美元
      output_price: 0.002, // 每1000 tokens 0.002美元
      per_request_price: 0.0001, // 每次请求固定费用0.0001美元
      cache_creation_price: 0.0005,
      cache_creation_price_unit: 1000, // 单位：1000 tokens
      cached_price: 0.0003,
      cached_price_unit: 1000,
      web_search_price: 0.005,
      web_search_price_unit: 1 // 单位：每次搜索
    },
    rpm: 1000, // 每分钟最大请求数
    tpm: 100000, // 每分钟最大token数
    retry_times: 3,
    timeout: 30000, // 30秒超时
    max_error_rate: 0.1, // 最大错误率10%
    force_save_detail: false,
    plugin: {
      cache: {
        enable: true,
        ttl: 3600, // 缓存有效期1小时
        item_max_size: 4096, // 单条缓存最大token数
        add_cache_hit_header: true,
        cache_hit_header: 'X-Cache-Hit'
      },
      "web-search": {
        enable: true,
        force_search: false,
        max_results: 8,
        search_rewrite: {
          enable: true,
          model_name: 'gpt-3.5-turbo-mini',
          timeout_millisecond: 10000,
          max_count: 2,
          add_rewrite_usage: true,
          rewrite_usage_field: 'search_rewrite_usage'
        },
        need_reference: true,
        reference_location: 'end',
        reference_format: 'markdown',
        default_language: 'zh-CN',
        prompt_template: '根据以下搜索结果回答用户问题：{search_results}',
        search_from: [
          {
            type: 'bing',
            max_results: 5,
            spec: { api_key: 'mock-bing-api-key-xxx123' } as BingSpec
          },
          {
            type: 'google',
            max_results: 3,
            spec: { api_key: 'mock-google-api-key-yyy456', cx: 'mock-cx-id-789' } as GoogleSpec
          }
        ]
      },
      "think-split": { enable: false },
      "stream-fake": { enable: true } // 支持流式伪装
    }
  },

  // 第2条：OpenAI GPT-4 Vision（多模态模型，支持图片输入+缓存）
  {
    config: {
      max_input_tokens: 128000,
      max_output_tokens: 4096,
      max_context_tokens: 128000,
      vision: true, // 多模态支持
      tool_choice: true,
      support_formats: ['text/plain', 'application/json', 'image/png', 'image/jpeg', 'image/webp'],
      support_voices: ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']
    },
    created_at: 1780200000000,
    updated_at: 1780600000000,
    image_prices: [0.002, 0.004], // 不同分辨率图片价格（每1024×1024像素）
    model: 'gpt-4-vision-preview',
    owner: 'openai',
    image_batch_size: 5, // 单次最大图片输入数量
    type: 2, // 2=多模态模型
    price: {
      input_price: 0.03, // 每1000 tokens
      output_price: 0.06, // 每1000 tokens
      per_request_price: 0.001,
      cache_creation_price: 0.01,
      cache_creation_price_unit: 1000,
      cached_price: 0.005,
      cached_price_unit: 1000,
      image_input_price: 0.002,
      image_input_price_unit: 1024, // 单位：1024像素
      web_search_price: 0.008,
      web_search_price_unit: 1
    },
    rpm: 300, // 多模态模型限制更严格
    tpm: 50000,
    retry_times: 2,
    timeout: 60000, // 60秒超时
    max_error_rate: 0.08,
    force_save_detail: true,
    plugin: {
      cache: {
        enable: true,
        ttl: 7200, // 缓存有效期2小时
        item_max_size: 128000,
        add_cache_hit_header: true,
        cache_hit_header: 'X-GPT4-Vision-Cache-Hit'
      },
      "web-search": {
        enable: true,
        force_search: false,
        max_results: 10,
        search_rewrite: {
          enable: true,
          model_name: 'gpt-4-vision-preview',
          timeout_millisecond: 15000,
          max_count: 1,
          add_rewrite_usage: true,
          rewrite_usage_field: 'vision_search_rewrite'
        },
        need_reference: true,
        reference_location: 'footnote',
        reference_format: 'html',
        default_language: 'en-US',
        prompt_template: '结合图片内容和搜索结果回答：{image_content}\n{search_results}',
        search_from: [
          {
            type: 'google',
            max_results: 6,
            spec: { api_key: 'mock-google-vision-key-aaa789', cx: 'vision-cx-321' } as GoogleSpec
          },
          {
            type: 'arxiv',
            max_results: 4,
            spec: {} as ArxivSpec
          }
        ]
      },
      "think-split": { enable: true }, // 支持复杂任务拆分
      "stream-fake": { enable: true }
    }
  },

  // 第3条：Anthropic Claude 3 Sonnet（文本模型，高上下文+工具调用）
  {
    config: {
      max_input_tokens: 200000,
      max_output_tokens: 4096,
      max_context_tokens: 200000,
      vision: false,
      tool_choice: true,
      support_formats: ['text/plain', 'application/json', 'text/markdown'],
      support_voices: []
    },
    created_at: 1779800000000,
    updated_at: 1780400000000,
    image_prices: null,
    model: 'claude-3-sonnet-20240229',
    owner: 'anthropic',
    type: 1,
    price: {
      input_price: 0.015,
      output_price: 0.03,
      per_request_price: 0.0008,
      cache_creation_price: 0.008,
      cache_creation_price_unit: 1000,
      cached_price: 0.004,
      cached_price_unit: 1000,
      web_search_price: 0.006,
      web_search_price_unit: 1
    },
    rpm: 500,
    tpm: 150000,
    retry_times: 3,
    timeout: 45000,
    max_error_rate: 0.05,
    force_save_detail: false,
    plugin: {
      cache: {
        enable: true,
        ttl: 86400, // 缓存有效期24小时
        item_max_size: 200000,
        add_cache_hit_header: false
      },
      "web-search": {
        enable: true,
        force_search: false,
        max_results: 7,
        search_rewrite: {
          enable: false // Claude自带搜索优化，关闭额外重写
        },
        need_reference: true,
        reference_location: 'inline',
        reference_format: 'text',
        default_language: 'zh-CN',
        prompt_template: '使用搜索信息回答，需标注来源：{search_results}',
        search_from: [
          {
            type: 'bing',
            max_results: 7,
            spec: { api_key: 'mock-bing-claude-key-zzz321' } as BingSpec
          }
        ]
      },
      "think-split": { enable: true }, // 支持长文本拆分思考
      "stream-fake": { enable: false } // 原生支持流式，无需伪装
    }
  },

  // 第4条：Google Gemini Pro（多模态模型，支持多格式输入）
  {
    config: {
      max_input_tokens: 32768,
      max_output_tokens: 8192,
      max_context_tokens: 32768,
      vision: true,
      tool_choice: true,
      support_formats: ['text/plain', 'application/json', 'image/png', 'image/jpeg', 'audio/mpeg'],
      support_voices: ['en-US-Standard-A', 'en-US-Standard-B', 'zh-CN-Standard-A']
    },
    created_at: 1780100000000,
    updated_at: 1780700000000,
    image_prices: [0.0015, 0.003],
    model: 'gemini-pro-1.5',
    owner: 'google',
    image_batch_size: 10,
    type: 2,
    price: {
      input_price: 0.008,
      output_price: 0.016,
      per_request_price: 0.0005,
      cache_creation_price: 0.004,
      cache_creation_price_unit: 1000,
      cached_price: 0.002,
      cached_price_unit: 1000,
      image_input_price: 0.0015,
      image_input_price_unit: 1024,
      image_output_price: 0.003,
    },
    rpm: 800,
    tpm: 80000,
    retry_times: 4,
    timeout: 50000,
    max_error_rate: 0.07,
    force_save_detail: true,
    plugin: {
      cache: {
        enable: true,
        ttl: 43200, // 12小时缓存
        item_max_size: 32768,
        add_cache_hit_header: true,
        cache_hit_header: 'X-Gemini-Cache'
      },
      "web-search": {
        enable: true,
        force_search: true, // 强制搜索最新信息
        max_results: 12,
        search_rewrite: {
          enable: true,
          model_name: 'gemini-pro',
          timeout_millisecond: 12000,
          max_count: 2,
          add_rewrite_usage: true,
          rewrite_usage_field: 'gemini_rewrite'
        },
        need_reference: false,
        default_language: 'zh-CN',
        prompt_template: '基于最新搜索结果回答：{search_results}',
        search_from: [
          {
            type: 'google',
            max_results: 8,
            spec: { api_key: 'mock-google-gemini-key-ccc456', cx: 'gemini-cx-654' } as GoogleSpec
          },
          {
            type: 'searchxng',
            max_results: 4,
            spec: { base_url: 'https://mock-searchxng-api.com/v1' } as SearchXNGSpec
          }
        ]
      },
      "think-split": { enable: true },
      "stream-fake": { enable: true }
    }
  },

  // 第5条：Meta Llama 3 8B（开源文本模型，轻量配置）
  {
    config: {
      max_input_tokens: 8192,
      max_output_tokens: 2048,
      max_context_tokens: 8192,
      vision: false,
      tool_choice: false, // 开源轻量模型不支持工具调用
      support_formats: ['text/plain'],
      support_voices: []
    },
    created_at: 1779500000000,
    updated_at: 1780300000000,
    image_prices: null,
    model: 'llama-3-8b-instruct',
    owner: 'meta',
    type: 3, // 3=开源模型
    price: {
      input_price: 0.0005, // 开源模型价格极低
      output_price: 0.001,
      per_request_price: 0.00005,
      // 开源模型不支持缓存和web搜索，不填对应价格字段
    },
    rpm: 2000, // 开源模型部署灵活，限制宽松
    tpm: 200000,
    retry_times: 2,
    timeout: 20000, // 20秒超时（轻量模型响应快）
    max_error_rate: 0.15, // 开源模型错误率略高
    force_save_detail: false,
    plugin: {
      cache: {
        enable: false, // 关闭缓存
      },
      "web-search": {
        enable: false, // 不支持web搜索
        search_from: []
      },
      "think-split": { enable: false }, // 不支持拆分思考
      "stream-fake": { enable: false } // 不支持流式伪装
    }
  }
];





//============================
export interface Channel {
    id: number
    type: number
    name: string
    key: string
    base_url?: string
    models: string[]
    model_mapping: Record<string, string> | null
    request_count: number
    status: number
    created_at: number
    priority: number
    balance?: number
    used_amount?: number
    sets?: string[]
}

export interface ChannelTypeMeta {
    name: string
    keyHelp: string
    defaultBaseUrl: string
}

export interface ChannelsResponse {
    channels: Channel[]
    total: number
}

// 模拟5条ChannelTypeMeta数据（渠道类型元信息，对应不同渠道类型的配置说明）
export const mockChannelTypeMetas: ChannelTypeMeta[] = [
  // 1. 官方API渠道类型
  {
    name: "官方API渠道",
    keyHelp: "平台分配的官方API密钥（需在官方控制台申请）",
    defaultBaseUrl: "https://api.official-model-platform.com/v1"
  },
  // 2. 第三方代理渠道类型
  {
    name: "第三方代理渠道",
    keyHelp: "代理服务商提供的授权密钥（联系代理获取）",
    defaultBaseUrl: "https://proxy.model-service.com/api/v2"
  },
  // 3. 自建部署渠道类型
  {
    name: "自建部署渠道",
    keyHelp: "自建模型服务的访问密钥（本地部署服务配置）",
    defaultBaseUrl: "http://self-hosted-model-server:8080/v1"
  },
  // 4. 企业私有渠道类型
  {
    name: "企业私有渠道",
    keyHelp: "企业内部授权密钥（仅限企业内网使用）",
    defaultBaseUrl: "https://internal.model.corp.com/v1"
  },
  // 5. 测试专用渠道类型
  {
    name: "测试专用渠道",
    keyHelp: "测试环境临时密钥（有效期7天，仅用于联调测试）",
    defaultBaseUrl: "https://test.model-platform.com/v1"
  }
];

// 模拟ChannelsResponse数据（包含5条Channel，total=5）
export const mockChannelsResponse: ChannelsResponse = {
  total: 5,
  channels: [
    // 第1条：OpenAI官方渠道（type=1，对应官方API渠道类型）
    {
      id: 1001,
      type: 1,
      name: "OpenAI官方渠道",
      key: "openai-official-ak-87654321",
      base_url: "https://api.openai.com/v1", // 覆盖默认baseUrl
      models: ["gpt-3.5-turbo", "gpt-4", "gpt-4-vision-preview"],
      model_mapping: null, // 官方渠道无需模型映射
      request_count: 89200, // 高使用量
      status: 1, // 1=启用状态
      created_at: 1779000000000, // 2025-09-14
      priority: 8, // 高优先级
      balance: 5000.00, // 剩余余额
      used_amount: 12890.56, // 已使用金额
      sets: ["prod-set-1", "global-set"] // 关联的配置集
    },
    // 第2条：第三方代理-Claude渠道（type=2，对应第三方代理渠道类型）
    {
      id: 1002,
      type: 2,
      name: "Anthropic代理渠道",
      key: "anthropic-proxy-sk-12345678",
      base_url: "https://proxy.anthropic-api.com/v2",
      models: ["claude-3-sonnet-20240229", "claude-3-opus-20240229"],
      model_mapping: {
        "claude-3-sonnet": "claude-3-sonnet-20240229-proxy",
        "claude-3-opus": "claude-3-opus-20240229-proxy"
      }, // 代理渠道模型名称映射
      request_count: 45600, // 中等使用量
      status: 1,
      created_at: 1779500000000, // 2025-09-19
      priority: 6,
      balance: 3000.00,
      used_amount: 8765.32,
      sets: ["prod-set-2", "cn-set"]
    },
    // 第3条：自建Llama渠道（type=3，对应自建部署渠道类型）
    {
      id: 1003,
      type: 3,
      name: "自建Llama-3渠道",
      key: "self-hosted-llama-sk-987654",
      base_url: "http://192.168.1.100:8080/v1", // 内网地址
      models: ["llama-3-8b-instruct", "llama-3-70b-instruct"],
      model_mapping: null,
      request_count: 23100, // 较低使用量（内部测试用）
      status: 1,
      created_at: 1780000000000, // 2025-09-24
      priority: 4,
      balance: 1123.45, // 自建渠道无余额概念
      used_amount: 321,
      sets: ["test-set-1", "internal-set"]
    },
    // 第4条：企业私有Gemini渠道（type=4，对应企业私有渠道类型）
    {
      id: 1004,
      type: 4,
      name: "企业私有Gemini渠道",
      key: "corp-gemini-ak-456789",
      base_url: "https://internal.gemini.corp.com/v1",
      models: ["gemini-pro-1.5", "gemini-ultra"],
      model_mapping: {
        "gemini-pro": "gemini-pro-1.5-corp",
        "gemini-ultra": "gemini-ultra-corp"
      },
      request_count: 67800, // 高使用量（企业内部核心业务）
      status: 1,
      created_at: 1778500000000, // 2025-09-09
      priority: 9, // 最高优先级
      balance: 10000.00,
      used_amount: 23456.78,
      sets: ["corp-set-1", "core-business-set"]
    },
    // 第5条：测试专用渠道（type=5，对应测试专用渠道类型）
    {
      id: 1005,
      type: 5,
      name: "模型测试专用渠道",
      key: "test-channel-sk-112233",
      base_url: "https://test.model-platform.com/v1",
      models: ["gpt-3.5-turbo", "llama-3-8b-instruct", "gemini-pro"],
      model_mapping: null,
      request_count: 9500, // 低使用量（测试用）
      status: 2, // 2=禁用状态（测试结束）
      created_at: 1778000000000, // 2025-09-04
      priority: 2, // 低优先级
      balance: 500.00,
      used_amount: 320.45,
      sets: ["test-set-2", "temp-set"]
    }
  ]
};

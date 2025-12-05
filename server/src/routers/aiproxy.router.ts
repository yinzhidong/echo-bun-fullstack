import { Hono } from 'hono'
import { jsonOK } from '@/utils/tools'
import { mockChannelsResponse, mockChannelTypeMetas, mockDashboardDataList, mockModelConfigList } from '@/services/aiproxy.mock.service';


// https://github.com/yinzhidong/laf-simple-waf
// https://github.com/labring/aiproxy
// https://github.com/labring/RuiQi
// https://github.com/HUAHUAI23/simple-web

// /Users/yinzhidong/echoPros/sassPros/aiproxy/web

const aiProxyRouter = new Hono()


aiProxyRouter.get("/dashboard/", (c) => {
    return c.json(jsonOK(mockDashboardDataList))
});


aiProxyRouter.get("/model_configs/all", (c) => {
    return c.json(jsonOK(mockModelConfigList))
});



aiProxyRouter.get("/channels/type_metas", (c) => {
    return c.json(jsonOK(mockChannelTypeMetas))
});



aiProxyRouter.get("/channels/search", (c) => {
    return c.json(jsonOK(mockChannelsResponse))
});

export default aiProxyRouter

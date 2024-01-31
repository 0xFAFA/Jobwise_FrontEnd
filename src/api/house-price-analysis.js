import request from '@/utils/request'

// 获取城市房价原始与预测数据
export const housePriceAnalysis = () => request.get('/house-price-analysis')

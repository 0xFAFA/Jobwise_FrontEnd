import request from '@/utils/request'

// 获取城市就业失业人数数据
export const employmentUnemploymentNumAnalysis = () => request.get('/employment-unemployment-num-analysis')

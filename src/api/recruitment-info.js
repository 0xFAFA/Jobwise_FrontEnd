import request from '@/utils/request'

// 获取招聘岗位整体情况分析数据
export const jobRecruitmentOverallAnalysis = () => request.get('/recruitment-info/job-recruitment-overall-analysis')

// 获取招聘岗位难度系数分析数据
export const difficultyCoefficientAnalysis = () => request.get('/recruitment-info/difficulty-coefficient-analysis')

// 获取招聘岗位关键词热度分析数据
export const keywordHeatAnalysis = () => request.get('/recruitment-info/keyword-heat-analysis')


// 获取招聘岗位薪资水平分布分析数据
export const salaryDistributionAnalysis = () => request.get('/recruitment-info/salary-distribution-analysis')

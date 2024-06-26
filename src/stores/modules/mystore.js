import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { jobRecruitmentOverallAnalysis,difficultyCoefficientAnalysis,keywordHeatAnalysis,salaryDistributionAnalysis } from '@/api/recruitment-info'
import { employmentUnemploymentNumAnalysis } from '@/api/employment-unemployment-num-analysis'
import { housePriceAnalysis } from '@/api/house-price-analysis'
import { llmAssistant } from '@/api/llm-assistant'

export const MyDataStore = defineStore('mystore', () => {


  const JobRecruitmentOverallAnalysisData = ref({})
  
  const getJobRecruitmentOverallAnalysis = async () => {

    if ( JobRecruitmentOverallAnalysisData.value['city_name_list'] === undefined ) {
      console.log('请求招聘岗位整体情况分析数据')
      const res= await jobRecruitmentOverallAnalysis()
      JobRecruitmentOverallAnalysisData.value = res.data.data
      // console.log(JobRecruitmentOverallAnalysisData.value['city_name_list'])
    }
    
  }


  const DifficultyCoefficientAnalysisData=ref({})

  const getDifficultyCoefficientAnalysis = async () => {

    if ( DifficultyCoefficientAnalysisData.value['difficulty'] === undefined ) {
      console.log('请求招聘岗位难度系数分析数据')
      const res= await difficultyCoefficientAnalysis()
      DifficultyCoefficientAnalysisData.value = res.data.data
      // console.log(DifficultyCoefficientAnalysisData.value['difficulty'])
    }
    
  }


  const KeywordHeatAnalysisData=ref({})
  const getKeywordHeatAnalysis = async () => {

    if ( KeywordHeatAnalysisData.value['com_name_frequency'] === undefined ) {
      console.log('请求招聘岗位关键词热度分析数据')
      const res= await keywordHeatAnalysis()
      KeywordHeatAnalysisData.value = res.data.data
      // console.log(KeywordHeatAnalysisData.value['com_name_frequency'])
    }
    
  }


  const SalaryDistributionAnalysisData=ref([])
  const getSalaryDistributionAnalysis = async () => {
    if ( SalaryDistributionAnalysisData.value[0] === undefined ) {
      console.log('请求招聘岗位薪资水平分布数据')
      const res= await salaryDistributionAnalysis()
      SalaryDistributionAnalysisData.value = res.data.data
      // console.log(SalaryDistributionAnalysisData.value[0])
    }
    
  }


  const EmploymentUnemploymentNumAnalysisData=ref({})
  const getEmploymentUnemploymentNumAnalysis = async () => {
    if ( EmploymentUnemploymentNumAnalysisData.value['EmploymentNumAnalysis'] === undefined ) {
      console.log('请求城市就业失业人数分析数据')
      const res= await employmentUnemploymentNumAnalysis()
      EmploymentUnemploymentNumAnalysisData.value = res.data.data
      // console.log(EmploymentUnemploymentNumAnalysisData.value['EmploymentNumAnalysis'])
    }
    
  }


  const HousePriceAnalysisData=ref({})
  const getHousePriceAnalysis = async () => {
    if ( HousePriceAnalysisData.value['time_label'] === undefined ) {
      console.log('请求城市房价原始与预测分析数据')
      const res= await housePriceAnalysis()
      HousePriceAnalysisData.value = res.data.data
      // console.log(HousePriceAnalysisData.value['time_label'])
    }
    
  }


  const LLMAssistantData=ref([
      {
        role: 'user',
        content: '你好，品客' 
      },

      {
        role: 'assistant',
        content: '您好，我是大模型择业助手，你可以向我咨询任何和择业相关的问题（如：行业前景、发展、薪资、建议。。。），人多或者答案较长时，可能会有延迟' 
      },

    ])

  const addUserMessage = (sent_data) => {

    LLMAssistantData.value.push({
      role: 'user',
      content: sent_data
    })
  }
  const getLLMAssistant = async (sent_data) => {
    console.log('请求大模型响应数据')


    const res= await llmAssistant(sent_data)
    const content=res.data.data

    LLMAssistantData.value.push({
      role: 'assistant',
      content: content
    })

    console.log(content)
  
    
  }


  return { 
    JobRecruitmentOverallAnalysisData, getJobRecruitmentOverallAnalysis, 
    DifficultyCoefficientAnalysisData, getDifficultyCoefficientAnalysis,
    KeywordHeatAnalysisData, getKeywordHeatAnalysis,
    SalaryDistributionAnalysisData, getSalaryDistributionAnalysis,
    EmploymentUnemploymentNumAnalysisData, getEmploymentUnemploymentNumAnalysis,
    HousePriceAnalysisData, getHousePriceAnalysis,
    LLMAssistantData, getLLMAssistant,addUserMessage}
})

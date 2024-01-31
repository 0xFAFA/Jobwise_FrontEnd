import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

import MainContent from '@/views/MainContent.vue'
import JobRecruitmentOverallAnalysis from '@/views/JobRecruitmentOverallAnalysis.vue'
import DifficultyCoefficientAnalysis from '@/views/DifficultyCoefficientAnalysis.vue'
import KeywordHeatAnalysis from '@/views/KeywordHeatAnalysis.vue'
import SalaryDistributionAnalysis from '@/views/SalaryDistributionAnalysis.vue'
import HousePriceAnalysis from '@/views/HousePriceAnalysis.vue'
import EmploymentNumAnalysis from '@/views/EmploymentNumAnalysis.vue'
import UnemploymentNumAnalysis from '@/views/UnemploymentNumAnalysis.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainContent,
      redirect: '/recruitment-info',
      children:[
        {
          path: '/recruitment-info',
          redirect: '/recruitment-info/job-recruitment-overall-analysis',
          children:[
            {
              path: '/recruitment-info/job-recruitment-overall-analysis',
              component: JobRecruitmentOverallAnalysis,
            },
            {
              path: '/recruitment-info/difficulty-coefficient-analysis',
              component: DifficultyCoefficientAnalysis,
            },
            {
              path: '/recruitment-info/keyword-heat-analysis',
              component: KeywordHeatAnalysis,
            },
            {
              path: '/recruitment-info/salary-distribution-analysis',
              component: SalaryDistributionAnalysis,
            },

            
          ]

        },

        {
          path: '/employment-unemployment-num-analysis',
          
          redirect: '/employment-unemployment-num-analysis/employment-num-analysis',
          children:[
            {
              path: '/employment-unemployment-num-analysis/employment-num-analysis',
              component: EmploymentNumAnalysis ,
            },
            {
              path: '/employment-unemployment-num-analysis/unemployment-num-analysis',
              component: UnemploymentNumAnalysis ,
            },
            
          ]

        },

        {
          path: '/house-price-analysis',
          component:  HousePriceAnalysis ,
        }
        
        
        
      ]

    },

  ]
})

export default router
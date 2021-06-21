<template>
<div class="dashboard_index">
  
    <div class="p-10 text-blue-800 grid grid-cols-3 gap-3 grid-rows-3">
     
      <n-card class="col-start-1 col-span-3 rounded">Message d'accueil</n-card>
      <n-card class="rounded p-5 flex align-middle">
        <n-statistic class="m-auto" label="Active Bots"><span style="font-size:2em;">1</span></n-statistic>
      </n-card>
      <n-card class="row-span-3 rounded p-5">News</n-card>
      <n-card class="row-span-3 rounded relative" style="height:450px; border:none;">
        <n-layout position="absolute" :native-scrollbar="false" style="height:100%" content-style="padding:15px 0">
          <div class="flex justify-center">
              <div class="max-w-md w-full p-4 py-6">

                <div class="text-gray-600 my-0 text-center">
                  <n-icon>
                    <ReOrderDotsVertical16Regular />
                  </n-icon>
                </div>
                <div class="text-xs uppercase text-gray-400 tracking-wider text-center leading-none">Dimanche 20 Juin 2021 : <span class="font-bold text-sm">FEATURES</span></div>
                <div class="block bg-white shadow-xl rounded-lg overflow-hidden  my-5" v-for="(update, index) in 5" :key="index">
                  <div class="bg-cover bg-center h-16 p-4 flex justify-end items-center bg-top" style="background-image: url(/img/headerCardBG.jpg)">
                    <p class="text-3xl w-full text-white truncate opacity-75 hover:opacity-100 cursor-default">Mise à jour importante blabla</p>
                    <p class="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">UPDATE</p>
                  </div>
                  <div class="p-4 text-gray-700 flex justify-between ">
                    <div>
                      <p class="text-3xl text-gray-900">{{update}}<span class="text-lg text-gray-500">/ 5</span></p>
                      <p class="text-sm w-full">Mise à jour importante des données relatives à la conception de la base de l'api, nous mettons en place une configuration plus detaillée.</p>

                    </div>
                  </div>
                  <div class="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
                    <div class="flex items-center">
                      <n-icon :size="18">
                        <Bug16Filled />
                      </n-icon>
                      <p><span class="text-gray-900 font-bold">7</span> <span class="text-sm">FIX</span></p>
                    </div>
                    <div class="flex items-center">
                      <n-icon :size="18">
                        <DataHistogram24Regular />
                      </n-icon>
                      <p><span class="text-gray-900 font-bold">80%</span> <span class="text-sm">Coverage</span></p>
                    </div>
                    <div class="flex items-center">
                      <span class="text-green-400">
                        <n-icon :size="22">
                          <Checkmark24Regular />
                        </n-icon>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-gray-600 my-3 text-center">
                  <n-icon>
                    <ReOrderDotsVertical16Regular />
                  </n-icon>
                </div>


              </div>
          </div>
        </n-layout>
      </n-card>
      <n-card class="row-span-2 rounded p-5">Uptime</n-card>
      <n-card class="col-span-3 rounded p-5">Footer</n-card>
    </div>
</div>
</template>

<script>
import {
  NH2,
  NCard,
  NSpace,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NIcon,
  NStatistic
} from 'naive-ui'
import { ReOrderDotsVertical16Regular, Checkmark24Regular,Bug16Filled,Link48Regular,DataHistogram24Regular } from '@vicons/fluent'
export default {
  name: 'Test',
  layout: 'dashboard',
  components: {
    NH2,
    NCard,
    NSpace,
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NIcon,
    NStatistic,
    // Icons: 
    ReOrderDotsVertical16Regular,
    Checkmark24Regular,
    Bug16Filled,
    Link48Regular,
    DataHistogram24Regular

  },

}
</script>
<style lang="scss" scoped>
.dashboard_index {
  position:relative;
  max-width: 1200px;
  margin: auto;
}
</style>

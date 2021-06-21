<template>
  <div class="settings">
    <n-h2>{{ $t('dashboard.server.settings_title') }}</n-h2>
    <n-list bordered>
      <n-list-item v-for="test in 20" :key="test">
        <template #suffix>
          <n-switch v-model:value="botOptions.active" />
        </template>
        <n-thing title="Nom de l'option" description="description" />
      </n-list-item>
      <n-list-item>
        <template #suffix>
          <n-input class="inputOption" v-model:value="botOptions.botTrigger" type="input" placeholder="!" />
        </template>
        <n-thing title="Nom de l'option" description="description" />
      </n-list-item>
    </n-list>

    <transition name="drop-bottom">
      <div id="save_modifications" v-if="botOptions.active">
        <n-list bordered>
          <n-list-item>
            <template #suffix>
              <n-space class="btn_wrapper">
                <n-button class="resetBtn" text>{{$t('utils.reset')}}</n-button>  
                <n-button type="success">{{$t('utils.save')}}</n-button>
              </n-space>
            </template>
            <n-thing :title="$t('utils.save')" :description="$t('utils.save_message')" />
          </n-list-item>
        </n-list>
      </div>
    </transition>
  </div>
</template>
<script>
import { NH2, NList, NListItem, NThing, NSwitch, NButton, NSpace, NInput } from 'naive-ui'
export default {
  name: 'settings',
  layout: 'dashboard',
  components: {
    NH2,
    NList,
    NListItem,
    NThing,
    NSwitch,
    NButton,
    NSpace,
    NInput
  },
  data() {
    return {
      botOptions: {
        botTrigger: "!",
        active: false
      }
    }
  }
  
}
</script>
<style lang="scss" scoped>
.settings {
  max-width:1200px;
  margin:auto;
  .inputOption {
    width: 50px;
  }
}



.dark {
  #save_modifications {
    background: #17171C;
    box-shadow: 0 0 5px 3px rgba(#17171C, 5%);
  }
}
.light {
  #save_modifications {
    background: #FAFAFC;
    box-shadow: 0 0 5px 3px rgba(#FAFAFC, 5%);
  }
}

#save_modifications {
  position:sticky;
  width:calc(100% - 20px); 
  height: auto;
  min-height: 80px;
  border-radius: 5px;
  bottom: 24px;
  margin: 55px auto;
  .btn_wrapper {
    width: max-content;
    .resetBtn {
      padding: 9px 0px;
      margin: auto 24px;
      &:hover {
        color:#e74c3c;
      }
    }
  }
}

.drop-bottom-enter-active,
.drop-bottom-leave-active,
.drop-bottom-left-enter-active,
.drop-bottom-left-leave-active,
.drop-bottom-right-enter-active,
.drop-bottom-right-leave-active {
  transition: all 0.15s;
  transform: translateY(0px);
}

.drop-bottom-enter-from,
.drop-bottom-leave-to,
.drop-bottom-left-enter-from,
.drop-bottom-left-leave-to,
.drop-bottom-right-enter-from,
.drop-bottom-right-leave-to {
  transition: all 0.15s;
  transform: translateY(6px);
  opacity: 0;
}
</style>

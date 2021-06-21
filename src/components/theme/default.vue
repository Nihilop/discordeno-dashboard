<template>
  <n-config-provider :theme="globalTheme">
    <n-global-style />
    
    <n-layout position="absolute" :native-scrollbar="false" style="height:100vh;">
      <n-layout-header style="background:transparent">
        <header class="headBar" >
          <headerBar class="navigation" />
          
          <div class="rightNav">
            <n-space :size="40" class="rightNav--item">
              
              <n-button class="toggleColorTheme" text @click="globalTheme == null ? globalTheme = darkTheme : globalTheme = null">
                <n-icon :size="18" style="padding:13px 0" >
                  <WeatherSunny24Filled v-if="globalTheme"/>
                  <WeatherMoon24Filled v-else />
                </n-icon>
              </n-button>
              <div class="langOptions">
                <n-popselect v-model:value="$i18n.locale" trigger="click" placement="bottom-center" :options="langOptions" :render-label="renderLabel">
                  <n-tag ><country-flag :country="$i18n.locale == 'en' ? 'gb' : $i18n.locale" size='small'/></n-tag>
                </n-popselect>
              </div>
              <div class="userInfo">
                <button class="white-button" v-if="!isLogged" @click="loginLink">
                  <n-icon :size="18"  v-if="windowsWidth <= 400">
                    <PersonVoice24Regular style="margin:12px auto"/>
                  </n-icon>
                  <span v-else>{{ $t('utils.login') }}</span>
                </button>
                <n-dropdown @select="handleSelect" trigger="click" placement="bottom-start" :options="userOptions">
                  <button class="blue-button" v-if="isActive"><n-avatar :size="22" style="margin: auto 5px auto auto;" :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`" /> {{ windowsWidth >= 400 ? user.username : null}}</button>
                </n-dropdown>
              </div>
            </n-space>
          </div>
        </header>
      </n-layout-header>
      <n-layout-content class="headerStyle" :class="globalTheme == null ? '' : 'themeDark'">
        <div style="max-width:1024px; margin: 80px auto; z-index:1">
          <hero style="position:relative; margin: 20% auto;" />
          <features style="margin: 180px auto;" :items="featuresItem" />
        </div>
        
      </n-layout-content>
      <n-layout-footer>
        <footer-block />
      </n-layout-footer> 
    </n-layout>
  </n-config-provider>
</template>
<script>
import { defineComponent, onMounted, ref, h, resolveComponent } from 'vue'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter, NConfigProvider, NGlobalStyle, darkTheme, NButton, NModal, NCard, NSpace, NIcon, NAvatar, NDropdown, NPopselect, NTag } from 'naive-ui'
import { WeatherSunny24Filled, WeatherMoon24Filled, PersonVoice24Regular } from '@vicons/fluent'

import router from '@/router'
import { getDiscordUser } from '@/utils/discord'
import { useI18n } from 'vue-i18n'
import headerBar from '@/components/landing/Header.vue'
import features from '@/components/landing/Features.vue'
import hero from '@/components/landing/Hero.vue'
import footerBlock from '@/components/landing/Footer.vue'
const config = require('../../../settings.json')

export default defineComponent({
  components: {
    //Component: 
    headerBar,
    features,
    hero,
    footerBlock,
    // Framework UI:
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NConfigProvider,
    NButton,
    NGlobalStyle,
    NModal,
    NSpace,
    NCard,
    NIcon,
    NAvatar,
    NDropdown,
    NPopselect,
    NTag,
    // Icons:
    WeatherSunny24Filled,
    WeatherMoon24Filled,
    PersonVoice24Regular
  },
  data() {
    return {
      langOptions: []
    }
  },
  mounted() {
    
    this.$i18n.availableLocales.forEach(lang => {
      
        const langOptions = {
          label: lang,
          value: lang,
          disabled: false
        }
        this.langOptions.push(langOptions)
      
    })
    console.log(this.langOptions)
  },
  setup () {
    const user = ref(null)
    const isActive = ref(false)
    const windowsWidth = ref(window.innerWidth)
    const { t } = useI18n({ useScope: 'global' })
    onMounted(() => {
      window.onresize = () => { windowsWidth.value = window.innerWidth}
      console.log(config)
      if(localStorage.accessToken)
        getUserDiscordName()
    })

    function isLoaded () { isActive.value = true }

    function loginLink() {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${config.client_id}&redirect_uri=${config.redirectUri}&response_type=code&scope=identify%20guilds`
    }
    function disconnect() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/')
    }

    async function getUserDiscordName() {
      const res = await getDiscordUser(localStorage.accessToken)
      console.log(res)
      user.value = res
      isLoaded()
    }
    return {
      windowsWidth,
      isLogged: localStorage.accessToken ? true : false,
      user,
      isActive,
      loginLink,
      darkTheme,
      goDash() {router.push({path:'/dashboard'})},
      globalTheme: ref(null),
      renderLabel: (options) => {
        return [
          h(resolveComponent('country-flag'), { style:"display:block; height:100%; margin: 0 5px ; padding:auto 0", country: options.value === 'en' ? 'gb' : options.value, size: 'normal' } ),
          // options.label
        ]
      },
      featuresItem: [
        {id: 0, name:"feature 1", description:"i'm a description"},
        {id: 1, name:"feature 2", description:"i'm a description"},
        {id: 2, name:"feature 3", description:"i'm a description"},
        {id: 3, name:"feature 4", description:"i'm a description"},
        {id: 4, name:"feature 5", description:"i'm a description"},
        {id: 5, name:"feature 6", description:"i'm a description"},
      ],
      userOptions: [
        {
          label: "Dashboard",
          key: "dashboard"
        },
        {
          label: t('utils.settings'),
          key: "settings"
        },
        {
          label: t('utils.disconnect'),
          key: 'disconnect'
        }
      ],
      handleSelect (key) {
        if(key == "dashboard") {
          router.push('/' + key)
        } if(key == "disconnect") {
          disconnect()
        } if (key == "settings"){
          router.push('/user/me')
        }
        
      },
    }
  },
})
</script>
<style lang="scss">
.n-tag {
  --border:none !important
}
</style>
<style lang="scss" scoped>
  
@import '@/assets/style/variables.scss';

  .headerStyle {
  position:relative;
  &.themeDark {
    &:before {
      background:$backgroundDark-secondary;
    }
  }
  &:before {
    position:absolute;
    content:'';
    width:200%;
    top:50vh;
    left:-50%;
    height: 60vh;
    background:$backgroundLight-secondary;
    transform:rotate(-10deg);
    z-index: 0;
  }
}
.headBar {
  width:100%;
  max-width:1024px;
  margin:auto;
  height:80px;
  padding: 0 24px;
  box-shadow: border-box;
  display:flex;
  vertical-align:middle;
  .navigation {
    margin: auto auto auto 0;
  }
  .rightNav{
    margin:auto 0 auto auto;
    display: flex;
    vertical-align: middle;
    .langOptions {
      margin-top:8px;
    }
    .userInfo {
      .white-button,
      .blue-button {
        display: flex;
        vertical-align: middle;
        text-align: center;
        font-family: Whitney, "Open Sans", Helvetica, sans-serif;
        font-weight: 400;
        font-size: 11pt;
        border-radius: 3px;
        cursor: pointer;
        height: 45px;
        line-height: 40px;
        padding: 0 18px;
        width: fit-content;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
      }
      .blue-button {
        background-color: #7289da;
        border: 2px solid #7289da;
        color: #fff;
      }

      .white-button {
        background-color: #fff;
        border: 2px solid #fff;
        color: #000;
      }
    }
  }
}
</style>
<template>
  <n-config-provider :theme="globalTheme">
    <n-global-style />

    <n-layout-header class="titlebar" position="absolute" :style="`height:${titlebarHeight}px;`" v-if="isElectron">
      titlebar for Electron
    </n-layout-header>

    <n-layout :class="globalTheme ? 'dark' : 'light'" has-sider position="absolute" :style="isElectron ? `top:${titlebarHeight}px;` : null">

      <n-layout-sider class="sidebarL_servers" :class="$route.name == 'dashboard' ? 'homeBot' : null" :width="80" :native-scrollbar="false">

        <n-popover :overlap="false" placement="right" trigger="hover" v-for="guild in hasPerm" :key="guild.id" > <!-- hasPerm -->
          <template #trigger>
            <a class="guildLink" exact :href="`/dashboard/${guild.id}/overview`" @click="selectedGuild(guild)">
              <img v-if="guild.icon" :src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`">
              <img v-else src="https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.png">
            </a>
          </template>
          <div class="large-text">{{guild.name}}</div>
        </n-popover>
       
        <div class="themeToggle" :class="hasPerm.length > 10 ? 'themeToggle-bg themeStatix' : null">
          <n-button text @click="globalTheme == null ? globalTheme = darkTheme : globalTheme = null">
            <n-icon :size="24">
              <WeatherSunny24Filled v-if="globalTheme"/>
              <WeatherMoon24Filled v-else />
            </n-icon>
          </n-button>
        </div>
      </n-layout-sider>

      <n-layout-sider v-if="$route.name != 'dashboard'" class="sidebarL_options" :width="300" :native-scrollbar="false">
        <BotMenu />
      </n-layout-sider>

      <n-layout-header class="headerbar" position="static" style="height:50px;">
        <page-header>
          <n-space>
            <n-dropdown @select="handleSelect" trigger="click" placement="bottom-end" :options="userOptions">
              <n-button :keyboard="false" text style="padding-top:6px">
                Bonjour, <n-avatar v-if="isActive" :size="22" style="margin: auto 5px" :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`" /> {{ user.username }}
              </n-button>
            </n-dropdown>
            
            <n-button text @click="panels.sidebarR = !panels.sidebarR">
              <n-icon :size="24"  style="margin-top:4px;">
                <DockPanelRight28Filled v-if="!panels.sidebarR" />
                <Dismiss16Regular v-else />
              </n-icon>
            </n-button>
            
            
          </n-space>
          
        </page-header>
      </n-layout-header>

      <n-layout position="absolute" style="top: 50px;" :style="$route.name == 'dashboard' ? 'left:80px' : 'left:380px' " ref="container" :native-scrollbar="false">

        <n-layout has-sider position="absolute">

          <n-layout-content :native-scrollbar="false" content-style="padding: 24px;">
            <router-view/>
          </n-layout-content>

          <n-layout-sider v-show="panels.sidebarR" class="sidebarR" :width="300" :native-scrollbar="false">
            <sidebarRContent />
          </n-layout-sider>

        </n-layout>

      </n-layout>
    </n-layout>
  </n-config-provider>
</template>
<script>
import { defineComponent, ref, onMounted, computed} from 'vue'
import { NLayout, NLayoutContent, NLayoutSider, NLayoutHeader, NConfigProvider, NGlobalStyle, darkTheme, NButton, NH2, NIcon, NSpace, NPopover, NDropdown, NAvatar } from 'naive-ui'
import { WeatherSunny24Filled, WeatherMoon24Filled, Dismiss16Regular, DockPanelRight28Filled, Settings28Filled } from '@vicons/fluent'

// Components

import PageHeader from '@/components/dashboard/pageHeader.vue'
import sidebarRContent from '@/components/dashboard/sidebarR.vue'
import BotMenu from '@/components/dashboard/botMenu.vue'
import { getDiscordGuilds, getDiscordUser } from '@/utils/discord'
import router from '@/router'
import { useRoute } from 'vue-router'
import {useStore} from 'vuex'
import { useI18n } from 'vue-i18n'


export default defineComponent({
  components: {
    // Components:
    PageHeader,
    sidebarRContent,
    BotMenu,
    // NaiveUI:
    NLayout,
    NLayoutContent,
    NLayoutSider,
    NLayoutHeader,
    NConfigProvider,
    NButton,
    NGlobalStyle,
    NH2,
    NIcon,
    NSpace,
    NPopover,
    NDropdown,
    NAvatar,
    // Icons:
    WeatherSunny24Filled,
    WeatherMoon24Filled,
    Dismiss16Regular,
    DockPanelRight28Filled,
    Settings28Filled
  },
  data () {
    return {
      panels: {
        sidebarR: false
      }
    }
  },
  setup () {
    // Options for electron titlebar
    const store = useStore() 
    const titlebarHeight = ref(24)
    const isElectron = ref(false)
    const route = useRoute()
    const isActive = ref(false)
    const user = computed(() => store.state.user)
    const windowsWidth = ref(window.innerWidth)
    const { t } = useI18n({ useScope: 'global' })

    // Changer ça pour que ça filtre le bordel direct à la récup des données API pour éviter de store TOUTES les guilds
    const hasPerm = computed(() => {
      return store.state.guilds.filter(elem => {
        return elem.permissions === "137438953471"
      })
    });
    
    onMounted(() => {
      window.onresize = () => { windowsWidth.value = window.innerWidth}
      if(localStorage.accessToken) {
        getGuilds()
        getUsername()        
      } else {
        router.push('/login')
      }
      
    })

    function isLoaded () { isActive.value = true }

    async function selectedGuild(guild) {
      console.log(guild)
      await store.dispatch('SELECTED_GUILD', guild)
    }
    async function getGuilds() {
      const res = await getDiscordGuilds(localStorage.accessToken)
      // console.log(res)
      store.dispatch('GUILDS', res)
      res.forEach(item => {
        if(item.id == route.params.guild)
          store.dispatch('SELECTED_GUILD', item)
        else 
          return
          // router.push({path: '/dashboard'})
      })
    }
    async function getUsername() {
      const res = await getDiscordUser(localStorage.accessToken)
      // console.log(res)
      store.dispatch('USERNAME', res)
      isLoaded()
    }
    
    function disconnect() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/')
    }

    return {
      windowsWidth,
      isElectron,
      hasPerm,
      user,
      titlebarHeight,
      darkTheme,
      globalTheme: ref(darkTheme),
      selectedGuild,
      isActive,
      userOptions: [
        {
          label: t('utils.profile'),
          key: "me"
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
        if(key == "disconnect") {
          disconnect()
        } else {
          router.push('/user/' + key)
        }
        
      },
    }
  }
})
</script>
<style lang="scss">
@import '@/assets/style/variables.scss';
@import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.9.5/tailwind.min.css';
  .titlebar {
    background-color:#202225;
  }
  .sidebarR {
    background-color:transparent;
    height: 100%;
    .close_sidebarR {
      position:absolute;
      opacity: 0.5;
      top: 0;
      left: 10px;
      &:hover {
        opacity: 1;
      }
    }
  }
  .headerbar {
    display:flex;
    background-color:transparent;
    //border-bottom: 1px solid rgba(gray, 10%);
  }
  .sidebarL_servers {
    transition: all 0.5s;
  }
  .dark {
    .sidebarL_servers{
      background-color: $backgroundDark;
    }
    .sidebarL_options {
      background-color:$backgroundDark-secondary;
    }
    .themeToggle-bg {
      background-color: $backgroundDark;
    }
    .homeBot {
      background-color:$backgroundDark-secondary;
    }
  }
  .light {
    .sidebarL_servers{
      background-color: $backgroundLight;
    }
    .sidebarL_options {
      background-color:$backgroundLight-secondary;
    }
    .themeToggle-bg {
      background-color: $backgroundLight;
    }
    .homeBot {
      background-color:$backgroundLight-secondary;
    }
  }
  .themeToggle {
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    height:80px;
    text-align:center;
    display:flex;
    vertical-align: middle;
    > button {
      margin:auto;
    }
    &.themeStatix {
      position:sticky !important;
    }
  }
  .n-popover {
    margin-top:15px !important;
  }
  .guildLink {
    background: rgba(34,34,34,0.5);
    display: flex;
    flex-direction: column; 
    margin:12px auto;
    width:40px;
    height: 40px;
    transition:all 0.5s;
    border-radius: 100%;
    text-decoration: none;
    color:inherit;
 
    &.router-link-exact-active {
      position:relative;
      &:after {
        position:absolute;
        content: '';
        left:calc(-100% + 20px);
        width: 3px;
        height: 100%;
        border-radius:3px;
        z-index: 1;
        background:#7289da;
      }
    }
   
    
    &:first-child {
      margin-top: 24px;
    }
    > img {
      max-width: 100%;
      border-radius: 100%;
      margin:auto;
    }
  }
</style>

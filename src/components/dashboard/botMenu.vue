<template>
<div class="botOptions h-full">
  <!-- <div class="flex flex-col items-center w-full h-full overflow-hidden text-gray-400 mt-8">
		<a class="flex items-center w-full px-5 mt-3" href="#" >
			<svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
			<span class="ml-2 text-sm font-bold uppercase font-extralight">Configuration du bot</span>
		</a>
		<div class="w-full px-8">
			<div class="flex flex-col items-center w-full mt-3 ">
				<router-link v-for="(item, index) in 3" :key="index" class="flex items-center w-full h-10 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="#" @click="select(item.id)">
					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					<span class="pl-4 mt-1 w-full text-sm font-medium">Dasboard</span>
          <span class="w-2 h-2 text-sm rounded-full" :style="`background: ${status}`"></span>
				</router-link>
			</div>
		</div>
	</div> -->

  <n-menu v-if="isLoaded" :options="menuOptions" :default-expanded-keys="defaultExpandedKeys" @update:expanded-keys="handleUpdateExpandedKeys" />
</div>
</template>

<script>
import {
  h,
  resolveComponent,
  ref,
  onMounted,
  watch
} from 'vue';
import { NIcon, NMenu } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'


import {
  AppFolder20Filled as dashboardIcon,
  DataBarVertical24Filled as rankIcon,
  Settings20Filled as settingsIcon,
  Accessibility20Filled as helloWelIcon,
  Code24Filled as customCodeIcon,
  EmojiAdd20Filled as roleReactIcon,
  Shield24Filled as modeIcon,
  MusicNote216Filled as musicIcon
} from '@vicons/fluent'

function renderIcon(icon) {
  return () => h(NIcon, null, {
    default: () => h(icon)
  })
}

function renderLink(url, className, content) {
  return () => h(resolveComponent('router-link'), {
    to: url,
    class: className,
  }, {
    default: () => h('span', content)
  })
}

export default {
  components: {
    NMenu
  },
  setup() {
    const route = useRoute()
    const { t } = useI18n({ useScope: 'global' })
    const guildID = ref(null)
    const isLoaded = ref(false)
    onMounted(() => {

      guildID.value = route.params.guild
      console.log(guildID.value)
      isLoaded.value = true
    })
    watch(() => route.params.guild, (newRoute) => {
      isLoaded.value = false
      guildID.value = newRoute;
      console.log(guildID.value);
      isLoaded.value = true
    });
    return {
      status: 'red',
      guildID,
      isLoaded,
      menuOptions: [{
          label: 'Général',
          key: 'tab1',
          children: [{
              label: renderLink(`/dashboard/${route.params.guild}/overview`, 'server-item', t('dashboard.menu.overview')),
              key: 'overview',
              icon: renderIcon(dashboardIcon),
              disabled: false
            },
            {
              label: renderLink(`/dashboard/${route.params.guild}/rank`, 'server-item', t('dashboard.menu.rank')),
              key: 'rank',
              icon: renderIcon(rankIcon),
              disabled: false
            },
            {
              label: renderLink(`/dashboard/${route.params.guild}/settings`, 'server-item', t('dashboard.menu.settings')),
              key: 'settings',
              icon: renderIcon(settingsIcon),
              disabled: false
            },
          ]
        },
        {
          label: 'Serveur management',
          key: 'tab2',
          children: [{
              label: renderLink(`/dashboard/${route.params.guild}/messages`, 'server-item', t('dashboard.menu.welcome')),
              key: 'welcome',
              icon: renderIcon(helloWelIcon),
              disabled: true
            },
            {
              label: renderLink(`/dashboard/${route.params.guild}/cmd`, 'server-item', t('dashboard.menu.cmd_custom')),
              key: 'custom_cmd',
              icon: renderIcon(customCodeIcon),
              disabled: true
            },
            {
              label: renderLink(`/dashboard/${route.params.guild}/reactions_roles`, 'server-item', t('dashboard.menu.role_react')),
              key: 'role_reaction',
              icon: renderIcon(roleReactIcon),
              disabled: true
            },
            {
              label: renderLink(`/dashboard/${route.params.guild}/moderation`, 'server-item', t('dashboard.menu.moderation')),
              key: 'moderation',
              icon: renderIcon(modeIcon),
              disabled: true
            },
            {
              label: renderLink(`/dashboard/${route.params.guild}/music`, 'server-item', t('dashboard.menu.music')),
              key: 'music',
              icon: renderIcon(musicIcon),
              disabled: true
            },
          ]
        }
      ],
      defaultExpandedKeys: ['tab1', 'tab2'],
      handleUpdateExpandedKeys(value) {
        console.log('[onUpdate:expandedKeys]: ' + JSON.stringify(value))
      }
    }
  }
}
</script>

<style lang="scss">
@import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.1.2/tailwind.min.css';
.botOptions {
  box-sizing: border-box;
}

.n-menu-item-content {
  padding-left: 32px !important;
}
.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-fastest {
  transition-duration: 75ms;
}
.transition-faster {
  transition-duration: 100ms;
}
.transition-fast {
  transition-duration: 150ms;
}
.transition-medium {
  transition-duration: 200ms;
}
.transition-slow {
  transition-duration: 300ms;
}
.transition-slower {
  transition-duration: 500ms;
}
.transition-slowest {
  transition-duration: 700ms;
}

.transition-all {
  transition-property: all;
}
.transition-opacity {
  transition-property: opacity;
}
.transition-transform {
  transition-property: transform;
}

.focus-visible.focus-visible\:underline {
  text-decoration: underline;
}

</style>

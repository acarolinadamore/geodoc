<template>
  <div class="notification-icon">
    <img
      :src="svgIcon"
      alt="Notificação"
      class="icon"
      @click.stop="toggleDropdown"
    />

    <span v-if="unreadCount > 0" class="badge">
      {{ unreadCount }}
    </span>

    <div v-if="dropdownOpen" class="notification-dropdown" ref="dropdown">
      <div class="tabs">
        <button
          @click.stop="currentTab = 'inbox'"
          :class="{ active: currentTab === 'inbox' }"
        >
          Caixa de Entrada
        </button>
        <button
          @click.stop="currentTab = 'alerts'"
          :class="{ active: currentTab === 'alerts' }"
        >
          Alertas
        </button>
        <button @click.stop="markAllAsRead" class="mark-read">Ler Todos</button>
      </div>

      <div class="notification-list">
        <ul>
          <li
            v-for="notification in filteredNotifications"
            :key="notification.id"
          >
            <span :class="{ unread: !notification.read }">{{
              notification.title
            }}</span>
          </li>
        </ul>
        <button @click.stop="addNotification">Simular Nova Notificação</button>
      </div>
    </div>
  </div>
</template>

<script>
// ✅ Importar do serviço em vez do JSON
import {
  getNotifications,
  markAllAsRead as markAllNotificationsAsRead,
  addNotification as addNewNotification,
} from '@/mocks/notifications'
import notificationIcon from '@/assets/icons/notification.svg'
import notificationIconWhite from '@/assets/icons/notification-branco.svg'

export default {
  name: 'GdNotification',
  props: {
    showNotifications: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      unreadCount: 0,
      useWhiteIcon: false,
      dropdownOpen: false,
      notifications: [],
      currentTab: 'inbox',
      loading: false,
    }
  },
  computed: {
    svgIcon() {
      return this.useWhiteIcon ? notificationIconWhite : notificationIcon
    },
    filteredNotifications() {
      return this.notifications.filter(notification => {
        if (this.currentTab === 'inbox') {
          return notification.type === 'inbox'
        } else if (this.currentTab === 'alerts') {
          return notification.type === 'alert'
        }
        return false
      })
    },
  },
  async created() {
    await this.loadNotifications()
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    async loadNotifications() {
      try {
        this.loading = true
        this.notifications = await getNotifications()
        this.updateUnreadCount()
      } catch (error) {
        console.error('Erro ao carregar notificações:', error)
      } finally {
        this.loading = false
      }
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },

    toggleIconColor() {
      this.useWhiteIcon = !this.useWhiteIcon
    },

    updateUnreadCount() {
      this.unreadCount = this.notifications.filter(n => !n.read).length
    },

    async markAllAsRead() {
      try {
        await markAllNotificationsAsRead(this.currentTab)
        // Atualizar localmente
        this.notifications.forEach(n => {
          if (n.type === this.currentTab) {
            n.read = true
          }
        })
        this.updateUnreadCount()
      } catch (error) {
        console.error('Erro ao marcar como lidas:', error)
      }
    },

    handleClickOutside(event) {
      if (
        this.dropdownOpen &&
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target)
      ) {
        this.dropdownOpen = false
      }
    },

    async addNotification() {
      try {
        const newNotification = {
          title: 'Nova notificação recebida!',
          message: 'Esta é uma notificação de teste',
          type: this.currentTab === 'inbox' ? 'inbox' : 'alert',
          priority: 'normal',
        }

        const created = await addNewNotification(newNotification)
        this.notifications.unshift(created)
        this.updateUnreadCount()
      } catch (error) {
        console.error('Erro ao adicionar notificação:', error)
      }
    },
  },
}
</script>

<!-- Estilos mantidos iguais -->
<style scoped>
.notification-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e53e3e;
  color: white;
  font-size: 9px;
  font-weight: bold;
  border-radius: 80px;
  height: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.tabs {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

button {
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

button.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

button.mark-read {
  color: red;
}

.notification-list {
  max-height: 200px;
  overflow-y: auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

.unread {
  font-weight: bold;
  color: #333;
}
</style>

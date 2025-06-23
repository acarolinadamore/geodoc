<template>
  <div class="flex bg-white rounded items-start gap-1.5">
    <img
      src="@/assets/icons/yellow-folder.svg"
      alt="Pasta"
      class="gd-folder-icon"
    />
    <span
      v-for="(segment, idx) in segments"
      :key="idx"
      class="flex items-center flex-wrap"
    >
      <img
        v-if="idx !== 0"
        src="@/assets/icons/right-arrow.svg"
        alt="Seta"
        class="gd-arrow-icon"
      />
      <span class="gd-text-link text-left">{{ titleCase(segment) }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'GdCaminhoDiretorio',
  props: {
    dirPath: {
      type: String,
      required: true,
    },
  },
  computed: {
    segments() {
      return this.dirPath
        .split('/')
        .map(s => s.trim())
        .filter(Boolean)
    },
  },
  methods: {
    titleCase(str) {
      const prepositions = [
        'de',
        'da',
        'das',
        'do',
        'dos',
        'e',
        'em',
        'para',
        'por',
        'com',
      ]

      return str
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1)
          }

          if (prepositions.includes(word)) {
            return word
          }
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
    },
  },
}
</script>

<style scoped>
.gd-folder-icon {
  width: 16px;
  height: 16px;
  position: relative;
  top: 1px;
}

.gd-arrow-icon {
  width: 10px;
  height: 10px;
  margin: 0 6px;
  filter: brightness(0) saturate(100%) invert(75%) sepia(6%) saturate(126%)
    hue-rotate(175deg) brightness(93%) contrast(92%);
}

/* Classe usada para textos cinza */
.gd-text-gray {
  color: #9ca3af; /* Tailwind gray-400 */
}

.gd-text-link {
  color: #3f98d4;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
}
</style>

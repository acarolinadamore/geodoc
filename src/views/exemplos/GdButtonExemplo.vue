<template>
  <div class="example-container">
    <!-- Botões preenchidos -->
    <gd-btn label="Cor Primária" bgColor="#37C989" textColor="#fff" />
    <gd-btn label="Cor Secundária" bgColor="#1A82D9" textColor="#fff" />
    <gd-btn label="Cor Personalizada" bgColor="#D97706" textColor="#fff" />
    <gd-btn
      label="Com Ícone"
      icon="fa fa-check"
      bgColor="#37C989"
      textColor="#fff"
    />

    <!-- Botões outlined -->
    <gd-btn
      label="Outlined"
      variant="outlined"
      borderColor="#37C989"
      textColor="#37C989"
    />
    <gd-btn
      label="Outlined Cor Secundária"
      variant="outlined"
      borderColor="#1A82D9"
      textColor="#1A82D9"
    />
    <gd-btn
      label="Com Ícone Outlined"
      variant="outlined"
      borderColor="#37C989"
      textColor="#37C989"
      icon="fa fa-check"
    />
    <gd-btn
      label="Com Ícone Secundário"
      variant="outlined"
      borderColor="#1A82D9"
      textColor="#1A82D9"
      icon="fa fa-check"
    />
    <gd-btn
      label="Tamanho Personalizado"
      variant="outlined"
      borderColor="#1A82D9"
      textColor="#1A82D9"
      width="250px"
    />
    <gd-btn
      borderColor="#1A82D9"
      textColor="#fff"
      icon="fa fa-check"
      width="45px"
    />
    <gd-btn
      variant="outlined"
      borderColor="#1A82D9"
      textColor="#1A82D9"
      icon="fa fa-check"
      width="45px"
    />
  </div>
</template>

<script>
import GdBtn from '@/components/ui/GdButton.vue'

export default {
  name: 'GdButtonExemplo',
  components: {
    GdBtn,
  },
}
</script>

<style scoped>
.example-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

h2 {
  margin-bottom: 10px;
}
</style>

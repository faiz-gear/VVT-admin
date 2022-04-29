<template>
  <div class="components-demo">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in" name="vvtl-transition">
          <component :is="Component"></component>
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

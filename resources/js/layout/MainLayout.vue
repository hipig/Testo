<template>
  <div class="flex flex-col w-100 min-h-screen">
    <app-header></app-header>
    <main class="flex-1">
      <router-view/>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from "@/components/partials/AppHeader"
  import AppFooter from "@/components/partials/AppFooter"

  export default {
    name: "MainLayout",
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style scoped>

</style>

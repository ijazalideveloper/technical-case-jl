<template>
  <div class="app-layout">
    <AppNavbar />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  @include flex(stretch, flex-start, column);
  min-height: 100vh;
}

.main-content {
  @include container;
  flex: 1;
  padding-top: $space-xl;
  padding-bottom: $space-xl;

  @include below($bp-md) {
    padding-top: $space-lg;
    padding-bottom: $space-lg;
  }
}
</style>

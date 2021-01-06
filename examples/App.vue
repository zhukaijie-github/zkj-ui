<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101f1c, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  min-height: 28px;
  background-color: rgba(#101f1c, 0.5);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(#101f1c, 1);
}
</style>

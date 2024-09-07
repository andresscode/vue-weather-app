<template>
  <div class="loader">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.dot {
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #3498db;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot1 {
  animation-delay: -0.32s;
}

.dot2 {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>

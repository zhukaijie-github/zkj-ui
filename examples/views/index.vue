<template>
  <div class="home">
    <div>
      <zkj-button>默认</zkj-button>
      <zkj-button type="primary">默认</zkj-button>
      <zkj-button type="success">默认</zkj-button>
      <zkj-button type="danger">默认</zkj-button>
      <zkj-button type="warning">默认</zkj-button>
    </div>
    <div>
      <zkj-scrollbar class="demo-scrollbar">
        <div class="demo-scrollbar__view" :style="styleObj">
          <p v-for="i in list" :key="i">
            {{ `${i}---------------------------------` }}
          </p>
        </div>
      </zkj-scrollbar>
    </div>
    <div>
      <zkj-progress :percent="percent" status="success" />
      <zkj-progress :percent="percent" status="error" textInside />
      <zkj-progress :percent="percent" status="warning" textInside />
      <zkj-progress
        :percent="percent"
        status="warning"
        textInside
        color="#333"
      />
    </div>

    <div>
      <zkj-virtual-list :list="vlist" :showNum="10">
        <template v-slot:default="scope">
          <div>
            {{ scope.row }}
          </div>
        </template>
      </zkj-virtual-list>
    </div>
    <div class="wave"></div>
    <div class="odd-shadow">哎呦，猪先森</div>
    <div class="br-31 black-theme"></div>
    <div class="br-31 br-32 black-theme" style="animation-delay: -1s;"></div>

    <div class="crl"></div>

    <div>
      <zkj-switch v-model="checked" />
      <zkj-switch disabled v-model="checked" />
    </div>

    <div style="width: 500px;">
      <zkj-slider v-model="percent" />
    </div>

    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      vlist: [],
      list: 100,
      styleObj: {},
      percent: 40,
      checked: true
    };
  },
  mounted() {
    for (let i = 0; i < 1000; i++) {
      this.vlist.push({ name: 'l-', value: i });
    }
    setTimeout(() => {
      console.log('增加了');
      this.list = 200;
      this.styleObj = {
        width: '500px'
      };
    }, 3000);
  }
};
</script>

<style lang="scss">
.demo-scrollbar {
  width: 300px;
  height: 300px;
  border: 1px solid #333;
  &__view {
    width: 100%;
  }
}

.wave {
  width: 100px;
  height: 100px;
  margin-right: auto;
  margin-left: auto;
  line-height: 100px;
  color: #fff;
  text-align: center;
  background:
 #06c url('http://p3g4ahmhh.bkt.clouddn.com/me.jpg') no-repeat
    center center;
  background-size: 100%;
  border: 2px solid #fff;
  border-radius: 100px;
  animation: wave 4s linear infinite;
}

@keyframes wave {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 226, 226, 1), 0 0 0 0 rgba(250, 189, 189, 1);
  }
  50% {
    box-shadow:
 0 0 0 20px rgba(245, 226, 226, 0.5),
      0 0 0 0 rgba(250, 189, 189, 1);
  }
  100% {
    box-shadow:
 0 0 0 40px rgba(245, 226, 226, 0),
      0 0 0 20px rgba(245, 226, 226, 0);
  }
}

.odd-shadow {
  width: 200px;
  height: 80px;
  margin-right: auto;
  margin-left: auto;
  font-size: 24px;
  line-height: 80px;
  color: #fff;
  text-align: center;
  background: #06c;
  border-radius: 8px;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8));
}
.odd-shadow::before {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  margin-left: -20px;
  border: 10px solid transparent;
  border-right-color: #06c;
  content: '';
  transform: translateY(20px);
}

.br-31 {
  width: 100px;
  height: 100px;
  background: linear-gradient(to right, #f6c 50%, #333 0);
  border-radius: 50%;
}
.br-31::before {
  display: block;
  height: 100%;
  margin-left: 50%;
  background-color: #f6c;
  border-radius: 0 100% 100% 0 / 50%;
  content: '';
  animation: skin 4s linear infinite, bg 8s step-end infinite;
  transform-origin: left;
}

@keyframes skin {
  to {
    transform: rotate(0.5turn);
  }
}

@keyframes bg {
  50% {
    background: #333;
  }
}
.br-32::before {
  animation-delay: inherit;
  animation-play-state: paused;
}

.crl {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(to right, red 50%, #333 0);
  border-radius: 200px;
  &::before {
    display: block;
    width: 100%;
    height: 100%;
    margin-left: 50%;
    background-color: red;
    border-radius: 0 100% 100% 0 / 50%;
    content: '';
    animation: skin1 4s linear infinite, bg1 8s step-end infinite;
    transform-origin: left;
  }
}

@keyframes skin1 {
  to {
    transform: rotate(180deg);
  }
}

@keyframes bg1 {
  50% {
    background-color: #333;
  }
}
</style>

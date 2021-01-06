<template>
  <div class="home">
    <div>
      <zkj-button @click="handlerClick">默认</zkj-button>
      <zkj-button @click="handlerClick('box')" type="primary">默认</zkj-button>
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

    <zkj-image
      style="width: 300px; height: 200px;"
      :src="src"
      :previewSrcList="urls"
      v-loading="loading"
    />
    <br />
    <br />
    <zkj-button type="success" @click="openloading">加载中。。。</zkj-button>

    <br />
    <br />
    <br />
    <br />

    <zkj-radio-group v-model="radio" @change="handlerChangeRadioGroup">
      <zkj-radio label="1">备注1</zkj-radio>
      <zkj-radio label="2" disabled>备注2</zkj-radio>
      <zkj-radio label="3">备注3</zkj-radio>
    </zkj-radio-group>

    <br />
    <br />

    <zkj-checkbox v-model="checkedValue" disabled>苹果</zkj-checkbox>
    <zkj-checkbox v-model="checkedValue">苹果</zkj-checkbox>
    <zkj-checkbox v-model="checkedValue">苹果</zkj-checkbox>

    <zkj-checkbox-group v-model="checkbox" disabled>
      <zkj-checkbox label="1">今天</zkj-checkbox>
      <zkj-checkbox label="2">明天</zkj-checkbox>
    </zkj-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox: ['1'],
      checkedValue: true,
      radio: '2',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      vlist: [],
      list: 100,
      styleObj: {},
      percent: 40,
      checked: true,
      src: '',
      loading: false
    };
  },
  methods: {
    handlerChangeRadioGroup(val) {
      console.log(val);
    },
    openloading() {
      var loading = this.$loading();
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    handlerClick(type) {
      if (type === 'box') {
        this.$messageBox({
          message: '23233'
        })
          .then(() => {
            console.log('sdfdsfdsf');
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      } else {
        this.$message.error('提示你');
      }
    }
  },
  mounted() {
    /* setInterval(() => {
      this.radio = this.radio === '1' ? '2' : this.radio === '2' ? '1' : '2';
    }, 2000); */

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    for (let i = 0; i < 1000; i++) {
      this.vlist.push({ name: 'l-', value: i });
    }
    setTimeout(() => {
      console.log('增加了');
      this.list = 200;
      this.styleObj = {
        width: '500px'
      };
      this.src =
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
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

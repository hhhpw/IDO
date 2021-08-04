export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    // 右上角的label
    mixinSetLabelsBg() {
      return function (type, len) {
        if (len && Number(len) > 0)
          return {
            "background-image": `url(${require(`../assets/home/${type}-card-label-${len}.png`)})`,
          };
      };
    },
    // 列表里的label
    mixinLabelColor() {
      return function (a, b) {
        return {
          color: a,
          border: `1px solid ${b}`,
        };
      };
    },
  },
  methods: {
    /* eslint-disable*/
    countDown(timestamp, list) {
      // const setTime = () => {
      //   const leftTime = timestamp - Date.now();
      //   if (leftTime >= 0) {
      //     const d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      //     const h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
      //     const m = Math.floor((leftTime / 1000 / 60) % 60);
      //     const s = Math.floor((leftTime / 1000) % 60);
      //     // return { d, h, m, s };
      //     p = `${d}-${h}-${m}-${s}`;
      //   } else {
      //     clearInterval(timer);
      //   }
      // };
      // const start = () => {
      //   console.log("A");
      //   this.timer = setInterval(() => {
      //     // for (let i )
      //     list.forEach((d) => {
      //       list[i].tt = "xadasd";
      //     });
      //   }, 1000);
      // };
      // return {
      //   setTime,
      //   start,
      // };
    },
  },
};

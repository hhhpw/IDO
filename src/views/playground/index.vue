<template>
  <div>
    <button @click="onStakeClick">stake</button>
    <button @click="onUnstakeClick">unstake</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Wallet } from "@contactLogic";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("StoreWallet", ["stcProvider", "stcAccounts", "stcChianID"]),
  },
  methods: {
    getParams() {
      return {
        provider: this.stcProvider,
        account: this.stcAccounts[0],
        chianID: this.stcChianID,
      };
    },
    async onStakeClick() {
      const params = this.getParams();
      const res = await Wallet.stakeSTC({
        ...params,
        amount: 1,
      });
      console.log("stake result:", res);
    },
    async onUnstakeClick() {
      const params = this.getParams();
      const res = await Wallet.unstakeSTC({
        ...params,
        amount: 1,
      });
      console.log("unstake result:", res);
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 20px;
  padding: 5px 10px;
}
</style>

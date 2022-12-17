<script lang="ts">
  import { fdp, wallet } from "../store";
  import { createWallet } from "../utils";
  import ImportWallet from "./ImportWallet.svelte";
  import Login from "./Login.svelte";
</script>
<div id="wallet">
<Login />
<code>or</code>
<ImportWallet />
<code>or</code>
<div class="notice">
  <button
    on:click={() => {
      $wallet = createWallet($fdp);
    }}>Create a Wallet</button
  >
</div>
</div>
<style>
  code {
    font-weight: bold;
  }
  .notice {
    background: lightyellow;
  }
  #wallet {
    text-align: center;
  }
  button {
    margin: 1rem;
  }
</style>

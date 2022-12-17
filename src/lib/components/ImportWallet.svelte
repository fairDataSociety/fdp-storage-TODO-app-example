<script lang="ts">
  import { fdp, todoItems, wallet } from "../store";
  import { getTodoItems, importWallet } from "../utils";

  let phrase = "";
</script>

<fieldset class="notice">
  <legend>Import a Wallet</legend>
  <label
    >Mnemonic Phrase:<br />
    <input
      style="width:100%"
      type="text"
      bind:value={phrase}
      placeholder="Enter your FDP account wallet's mnemonic phrase"
    />
  </label>
  <button
    disabled={phrase == ""}
    on:click={async () => {
      $wallet = importWallet($fdp, phrase);
      $todoItems = await getTodoItems($fdp);
    }}>Import a wallet</button
  >
</fieldset>

<script lang="ts">
  import { fdp, todoItems, user, wallet } from "../store";
  import { getTodoItems, loginAccount } from "../utils";
  let username = "";
  let password = "";
</script>

<fieldset class="notice">
  <legend>Login</legend>
  <label
    >Username:
    <input
      id="username"
      type="text"
      bind:value={username}
      placeholder="Enter your FDP account username"
    />
  </label>
  <label
    >Password:
    <input
      id="password"
      type="password"
      bind:value={password}
      placeholder="Enter your FDP account password"
    />
  </label>
  <button
    disabled={username == "" || password == ""}
    on:click|preventDefault={async () => {
      $wallet = await loginAccount(username, password, $fdp);
      $todoItems = await getTodoItems($fdp);
      $user = username;
      console.log({ $fdp });
    }}>Login</button
  >
</fieldset>

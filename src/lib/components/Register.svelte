<script lang="ts">
    import { fdp, wallet } from "../store";
    import { registerAccount } from "../utils";
    let username = "";
    let password = "";
</script>

<form class="notice">
    <fieldset>
        <legend>Register</legend>
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
            on:click|preventDefault={() =>
                registerAccount(username, password, $wallet.address, $fdp)}
            >Register</button
        >
    </fieldset>
</form>

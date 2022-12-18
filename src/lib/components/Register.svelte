<script lang="ts">
    import { fdp, user, wallet } from "../store";
    import { registerAccount } from "../utils";
    let username = "";
    let password = "";
    let registering = false;
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
            disabled={username == "" || password == "" || registering}
            on:click|preventDefault={async() => { 
                registering = true;
                $user = await registerAccount(username, password, $wallet.address, $fdp)
            }}
            >{#if registering}Registering...{:else}Register{/if}</button
        >
    </fieldset>
</form>

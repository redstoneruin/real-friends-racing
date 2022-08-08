
<style>
.pageContainer {
    display:flex;
    flex-direction: column;
    align-items: center;
}

.calcContainer {
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    width:100%;
    background-color: #f7f7f7;
    padding:25px;
}

.pageHeading {
    margin:0;
    text-align: center;
    width:100%;
}

.calcForm {
    width:100%;
    max-width:500px;
    padding:25px 25px 25px 10px;
}

.formInput {
    width:100%;
    border:none;
    padding:5px 10px;
    font-size:16px;
}

.inputLabel {
    margin: 10px 0 3px 0;
}
</style>

<script>
    let raceTime = "";
    let raceLaps = 0;
    let lapTimeStr = "";
    let maxFuel = 0;
    let usage = 0;
    let extraLaps = 0;

    let lapTime = 0;

    let timedRace = true;

    function submit() {

    }
</script>

<div class="pageContainer">
    <div class="calcContainer">
        <h1 class="pageHeading">Calculator</h1>

        <form class="calcForm">
        
            {#if timedRace}
                <p class="inputLabel">Race Time in Minutes</p>
                <input class="formInput" size="1" type="number" bind:value={raceTime} /> 
            {:else}
                <p class="inputLabel">Race Laps</p>
                <input class="formInput" size="1" type="number" bind:value={raceLaps} /> 
            {/if}


            <p class="inputLabel">Lap Time in Format: MM:SS.ms</p>
            <input class="formInput" size="1" type="text" bind:value={lapTimeStr} />

            <p class="inputLabel">Max Fuel</p>
            <input class="formInput" size="1" type="number" bind:value={maxFuel} />

            <p class="inputLabel">Fuel Usage</p>
            <input class="formInput" size="1" type="number" bind:value={usage} />

            {#if timedRace}
                <p></p>
            {:else}
                <p></p>
            {/if}


            <button class="calcButton">
                Submit
            </button>
        </form>
    </div>
</div>
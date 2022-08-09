
<script lang="ts">
    import dayjs from "dayjs";
    import duration from "dayjs/plugin/duration";

    dayjs.extend(duration);

    let raceTime = 0;
    let raceLaps = 0;
    let lapTimeStr = "";
    let maxFuel = 0;
    let usage = 0;
    let extraLaps = 0;

    let lapTimeErr = "";
    let raceTimeErr = "";
    let raceLapsErr = "";
    let maxFuelErr = "";
    let usageErr = "";

    let lapTime = 0;

    let timedRace = true;

    let hasResults = false;

    let totalUsage = 0;
    let pitStops = 0;
    let lastStopFuel = 0;
    let lapsPerTank = 0;

    const validateNumbers = () => {
        raceTimeErr = "";
        raceLapsErr = "";
        maxFuelErr = "";
        usageErr = "";

        if(timedRace) {
            raceTimeErr = !raceTime ? "Invalid race time." : "";
        } else {
            raceLapsErr = !raceLaps ? "Invalid race laps." : "";
        }

        maxFuelErr = !maxFuel ? "Invalid max fuel" : "";
        usageErr = !usage ? "Invalid fuel usage" : "";

        return raceTimeErr === "" &&
            raceLapsErr === "" &&
            maxFuelErr === "" &&
            usageErr === "";
    }

    const parseLapTime = () => {
        const re = /([0-9]+):([0-9]+).([0-9]+)/;

        const matchArr = lapTimeStr.match(re);

        lapTimeErr = "";

        if(matchArr === null || matchArr.length != 4) {
            lapTimeErr = "Could not parse lap time.";
            return 0;
        }

        if(matchArr[3].length > 3) {
            lapTimeErr = "Invalid millisecond format.";
            return 0;
        }

        const minutes = parseInt(matchArr[1]);
        const seconds = parseInt(matchArr[2]);
        const milliseconds = parseInt(matchArr[3].padEnd(3, "0"));

        const duration = dayjs.duration({
            minutes,
            seconds,
            milliseconds
        });

        return duration.as("seconds")
    }

    const submit = () => {
        if(!validateNumbers()) return;
        
        lapTime = parseLapTime();
        if(lapTimeErr !== "") return;
        
        if(timedRace) {
            raceLaps = Math.ceil(raceTime * 60 / lapTime);
        } else {
            raceTime = lapTime/60 * raceLaps;
        }

        totalUsage = (raceLaps+extraLaps) * usage;
        lapsPerTank = Math.floor(maxFuel / usage);
        pitStops = Math.floor((raceLaps+extraLaps) / lapsPerTank);
        lastStopFuel = pitStops ? totalUsage - pitStops*maxFuel : 0;
        
        hasResults = true;
    }
</script>

<div class="pageContainer">
    <div class="calcContainer">
        <h1 class="pageHeading">Fuel Calculator</h1>

        <form class="calcForm">
        
            {#if timedRace}
                <p class="inputLabel">Race Time in Minutes</p>
                <input class="formInput" size="1" type="number" bind:value={raceTime} /> 
                <p class="errorText">{raceTimeErr}</p>
            {:else}
                <p class="inputLabel">Race Laps</p>
                <input class="formInput" size="1" type="number" bind:value={raceLaps} /> 
                <p class="errorText">{raceLapsErr}</p>
            {/if}


            <p class="inputLabel">Lap Time in Format: MM:SS.ms</p>
            <input class="formInput" size="1" type="text" bind:value={lapTimeStr} />
            <p class="errorText">{lapTimeErr}</p>

            <p class="inputLabel">Max Fuel</p>
            <input class="formInput" size="1" type="number" bind:value={maxFuel} />
            <p class="errorText">{maxFuelErr}</p>

            <p class="inputLabel">Fuel Usage</p>
            <input class="formInput" size="1" step="0.1" type="number" bind:value={usage} />
            <p class="errorText">{usageErr}</p>

            <p class="inputLabel">Extra Laps: {extraLaps}</p>
            <input class="rangeInput" type="range" step={0.1} min={0} max={10} bind:value={extraLaps} />

            <div class="buttonRow">
                <p class="checkboxLabel">Timed Race</p>
                <input type="checkbox" bind:checked={timedRace} />
            </div>

            <button on:click|preventDefault={submit} class="calcButton">
                Submit
            </button>
        </form>
    </div>

    {#if hasResults}
        <div class="resultContainer">
            <div class="resultBox">
                <h4>Pit Stops</h4>
                <p>{pitStops}</p>
            </div>
            
            <div class="resultBox">
                <h4>Fuel on last stop</h4>
                <p>{Math.round(lastStopFuel*100) / 100}</p>
            </div>
            
            <div class="resultBox">
                <h4>Total Fuel Usage</h4>
                <p>{Math.round(totalUsage*100) / 100}</p>
            </div>
            
            <div class="resultBox">
                <h4>Laps per Tank</h4>
                <p>{lapsPerTank}</p>
            </div>
           
            {#if !timedRace}
            <div class="resultBox">
                <h4>Race Time</h4>
                <p>{Math.round(raceTime * 100) / 100} minutes</p>
            </div>
            {:else}
            <div class="resultBox">
                <h4>Race Laps</h4>
                <p>{raceLaps}</p>
            </div>
            {/if}
        </div>
    {/if}
</div>



<style lang="scss">
.errorText {
    color:red;
    margin:0;
    font-size:14px;
}

.resultBox {
    padding:20px;
    max-width:300px;
    width:100%;
    background-color: #f7f7f7;
    margin:5px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.resultContainer {
    width:100%;
    justify-content: center;
    padding:20px 0;
    display:flex;
    flex-wrap:wrap;
}

.calcButton {
    padding:10px 15px;
    background-color: #fff;
    border:none;
    margin:0;
    border:1px solid black;
    border-radius:5px;
    cursor:pointer;
    transition:ease 0.2s all;
}

.calcButton:hover {
    border:1px solid green;
    color:green;
}

.calcButton:active,
.calcButton:focus {
    outline:none;
}

.rangeInput {
    width:100%;
}

.rangeInput:active,
.rangeInput:focus {
    outline:none;
}

.checkboxLabel {
    margin-right:3px;
}

.buttonRow {
    display:flex;
    flex-wrap:wrap;
    align-items: center;
    width:100%;
}

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

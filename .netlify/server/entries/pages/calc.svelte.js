var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Calc
});
module.exports = __toCommonJS(stdin_exports);
var import_index_2435e811 = require("../../_app/immutable/chunks/index-2435e811.js");
var import_dayjs = __toESM(require("dayjs"));
var import_duration = __toESM(require("dayjs/plugin/duration.js"));
const calc_svelte_svelte_type_style_lang = "";
const css = {
  code: ".errorText.svelte-cpyp6y{color:red;margin:0;font-size:14px}.resultBox.svelte-cpyp6y{padding:20px;max-width:300px;width:100%;background-color:#f7f7f7;margin:5px;display:flex;flex-direction:column;align-items:center}.resultContainer.svelte-cpyp6y{width:100%;justify-content:center;padding:20px 0;display:flex;flex-wrap:wrap}.calcButton.svelte-cpyp6y{padding:10px 15px;background-color:#fff;border:none;margin:0;border:1px solid black;border-radius:5px;cursor:pointer;transition:ease 0.2s all}.calcButton.svelte-cpyp6y:hover{border:1px solid green;color:green}.calcButton.svelte-cpyp6y:active,.calcButton.svelte-cpyp6y:focus{outline:none}.rangeInput.svelte-cpyp6y{width:100%}.rangeInput.svelte-cpyp6y:active,.rangeInput.svelte-cpyp6y:focus{outline:none}.checkboxLabel.svelte-cpyp6y{margin-right:3px}.buttonRow.svelte-cpyp6y{display:flex;flex-wrap:wrap;align-items:center;width:100%}.pageContainer.svelte-cpyp6y{display:flex;flex-direction:column;align-items:center}.calcContainer.svelte-cpyp6y{display:flex;flex-wrap:wrap;justify-content:center;width:100%;background-color:#f7f7f7;padding:25px}.pageHeading.svelte-cpyp6y{margin:0;text-align:center;width:100%}.calcForm.svelte-cpyp6y{width:100%;max-width:500px;padding:25px 25px 25px 10px}.formInput.svelte-cpyp6y{width:100%;border:none;padding:5px 10px;font-size:16px}.inputLabel.svelte-cpyp6y{margin:10px 0 3px 0}",
  map: null
};
const Calc = (0, import_index_2435e811.c)(($$result, $$props, $$bindings, slots) => {
  import_dayjs.default.extend(import_duration.default);
  let raceTime = 0;
  let lapTimeStr = "";
  let maxFuel = 0;
  let usage = 0;
  let extraLaps = 0;
  let lapTimeErr = "";
  let raceTimeErr = "";
  let maxFuelErr = "";
  let usageErr = "";
  let timedRace = true;
  $$result.css.add(css);
  return `<div class="${"pageContainer svelte-cpyp6y"}"><div class="${"calcContainer svelte-cpyp6y"}"><h1 class="${"pageHeading svelte-cpyp6y"}">Fuel Calculator</h1>

        <form class="${"calcForm svelte-cpyp6y"}">${`<p class="${"inputLabel svelte-cpyp6y"}">Race Time in Minutes</p>
                <input class="${"formInput svelte-cpyp6y"}" size="${"1"}" type="${"number"}"${(0, import_index_2435e811.a)("value", raceTime, 0)}> 
                <p class="${"errorText svelte-cpyp6y"}">${(0, import_index_2435e811.e)(raceTimeErr)}</p>`}


            <p class="${"inputLabel svelte-cpyp6y"}">Lap Time in Format: MM:SS.ms</p>
            <input class="${"formInput svelte-cpyp6y"}" size="${"1"}" type="${"text"}"${(0, import_index_2435e811.a)("value", lapTimeStr, 0)}>
            <p class="${"errorText svelte-cpyp6y"}">${(0, import_index_2435e811.e)(lapTimeErr)}</p>

            <p class="${"inputLabel svelte-cpyp6y"}">Max Fuel</p>
            <input class="${"formInput svelte-cpyp6y"}" size="${"1"}" type="${"number"}"${(0, import_index_2435e811.a)("value", maxFuel, 0)}>
            <p class="${"errorText svelte-cpyp6y"}">${(0, import_index_2435e811.e)(maxFuelErr)}</p>

            <p class="${"inputLabel svelte-cpyp6y"}">Fuel Usage</p>
            <input class="${"formInput svelte-cpyp6y"}" size="${"1"}" step="${"0.1"}" type="${"number"}"${(0, import_index_2435e811.a)("value", usage, 0)}>
            <p class="${"errorText svelte-cpyp6y"}">${(0, import_index_2435e811.e)(usageErr)}</p>

            <p class="${"inputLabel svelte-cpyp6y"}">Extra Laps: ${(0, import_index_2435e811.e)(extraLaps)}</p>
            <input class="${"rangeInput svelte-cpyp6y"}" type="${"range"}"${(0, import_index_2435e811.a)("step", 0.1, 0)}${(0, import_index_2435e811.a)("min", 0, 0)}${(0, import_index_2435e811.a)("max", 10, 0)}${(0, import_index_2435e811.a)("value", extraLaps, 0)}>

            <div class="${"buttonRow svelte-cpyp6y"}"><p class="${"checkboxLabel svelte-cpyp6y"}">Timed Race</p>
                <input type="${"checkbox"}"${(0, import_index_2435e811.a)("checked", timedRace, 1)}></div>

            <button class="${"calcButton svelte-cpyp6y"}">Submit
            </button></form></div>

    ${``}
</div>`;
});

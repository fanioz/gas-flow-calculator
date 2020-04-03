<script>
  import { onMount } from 'svelte'
  import MyInputBox from './inputbox.svelte'

  export let date
  onMount(async () => {
    const res = await fetch('/api/date')
    const newDate = await res.text()
    date = newDate
  })

  //
  const LN = Math.log

  let lined = 3,
    man_diam_orifice = 0.125
  let press = 0,
    man_hw = 1,
    temper = 0
  let man_SG = 0.7
  let orifice_mm, id_line_mm
  $: orifice_mm = man_diam_orifice * 25.4
  $: id_line_mm = lined * 25.4 //default 3"
  $: {
    if (lined == 3 && orifice_mm > 70) {
      window.alert(
        'ID orifice lebih besar dari ID line. ID Pipa di ubah 6 inch',
      )
      lined = 6
    }

    if (typeof orifice_mm === 'undefined' || orifice_mm < 1) {
      window.alert('ID orifice tidak boleh lebih kecil dari 1')
      orifice_mm = 1
      setInch()
    }
  }

  $: abs_press = press + 1.01325
  $: abs_temp = temper + 273.15
  $: result = Calculate(lined, man_diam_orifice, man_hw, press, temper, man_SG)

  const zO = () => {
    let zo15 = ((abs_press - 1) * 14.50377) / (697.2 - 43 * man_SG)
    let zo16 = ((abs_temp - 273.15) * 1.8 + 492) / (315.1 * man_SG + 170.4)
    let zo17 = 0.3379 * LN(LN(zo16)) + 1.091
    let zo18 = 21.46 * zo17 - 11.9 * Math.pow(zo17, 2) - 5.9
    let zo19 =
      ((1.1 + 0.26 * zo16 + ((1.04 - 1.42 * zo16) * zo15) / zo18) *
        Math.exp(zo15 / zo18)) /
      zo16
    return (
      1 + (zo17 - 1) * Math.pow(Math.sin(((zo15 / zo18) * Math.PI) / 2), zo19)
    )
  }

  const Calculate = () => {
    let H22 = 1
    let H23 = orifice_mm / id_line_mm
    let H26 = 25.4 / id_line_mm
    let H25 =
      0.5959 +
      0.0312 * Math.pow(H23, 2.1) -
      0.184 * Math.pow(H23, 8) +
      0.0029 * Math.pow(H23, 2.5) * Math.pow(1 / H22, 0.75)
    let H27 = H25 + 0.09 * H26 * 0.039 - 0.0337 * H26 * Math.pow(H23, 3)
    let H28 =
      H25 +
      0.09 * H26 * Math.pow(H23, 4) * Math.pow(1 - Math.pow(H23, 4), -1) -
      0.0337 * H26 * Math.pow(H23, 3)
    let H29 = H26 <= 0.433 ? H28 : H27
    let H295 = Math.pow(H23, 4)
    let H30 =
      ((1 - ((0.41 + 0.35 * H295) * man_hw * 0.0019154) / abs_press) /
        Math.pow(1 - H295, 0.5)) *
      H29
    let H31 =
      H30 *
      33.957 *
      Math.pow(orifice_mm, 2) *
      Math.pow((man_hw * abs_press) / abs_temp / man_SG / zO(), 0.5) *
      0.000024
    let H33 = ((H31 * man_SG) / id_line_mm) * 51.03435
    let H34 = H23
    let H36 =
      0.5959 +
      0.0312 * Math.pow(H34, 2.1) -
      0.184 * Math.pow(H34, 8) +
      0.0029 * Math.pow(H34, 2.5) * Math.pow(1 / H33, 0.75)
    let H37 = H26
    let H38 = H36 + 0.09 * H37 * 0.039 - 0.0337 * H37 * Math.pow(H34, 3)
    let H39 =
      H36 +
      0.09 * H37 * Math.pow(H34, 4) * Math.pow(1 - Math.pow(H34, 4), -1) -
      0.0337 * H37 * Math.pow(H34, 3)
    let H40 = H37 <= 0.433 ? H39 : H38
    let H41 =
      ((1 -
        ((0.41 + 0.35 * Math.pow(H34, 4)) * man_hw * 0.0019154) / abs_press) /
        Math.pow(1 - Math.pow(H34, 4), 0.5)) *
      H40
    let result =
      H41 *
      33.957 *
      Math.pow(orifice_mm, 2) *
      Math.pow((man_hw * abs_press) / abs_temp / man_SG / zO(), 0.5) *
      0.024
    return result
  }

  const setInch = () => (man_diam_orifice = orifice_mm / 25.4)
</script>

<main class="box">
  <div class="box has-background-grey-light">
    <div class="title">Simple Gas Flow Calculator</div>
    <div class="subtitle">by: fanioz</div>
  </div>
  <div class="box has-background-grey-lighter has-text-justified">
    <div class="field has-addons">
      <div class="column is-one-third">
        <label class="label">Pipe Diameter:</label>
      </div>
      <div class="column">
        <div class="control">
          <label class="radio">
            <input type="radio" bind:group={lined} value={3} />
            3 inch
          </label>
        </div>
      </div>
      <div class="column">
        <div class="control">
          <label class="radio">
            <input type="radio" bind:group={lined} value={6} />
            6 inch
          </label>
        </div>
      </div>
    </div>
    <div class="field has-addons">
      <div class="column is-one-third">
        <label class="label">Orifice Slider:</label>
      </div>
      <div class="column">
        <input
          type="range"
          bind:value={man_diam_orifice}
          min="0.125"
          max="5"
          step="0.125" />
      </div>
    </div>
    <div class="field has-addons">
      <div class="column is-one-third">
        <label class="label">Orifice Diameter:</label>
      </div>
      <div class="column is-one-third">
        <input
          type="number"
          bind:value={man_diam_orifice}
          min="0.125"
          max="5"
          step="0.125" />
        inch
      </div>
      <div class="column is-one-third">
        <input
          type="number"
          bind:value={orifice_mm}
          min="1"
          max="127"
          on:input={e => setInch(e.target.value)} />
        mm
      </div>
    </div>

    <MyInputBox
      caption="Upstream Pressure:"
      bind:variabel={press}
      endunit="Bar"
      min="0"
      max="1000" />
    <MyInputBox
      caption="Diff. Pressure (Hw):"
      bind:variabel={man_hw}
      endunit="inch H2O"
      min="0"
      max="1000" />
    <MyInputBox
      caption="Temperature:"
      bind:variabel={temper}
      endunit="deg C"
      min="0"
      max="1000" />
    <MyInputBox
      caption="SG Gas:"
      bind:variabel={man_SG}
      min="0.1"
      max="0.86"
      step="0.1" />

    <div class="notification is-success has-text-centered is-size-3">
      Result : {result.toFixed(2)} MSCFD
    </div>
    <div class="is-size-7">
      Using pipe ID {lined} inch, orifice {orifice_mm} mm, Pressure at {press}
      BarG, Temperature at {temper} deg C, and HW at {man_hw} inch H2O and SG
      gas set at {man_SG}.
    </div>
  </div>
  <p>{date ? date : 'Loading date...'}</p>
</main>

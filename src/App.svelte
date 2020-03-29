<script>
  import { onMount } from "svelte";
  export let date;

  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
  });
</script>

<main>
  <h1>Simple Gas Flow Calculator</h1>
  <h2>Current date:</h2>
  <p>{date ? date : 'Loading date...'}</p>
  <br>
  <table>
        <th colspan="3">Simple Gas Flow Calculator</th>
        <tr>
            <td>Pipe Diameter:</td>
            <td><input type="radio" id="line3" name="lined" checked="true"><label for="line3">Line 3"</label></td>
            <td><input type="radio" id="line6" name="lined"><label for="line6">Line 6"</label></td>
        </tr>
        <tr>
            <td><label for="dOrificeIn">Orifice D:</label></td>
            <td><input type="text" id="dOrificeIn" name="dOrificeIn" oninput="ConvertMM()">inch</td>
            <td><input type="text" id="dOrificeMM" name="dOrificeMM" value="50.8" >mm</td>
        </tr>
        <tr>
            <td><label for="upPress">Pressure:</label></td>
            <td colspan="2"><input type="text" id="upPress" name="press" placeholder="Bar" value="50"></td>
        </tr>
        <tr>
            <td><label for="hw">HW:</label></td>
            <td  colspan="2"><input type="text" id="hw" name = "hw" placeholder="inchH20" value="50"></td>
        </tr>
        <tr>
            <td><label for="temp">Temperature:</label></td>
            <td  colspan="2"><input type="text" id="temp" name="temp" placeholder="deg C" value="50"></td>
        </tr>
        <tr>
            <td colspan="2"><center><button onclick="Calculate()">Hitung</button></center></td>
            <td><p id="Result">Result :</p></td>
        </tr>
  </table>
</main>

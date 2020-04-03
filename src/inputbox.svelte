<script>
  export let caption = 'no caption',
    variabel = 0,
    endunit = '',
    min = 0,
    max = 100,
    step = 1
</script>

<div class="field has-addons">
  <div class="column is-one-third">
    <label class="label">{caption}</label>
  </div>
  <div class="column">
    <p class="control">
      <input
        class="input"
        type="number"
        bind:value={variabel}
        {min}
        {max}
        {step}
        on:input />
    </p>
  </div>
  <div class="column">
    <p class="control">
      <a class="button is-static">{endunit}</a>
    </p>
  </div>
</div>

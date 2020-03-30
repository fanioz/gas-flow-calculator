<script>
export let caption = "no caption", variabel = 0, endunit = "", min=0, max=100, step=1;
</script>
<label>{caption}
    <input type=number bind:value={variabel} {min} {max} {step}> {endunit}
</label>
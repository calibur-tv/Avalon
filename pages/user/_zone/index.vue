<script>
export default {
  fetch({ redirect, params }) {
    return redirect(`/user/${params.zone}/bangumi`)
  }
}
</script>

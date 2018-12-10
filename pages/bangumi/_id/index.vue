<script>
export default {
  fetch({ redirect, params }) {
    return redirect(`/bangumi/${params.id}/post`)
  }
}
</script>

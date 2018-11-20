<style lang="scss" scoped>
.dashboard-editor-container {
  margin: -20px;
  padding: 32px;
  background-color: rgb(240, 242, 245);

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>

<template>
  <div class="dashboard-editor-container">
    <panel-group/>
    <line-chart/>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  }
}
</script>

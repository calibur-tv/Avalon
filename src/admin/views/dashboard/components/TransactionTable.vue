<template>
  <el-table
    :data="list"
    style="width: 100%;padding-top: 15px;"
  >
    <el-table-column
      label="Order_No"
      min-width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.order_no }}
      </template>
    </el-table-column>
    <el-table-column
      label="Price"
      width="195"
      align="center"
    >
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandslsFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          success: 'success',
          pending: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: [],
        listLoading: false
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.listLoading = false
        }, 2500);
      }
    }
  }
</script>

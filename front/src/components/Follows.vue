<template>
  <q-table
    title="Repositories"
    :data="repositories"
    :columns="columns"
    row-key="title"
    dense
    :lodading="loading"
    :rows-per-page-options="[0]"
    :pagination.sync="pagination"
  >
    <template
      v-slot:body="props"
    >
      <q-tr :props="props">
        <q-td
          key="title"
          :props="props"
        >
          <a
            :href="props.row.url"
            target="_blank"
          >
            {{ props.row.name }}
          </a>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'Follows',
  props: {
    repositories: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      columns: [
        {
          label: 'Name',
          sortable: true,
          field: row => row.name,
          align: 'left',
          name: 'title'
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      }
    }
  }
}
</script>

<style>
  .my-table-details {
  max-width: 400px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>

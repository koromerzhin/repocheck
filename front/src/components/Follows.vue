<template>
  <q-table
    :title="title"
    :data="follows"
    :columns="columns"
    row-key="title"
    dense
  >
    <template
      v-slot:body="props"
    >
      <q-tr :props="props">
        <q-td
          key="avatar"
          :props="props"
        >
          <q-img
            :src="props.row.avatarUrl"
            style="height: 140px; max-width: 150px"
          />
          <br/>
          {{ props.row.name }}
        </q-td>
        <q-td
          key="bio"
          :props="props"
        >
          {{ props.row.bio }}
        </q-td>
        <q-td
          key="location"
          :props="props"
        >
          {{ props.row.location }}
        </q-td>
        <q-td
          key="website"
          :props="props"
        >
          <a
            :href="props.row.websiteUrl"
            target="_blank"
          >
          {{ props.row.websiteUrl }}
          </a>
        </q-td>
        <q-td
          key="repositories"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.login + '?tab=repositories'"
            target="_blank"
          >
          {{ props.row.repositories.totalCount }}
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
    follows: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
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
          label: 'avatar',
          sortable: false,
          field: row => row.avatarUrl,
          align: 'left',
          name: 'avatar'
        },
        {
          label: 'Bio',
          sortable: false,
          field: row => row.bio,
          align: 'left',
          name: 'bio'
        },
        {
          label: 'Location',
          sortable: true,
          field: row => row.location,
          align: 'left',
          name: 'location'
        },
        {
          label: 'website',
          sortable: true,
          field: row => row.websiteUrl,
          align: 'left',
          name: 'website'
        },
        {
          label: 'repositories',
          sortable: true,
          field: row => row.repositories.count,
          align: 'left',
          name: 'repositories'
        }
      ]
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

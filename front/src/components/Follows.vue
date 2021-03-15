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
          key="info"
          :props="props"
        >
          <q-img
            :src="props.row.avatarUrl"
            style="height: 140px; max-width: 150px"
          />
          <br/>
          <a
            :href="props.row.url"
            target="_blank"
          >
            {{ props.row.login }}<span v-if="props.row.name!==null"> ({{ props.row.name }})</span>
          </a>

          <ul>
            <li>
              <b>Created AT</b> : {{ props.row.createdAt }}
            </li>
            <li>
              <b>Updated AT</b> : {{ props.row.updatedAt }}
            </li>
          </ul>
          <br />
          {{ props.row.location }}
          <br />
          <a
            v-if="props.row.websiteUrl!==null"
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
            :href="props.row.url + '?tab=repositories'"
            target="_blank"
          >
          {{ props.row.repositories.totalCount }}
          </a>
        </q-td>
        <q-td
          key="stars"
          :props="props"
        >
          <a
            :href="props.row.url + '?tab=stars'"
            target="_blank"
          >
          {{ props.row.starredRepositories.totalCount }}
          </a>
        </q-td>
        <q-td
          key="bio"
          :props="props"
        >
          {{ props.row.bio }}
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
          align: 'left',
          name: 'info'
        },
        {
          label: 'repositories',
          sortable: true,
          field: row => row.repositories.count,
          align: 'left',
          name: 'repositories'
        },
        {
          label: 'stars',
          sortable: true,
          field: row => row.repositories.count,
          align: 'left',
          name: 'stars'
        },
        {
          label: 'Bio',
          sortable: false,
          field: row => row.bio,
          align: 'left',
          name: 'bio'
        }
      ]
    }
  }
}
</script>

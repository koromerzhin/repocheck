<template>
  <q-table
    title="Repositories"
    :data="repositories"
    :columns="columns"
    row-key="title"
    dense
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
        <q-td
          key="isArchived"
          :props="props"
        >
          <span v-if="props.row.isArchived">YES</span>
          <span v-else>NO</span>
        </q-td>
        <q-td
          key="date"
          :props="props"
        >
          <ul>
            <li>
              <b>Created AT</b> : {{ props.row.createdAt }}
            </li>
            <li>
              <b>Updated AT</b> : {{ props.row.updatedAt }}
            </li>
            <li>
              <b>Pushed AT</b> : {{ props.row.pushedAt }}
            </li>
          </ul>
        </q-td>
        <q-td
          key="description"
          :props="props"
        >
          <div class="my-table-details">
            {{ props.row.description }}
          </div>
        </q-td>
        <q-td
          key="languagesShow"
          :props="props"
        >
          <span
            v-if="props.row.languages.totalCount == 0"
          > - </span>
          <span v-else>
            {{ props.row.languages.totalCount }} :
            <ul>
              <li
                v-for="row in props.row.languages.edges"
                :key="row.id"
              >
                {{ row.node.name }}
              </li>
            </ul>
          </span>
        </q-td>
        <q-td
          key="licenseInfo"
          :props="props"
        >
          <span
            v-if="props.row.licenseInfo !== null"
          >
            {{ props.row.licenseInfo.name }}
          </span>
        </q-td>
        <q-td
          key="showissue"
          :props="props"
        >
          <a
            :href="clickIssue(props.row)"
            target="_blank"
          >
            <q-btn
              target="_blank"
              fab
              small
            >
              {{ props.row.issuesOpen.totalCount }} / {{ props.row.issuesClose.totalCount }}
            </q-btn>
          </a>
        </q-td>
        <q-td
          key="pulls"
          :props="props"
        >
          <a
            :href="clickPulls(props.row)"
            target="_blank"
          >
            <q-btn
              target="_blank"
              fab
              small
            >
              {{ props.row.pullRequestOpen.totalCount }} / {{ props.row.pullRequestClose.totalCount }}
            </q-btn>
          </a>
        </q-td>
        <q-td
          key="defaultBranchRef"
          :props="props"
        >
          {{ props.row.defaultBranchRef.name }}
        </q-td>
        <q-td
          key="etat"
          :props="props"
        >
            <a :href="clickAction(props.row)" target="_blank">
            <img :src="imageItem(props.row)" />
          </a>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'Repositories',
  props: {
    repositories: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      columns: [
        {
          label: 'Name',
          sortable: false,
          field: 'title',
          align: 'left',
          name: 'title'
        },
        {
          label: 'Is Archive',
          sortable: false,
          field: 'isArchived',
          align: 'left',
          name: 'isArchived'
        },
        {
          label: 'date',
          sortable: false,
          field: 'date',
          align: 'left',
          name: 'date'
        },
        {
          label: 'Description',
          sortable: false,
          field: 'description',
          align: 'left',
          name: 'description'
        },
        {
          label: 'Languages',
          sortable: false,
          field: 'languagesShow',
          align: 'left',
          name: 'languagesShow'
        },
        {
          label: 'license',
          sortable: false,
          field: 'licenseInfo',
          align: 'left',
          name: 'licenseInfo'
        },
        {
          label: 'issues',
          sortable: false,
          field: 'showissue',
          align: 'left',
          name: 'showissue'
        },
        {
          label: 'Pull requests',
          sortable: false,
          field: 'pulls',
          align: 'left',
          name: 'pulls'
        },
        {
          label: 'default branch',
          sortable: false,
          field: 'defaultBranchRef',
          align: 'left',
          name: 'defaultBranchRef'
        },
        {
          label: 'Etat',
          labeld: 'etat',
          sortable: false,
          field: 'etat',
          align: 'left',
          name: 'etat'
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      }
    }
  },
  methods: {
    clickAction (item) {
      return 'https://github.com/' + item.owner.login + '/' + item.name + '/actions'
    },
    imageItem (item) {
      return (
        'https://github.com/' +
        item.owner.login +
        '/' +
        item.name +
        '/workflows/Continuous%20Integration/badge.svg?branch=' +
        item.defaultBranchRef.name
      )
    },
    clickPulls (item) {
      return 'https://github.com/' + item.owner.login + '/' + item.name + '/pulls'
    },
    clickIssue (item) {
      return 'https://github.com/' + item.owner.login + '/' + item.name + '/issues'
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

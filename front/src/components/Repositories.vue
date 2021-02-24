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
          key="issueOpen"
          :props="props"
        >
          <a
            :href="clickIssue(props.row)"
            target="_blank"
          >
            {{ props.row.issuesOpen.totalCount }}
          </a>
        </q-td>
        <q-td
          key="issueClose"
          :props="props"
        >
          <a
            :href="clickIssue(props.row)"
            target="_blank"
          >
            {{ props.row.issuesClose.totalCount }}
          </a>
        </q-td>
        <q-td
          key="security"
          :props="props"
        >
          <a
            :href="props.row.url+'/security'"
            target="_blank"
          >
            Security
          </a>
        </q-td>
        <q-td
          key="insights"
          :props="props"
        >
          <a
            :href="props.row.url+'/pulse'"
            target="_blank"
          >
            insights
          </a>
        </q-td>
        <q-td
          key="pullsopen"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/pulls'"
            target="_blank"
          >
            {{ props.row.pullRequestOpen.totalCount }}
          </a>
        </q-td>
        <q-td
          key="pullsclose"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/pulls?q=is%3Apr+is%3Aclosed'"
            target="_blank"
          >
            {{ props.row.pullRequestClose.totalCount }}
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
        },
        {
          label: 'Is Archive',
          sortable: true,
          field: row => row.isArchived,
          align: 'left',
          name: 'isArchived'
        },
        {
          label: 'date',
          sortable: false,
          align: 'left',
          name: 'date'
        },
        {
          label: 'Description',
          sortable: false,
          align: 'left',
          name: 'description'
        },
        {
          label: 'Languages',
          sortable: false,
          align: 'left',
          name: 'languagesShow'
        },
        {
          label: 'license',
          sortable: true,
          field: row => row.licenseInfo.name,
          align: 'left',
          name: 'licenseInfo'
        },
        {
          label: 'issues Open',
          sortable: true,
          field: row => row.issuesOpen.totalCount,
          align: 'left',
          name: 'issueOpen'
        },
        {
          label: 'issues Close',
          sortable: true,
          field: row => row.issuesClose.totalCount,
          align: 'left',
          name: 'issueClose'
        },
        {
          label: 'security',
          sortable: false,
          align: 'left',
          name: 'security'
        },
        {
          label: 'insights',
          sortable: false,
          align: 'left',
          name: 'insights'
        },
        {
          label: 'Pull requests Open',
          sortable: true,
          field: row => row.pullRequestOpen.totalCount,
          align: 'left',
          name: 'pullsopen'
        },
        {
          label: 'Pull requests Close',
          sortable: true,
          field: row => row.pullRequestClose.totalCount,
          align: 'left',
          name: 'pullsclose'
        },
        {
          label: 'default branch',
          sortable: true,
          field: 'defaultBranchRef',
          align: 'left',
          name: 'defaultBranchRef'
        },
        {
          label: 'Etat',
          sortable: false,
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

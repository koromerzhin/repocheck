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
          key="stargazer"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/stargazers'"
            target="_blank"
          >
            {{ props.row.stargazerCount }}
          </a>
        </q-td>
        <q-td
          key="fork"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/network/members'"
            target="_blank"
          >
            {{ props.row.forkCount }}
          </a>
        </q-td>
        <q-td
          key="release"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/releases'"
            target="_blank"
          >
            {{ props.row.releases.totalCount }}
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
          key="information"
          :props="props"
        >
          <span>{{ props.row.sshUrl }}</span>
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
          <div class="my-table-details">
            {{ props.row.description }}
          </div>
          <div>
            <a
                :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/actions'"
                target="_blank"
            >
                <img :src="imageItem(props.row)" />
            </a>
          </div>
          <span
            v-if="props.row.languages.totalCount != 0"
          >
            Language {{ props.row.languages.totalCount }} :
            <ul>
              <li
                v-for="row in props.row.languages.edges"
                :key="row.id"
                :style="'color:'+row.node.color+';font-weight: bold;'"
              >
                {{ row.node.name }}
              </li>
            </ul>
          </span>
          <div class="row">
            <div class="col">
              <a
                :href="props.row.url+'/security'"
                target="_blank"
              >
                Security
              </a>
            </div>
            <div class="col">
              <a
                :href="props.row.url+'/pulse'"
                target="_blank"
              >
                insights
              </a>
            </div>
          </div>
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
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/issues'"
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
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/issues?q=is%3Aissue+is%3Aclosed'"
            target="_blank"
          >
            {{ props.row.issuesClose.totalCount }}
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
          key="vulnerabilityAlerts"
          :props="props"
        >
          <a
            :href="'https://github.com/' + props.row.owner.login + '/' + props.row.name + '/security/dependabot'"
            target="_blank"
          >
            {{ props.row.vulnerabilityAlerts.totalCount }}
          </a>
        </q-td>
        <q-td
          key="submodules"
          :props="props"
        >
          {{ props.row.submodules.totalCount }}
        </q-td>
        <q-td
          key="defaultBranchRef"
          :props="props"
        >
          {{ props.row.defaultBranchRef.name }}
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
          label: 'Stargazer',
          sortable: true,
          field: row => row.stargazerCount,
          align: 'left',
          name: 'stargazer'
        },
        {
          label: 'Forks',
          sortable: true,
          field: row => row.forkCount,
          align: 'left',
          name: 'fork'
        },
        {
          label: 'Releases',
          sortable: true,
          field: row => row.releases.totalCount,
          align: 'left',
          name: 'release'
        },
        {
          label: 'Is Archive',
          sortable: true,
          field: row => row.isArchived,
          align: 'left',
          name: 'isArchived'
        },
        {
          label: 'Information',
          sortable: false,
          align: 'left',
          name: 'information'
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
          label: 'Alerts',
          sortable: true,
          field: row => row.vulnerabilityAlerts.totalCount,
          align: 'left',
          name: 'vulnerabilityAlerts'
        },
        {
          label: 'Submodules',
          sortable: true,
          field: row => row.submodules.totalCount,
          align: 'left',
          name: 'submodules'
        },
        {
          label: 'default branch',
          sortable: true,
          field: 'defaultBranchRef',
          align: 'left',
          name: 'defaultBranchRef'
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      }
    }
  },
  methods: {
    imageItem (item) {
      return (
        'https://github.com/' +
        item.owner.login +
        '/' +
        item.name +
        '/workflows/Continuous%20Integration/badge.svg?branch=' +
        item.defaultBranchRef.name
      )
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

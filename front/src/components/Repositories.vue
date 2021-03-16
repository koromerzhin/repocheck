<template>
  <q-table
    :title="title"
    :data="repositories"
    :columns="columns"
    row-key="title"
    dense
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
          key="watchers"
          :props="props"
        >
          <a
            :href="props.row.url + '/watchers'"
            target="_blank"
          >
            {{ props.row.watchers.totalCount }}
          </a>
        </q-td>
        <q-td
          key="stargazer"
          :props="props"
        >
          <a
            :href="props.row.url + '/stargazers'"
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
            :href="props.row.url + '/network/members'"
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
            :href="props.row.url + '/releases'"
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
          key="topics"
          :props="props"
        >
          {{ props.row.repositoryTopics.totalCount }}
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
                :href="props.row.url + '/actions'"
                target="_blank"
            >
                <q-img
                    :src="imageItem(props.row)"
                    style="width:205px; height: 20px;"
                />
            </a>
          </div>
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
          <span
            v-if="props.row.languages.totalCount != 0"
          >
            Language :
            <div class="row">
              <div
                v-for="row in props.row.languages.edges"
                :key="row.id"
                class="col"
                :style="'color:'+row.node.color+';font-weight: bold;'"
              >
                {{ row.node.name }}
              </div>
            </div>
          </span>
          <span
            v-if="props.row.repositoryTopics.totalCount != 0"
          >
            Topics :
            <div class="row">
              <div
                v-for="row in props.row.repositoryTopics.nodes"
                :key="row.id"
                class="col"
              >
                <a
                  :href="row.url"
                  target="_blank"
                >
                  {{ row.topic.name }}
                </a>
              </div>
            </div>
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
            :href="props.row.url + '/issues'"
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
            :href="props.row.url + '/issues?q=is%3Aissue+is%3Aclosed'"
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
            :href="props.row.url + '/pulls'"
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
            :href="props.row.url + '/pulls?q=is%3Apr+is%3Aclosed'"
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
            :href="props.row.url + '/security/dependabot'"
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
    title: {
      type: String,
      default: ''
    },
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
          label: 'Watchers',
          sortable: true,
          field: row => row.watchers.totalCount,
          align: 'left',
          name: 'watchers'
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
          label: 'Topics',
          sortable: true,
          field: row => row.repositoryTopics.totalCount,
          align: 'left',
          name: 'topics'
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
      ]
    }
  },
  methods: {
    imageItem (item) {
      return (
        item.url +
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

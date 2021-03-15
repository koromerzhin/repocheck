<template>
  <q-table
    :title="title"
    :data="stars"
    :columns="columns"
    row-key="title"
    dense
  >
    <template
      v-slot:body="props"
    >
      <q-tr :props="props">
        <q-td
          key="user"
          :props="props"
        >
          <q-img
            :src="props.row.owner.avatarUrl"
            style="height: 140px; max-width: 150px"
          />
          <br/>
          <a
            :href="props.row.owner.url"
            target="_blank"
          >
            {{ props.row.owner.login }}
          </a>
        </q-td>
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
            :href="props.row.owner.url + '/stargazers'"
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
            :href="props.row.owner.url + '/network/members'"
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
            :href="props.row.owner.url + '/releases'"
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
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'Stars',
  props: {
    title: {
      type: String,
      default: ''
    },
    stars: {
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
          label: 'User',
          sortable: false,
          align: 'left',
          name: 'user'
        },
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

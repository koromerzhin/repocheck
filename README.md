# Welcome to @koromerzhin/repocheck 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/koromerzhin/repocheck/graphs/commit-activity)
![Continuous Integration](https://github.com/koromerzhin/repocheck/workflows/ci/badge.svg?branch=develop)

> Check mes repos github

## 🏠 [Homepage](https://github.com/koromerzhin/repocheck#readme)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Need

Software:

- npm
- docker
- repository koromerzhin/lampy

Config:

docker swarm

Hosts:

- repocheck.traefik.me
- build-repocheck.traefik.me

## Download

```sh
git clone --recurse-submodules git@github.com:koromerzhin/repocheck.git repocheck
cd repocheck
```

## Install

```sh
cp back/.env.dist back/.env
```

Generate new [token](https://github.com/settings/tokens)
with all scopes and edit back/.env to add value to VUE_APP_GITHUB_TOKEN

```sh
npm install
```

## Exec

```sh
npm run exec
```

## Author

👤 **koromerzhin**

- Website: [https://www.letoullec.fr](https://www.letoullec.fr)
- Twitter: [@koromerzhin](https://twitter.com/koromerzhin)
- Github: [@koromerzhin](https://github.com/koromerzhin)
- LinkedIn: [@koromerzhin](https://linkedin.com/in/koromerzhin)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check
[issues page](https://github.com/koromerzhin/repocheck/issues).
You can also take a look at the
[contributing guide](https://github.com/koromerzhin/repocheck/blob/develop/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [koromerzhin](https://github.com/koromerzhin).

This project is
[MIT](https://github.com/koromerzhin/repocheck/blob/develop/LICENSE) licensed.

## ✨ Contributors

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/koromerzhin"><img src="https://avatars0.githubusercontent.com/u/308012?v=4" width="100px;" alt=""/><br /><sub><b>Le TOULLEC Martial</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.mend.io/free-developer-tools/renovate/"><img src="https://avatars.githubusercontent.com/u/25180681?v=4" width="100px;" alt=""/><br /><sub><b>Mend Renovate</b></sub></a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

---

_This README was generated with ❤️ by
[readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

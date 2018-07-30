const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
    },
    element: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install element-ui?',
    },
    e2e: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Setup e2e tests?',
    },
    sso: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use sso in project?',
    },
    ssoConfig: {
      when: 'isNotTest && sso',
      type: 'string',
      required: false,
      message: 'sso cliend id',
      default: 'your_sso_cliend_id',
    },
    ssoOriginHost: {
      when: 'isNotTest && sso',
      type: 'string',
      required: false,
      message: 'your sso origin host',
      default: 'your_sso_origin_host',
    },
    watermark: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use watermark in project?',
    },
    portm: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use portm in project?',
    },
    portmTarget: {
      when: 'isNotTest && portm',
      type: 'string',
      required: false,
      message: 'portm target',
      default: 'portm_target',
    },
    portmUserToken: {
      when: 'isNotTest && portm',
      type: 'string',
      required: false,
      message: 'portm user token',
      default: 'your_user_token',
    },
    portmProjectToken: {
      when: 'isNotTest && portm',
      type: 'string',
      required: false,
      message: 'portm project token',
      default: 'your_project_token',
    },
    codex: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use codex publish?',
    },
    commitLint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use commit lint?',
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    'tests/e2e/**/*': 'e2e',
    'cypress.json': "e2e",
    'f2eci.json': 'codex',
    'commitlint.config.js': "commit",
    'src/views/SSOCallback.vue': "sso",
    'src/utils/sso.ts': "sso",
    'src/styles/element.scss': "element"
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}

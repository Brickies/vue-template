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
    if_not(item, options) {
      if (!item) {
        return options.fn(this);
      }
    }
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
    mtd: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install mtd-vue?',
    },
    mtHost: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'mt host',
      default: 'mt_host',
    },
    sso: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use sso in project?',
    },
    prodSsoHost: {
      when: 'isNotTest && sso',
      type: 'string',
      required: false,
      message: 'prod sso host',
      default: 'prod_sso_host',
    },
    devSsoHost: {
      when: 'isNotTest && sso',
      type: 'string',
      required: false,
      message: 'dev sso host',
      default: 'dev_sso_host',
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
    s3: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'use s3 deploy?',
    },
    papi: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use papi in project?',
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
    'src/views/SSOCallback.vue': "sso",
    'manifest.yaml': "s3",
    's3plus.config.js': "s3"
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

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ya Gotta Eat',
  tagline: 'A Deliciously Modern Restaurant Menu API',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'your-org', // Usually your GitHub org/user name.
  projectName: 'ya-gotta-eat', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Ya Gotta Eat API',
        logo: {
          alt: 'Ya Gotta Eat Logo',
          src: 'img/ya-gotta-eat-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'api/overview',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/your-username/ya-gotta-eat',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'API Overview',
                to: '/docs/api/overview',
              },
              {
                label: 'Queries',
                to: '/docs/api/queries',
              },
              {
                label: 'Mutations',
                to: '/docs/api/mutations',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Issues',
                href: 'https://github.com/your-org/ya-gotta-eat/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ya Gotta Eat. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['graphql'],
      },
    }),
};

module.exports = config; 
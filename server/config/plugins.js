module.exports = ({ env }) => ({
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook:
        "https://api.vercel.com/v1/integrations/deploy/prj_8GTYTvZ7eKXhIUiYkXm69XCcwGWt/Txs3471fnq",
      apiToken: "p4KPHEHaYdI2ksYW9W1r1816",
      appFilter: "e-commerce",
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
});

// module.exports = ({ env }) => ({
//   "vercel-deploy": {
//     enabled: true,
//     config: {
//       deployHook: process.env("VERCEL_DEPLOY_PLUGIN_HOOK"),
//       apiToken: process.env("VERCEL_DEPLOY_PLUGIN_API_TOKEN"),
//       appFilter: process.env("VERCEL_DEPLOY_PLUGIN_APP_FILTER"),
//       roles: [process.env("VERCEL_DEPLOY_PLUGIN_ROLES")],
//     },
//   },
// });

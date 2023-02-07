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

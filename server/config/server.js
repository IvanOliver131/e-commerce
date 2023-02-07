module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook:
        "https://api.vercel.com/v1/integrations/deploy/prj_8GTYTvZ7eKXhIUiYkXm69XCcwGWt/Txs3471fnq",
      apiToken: "p4KPHEHaYdI2ksYW9W1r1816",
      appFilter: "e-commerce",
      teamFilter: "",
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
});

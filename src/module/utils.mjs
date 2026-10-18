/* -------------------------------------------- */
/*  Handlebars Template Helpers                 */
/* -------------------------------------------- */

/**
 * Define a set of template paths to pre-load. Pre-loaded templates are compiled and cached for fast access when
 * rendering. These paths will also be available as Handlebars partials by using the file name
 * (e.g. "soul.actor-traits").
 * Taken from foundryvtt/dnd5e's github, thanks foundry team
 * @returns {Promise}
 */
export async function preloadHandlebarsTemplates() {
  const partials = [
    // ItemSheet parts partials
    "systems/soul/templates/item/parts/stats.hbs",
    "systems/soul/templates/item/parts/characteristics.hbs"
  ];

  const paths = {};
  for ( const path of partials ) {
    paths[path] = path;
    paths[path.replace(".hbs", ".html")] = path;
    paths[`soul.${path.split("/").pop().replace(".hbs", "")}`] = path;
  }

  return foundry.applications.handlebars.loadTemplates(paths);
}
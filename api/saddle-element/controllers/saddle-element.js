'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    /**
     * CUSTOM ENDPOINT CUSTOMIZATION
     * 
     * @param {*} ctx 
     * @returns {Array}
     */
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['saddle-element'].search(ctx.query);
    } else {
      entities = await strapi.services['saddle-element'].find(ctx.query);
    }

    return entities.map(entity => {
        entity = {
            z_index: entity.z_index,
            priority: entity.priority,
            title: entity.title,
            saddle_element_variants: entity.saddle_element_variants.map(variant => ({
                title: variant.title,
                thumbnail_hex_color: variant.thumbnail_hex_color,
                title: variant.title,
                img: {
                    url: variant.img.url
                }
            }))
        }
        return sanitizeEntity(entity, { model: strapi.models['saddle-element'] })
    });
  },
};

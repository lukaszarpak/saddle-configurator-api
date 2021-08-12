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
      entities = await strapi.services['saddle-type'].search(ctx.query);
    } else {
      entities = await strapi.services['saddle-type'].find(ctx.query);
    }

    return entities.map(entity => {
        entity = {
            id: entity.id,
            title: entity.title,
            background_img: {
                url: entity.background_img.url
            },
            saddle_elements: entity.saddle_elements.map(element => ({
                id: element.id,
                z_index: element.z_index,
                priority: element.priority,
                title: element.title,
            }))
        }
        return sanitizeEntity(entity, { model: strapi.models['saddle-type'] })
    });
  },
};

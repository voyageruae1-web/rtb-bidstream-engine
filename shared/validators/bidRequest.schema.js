const { z } = require("zod");

/**
 * RTB BID REQUEST SCHEMA (CORE CONTRACT)
 * This is the entry validation for ALL incoming ad requests
 */
const bidRequestSchema = z.object({
  id: z.string().min(1), // request id

  imp: z.array(
    z.object({
      id: z.string(),
      tagid: z.string().optional(),
      bidfloor: z.number().optional(),
    })
  ).min(1),

  site: z.object({
    domain: z.string().optional(),
    page: z.string().optional(),
  }).optional(),

  device: z.object({
    ip: z.string().optional(),
    ua: z.string().optional(),
    geo: z.object({
      country: z.string().optional(),
      city: z.string().optional(),
    }).optional(),
  }).optional(),

  user: z.object({
    id: z.string().optional(),
    buyeruid: z.string().optional(),
  }).optional(),

  at: z.number().optional(),   // auction type
  tmax: z.number().optional(), // timeout in ms
});

module.exports = { bidRequestSchema };
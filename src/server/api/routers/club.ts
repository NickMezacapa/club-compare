import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const clubRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    create: publicProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.post.create({
                data: {
                    name: input.name,
                },
            });
        }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
        const post = await ctx.db.post.findFirst({
            orderBy: { createdAt: "desc" },
        });

        return post ?? null;
    }),

    getAllBrands: publicProcedure.query(async ({ ctx }) => {
        const brands = await ctx.db.brand.findMany({
            select: {
                name: true,
            },
        });

        return brands.map(brand => brand.name);
    }),

    getSpecsForModel: publicProcedure
        .input(z.object({
            brand: z.string().min(1),
            model: z.string().min(1)
        }))
        .query(async ({ ctx, input }) => {
            const club = await ctx.db.model.findFirst({
                where: {
                    name: input.model,
                    brand: {
                        name: input.brand
                    }
                },
                select: {
                    specs: true // Selecting the specs from the model
                }
            });

            if (!club?.specs) {
                throw new Error('Specifications not found for the specified brand and model');
            }

            return {
                specs: club.specs // Returning the entire specs JSON
            };
        }),
});

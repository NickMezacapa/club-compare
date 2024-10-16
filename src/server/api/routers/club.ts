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

    // New search route for dynamically searching golf clubs
    searchClubs: publicProcedure
        .input(z.string().min(1))
        .query(async ({ ctx, input }) => {
            const searchTerms = input.split(" ");

            const clubs = await ctx.db.model.findMany({
                where: {
                    OR: [
                        { name: { contains: input, mode: "insensitive" } },
                        { brand: { name: { contains: input, mode: "insensitive" } } },
                        {
                            AND: searchTerms.map(term => ({
                                OR: [
                                    { name: { contains: term, mode: "insensitive" } },
                                    { brand: { name: { contains: term, mode: "insensitive" } } },
                                ],
                            })),
                        },
                    ],
                },
                select: {
                    name: true,
                    brand: {
                        select: {
                            name: true,
                        },
                    },
                    specs: true
                },
                take: 10, // Limit the number of results
            });

            return clubs;
        }),

    getClubByName: publicProcedure
        .input(z.string().min(1))
        .query(async ({ ctx, input }) => {
            const club = await ctx.db.model.findFirst({
                where: {
                    name: input, // Club name is expected in the input
                },
                select: {
                    name: true,
                    brand: {
                        select: {
                            name: true,
                        },
                    },
                    specs: true, // Return all specs for the club
                },
            });

            if (!club) {
                throw new Error("Club not found");
            }

            return club;
        }),

});

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import inquirer from 'inquirer';

// Initialize Prisma client to interact with the database
const prisma = new PrismaClient();

interface Specs {
    moi: number;
    mpf: number;
    loft: number;
    year: number;
    moi_cf: number;
    img_src: string;
    vcog_cf: number;
    category: string;
    basic_vcog: number;
    vcog_adjst: number;
    actual_rcog: number;
    actual_vcog: number;
    calc_points: number;
    head_weight: number;
    c_dimmension: number;
}

async function promptUserForClubData(): Promise<{ brandName: string; specs: Specs }> {
    const { brandName } = await inquirer.prompt<{ brandName: string }>([
        {
            type: 'input',
            name: 'brandName',
            message: 'Enter the club brand name:',
        }
    ]);

    const specs: Specs = await inquirer.prompt<Specs>([
        {
            type: 'input',
            name: 'moi',
            message: 'Enter the MOI:',
            validate: (value) => !isNaN(Number(value)) || 'MOI must be a number',
        },
        {
            type: 'input',
            name: 'mpf',
            message: 'Enter the MPF:',
            validate: (value) => !isNaN(Number(value)) || 'MPF must be a number',
        },
        {
            type: 'input',
            name: 'loft',
            message: 'Enter the loft:',
            validate: (value) => !isNaN(Number(value)) || 'Loft must be a number',
        },
        {
            type: 'input',
            name: 'year',
            message: 'Enter the year:',
            validate: (value) => !isNaN(Number(value)) || 'Year must be a number',
        },
        {
            type: 'input',
            name: 'moi_cf',
            message: 'Enter the MOI CF:',
            validate: (value) => !isNaN(Number(value)) || 'MOI CF must be a number',
        },
        {
            type: 'input',
            name: 'img_src',
            message: 'Enter the image URL:',
        },
        {
            type: 'input',
            name: 'vcog_cf',
            message: 'Enter the VCOG CF:',
            validate: (value) => !isNaN(Number(value)) || 'VCOG CF must be a number',
        },
        {
            type: 'input',
            name: 'category',
            message: 'Enter the category:',
        },
        {
            type: 'input',
            name: 'basic_vcog',
            message: 'Enter the basic VCOG:',
            validate: (value) => !isNaN(Number(value)) || 'Basic VCOG must be a number',
        },
        {
            type: 'input',
            name: 'vcog_adjst',
            message: 'Enter the VCOG adjustment:',
            validate: (value) => !isNaN(Number(value)) || 'VCOG adjustment must be a number',
        },
        {
            type: 'input',
            name: 'actual_rcog',
            message: 'Enter the actual RCOG:',
            validate: (value) => !isNaN(Number(value)) || 'Actual RCOG must be a number',
        },
        {
            type: 'input',
            name: 'actual_vcog',
            message: 'Enter the actual VCOG:',
            validate: (value) => !isNaN(Number(value)) || 'Actual VCOG must be a number',
        },
        {
            type: 'input',
            name: 'calc_points',
            message: 'Enter the calculated points:',
            validate: (value) => !isNaN(Number(value)) || 'Calculated points must be a number',
        },
        {
            type: 'input',
            name: 'head_weight',
            message: 'Enter the head weight:',
            validate: (value) => !isNaN(Number(value)) || 'Head weight must be a number',
        },
        {
            type: 'input',
            name: 'c_dimmension',
            message: 'Enter the C dimension:',
            validate: (value) => !isNaN(Number(value)) || 'C dimension must be a number',
        },
    ]);

    return { brandName, specs };
}

async function addClubToDatabase() {
    try {
        const { brandName, specs } = await promptUserForClubData();

        // Find brand by name, case-insensitive
        const brand = await prisma.brand.findFirst({
            where: { name: { equals: brandName, mode: 'insensitive' } }
        });

        if (!brand) {
            console.log(`Brand ${brandName} not found. Please ensure it exists in the database.`);
            return;
        }

        // Add the new club model under the brand
        await prisma.model.create({
            data: {
                name: brandName,
                specs: specs as unknown as object, // Prisma expects object for JSON, ensure it's properly typed
                brand: { connect: { id: brand.id } },
            },
        });

        console.log(`Successfully added the ${brandName} model to the database.`);
    } catch (error) {
        console.error('An error occurred while adding the club:', error);
    } finally {
        // Always disconnect from the database properly
        await prisma.$disconnect();
    }
}

// Execute the function
await addClubToDatabase();

import { ApplicationModel } from '../models/Application';
import { GuideModel } from '../models/Guide';
import { SEED_APPLICATIONS, SEED_GUIDES } from './seedData';

export async function seedDatabase(): Promise<void> {
  try {
    for (const appData of SEED_APPLICATIONS) {
      await ApplicationModel.findOneAndUpdate(
        { slug: appData.slug },
        { $set: appData },
        { upsert: true, new: true }
      );
    }
    console.log(`[Seed] Seeded ${SEED_APPLICATIONS.length} core OAuth applications.`);

    for (const guideData of SEED_GUIDES) {
      const app = await ApplicationModel.findOne({ slug: guideData.slug });
      const doc = {
        ...guideData,
        applicationId: app ? app._id : undefined
      };
      await GuideModel.findOneAndUpdate(
        { slug: guideData.slug },
        { $set: doc },
        { upsert: true, new: true }
      );
    }
    console.log(`[Seed] Seeded ${SEED_GUIDES.length} comprehensive OAuth guides.`);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
  }
}

import { HomeHero } from '@/components/home/HomeHero';
import { Newsletter } from '@/components/home/Newsletter';
import { Offers } from '@/components/home/Offers';
import { Recommended } from '@/components/home/Recommended';
import { Stories } from '@/components/home/Stories';
import { Testimonials } from '@/components/home/Testimonials';
import { TopDestinations } from '@/components/home/TopDestinations';

/** Home: hero + tabbed search, offers, destinations, recommendations, stories, testimonials, newsletter. */
export default function HomePage() {
  return (
    <main id="main" className="overflow-x-hidden w-full max-w-full">
      <HomeHero />
      <Offers />
      <TopDestinations />
      <Recommended />
      <Stories />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

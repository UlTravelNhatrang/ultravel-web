import { CouponBanner } from '@/components/home/CouponBanner';
import { Destinations } from '@/components/home/Destinations';
import { Feed } from '@/components/home/Feed';
import { Food } from '@/components/home/Food';
import { Hero } from '@/components/home/Hero';
import { LocalHub } from '@/components/home/local-hub/LocalHub';
import { Method } from '@/components/home/Method';
import { Partners } from '@/components/home/Partners';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Social } from '@/components/home/Social';
import { Tours } from '@/components/home/Tours';
import { Vouchers } from '@/components/home/Vouchers';
import { MotionProvider } from '@/components/motion/MotionProvider';

export default function HomePage() {
  return (
    <>
      <main id="main" className="overflow-x-hidden w-full max-w-full">
        <Hero />
        <Vouchers />
        <LocalHub />
        <Destinations />
        <PromoBanner />
        <Food />
        <Feed />
        <Tours />
        <Method />
        <Social />
        <CouponBanner />
        <Partners />
      </main>
      <MotionProvider />
    </>
  );
}

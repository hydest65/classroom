import { AiAssistant } from "../components/home/AiAssistant";
import { BrandIntro } from "../components/home/BrandIntro";
import { Booking } from "../components/home/Booking";
import { CourseEntry } from "../components/home/CourseEntry";
import { Community } from "../components/home/Community";
import { ExperienceCourse } from "../components/home/ExperienceCourse";
import { Faq } from "../components/home/Faq";
import { FooterCta } from "../components/home/FooterCta";
import { Membership } from "../components/home/Membership";
import { Services } from "../components/home/Services";
import { Testimonials } from "../components/home/Testimonials";
import { ZenHero } from "../components/home/ZenHero";

export default function HomePage() {
  return (
    <>
      <ZenHero />
      <BrandIntro />
      <ExperienceCourse />
      <Services />
      <Booking />
      <CourseEntry />
      <Membership />
      <Community />
      <AiAssistant />
      <Testimonials />
      <Faq />
      <FooterCta />
    </>
  );
}

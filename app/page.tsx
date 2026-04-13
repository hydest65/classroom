import { AiAssistant } from "../components/home/AiAssistant";
import { BrandIntro } from "../components/home/BrandIntro";
import { Booking } from "../components/home/Booking";
import { CourseEntry } from "../components/home/CourseEntry";
import { Community } from "../components/home/Community";
import { ExperienceCourse } from "../components/home/ExperienceCourse";
import { Faq } from "../components/home/Faq";
import { FooterCta } from "../components/home/FooterCta";
import { Hero } from "../components/home/Hero";
import { Membership } from "../components/home/Membership";
import { Services } from "../components/home/Services";
import { Testimonials } from "../components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
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

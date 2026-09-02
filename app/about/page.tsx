import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Marang House provides a nurturing home for children aged 7 to 14 living with chronic illnesses, ensuring their medical care and education go hand in hand.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO — tightened copy, deep navy gradient bg */}
      <section className="about-navy">
        <div className="about-navy-left">
          <h1>
            We are
            <span>Marang House</span>
          </h1>
          <p>
            Since 1998, Marang House has been a home for children aged 7 to 14 living
            with serious chronic illness. We provide a safe, nurturing place to live
            while they receive daily treatment at a tertiary hospital, with their
            education running alongside, never paused.
          </p>
          <p className="about-navy-important">
            No child should have to choose between their health and their future.
          </p>
        </div>
        <Reveal className="about-navy-photo-wrap">
          <BgPhoto
            src={cld("v1786782366/MH-Group-kids.jpg")}
            alt="Children at Marang House wearing Marang House t-shirts"
            className="about-navy-photo"
            position="center 35%"
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </Reveal>
      </section>

      {/* 2. THE CHILDREN WE SERVE — orange rays bg. Uses the cutout element
          photo (swapped from Contact page) instead of the kid-hat image
          (which moved to Contact). */}
      <section className="about-children">
        <Parallax className="about-children-doodle" strength={14}>
          <Image
            src={cld("v1786782353/MH-real-cloud.png")}
            alt=""
            width={400}
            height={400}
            style={{ width: "100%", height: "auto" }}
            aria-hidden="true"
          />
        </Parallax>
        <div className="about-children-inner">
          <Reveal as="figure" className="about-children-photo">
            <Image
              src={cld("MH-info-pg-element.png")}
              alt="Children at Marang House"
              width={1000}
              height={1000}
              style={{ width: "100%", height: "auto" }}
            />
          </Reveal>
          <div className="about-children-text">
            <h2>The Children We Serve</h2>
            <p>
              They arrive from communities across South Africa, children as young as
              seven, travelling hundreds of kilometres to Johannesburg for life-saving treatment.
              Many have spent more days in hospital than they have at home. Some arrive
              frightened. All of them arrive brave.
            </p>
            <p>
              These are children living with conditions that demand constant medical care:
              kidney disease requiring dialysis, diabetes needing daily insulin management,
              and other chronic illnesses with treatment plans that stretch across months and
              years. Their families often cannot afford the supervision, transport, and
              environment their children need to heal.
            </p>
            <p>
              In 1998, Dr Pieter Ernst saw this gap and founded Marang House as a beacon
              of hope. <em>Marang</em> is the Setswana word for a ray of sunshine, the
              light we try to bring into the life of every child who walks through our doors.
            </p>
            <p>
              What began as one doctor&rsquo;s vision has grown into a home that has served
              hundreds of children over more than twenty-eight years, proving that healing
              happens best when a child feels safe, loved, and part of a family.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SALOME'S STORY — moved up from bottom to become the emotional
          centrepiece. After "here's the problem" comes "here's the person
          who lives this every day." Deep navy bg. */}
      <section className="about-story">
        <Parallax className="about-story-doodle" strength={16}>
          <Image
            src={cld("v1786782369/MH-star-giff.gif")}
            alt=""
            width={400}
            height={400}
            style={{ width: "100%", height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
        </Parallax>
        <div className="about-story-inner">
          <span className="about-story-eyebrow">In Her Own Words</span>
          <h2>Meet Salome, Our Matron</h2>
          <p>
            Salome, Matron of Marang House, was fourteen years old when she watched her grandmother pass
            away at home. That was the moment she decided she wanted to become a nurse.
          </p>
          <p className="about-story-quote">
            &ldquo;Years later, I worked alongside Dr Pieter Ernst in theatre. One day he asked me if I
            would come and help at a children&rsquo;s home called Marang House. He saw something in me
            that I couldn&rsquo;t yet see in myself. Today I know exactly what he saw.&rdquo;
          </p>
          <p className="about-story-standout">
            Children don&rsquo;t heal because of insulin alone. Children heal because they feel
            <span> secure and loved.</span>
          </p>
          <p>
            Every child who comes to Marang House has already faced more than most adults. They leave
            their families and travel hundreds of kilometres to Johannesburg for life-saving treatment.
            Many arrive frightened. Some have spent more days in hospital than they have at home.
          </p>
          <p>Every one of them deserves to feel safe. That is why Marang House exists.</p>
          <p>
            It takes many people to create that feeling of security. A volunteer helping with homework.
            A donor buying school shoes. A warm meal after a long day at hospital. A hug before bedtime.
          </p>
          <p>Together, those small acts of kindness become something much bigger.</p>
          <p>
            They become <strong>The Marang House Circle of Light</strong>. Together, we are the
            Lightkeepers.
          </p>
          <p>
            Security isn&rsquo;t created in a single day. It is built every single month. That is why
            monthly giving matters. Because when children know they are safe, healing can begin.
          </p>
          <div className="about-story-tagline">
            One Home &middot; One Circle &middot; <span>A Thousand Lightkeepers</span> &middot; Endless
            Hope
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO — 3-card grid, now About-exclusive (removed from Home) */}
      <section className="about-whatwedo">
        <Image
          className="about-whatwedo-cloud"
          src={cld("MH-cloud-giff.gif")}
          alt=""
          width={1000}
          height={1000}
          style={{ height: "auto" }}
          aria-hidden="true"
          unoptimized
        />
        <h2>What We Do:</h2>
        <div className="about-whatwedo-grid">
          <Image
            src={cld("MH-what-we-do-1.png")}
            alt="Accommodate 12 children at a time"
            width={1000}
            height={1000}
          />
          <Image
            src={cld("MH-what-we-do-2.png")}
            alt="Offer the necessities: food, housing"
            width={1000}
            height={1000}
          />
          <Image
            src={cld("MH-what-we-do-3.png")}
            alt="Round-the-clock medical care"
            width={1000}
            height={1000}
          />
        </div>
      </section>

      {/* 5. CLOSING CTA BRIDGE — deep navy, links to Lightkeepers + Donate */}
      <section className="about-bridge">
        <div className="about-bridge-inner">
          <h2>
            This is Marang House.<br />
            <span>Now meet the people who keep the light shining.</span>
          </h2>
          <p>
            Every month, a community of Lightkeepers makes it possible for children to
            heal in safety. Join the circle, or give once and change a life today.
          </p>
          <div className="about-bridge-btns">
            <Link href="/lightkeepers" className="btn btn-about-bridge-primary">
              Meet the Lightkeepers
            </Link>
            <Link href="/donate" className="btn btn-about-bridge-secondary">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import Parallax from "@/components/motion/Parallax";
import ParallaxBgPhoto from "@/components/motion/ParallaxBgPhoto";
import { cld } from "@/lib/images";
import { DONATION } from "@/lib/site-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Become a Marang House Lightkeeper with a monthly donation through BackaBuddy, or support the house by EFT.",
  path: "/donate",
});

export default function DonatePage() {
  return (
    <>
      {/* 1. HERO — full-bleed photo with the heading/CTA reading directly
          over it behind a dark scrim, instead of two equal-weight boxes
          (photo tile + separate text tile) side by side. Same "text over
          photo" language the Lightkeepers hero already uses, so the photo
          and copy read as one composition rather than a pair of cards. */}
      <section className="donate-hero">
        <ParallaxBgPhoto
          src={cld("v1787755261/MH_-_Website_-_Clo_-_Close_Up.webp")}
          alt="A child at Marang House smiling while hugging a toy"
          className="donate-hero-bg"
          position="center 30%"
          sizes="100vw"
          priority
          strength={40}
        />
        <div className="donate-hero-scrim" aria-hidden="true" />
        <div className="donate-hero-text">
          <h1 className="donate-hero-heading">Donate</h1>
          <p className="donate-hero-body">
            Your donation keeps the lights on, the kitchen warm, and the hospital
            transport running for children who have nowhere else to go. Whether it&rsquo;s
            a once-off gift or a monthly commitment, every contribution goes directly to
            the children in our care.
          </p>
          <ButtonLink
            href={DONATION.primary.url}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate via BackaBuddy
          </ButtonLink>
        </div>
      </section>

      {/* 2. DONATE BODY — orange rays bg, BackaBuddy CTA + bank details + tax/BBBEE info */}
      <section className="donate-body-band">
      <Image
        className="donate-body-doodle"
        src={cld("v1786782358/MH-cloud-giff.gif")}
        alt=""
        width={300}
        height={300}
        style={{ height: "auto" }}
        unoptimized
        aria-hidden="true"
      />
      <div className="donate-body">
        <div className="donate-tiles">
          <div className="donate-primary">
            <p className="donate-primary__eyebrow">Become a Lightkeeper</p>
            <h2>Give monthly <span className="keep-together">through BackaBuddy</span></h2>
            <p>
              A monthly donor becomes a Marang House Lightkeeper, part of the community
              that keeps the Circle of Light shining. Your recurring gift provides
              stability that one-off donations cannot.
            </p>
            <ButtonLink
              href={DONATION.primary.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {DONATION.primary.label}
            </ButtonLink>
          </div>
          <div className="bank-box">
            <h3>Bank transfer</h3>
            <dl className="bank-details">
              <dt>Bank</dt>
              <dd>{DONATION.eft.bank}</dd>
              <dt>Branch</dt>
              <dd>{DONATION.eft.branch}</dd>
              <dt>Branch No</dt>
              <dd>{DONATION.eft.branchCode}</dd>
              <dt>Account Name</dt>
              <dd>{DONATION.eft.accountName}</dd>
              <dt>Account No</dt>
              <dd>{DONATION.eft.accountNumber} ({DONATION.eft.accountType.toLowerCase()})</dd>
              <dt>Swift No</dt>
              <dd>{DONATION.eft.swiftCode}</dd>
            </dl>
            <p className="bank-note">
              {DONATION.eft.referenceInstruction} Send proof of payment to{" "}
              <strong>{DONATION.eft.proofOfPaymentEmail}</strong>.
            </p>
          </div>
          <div className="info-tile">
            <span className="info-tile-icon" aria-hidden="true">🧾</span>
            <div>
              <span className="info-tile-eyebrow">Section 18A</span>
              <h3>Tax Deductions</h3>
              <p>
                Donations are tax-deductible in South Africa under Section 18A of the Income Tax Act. A
                certificate can be issued after donation.
              </p>
            </div>
          </div>
          <div className="info-tile">
            <span className="info-tile-icon" aria-hidden="true">🤝</span>
            <div>
              <span className="info-tile-eyebrow">Corporate Giving</span>
              <h3>BBBEE Scorecard Points</h3>
              <p>
                Corporate donors can earn B-BBEE scorecard points through their contribution
                to Marang House. <Link href="/contact">Contact us</Link> to discuss options{" "}
                <span className="keep-together">and requirements.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* 3. OTHER WAYS TO GIVE — deep navy bg, orange-tinted cards */}
      <section className="donate-other">
        <Parallax className="donate-other-doodle" strength={16}>
          <Image
            src={cld("v1786782365/MH-love-giff.gif")}
            alt=""
            width={320}
            height={320}
            style={{ width: "100%", height: "auto" }}
            unoptimized
            aria-hidden="true"
          />
        </Parallax>
        <div className="donate-other-inner">
          <h2>Other Ways To Give</h2>
          <div className="donate-other-grid">
            <div className="donate-other-card">
              <h3>Corporate Partnerships</h3>
              <p>
                Partner with Marang House as a corporate sponsor. Your business can make a
                lasting impact while earning B-BBEE recognition and engaging employees
                through volunteer days and fundraising events.
              </p>
              <Link href="/contact" className="btn btn-blue">
                GET IN TOUCH
              </Link>
            </div>
            <div className="donate-other-card">
              <h3>In-Kind Donations</h3>
              <p>
                School uniforms, shoes, bedding, toiletries, food supplies, and medical
                equipment, the practical things that keep Marang House running. Every item
                helps a child feel at home.
              </p>
              <Link href="/contact" className="btn btn-blue">
                SEE WHAT WE NEED
              </Link>
            </div>
            <div className="donate-other-card">
              <h3>Give Your Time</h3>
              <p>
                Volunteers are the heartbeat of Marang House. Help with homework, organise
                activities, or lend your professional skills. Even a few hours a month makes{" "}
                <span className="keep-together">a difference.</span>
              </p>
              <Link href="/contact" className="btn btn-blue">
                VOLUNTEER
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

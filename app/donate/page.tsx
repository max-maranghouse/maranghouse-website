import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import ButtonLink from "@/components/ui/ButtonLink";
import { cld } from "@/lib/images";
import { DONATION, ORGANISATION } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Become a Marang House Lightkeeper with a monthly donation through BackaBuddy, or support the house by EFT.",
};

export default function DonatePage() {
  return (
    <>
      <section className="donate-hero">
        {/* Source is an SVG export (MH_-_Website_-_Donate_Hero_IMG.svg) —
            next/image has no SVG support here (next.config.ts isn't set up
            for dangerouslyAllowSVG), so it's requested as a rasterised PNG
            via Cloudinary's on-the-fly f_png,q_auto transform instead of the
            shared cld() f_auto,q_auto helper. Verified this renders a real
            raster image (683x549 PNG) before wiring it in. It's a compact
            photo, not a full-bleed composition, so it sits in its own
            column at well under its native 683px width (not stretched to
            fill a wide contained card, which read as slightly blurry) —
            text and image split side by side instead of overlaid. */}
        <div className="donate-hero-inner">
          <div className="donate-hero-text">
            <h1 className="donate-hero-heading">Donate</h1>
            <p className="donate-hero-body">
              Every act of kindness makes a difference. Whether you choose to volunteer your time, make a
              donation, partner with us, or simply help spread our story, there are many meaningful ways to
              support Marang House. Together, we can create brighter futures, one step at a time.
            </p>
          </div>
          <div className="donate-hero-graphic">
            <Image
              src="https://res.cloudinary.com/m4hqddxx/image/upload/f_png,q_auto/v1787695333/MH_-_Website_-_Donate_Hero_IMG.svg"
              alt=""
              width={683}
              height={549}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      <section className="donate-body-band">
      <div className="donate-body">
        <div className="donate-primary">
          <p className="donate-primary__eyebrow">Become a Lightkeeper</p>
          <h2>Give monthly through BackaBuddy</h2>
          <p>A monthly donor becomes a Marang House Lightkeeper.</p>
          <ButtonLink
            href={DONATION.primary.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {DONATION.primary.label}
          </ButtonLink>
        </div>
        <div className="bank-box">
          <h2>Bank transfer</h2>
          <div className="bank-row">
            <span className="bank-label">Bank</span>
            <span>{DONATION.eft.bank}</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Branch</span>
            <span>{DONATION.eft.branch}</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Branch No</span>
            <span>{DONATION.eft.branchCode}</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Account Name</span>
            <span>{DONATION.eft.accountName}</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Account No</span>
            <span>{DONATION.eft.accountNumber} ({DONATION.eft.accountType.toLowerCase()})</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Swift No</span>
            <span>{DONATION.eft.swiftCode}</span>
          </div>
          <p className="bank-note">
            {DONATION.eft.referenceInstruction} Send proof of payment to{" "}
            <strong>{DONATION.eft.proofOfPaymentEmail}</strong>.
          </p>
        </div>
        <div className="info-strip">
          <h4>Tax Deductions</h4>
          <p>
            Donations are tax-deductible in South Africa under Section 18A of the Income Tax Act. A
            certificate can be issued after donation.
          </p>
        </div>
        <div className="info-strip">
          <h4>BBBEE Scorecard Points</h4>
          <p>Contact us to discuss options and requirements.</p>
        </div>
        <p className="npc-note">NPC Reg # {ORGANISATION.registrations.npc}</p>
      </div>
      </section>

      <section className="involved-white">
        <div className="involved-white-inner">
        <h2>How You Can Get Involved</h2>
        <div className="involved-cols">
          <div className="involved-col">
            <BgPhoto
              src={cld("v1784193099/maranghouse/Marang3.jpg")}
              alt=""
              className="involved-col-photo"
              position="center top"
            />
            <h3>Volunteer Your Time</h3>
            <p>Our volunteer program is the heartbeat of Marang House.</p>
            <Link href="/contact" className="btn btn-blue">
              VOLUNTEER
            </Link>
          </div>
          <div className="involved-col">
            <BgPhoto
              src={cld("v1784193094/maranghouse/424483000_363605573122900_9062681933234070373_n.jpg")}
              alt=""
              className="involved-col-photo"
            />
            <h3>Sponsor Programme</h3>
            <p>
              Be part of our monthly giving program and bring stability to seriously ill children with
              your generous donation. Together, we make a lasting impact.
            </p>
            <Link href="/lightkeepers" className="btn btn-blue">
              SPONSOR A CHILD TODAY
            </Link>
          </div>
          <div className="involved-col">
            <BgPhoto src={cld("v1784193102/maranghouse/SmacPix_Marang2.jpg")} alt="" className="involved-col-photo" />
            <h3>Donate</h3>
            <p>We rely on our community to help keep us going.</p>
            <Link href="/contact" className="btn btn-blue">
              DONATE
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
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
        <BgPhoto
          src={cld("v1784193103/maranghouse/marang_house_image.jpg")}
          alt=""
          className="donate-hero-bg"
          position="center 35%"
          sizes="100vw"
          priority
        />
        <div className="donate-hero-overlay" />
        <div className="donate-hero-content">
          <h1>Donate</h1>
          <p>Your generosity directly supports the children of Marang House. Every contribution matters.</p>
        </div>
      </section>

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
            Donate Monthly
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

      <section className="involved-white">
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
      </section>
    </>
  );
}

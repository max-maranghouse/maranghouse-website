import type { Metadata } from "next";
import Link from "next/link";
import BgPhoto from "@/components/BgPhoto";
import { cld } from "@/lib/images";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Marang House with a bank transfer, cheque, or volunteer time. Donations are tax-deductible in South Africa under Section 18A.",
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
        <div className="bank-box">
          <h3>Bank Transfer</h3>
          <div className="bank-row">
            <span className="bank-label">Bank</span>
            <span>Nedbank</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Branch</span>
            <span>Business Northrand</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Branch No</span>
            <span>146-905</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Account Name</span>
            <span>Marang House</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Account No</span>
            <span>1469095769 (cheque)</span>
          </div>
          <div className="bank-row">
            <span className="bank-label">Swift No</span>
            <span>NEDSZAJJ</span>
          </div>
          <p className="bank-note">
            Please use your <strong>name and surname</strong> as reference and send proof of payment to{" "}
            <strong>info@maranghouse.org</strong>
          </p>
        </div>
        <div className="bank-box" style={{ background: "#fff8e6" }}>
          <h3>Cheques</h3>
          <p style={{ fontSize: ".9rem", color: "#333" }}>
            Cheques can be made out to: <strong style={{ color: "var(--blue)" }}>Marang House</strong>
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
        <div className="info-strip" style={{ borderLeftColor: "var(--orange)" }}>
          <h4>Coming Soon</h4>
          <p>
            <em>Back A Buddy monthly campaign — watch this space!</em>
          </p>
        </div>
        <p className="npc-note">NPC Reg # 1998/009809/08</p>
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

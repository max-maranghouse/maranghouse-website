import Image from "next/image";

const SKIPPING_GIF =
  "https://res.cloudinary.com/m4hqddxx/image/upload/f_auto,q_auto/v1784193090/maranghouse/mh_element_skipping.gif";

export default function Stats({ variant = "default" }: { variant?: "default" | "about" }) {
  return (
    <section className="stats-section">
      <div className="stats-heading">
        <h2>Creating A Better Future</h2>
        <p>For Children Living With Chronic Illness</p>
      </div>
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-num">25</div>
          <div className="stat-label">Years</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ color: "#f27926" }}>
            100+
          </div>
          <div className="stat-label">Children</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ color: "#ff3538" }}>
            1000+
          </div>
          <div className="stat-label">Volunteers</div>
        </div>
      </div>
      {variant === "about" ? (
        <Image
          className="stats-figure"
          src={SKIPPING_GIF}
          alt="Child skipping"
          width={300}
          height={302}
          unoptimized
          style={{ width: "300px", height: "302px", left: "-94px", top: "-14px", position: "absolute" }}
        />
      ) : (
        <Image
          className="stats-figure"
          src={SKIPPING_GIF}
          alt="Child skipping"
          width={330}
          height={330}
          unoptimized
          style={{ width: "330px", height: "330px" }}
        />
      )}
    </section>
  );
}

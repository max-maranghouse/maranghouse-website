// Shared facts for the legal/privacy/cookie pages that aren't general
// organisation facts in `site-data.ts` — kept in one place so the three
// legal routes stay consistent instead of repeating literals.

// MH-012: the registered-office address approved for legal notices is not
// the programme address in `ORGANISATION.address` (22 Milner Ave, Franklin
// Roosevelt Park) — it's a separate, confirmed notice address for Terms &
// Conditions. Do not replace this with `ORGANISATION.address`.
export const REGISTERED_OFFICE_ADDRESS =
  "1 Ennis Road, Parkview, Johannesburg, Gauteng, 1684";

// Actual publish date of this policy set, per the task's confirmed content
// decisions ("Effective date is the actual publish date").
export const LEGAL_EFFECTIVE_DATE = "9 September 2026";

export const INFO_REGULATOR_URL = "https://inforegulator.org.za";

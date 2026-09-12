import type { Registrant } from "../libs/Registrant";

interface UserRegisterCardProps {
  registrant: Registrant;
}

export default function UserRegisterCard({ registrant }: UserRegisterCardProps) {
  const genderDisplay =
    registrant.gender === "male" ? "👨 Male" : "👩 Female";

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1 fw-bold">{registrant.fullName}</h5>
          <div className="text-muted small mb-2">
            {registrant.plan} &nbsp; {genderDisplay}
          </div>
          <div className="d-flex gap-3 small">
            {registrant.extraItems?.includes("bottle") && <span>Bottle 🍼</span>}
            {registrant.extraItems?.includes("shoes") && <span>Shoes 👟</span>}
            {registrant.extraItems?.includes("cap") && <span>Cap 🧢</span>}
          </div>
        </div>
        <div className="fw-bold fs-5 text-primary">
          {registrant.total.toLocaleString()} THB
        </div>
      </div>
    </div>
  );
}
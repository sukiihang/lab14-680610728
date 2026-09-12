import { useEffect, useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("registrants");
    if (data) {
      setRegistrants(JSON.parse(data));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {registrants.length === 0 ? (
        <div className="alert alert-warning mt-3">ยังไม่มีผู้ลงทะเบียน</div> //[cite: 1]
      ) : (
        <>
          <p className="text-muted">ผู้ลงทะเบียนแล้ว ({registrants.length} คน)</p> //[cite: 1]
          <div className="mt-3">
            {registrants.map((reg) => (
              <UserRegisterCard key={reg.id} registrant={reg} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
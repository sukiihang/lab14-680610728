import { useState } from "react";

// ---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [bottle, setBottle] = useState(false);
  const [shoes, setShoes] = useState(false);
  const [cap, setCap] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [showErrors, setShowErrors] = useState(false);

  // Calculate prices
  const selectedPlanObj = plans.find((p) => p.id === plan);
  const planPrice = selectedPlanObj ? selectedPlanObj.price : 0;
  
  const extraPrice =
    (bottle ? 200 : 0) + (shoes ? 600 : 0) + (cap ? 400 : 0);

  const subtotal = planPrice + extraPrice;
  const allExtrasSelected = bottle && shoes && cap;
  const total = allExtrasSelected ? subtotal * 0.8 : subtotal;

  const handleRegister = () => {
    setShowErrors(true);
    if (!firstName.trim() || !lastName.trim() || !plan || !gender) {
      return;
    }

    const newRegistrant = {
      id: Date.now(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      gender,
      plan: selectedPlanObj ? selectedPlanObj.label : "",
      extraItems: { bottle, shoes, cap },
      total,
    };

    const existingData = JSON.parse(localStorage.getItem("registrants") || "[]");
    localStorage.setItem("registrants", JSON.stringify([...existingData, newRegistrant]));

    alert(`Registration complete. Please pay money for ${total.toLocaleString()} THB.`);

    // Reset form
    setFirstName("");
    setLastName("");
    setPlan("");
    setGender("");
    setBottle(false);
    setShoes(false);
    setCap(false);
    setAgreed(false);
    setShowErrors(false);
  };

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div className="flex-grow-1">
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${
                    showErrors && !firstName.trim() ? "is-invalid" : ""
                  }`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {showErrors && !firstName.trim() && (
                  <div className="invalid-feedback">Invalid first name</div>
                )}
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${
                    showErrors && !lastName.trim() ? "is-invalid" : ""
                  }`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {showErrors && !lastName.trim() && (
                  <div className="invalid-feedback">Invalid last name</div>
                )}
              </div>
            </div>

            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={`form-select ${
                  showErrors && !plan ? "is-invalid" : ""
                }`}
                value={plan}
                onChange={(e) => {
                  setPlan(e.target.value);
                }}
              >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">
                  Full Marathon 42.195 Km (1,500 THB)
                </option>
              </select>
              {showErrors && !plan && (
                <div className="invalid-feedback">Please select a Plan</div>
              )}
            </div>

            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female 👩
              </div>
              {showErrors && !gender && (
                <div className="text-danger small mt-1">Please select gender</div>
              )}
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={bottle}
                  onChange={(e) => setBottle(e.target.checked)}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={shoes}
                  onChange={(e) => setShoes(e.target.checked)}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={cap}
                  onChange={(e) => setCap(e.target.checked)}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>
              {allExtrasSelected && (
                <span className="text-success d-block">(20% Discounted)</span>
              )}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div className="fw-bold">Total Payment : {total.toLocaleString()} THB</div>
          </div>

          <div className="modal-footer">
            <div>
              <input
                className="me-2 form-check-input"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the terms and conditions
            </div>
            <button
              className="btn btn-success my-2"
              disabled={!agreed}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
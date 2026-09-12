import { useState } from "react";
import type { Registrant } from "../libs/Registrant";

type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
  extraItems: string[];
};

// ---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];

// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister() {
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
    extraItems: [],
  });

  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });

  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const computeTotalPayment = () => {
    const selectedPlan = plans.find((p) => p.id === form.plan);

    const selectedExtraItems = extraItems.filter((item) =>
      form.extraItems.includes(item.id)
    );

    const subtotal =
      (selectedPlan ? selectedPlan.price : 0) +
      selectedExtraItems.reduce((sum, item) => sum + item.price, 0);

    const hasAllItems = selectedExtraItems.length === extraItems.length;
    const discount = hasAllItems ? subtotal * 0.2 : 0;

    return subtotal - discount;
  };

  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname.trim() === "",
      lname: form.lname.trim() === "",
      plan: form.plan === "",
      gender: form.gender === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((isError) => isError);
    if (hasError) return;

    const total = computeTotalPayment();
    const stored = JSON.parse(
      localStorage.getItem("marathon-registrants") ?? "[]"
    );

    const nextRegistrant: Registrant = {
      id: Date.now(),
      fullName: `${form.fname.trim()} ${form.lname.trim()}`,
      gender: form.gender,
      plan: plans.find((p) => p.id === form.plan)?.label ?? form.plan,
      extraItems: form.extraItems,
      total,
    } as any;

    localStorage.setItem(
      "marathon-registrants",
      JSON.stringify([...stored, nextRegistrant])
    );

    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`
    );

    // Reset form
    setForm({
      fname: "",
      lname: "",
      plan: "",
      gender: "",
      extraItems: [],
    });
    setAgree(false);
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
                  className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                  onChange={(e) => updateForm("fname", e.target.value)}
                  value={form.fname}
                />
                <div className="invalid-feedback">Invalid first name</div>
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                  onChange={(e) => updateForm("lname", e.target.value)}
                  value={form.lname}
                />
                <div className="invalid-feedback">Invalid last name</div>
              </div>
            </div>

            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={`form-select ${errors.plan ? "is-invalid" : ""}`}
                value={form.plan}
                onChange={(e) => updateForm("plan", e.target.value)}
              >
                <option value="">Please select..</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.price.toLocaleString()} THB)
                  </option>
                ))}
              </select>
              {errors.plan && (
                <div className="invalid-feedback d-block">
                  Please select a Plan
                </div>
              )}
            </div>

            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="radio"
                    name="gender"
                    checked={form.gender === "male"}
                    onChange={() => updateForm("gender", "male")}
                  />
                  Male 👨
                  <input
                    className="mx-2 form-check-input"
                    type="radio"
                    name="gender"
                    checked={form.gender === "female"}
                    onChange={() => updateForm("gender", "female")}
                  />
                  Female 👩
                </div>
                {errors.gender && (
                  <div className="text-danger small mt-1">
                    Please select gender
                  </div>
                )}
              </div>
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              {extraItems.map((item) => (
                <div key={item.id}>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    checked={form.extraItems.includes(item.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setForm((prev) => ({
                        ...prev,
                        extraItems: checked
                          ? [...prev.extraItems, item.id]
                          : prev.extraItems.filter((id) => id !== item.id),
                      }));
                    }}
                  />
                  <label className="form-check-label">
                    {item.label} ({item.price.toLocaleString()} THB)
                  </label>
                </div>
              ))}
              {form.extraItems.length === extraItems.length && (
                <span className="text-success d-block">(20% Discounted)</span>
              )}
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div className="mt-3 fw-bold">
              Total Payment : {computeTotalPayment().toLocaleString()} THB
            </div>
          </div>

          <div className="modal-footer">
            <div className="form-check">
              <label>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((prev) => !prev)}
                />
                I agree to the terms and conditions
              </label>
            </div>
            <button
              className="btn btn-success my-2"
              onClick={registerBtnOnClick}
              disabled={!agree}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

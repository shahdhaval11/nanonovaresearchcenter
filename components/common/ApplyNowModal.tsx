"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Check, X } from "lucide-react";

const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

const CURRENT_STATUS_OPTIONS = [
  "Undergraduate Student",
  "Postgraduate Student",
  "Ph.D. Scholar",
  "Faculty / Academician",
  "Researcher",
  "Laboratory Professional",
  "Industry Professional",
  "Other",
] as const;

const QUALIFICATION_OPTIONS = [
  "12th / Higher Secondary",
  "B.Sc.",
  "B.Tech.",
  "B.Pharm.",
  "BMLT / BMLS",
  "M.Sc.",
  "M.Tech.",
  "M.Pharm.",
  "MMLS",
  "Ph.D.",
  "Other",
] as const;

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Outside India",
];

type Gender = (typeof GENDER_OPTIONS)[number];
type CurrentStatus = (typeof CURRENT_STATUS_OPTIONS)[number];
type Qualification = (typeof QUALIFICATION_OPTIONS)[number];

type ApplyFormValues = {
  fullName: string;
  dob: string;
  gender: Gender | "";
  mobile: string;
  email: string;
  city: string;
  state: string;
  currentStatus: CurrentStatus | "";
  currentStatusOther: string;
  highestQualification: Qualification | "";
  highestQualificationOther: string;
  subject: string;
  yearOrPassout: string;
  college: string;
  affiliation: string;
  consent: boolean;
};

const INITIAL_VALUES: ApplyFormValues = {
  fullName: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  city: "",
  state: "",
  currentStatus: "",
  currentStatusOther: "",
  highestQualification: "",
  highestQualificationOther: "",
  subject: "",
  yearOrPassout: "",
  college: "",
  affiliation: "",
  consent: false,
};

type FormErrors = Partial<Record<keyof ApplyFormValues, string>>;

const STEPS = [
  { label: "Personal Details", eyebrow: "Section 1" },
  { label: "Academic / Professional Details", eyebrow: "Section 2" },
] as const;

const STEP_FIELDS: Record<1 | 2, (keyof ApplyFormValues)[]> = {
  1: ["fullName", "dob", "gender", "mobile", "email", "city", "state"],
  2: [
    "currentStatus",
    "currentStatusOther",
    "highestQualification",
    "highestQualificationOther",
    "subject",
    "college",
    "consent",
  ],
};

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ApplyFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  else if (values.fullName.trim().length < 3)
    errors.fullName = "Enter a valid full name.";

  if (values.dob && new Date(values.dob) > new Date()) {
    errors.dob = "Date of birth cannot be in the future.";
  }

  if (!values.gender) errors.gender = "Please select a gender.";

  if (!values.mobile.trim())
    errors.mobile = "Mobile / WhatsApp number is required.";
  else if (!MOBILE_PATTERN.test(values.mobile.trim()))
    errors.mobile = "Enter a valid 10-digit mobile number.";

  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!values.city.trim()) errors.city = "City is required.";

  if (!values.state) errors.state = "Please select a state.";

  if (!values.currentStatus)
    errors.currentStatus = "Please select your current status.";
  else if (
    values.currentStatus === "Other" &&
    !values.currentStatusOther.trim()
  )
    errors.currentStatusOther = "Please specify your current status.";

  if (!values.highestQualification)
    errors.highestQualification = "Please select your highest qualification.";
  else if (
    values.highestQualification === "Other" &&
    !values.highestQualificationOther.trim()
  )
    errors.highestQualificationOther = "Please specify your qualification.";

  if (!values.subject.trim())
    errors.subject = "Subject / specialization is required.";

  if (!values.college.trim())
    errors.college = "Name of college / university / organization is required.";

  if (!values.consent)
    errors.consent = "Please confirm the declaration to proceed.";

  return errors;
}

const inputClass =
  "w-full rounded-md border border-secondary-200 bg-white px-3 py-2.5 text-sm text-secondary-800 placeholder:text-secondary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none";
const errorInputClass =
  "border-red-400 focus:border-red-400 focus:ring-red-400";
const labelClass = "mb-1.5 block text-xs font-semibold text-secondary-600";
const errorTextClass = "mt-1 text-xs text-red-500";

export default function ApplyNowModal({
  open,
  onClose,
  programName,
  programMode,
}: {
  open: boolean;
  onClose: () => void;
  programName: string;
  programMode?: string;
}) {
  const [values, setValues] = useState<ApplyFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  function setField<K extends keyof ApplyFormValues>(
    field: K,
    value: ApplyFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleTextChange(field: keyof ApplyFormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setField(field, e.target.value as never);
  }

  function goToNextStep() {
    const validationErrors = validate(values);
    const stepErrors: FormErrors = {};
    STEP_FIELDS[1].forEach((field) => {
      if (validationErrors[field]) stepErrors[field] = validationErrors[field];
    });

    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    setStep(2);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (step === 1) {
      goToNextStep();
      return;
    }

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      if (STEP_FIELDS[1].some((field) => validationErrors[field])) setStep(1);
      return;
    }

    setSubmitting(true);

    // No dedicated submission endpoint exists yet; simulate until the backend is wired up.
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success(
        "Application submitted! Our team will get in touch with you shortly.",
      );
      onClose();
    }, 800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-secondary-100 px-6 py-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-secondary-800">
              Apply Now
            </h2>
            <p className="mt-0.5 text-sm text-secondary-500">
              {programName}
              {programMode ? ` · ${programMode}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-400 hover:text-secondary-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-secondary-100 px-6 py-3">
          {STEPS.map((s, index) => {
            const stepNumber = (index + 1) as 1 | 2;
            const isActive = stepNumber === step;
            const isComplete = stepNumber < step;

            return (
              <div
                key={s.label}
                className="flex flex-1 items-center gap-3 last:flex-none"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isComplete) setStep(stepNumber);
                  }}
                  disabled={!isComplete && !isActive}
                  className={`flex shrink-0 items-center gap-2 text-xs font-semibold ${
                    isActive
                      ? "text-primary-700"
                      : isComplete
                        ? "cursor-pointer text-secondary-600"
                        : "cursor-not-allowed text-secondary-300"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : isComplete
                          ? "bg-primary-100 text-primary-700"
                          : "bg-secondary-100 text-secondary-400"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      stepNumber
                    )}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {index < STEPS.length - 1 && (
                  <span className="h-px flex-1 bg-secondary-100" />
                )}
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {step === 1 && (
              <>
                <span className="eyebrow">Section 1</span>
                <h3 className="mt-1 mb-4 font-heading text-sm font-bold text-secondary-800">
                  Personal Details
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="fullName">
                      Full Name*
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Your full name"
                      value={values.fullName}
                      onChange={handleTextChange("fullName")}
                      className={`${inputClass} ${errors.fullName ? errorInputClass : ""}`}
                    />
                    {errors.fullName && (
                      <p className={errorTextClass}>{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="dob">
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      value={values.dob}
                      onChange={handleTextChange("dob")}
                      className={`${inputClass} ${errors.dob ? errorInputClass : ""}`}
                    />
                    {errors.dob && (
                      <p className={errorTextClass}>{errors.dob}</p>
                    )}
                  </div>

                  <div>
                    <span className={labelClass}>Gender*</span>
                    <div className="flex flex-wrap gap-4 pt-1">
                      {GENDER_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-sm text-secondary-700"
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={option}
                            checked={values.gender === option}
                            onChange={() => setField("gender", option)}
                            className="h-4 w-4 border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.gender && (
                      <p className={errorTextClass}>{errors.gender}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="mobile">
                      Mobile / WhatsApp Number*
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={values.mobile}
                      onChange={(e) =>
                        setField("mobile", e.target.value.replace(/\D/g, ""))
                      }
                      className={`${inputClass} ${errors.mobile ? errorInputClass : ""}`}
                    />
                    {errors.mobile && (
                      <p className={errorTextClass}>{errors.mobile}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email Address*
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={handleTextChange("email")}
                      className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                    />
                    {errors.email && (
                      <p className={errorTextClass}>{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="city">
                      City*
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Your city"
                      value={values.city}
                      onChange={handleTextChange("city")}
                      className={`${inputClass} ${errors.city ? errorInputClass : ""}`}
                    />
                    {errors.city && (
                      <p className={errorTextClass}>{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="state">
                      State*
                    </label>
                    <select
                      id="state"
                      value={values.state}
                      onChange={handleTextChange("state")}
                      className={`${inputClass} ${errors.state ? errorInputClass : ""}`}
                    >
                      <option value="" disabled>
                        Select your state
                      </option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className={errorTextClass}>{errors.state}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <span className="eyebrow">Section 2</span>
                <h3 className="mt-1 mb-4 font-heading text-sm font-bold text-secondary-800">
                  Academic / Professional Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className={labelClass}>Current Status*</span>
                    <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                      {CURRENT_STATUS_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-sm text-secondary-700"
                        >
                          <input
                            type="radio"
                            name="currentStatus"
                            value={option}
                            checked={values.currentStatus === option}
                            onChange={() => setField("currentStatus", option)}
                            className="h-4 w-4 border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.currentStatus && (
                      <p className={errorTextClass}>{errors.currentStatus}</p>
                    )}
                    {values.currentStatus === "Other" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Please specify"
                          value={values.currentStatusOther}
                          onChange={handleTextChange("currentStatusOther")}
                          className={`${inputClass} ${errors.currentStatusOther ? errorInputClass : ""}`}
                        />
                        {errors.currentStatusOther && (
                          <p className={errorTextClass}>
                            {errors.currentStatusOther}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className={labelClass}>Highest Qualification*</span>
                    <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                      {QUALIFICATION_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-sm text-secondary-700"
                        >
                          <input
                            type="radio"
                            name="highestQualification"
                            value={option}
                            checked={values.highestQualification === option}
                            onChange={() =>
                              setField("highestQualification", option)
                            }
                            className="h-4 w-4 border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {errors.highestQualification && (
                      <p className={errorTextClass}>
                        {errors.highestQualification}
                      </p>
                    )}
                    {values.highestQualification === "Other" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Please specify"
                          value={values.highestQualificationOther}
                          onChange={handleTextChange(
                            "highestQualificationOther",
                          )}
                          className={`${inputClass} ${
                            errors.highestQualificationOther
                              ? errorInputClass
                              : ""
                          }`}
                        />
                        {errors.highestQualificationOther && (
                          <p className={errorTextClass}>
                            {errors.highestQualificationOther}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="subject">
                        Subject / Specialization*
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="e.g. Microbiology"
                        value={values.subject}
                        onChange={handleTextChange("subject")}
                        className={`${inputClass} ${errors.subject ? errorInputClass : ""}`}
                      />
                      {errors.subject && (
                        <p className={errorTextClass}>{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="yearOrPassout">
                        Current Year / Semester / Passout Year
                      </label>
                      <input
                        id="yearOrPassout"
                        type="text"
                        placeholder="e.g. 3rd Year / 2026"
                        value={values.yearOrPassout}
                        onChange={handleTextChange("yearOrPassout")}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="college">
                        Name of College / University / Organization*
                      </label>
                      <input
                        id="college"
                        type="text"
                        placeholder="Institution name"
                        value={values.college}
                        onChange={handleTextChange("college")}
                        className={`${inputClass} ${errors.college ? errorInputClass : ""}`}
                      />
                      {errors.college && (
                        <p className={errorTextClass}>{errors.college}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="affiliation">
                        Affiliation / Department
                      </label>
                      <input
                        id="affiliation"
                        type="text"
                        placeholder="e.g. Dept. of Biotechnology"
                        value={values.affiliation}
                        onChange={handleTextChange("affiliation")}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-secondary-100 pt-4">
                  <label className="flex items-start gap-2 text-sm text-secondary-700">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => setField("consent", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    I confirm the above information is accurate and I agree to
                    be contacted by NanoNova regarding this application.*
                  </label>
                  {errors.consent && (
                    <p className={errorTextClass}>{errors.consent}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-secondary-100 px-6 py-4">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-md border border-secondary-200 px-5 py-2.5 text-sm font-semibold text-secondary-700 transition-colors hover:bg-secondary-50"
              >
                Back
              </button>
            ) : (
              <span />
            )}

            {step === 1 ? (
              <button type="submit" className="btn-primary px-6">
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary px-6 disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

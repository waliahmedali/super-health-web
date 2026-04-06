import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AppBottomNav from "@/components/navigation/AppBottomNav";

export default async function ProfilePage() {
  const includedTestImages = [
    { title: "Standard Blood Panel", image: "/assets/tests/sp_blood.png" },
    { title: "Advanced Blood Panel", image: "/assets/tests/adv_blood.png" },
    { title: "Custom Blood Panel", image: "/assets/tests/custom_blood.png" },
    { title: "Gut Microbiome Analysis", image: "/assets/tests/microbiome.png" },
    { title: "Environmental Toxins", image: "/assets/tests/toxins.png" },
    { title: "Grail Multi Cancer Test", image: "/assets/tests/grail.png" },
    { title: "Continuous Glucose Monitor", image: "/assets/tests/cgm.png" },
    { title: "Full Body MRI", image: "/assets/tests/mri.png" },
    { title: "VO2 Max Test", image: "/assets/tests/vo2.png" },
    { title: "DEXA Scan", image: "/assets/tests/dexa.png" },
    { title: "IV Drip", image: "/assets/tests/iv.png" },
    { title: "Heart Calcium Scan", image: "/assets/tests/calcium.png" },
  ];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const tests = [
    "Non HDL Cholesterol",
    "HDL Cholesterol",
    "Triglycerides",
    "LDL Cholesterol",
    "Cholesterol/HDL Ratio",
    "LDL/HDL Ratio",
    "Cholesterol, Total",
    "Apolipoprotein B (ApoB)",
    "Lipoprotein (a)",
    "LDL P (LDL particle number)",
    "Neutrophil to HDL Cholesterol Ratio (NHR)",
    "Triglyceride / HDL Cholesterol (Molar Ratio)",
    "Atherogenic Index of Plasma (AIP)",
    "Small LDL P",
    "Non HDL Cholesterol / Total Cholesterol (Mass Ratio)",
    "HDL Size",
    "Large HDL P",
    "LDL Size",
    "Large VLDL P",
    "Atherogenic Coefficient",
    "LDL Cholesterol / Total Cholesterol (Mass Ratio)",
    "HDL P (HDL particle number)",
    "VLDL Size",
    "LDL C / ApoB",
    "Uric Acid / HDL C",
    "TG / ApoB",
    "Non HDL Cholesterol / Apolipoprotein B (Non HDL-C / ApoB)",
    "Thyroid Stimulating Hormone (TSH)",
    "T3 Uptake",
    "Thyroxine (T4), Total",
    "Thyroid Peroxidase Antibodies (TPO)",
    "Thyroglobulin Antibodies",
    "Triiodothyronine (T3), Free",
    "Glucose",
    "Hemoglobin A1c (HbA1c)",
    "Estimated Average Glucose (mmol/L)",
    "Estimated Average Glucose (mg/dL)",
    "Uric Acid",
    "Insulin",
    "Corrected Calcium (albumin adjusted)",
    "(Triglyceride Glucose Index) TyG Index",
    "Hemoglobin",
    "Mean Corpuscular Hemoglobin (MCH)",
    "Hematocrit",
    "Red Blood Cells (RBC)",
    "Mean Corpuscular Volume (MCV)",
    "Mean Corpuscular Hemoglobin Concentration (MCHC)",
    "Platelet Count",
    "Red Cell Distribution Width (RDW)",
    "Mean Platelet Volume (MPV)",
    "Protein, Total",
    "Vitamin D, 25 Hydroxy",
    "RDW / MCV Ratio",
    "Alkaline Phosphatase (ALP)",
    "Albumin/Globulin Ratio",
    "Albumin",
    "Alanine Aminotransferase (ALT)",
    "Bilirubin, Total",
    "Globulin",
    "Aspartate Aminotransferase (AST)",
    "Gamma Glutamyl Transferase (GGT)",
    "Bilirubin, Direct",
    "Bilirubin, Indirect",
    "GGT to HDL Cholesterol Ratio (GGT / HDL C)",
    "Indirect to Direct Bilirubin Ratio (I/D Bilirubin Ratio)",
    "Bilirubin to Albumin Ratio (BAR)",
    "BUN/Creatinine Ratio",
    "Calcium",
    "Potassium",
    "Carbon Dioxide (CO2)",
    "Creatinine",
    "Chloride",
    "Sodium",
    "Estimated Glomerular Filtration Rate (eGFR)",
    "Blood Urea Nitrogen (BUN)",
    "High Sensitivity C Reactive Protein (hs CRP)",
    "Erythrocyte Sedimentation Rate (ESR)",
    "Systemic Immune Inflammation Index (SII)",
    "Ferritin to Albumin Ratio (FAR)",
    "Monocyte to HDL Ratio (MHR)",
    "CRP / Albumin Ratio (CAR)",
    "Platelet to Lymphocyte Ratio",
    "Systemic Inflammation Response Index (SIRI)",
    "Testosterone, Total",
    "Sex Hormone Binding Globulin (SHBG)",
    "Testosterone, Bioavailable",
    "DHEA S (DHEA Sulfate)",
    "Testosterone, Free",
    "Estradiol",
    "Follicle Stimulating Hormone (FSH)",
    "Prostate Specific Antigen (PSA), Free",
    "Progesterone",
    "Prostate Specific Antigen (PSA), Total",
    "Luteinizing Hormone (LH)",
    "Prolactin",
    "Free Androgen Index (FAI)",
    "Testosterone / Estradiol (T:E2)",
    "Ferritin",
    "Cortisol",
    "Total Iron Binding Capacity (TIBC)",
    "Iron Saturation",
    "Iron, Total",
    "White Blood Cells (WBC)",
    "Eosinophils, Absolute",
    "Lymphocytes, Absolute",
    "Lymphocytes",
    "Basophils, Absolute",
    "Monocytes, Absolute",
    "Neutrophils",
    "Monocytes",
    "Eosinophils",
    "Basophils",
    "Neutrophils, Absolute",
    "Lymphocyte to Monocyte Ratio (LMR)",
    "Platelet to WBC Ratio",
    "Neutrophil to Lymphocyte Ratio",
    "Monocyte to Lymphocyte Ratio (MLR)",
    "Neutrophil to Lymphocyte & Platelet Ratio (NLPR)",
    "Insulin Like Growth Factor 1 (IGF 1)",
    "Vitamin B12",
    "Homocysteine",
    "Folate",
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <section className="rounded-[28px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <div className="flex items-center gap-4">
          <img
            src="/assets/profile-user.png"
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Profile
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              New User
            </h1>
            <p className="text-sm text-muted">
              {user?.email ?? "Guest preview"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[24px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          Included tests
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {includedTestImages.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <img src={item.image} alt={item.title} className="h-24 w-full object-cover" />
              <p className="p-2 text-xs font-semibold text-ink">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[24px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          100+ biomarker list
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {tests.map((test) => (
            <div
              key={test}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-ink"
            >
              {test}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <Link
          href="/app"
          className="inline-flex rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to Home
        </Link>
      </section>
      <AppBottomNav />
    </main>
  );
}

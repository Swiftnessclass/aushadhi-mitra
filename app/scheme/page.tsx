export default function SchemesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Government Health Schemes</h1>

      <div className="bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-2">💊 Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)</h2>
        <p>
          PMBJP ensures quality medicines at affordable prices through Jan Aushadhi stores. These medicines are 50-90% cheaper than branded equivalents.
        </p>
        <a
          href="https://janaushadhi.gov.in"
          className="text-blue-600 underline mt-2 inline-block"
          target="_blank"
        >
          Visit Official Site →
        </a>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-2">🏥 Ayushman Bharat - PMJAY</h2>
        <p>
          The Ayushman Bharat scheme provides free health coverage of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.
        </p>
        <a
          href="https://pmjay.gov.in"
          className="text-blue-600 underline mt-2 inline-block"
          target="_blank"
        >
          Visit PMJAY Portal →
        </a>
      </div>
    </div>
  );
}

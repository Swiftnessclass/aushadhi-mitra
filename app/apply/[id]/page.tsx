"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    document: File | null;
  }>({
    name: "",
    email: "",
    phone: "",
    address: "",
    document: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoader(false);

    if (res.ok) {
      alert("Application submitted! Check your email for confirmation.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        document: null,
      });

      // Redirect to schemes page
      router.push("/Schemes");
    } else {
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-white-900 dark:text-white">
        Apply for Scheme
      </h1>
      <div className="min-h-screen flex items-start justify-center pt-[10vh] px-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded shadow"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            required
          />

          <textarea
            placeholder="Your Address"
            value={formData.address || ""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-4 py-2 border rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            rows={3}
            required
          />

          <input
            type="file"
            onChange={(e) =>
              setFormData({
                ...formData,
                document: e.target.files?.[0] || null,
              })
            }
            className="w-full"
          />

          <button
            type="submit"
            disabled={loader}
            className={`bg-green-600 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2 ${
              loader ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loader ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

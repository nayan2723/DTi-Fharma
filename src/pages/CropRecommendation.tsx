import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Client } from "@gradio/client";

export function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph_value: '',
    rainfall: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before API call

    try {
      const client = await Client.connect("Shinichi876/crop_recom");
      const response = await client.predict("/predict", {
        Name: parseFloat(formData.N),
        Age: parseFloat(formData.P),
        HealthIssue: parseFloat(formData.K),
        Allergies: parseFloat(formData.temperature),
        Gender: parseFloat(formData.humidity),
        Anycurrentmedication: parseFloat(formData.ph_value),
        Disablity: parseFloat(formData.rainfall),
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error fetching crop recommendation:", error);
      setResult("Error fetching crop recommendation. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">
          Medication Recommender
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Name', 'Age', 'Health Issue', 'Allergies', 'Gender', 'Any current medication', 'Disablity'].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 
                       text-white rounded-lg transition-colors duration-200
                       font-medium text-lg"
            >
              {loading ? "Recommending..." : "Get Recommendations"}
            </button>
          </form>
          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
              <strong>{result}</strong>
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg flex items-center">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </span>
            <strong>Important Message:</strong> This is just a recommendation. Please contact medical personnels for  more assistance.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

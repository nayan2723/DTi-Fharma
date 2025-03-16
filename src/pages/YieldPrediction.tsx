import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Client } from "@gradio/client";

const cropOptions = {
  kharif: ['cotton', 'jowar', 'maize', 'moong', 'ragi', 'rice', 'soyabean', 'sunflower'],
  rabi: ['wheat', 'barley', 'gram', 'rapeseed', 'mustard'],
  summer: ['groundnut', 'maize', 'sunflower'],
  'whole year': ['banana', 'papaya', 'sugarcane', 'coconut', 'arecanut', 'ginger']
};

export function YieldPrediction() {
  const [formData, setFormData] = useState({
    state_name: '',
    crop_type: '',
    crop: '',
    n: '',
    p: '',
    k: '',
    ph: '',
    rainfall: '',
    temperature: '',
    area_in_hectares: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset crop field when crop_type changes
    if (name === 'crop_type') {
      setFormData((prev) => ({ ...prev, crop: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const client = await Client.connect("Shinichi876/crop-prediction");
      const response = await client.predict("/predict", {
        state_name: formData.state_name,
        crop_type: formData.crop_type,
        crop: formData.crop,
        n: parseFloat(formData.n),
        p: parseFloat(formData.p),
        k: parseFloat(formData.k),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
        temperature: parseFloat(formData.temperature),
        area_in_hectares: parseFloat(formData.area_in_hectares),
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error fetching yield prediction:", error);
      setResult("Error fetching yield prediction. Please try again.");
    } finally {
      setLoading(false);
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
          Yield Prediction
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  State Name
                </label>
                <input
                  type="text"
                  name="state_name"
                  value={formData.state_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter state name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Crop Type
                </label>
                <select
                  name="crop_type"
                  value={formData.crop_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                >
                  <option value="">Select Crop Type</option>
                  {Object.keys(cropOptions).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Crop
                </label>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                >
                  <option value="">Select Crop</option>
                  {formData.crop_type &&
                    cropOptions[formData.crop_type].map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                </select>
              </div>

              {/* Other input fields remain unchanged */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nitrogen (N)
                </label>
                <input
                  type="number"
                  name="n"
                  value={formData.n}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter N value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phosphorus (P)
                </label>
                <input
                  type="number"
                  name="p"
                  value={formData.p}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter P value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Potassium (K)
                </label>
                <input
                  type="number"
                  name="k"
                  value={formData.k}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter K value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  pH Level
                </label>
                <input
                  type="number"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter pH level"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter rainfall"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter temperature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Area (in hectares)
                </label>
                <input
                  type="number"
                  name="area_in_hectares"
                  value={formData.area_in_hectares}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 
                               border border-slate-300 dark:border-slate-600
                               text-slate-800 dark:text-white"
                  placeholder="Enter area"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 
                       text-white rounded-lg transition-colors duration-200
                       font-medium text-lg"
            >
              {loading ? "Calculating..." : "Calculate Yield"}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
              <strong>{result}</strong> 
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

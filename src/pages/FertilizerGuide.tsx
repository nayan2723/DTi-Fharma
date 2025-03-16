import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Client } from "@gradio/client";

export function FertilizerGuide() {
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    N: '',
    P: '',
    K: '',
    soil_type: '',
    crop_type: '',
    humidity: '',
    temperature: '',
    ph: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const client = await Client.connect("Shinichi876/fertilizer_recommendation");
      const response = await client.predict("/predict", {
        state: formData.state,
        city: formData.city,
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        soil_type: formData.soil_type,
        crop_type: formData.crop_type,
        humidity: parseFloat(formData.humidity),
        temperature: parseFloat(formData.temperature),
        ph: parseFloat(formData.ph),
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error fetching fertilizer recommendation:", error);
      setResult("Error fetching recommendation. Please try again.");
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
          Fertilizer Guide
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter state"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter city"
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
                  className="input-field"
                >
                  <option value="">Select crop</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Maize">Maize</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Rice">Rice</option>
                  <option value="Cashew">Cashew</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Tea">Tea</option>
                  <option value="Jute">Jute</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Millets">Millets</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Soil Type
                </label>
                <select
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select soil type</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Silty Soil">Silty Soil</option>
                  <option value="Loamy Soil">Loamy Soil</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Sandy Soil">Sandy Soil</option>
                  <option value="Desert Soil">Desert Soil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nitrogen (N)
                </label>
                <input
                  type="number"
                  name="N"
                  value={formData.N}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter N value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phosphorus (P)
                </label>
                <input
                  type="number"
                  name="P"
                  value={formData.P}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter P value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Potassium (K)
                </label>
                <input
                  type="number"
                  name="K"
                  value={formData.K}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter K value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter humidity"
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
                  className="input-field"
                  placeholder="Enter temperature"
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
                  className="input-field"
                  placeholder="Enter pH level"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              {loading ? "Loading..." : "Get Fertilizer Recommendations"}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
              <strong>Predicted Fertilizer Amount:</strong> {result[0]}<br />
              <strong>Fertilizer Recommendation:</strong> {result[1]}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

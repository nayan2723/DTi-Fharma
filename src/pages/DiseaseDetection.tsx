import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Client } from "@gradio/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    try {
      setLoading(true);

      // Convert base64 image data back to a Blob
      const response = await fetch(selectedImage);
      const imageBlob = await response.blob();

      // Connect to the Gradio client and predict
      const client = await Client.connect("Shinichi876/crop-disease-detection");
      const result = await client.predict("/predict", {
        image_file: imageBlob,
      });

      setResult(result.data);
      await fetchSolution(result.data); // Call Gemini API with the result
    } catch (error) {
      console.error("Error analyzing the image:", error);
      setResult("An error occurred while analyzing the image.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSolution = async (input: string) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyD7v1jYNAHyaJUTuwLIkCfDq-KNb4YgMsA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `The following is the result of a crop disease detection model: \"${input}\". Give one short paragraph explanation and another paragraph for solution. Don't use markdown.`;
      const result = await model.generateContent(prompt);

      if (result?.response?.text) {
        setSolution(result.response.text);
      } else {
        setSolution("No explanation available.");
      }
    } catch (error) {
      console.error("Error fetching explanation from Gemini API:", error);
      setSolution("An error occurred while fetching the explanation.");
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
          Disease Detection
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="space-y-6">
            <div className="text-center">
              <label
                htmlFor="image-upload"
                className="block w-full cursor-pointer"
              >
                <div
                  className={`border-2 border-dashed rounded-xl p-8
                              ${
                                selectedImage
                                  ? "border-green-500"
                                  : "border-slate-300 dark:border-slate-600"
                              }
                              hover:border-green-500 dark:hover:border-green-500
                              transition-colors duration-200`}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected crop"
                      className="max-h-96 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-slate-400" />
                      <div className="text-slate-600 dark:text-slate-300">
                        <p className="font-medium">Click to upload an image</p>
                        <p className="text-sm">or drag and drop</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {selectedImage && (
              <button
                type="button"
                onClick={handleAnalyzeImage}
                className={`w-full px-6 py-3 bg-green-600 hover:bg-green-700 
                         text-white rounded-lg transition-colors duration-200
                         font-medium text-lg ${loading ? "opacity-50" : ""}`}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Image"}
              </button>
            )}

            {result && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg text-green-800">
                <p>
                  <strong>Result:</strong>
                </p>
                <p>{result}</p>
              </div>
            )}

            {solution && (
              <div className="mt-6 p-4 bg-blue-100 rounded-lg text-blue-800">
                <p><strong>Explanation and Solution:</strong></p>
                {solution.split("\n").map((paragraph, index) => (
                  <p key={index} className="mt-2">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

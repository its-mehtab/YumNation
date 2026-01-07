import React, { useState } from "react";

const ProductTab = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="py-20 mb-20">
      <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          {["description", "Additional information", "Reviews"].map((curr) => {
            return (
              <button
                className={`px-8 py-3 rounded-md capitalize cursor-pointer ${
                  activeTab === curr ? "bg-[#3f9065] text-white" : ""
                }`}
                key={curr}
                onClick={() => setActiveTab(curr)}
              >
                {curr}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductTab;

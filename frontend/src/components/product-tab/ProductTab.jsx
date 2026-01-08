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
                className={`px-8 py-3 rounded-md capitalize cursor-pointer text-lg font-[bangers] ${
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
        <div className="pt-10 mt-8 border-t border-gray-300">
          {activeTab === "description" && (
            <p>
              Numquam odit accusantium odit aut commodi et. Nostrum est atque ut
              dolorum. Et sequi aut atque doloribus qui. Iure amet in voluptate
              reiciendis. Perspiciatis consequatur aperiam repellendus velit
              quia est minima. Dignissimos ipsa quod et molestiae delectus in
              dolores. Enim repellendus necessitatibus rerum iste cumque sit
              quae. Qui sed rerum consequatur qui adipisci eaque. Necessitatibus
              est architecto esse rerum quos. Sed totam adipisci totam doloribus
              ut a molestiae laboriosam. Quis asperiores consectetur et sunt
              neque et. Cum consequatur necessitatibus voluptatibus perspiciatis
              ipsam. A reiciendis quo possimus ipsam quae veniam. Cum corporis
              illo corporis quae eum doloremque consequatur et. Excepturi hic
              aperiam est quos aut quia eum. Similique consequatur nostrum velit
              et eum molestiae iste. Animi enim eius architecto optio. Quo
              repellat numquam nam quidem esse delectus. Et dolorum et aut
              facere qui rem optio. Sit accusamus molestiae aut sunt laboriosam
              id autem.
            </p>
          )}
          {activeTab === "Additional information" && (
            <p>
              Numquam odit accusantium odit aut commodi et. Nostrum est atque ut
              dolorum. Et sequi aut atque doloribus qui. Iure amet in voluptate
              reiciendis. Perspiciatis consequatur aperiam repellendus velit
              quia est minima. Dignissimos ipsa quod et molestiae delectus in
              dolores. Enim repellendus necessitatibus rerum iste cumque sit
              quae. Qui sed rerum consequatur qui adipisci eaque. Necessitatibus
              est architecto esse rerum quos. Sed totam adipisci totam doloribus
              ut
            </p>
          )}

          {activeTab === "Reviews" && (
            <p>
              Numquam odius perspiciatis ipsam. reiciendis quo possimus ipsam
              quae veniam. Cum corporis illo corporis quae eum doloremque
              consequatur et. Excepturi hic aperiam est quos aut quia eum.
              Similique consequatur nostrum velit et eum molestiae iste. Animi
              enim eius architecto optio. Quo repellat numquam nam quidem esse
              delectus. Et dolorum et aut facere qui rem optio. Sit accusamus
              molestiae aut sunt laboriosam id autem.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductTab;

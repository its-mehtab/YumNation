import React, { useRef, useState } from "react";
import { Trash2, Edit, Plus, Check, X } from "lucide-react";

import { useCategory } from "../../context/public/CategoryContext";
import { Switch } from "@radix-ui/themes";
import Field from "../common/Field";
import Input from "../common/Input";

import { Camera, Circle, Leaf, Trash, Save } from "lucide-react";

const DishForm = ({ handleSubmit, form, setForm, initialForm }) => {
  const [dishImage, setDishImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [editingAddOnIndex, setEditingAddOnIndex] = useState(null);

  const [variantInput, setVariantInput] = useState({
    name: "",
    price: "",
    cost: "",
  });

  const [addOnInput, setAddOnInput] = useState({
    name: "",
    price: "",
    cost: "",
  });

  const { categories } = useCategory();
  const dishImageRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (key) =>
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleDishImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setDishImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  // ── Variants ──
  const saveVariant = () => {
    if (!variantInput.name.trim() || !variantInput.price) return;

    const formatted = {
      name: variantInput.name.trim(),
      price: Number(variantInput.price),
      cost: variantInput.cost !== "" ? Number(variantInput.cost) : 0,
    };

    setForm((prev) => {
      const updated = [...prev.variants];
      if (
        editingVariantIndex !== null &&
        editingVariantIndex >= 0 &&
        editingVariantIndex < updated.length
      ) {
        updated[editingVariantIndex] = formatted;
      } else {
        updated.push(formatted);
      }
      return { ...prev, variants: updated };
    });

    setVariantInput({ name: "", price: "", cost: "" });
    setEditingVariantIndex(null);
  };

  const cancelEditVariant = () => {
    setVariantInput({ name: "", price: "", cost: "" });
    setEditingVariantIndex(null);
  };

  const removeVariant = (index) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));

    if (editingVariantIndex === index) {
      setVariantInput({ name: "", price: "", cost: "" });
      setEditingVariantIndex(null);
    } else if (editingVariantIndex !== null && index < editingVariantIndex) {
      setEditingVariantIndex((prev) => prev - 1);
    }
  };

  const editVariant = (index) => {
    const target = form.variants[index];
    if (!target) return;

    // If already editing another variant and there is valid input, save previous one first
    if (variantInput.name.trim() && variantInput.price) {
      const prevFormatted = {
        name: variantInput.name.trim(),
        price: Number(variantInput.price),
        cost: variantInput.cost !== "" ? Number(variantInput.cost) : 0,
      };

      setForm((prev) => {
        const updated = [...prev.variants];
        if (
          editingVariantIndex !== null &&
          editingVariantIndex >= 0 &&
          editingVariantIndex < updated.length
        ) {
          updated[editingVariantIndex] = prevFormatted;
        } else {
          updated.push(prevFormatted);
        }
        return { ...prev, variants: updated };
      });
    }

    setEditingVariantIndex(index);
    setVariantInput({
      name: target.name || "",
      price: target.price ?? "",
      cost: target.cost ?? "",
    });
  };

  // ── Add-ons ──
  const saveAddOn = () => {
    if (!addOnInput.name.trim() || !addOnInput.price) return;

    const formatted = {
      name: addOnInput.name.trim(),
      price: Number(addOnInput.price),
      cost: addOnInput.cost !== "" ? Number(addOnInput.cost) : 0,
    };

    setForm((prev) => {
      const updated = [...prev.addOns];
      if (
        editingAddOnIndex !== null &&
        editingAddOnIndex >= 0 &&
        editingAddOnIndex < updated.length
      ) {
        updated[editingAddOnIndex] = formatted;
      } else {
        updated.push(formatted);
      }
      return { ...prev, addOns: updated };
    });

    setAddOnInput({ name: "", price: "", cost: "" });
    setEditingAddOnIndex(null);
  };

  const cancelEditAddOn = () => {
    setAddOnInput({ name: "", price: "", cost: "" });
    setEditingAddOnIndex(null);
  };

  const removeAddOn = (index) => {
    setForm((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((_, i) => i !== index),
    }));

    if (editingAddOnIndex === index) {
      setAddOnInput({ name: "", price: "", cost: "" });
      setEditingAddOnIndex(null);
    } else if (editingAddOnIndex !== null && index < editingAddOnIndex) {
      setEditingAddOnIndex((prev) => prev - 1);
    }
  };

  const editAddOn = (index) => {
    const target = form.addOns[index];
    if (!target) return;

    // If already editing another add-on and there is valid input, save previous one first
    if (addOnInput.name.trim() && addOnInput.price) {
      const prevFormatted = {
        name: addOnInput.name.trim(),
        price: Number(addOnInput.price),
        cost: addOnInput.cost !== "" ? Number(addOnInput.cost) : 0,
      };

      setForm((prev) => {
        const updated = [...prev.addOns];
        if (
          editingAddOnIndex !== null &&
          editingAddOnIndex >= 0 &&
          editingAddOnIndex < updated.length
        ) {
          updated[editingAddOnIndex] = prevFormatted;
        } else {
          updated.push(prevFormatted);
        }
        return { ...prev, addOns: updated };
      });
    }

    setEditingAddOnIndex(index);
    setAddOnInput({
      name: target.name || "",
      price: target.price ?? "",
      cost: target.cost ?? "",
    });
  };

  const handleClear = () => {
    setForm(initialForm);
    setDishImage(null);
    setVariantInput({ name: "", price: "", cost: "" });
    setAddOnInput({ name: "", price: "", cost: "" });
    setEditingVariantIndex(null);
    setEditingAddOnIndex(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedForm = { ...form };
    let hasChanges = false;

    if (variantInput.name.trim() && variantInput.price) {
      const formattedV = {
        name: variantInput.name.trim(),
        price: Number(variantInput.price),
        cost: variantInput.cost !== "" ? Number(variantInput.cost) : 0,
      };
      const vList = [...(updatedForm.variants || [])];
      if (
        editingVariantIndex !== null &&
        editingVariantIndex >= 0 &&
        editingVariantIndex < vList.length
      ) {
        vList[editingVariantIndex] = formattedV;
      } else {
        vList.push(formattedV);
      }
      updatedForm.variants = vList;
      hasChanges = true;
    }

    if (addOnInput.name.trim() && addOnInput.price) {
      const formattedA = {
        name: addOnInput.name.trim(),
        price: Number(addOnInput.price),
        cost: addOnInput.cost !== "" ? Number(addOnInput.cost) : 0,
      };
      const aList = [...(updatedForm.addOns || [])];
      if (
        editingAddOnIndex !== null &&
        editingAddOnIndex >= 0 &&
        editingAddOnIndex < aList.length
      ) {
        aList[editingAddOnIndex] = formattedA;
      } else {
        aList.push(formattedA);
      }
      updatedForm.addOns = aList;
      hasChanges = true;
    }

    if (hasChanges) {
      setForm(updatedForm);
      setEditingVariantIndex(null);
      setEditingAddOnIndex(null);
      setVariantInput({ name: "", price: "", cost: "" });
      setAddOnInput({ name: "", price: "", cost: "" });
    }

    try {
      await handleSubmit(
        e,
        dishImage?.file || null,
        hasChanges ? updatedForm : form,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="col-span-1 lg:col-span-3 space-y-4">
          <div
            onClick={() => dishImageRef.current.click()}
            className="aspect-square rounded-md border-2 border-dashed border-[#fc8019] bg-[#fff2e8] flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
          >
            {dishImage?.preview || form.image ? (
              <img
                src={dishImage?.preview || form.image}
                alt="Dish"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-4 flex flex-col items-center">
                <Camera size={32} className="mb-2 text-orange-400" />
                <p className="text-xs text-gray-400 font-medium">Main Image</p>
              </div>
            )}
            <input
              ref={dishImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleDishImage}
            />
          </div>

          {/* Toggles */}
          <div className="bg-white rounded-md border border-gray-200 transition-all p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-700">Available</p>
                <p className="text-xs text-gray-400">Visible to customers</p>
              </div>
              <Switch
                color="orange"
                checked={form.isAvailable}
                onCheckedChange={() => handleToggle("isAvailable")}
              />
            </div>
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div>
                <p className="text-xs font-semibold text-gray-700">Featured</p>
                <p className="text-xs text-gray-400">Show on home page</p>
              </div>
              <Switch
                color="orange"
                checked={form.isFeatured}
                onCheckedChange={() => handleToggle("isFeatured")}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-9 space-y-5">
          <div className="bg-white rounded-md border border-gray-200 transition-all p-6 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Basic Info
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Dish Name" required>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Margherita Pizza"
                />
              </Field>
              <Field label="Category" required>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors bg-white"
                >
                  <option value="">Select category...</option>
                  {categories?.map((cat) => {
                    return (
                      <option value={cat._id} key={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </Field>
            </div>
            <Field label="Short Description" required>
              <Input
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Brief shortDescription shown on menu cards"
              />
            </Field>
            <Field
              label="Long Description"
              hint="Shown on the dish detail page"
            >
              <textarea
                name="longDescription"
                value={form.longDescription}
                onChange={handleChange}
                placeholder="Describe ingredients, cooking method, taste..."
                rows={3}
                className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors resize-none"
              />
            </Field>
          </div>

          <div className="bg-white rounded-md border border-gray-200 transition-all p-6 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Pricing
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Selling Price ($)" required>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  type="number"
                  min="0"
                />
              </Field>
              <Field label="Cost Price ($)" hint="Not visible to customers">
                <Input
                  name="cost"
                  value={form.cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  type="number"
                  min="0"
                />
              </Field>
            </div>
            <Field label="Food Type" required>
              <div className="flex gap-3 mt-1">
                {["veg", "non-veg", "vegan"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md border-2 transition-all text-xs font-semibold
                      ${form.foodType === type ? "border-[#fc8019] bg-[#fff2e8] text-[#fc8019]" : "border-gray-200 text-gray-400"}`}
                  >
                    <input
                      type="radio"
                      name="foodType"
                      value={type}
                      checked={form.foodType === type}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {type === "veg" ? (
                      <Circle
                        size={14}
                        className="text-green-500 fill-current"
                        strokeWidth={1.5}
                      />
                    ) : type === "non-veg" ? (
                      <Circle
                        size={14}
                        className="text-red-500 fill-current"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Leaf size={14} className="text-[#fc8019] fill-current" />
                    )}{" "}
                    {type}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="bg-white rounded-md border border-gray-200 transition-all p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Variants
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                e.g. Small / Medium / Large — each with its own price
              </p>
            </div>

            {form.variants?.length > 0 && (
              <div className="overflow-hidden rounded-md border border-gray-200">
                <div className="grid grid-cols-12 px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <p className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </p>
                  <p className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Price
                  </p>
                  <p className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Cost
                  </p>
                  <p className="col-span-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </p>
                </div>
                {form.variants.map((v, i) => {
                  const isEditing = editingVariantIndex === i;
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-12 items-center px-4 py-3 transition-colors ${
                        isEditing
                          ? "bg-[#fff2e8] border-l-4 border-l-[#fc8019]"
                          : ""
                      } ${i !== form.variants.length - 1 ? "border-b border-gray-50" : ""}`}
                    >
                      <div className="col-span-5 flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-700">
                          {v.name}
                        </p>
                        {isEditing && (
                          <span className="text-[10px] bg-orange-200 text-[#fc8019] font-bold px-1.5 py-0.5 rounded">
                            Editing
                          </span>
                        )}
                      </div>
                      <p className="col-span-2 text-sm font-bold text-[#fc8019]">
                        ${v.price}
                      </p>
                      <p className="col-span-2 text-sm text-gray-500">
                        {v.cost ? `$${v.cost}` : "—"}
                      </p>
                      <div className="col-span-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => removeVariant(i)}
                          className="text-red-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size="14" />
                        </button>
                        <button
                          type="button"
                          onClick={() => editVariant(i)}
                          className={`p-1.5 rounded-md transition-colors ${
                            isEditing
                              ? "text-[#fc8019] bg-orange-100"
                              : "text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          }`}
                          title="Edit"
                        >
                          <Edit size="14" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <input
                value={variantInput.name}
                onChange={(e) =>
                  setVariantInput((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Variant name (e.g. Large)"
                className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              />
              <input
                value={variantInput.price}
                onChange={(e) =>
                  setVariantInput((p) => ({ ...p, price: e.target.value }))
                }
                placeholder="Price ($)"
                type="number"
                min="0"
                className="w-full sm:w-28 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              />
              <input
                value={variantInput.cost}
                onChange={(e) =>
                  setVariantInput((p) => ({ ...p, cost: e.target.value }))
                }
                placeholder="Cost ($)"
                type="number"
                min="0"
                className="w-full sm:w-28 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              />
              {editingVariantIndex !== null && (
                <button
                  type="button"
                  onClick={cancelEditVariant}
                  className="px-3 py-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={saveVariant}
                disabled={!variantInput.name.trim() || !variantInput.price}
                className="flex justify-center gap-1.5 items-center px-4 py-2 rounded-md bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-40"
              >
                {editingVariantIndex !== null ? (
                  <>
                    <Check size={16} /> Update
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Add-ons ── */}
          <div className="bg-white rounded-md border border-gray-200 transition-all p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Add-ons
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                e.g. Extra Cheese, Olives, Jalapeños — optional extras customers
                can choose
              </p>
            </div>

            {/* Existing add-ons */}
            {form?.addOns?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.addOns.map((a, i) => {
                  const isEditing = editingAddOnIndex === i;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 border rounded-md px-3 py-2 transition-all ${
                        isEditing
                          ? "bg-[#fff2e8] border-[#fc8019] ring-2 ring-orange-200"
                          : "bg-[#fff2e8] border-orange-100"
                      }`}
                    >
                      <span className="text-xs font-semibold text-gray-700">
                        {a.name}
                      </span>
                      <span className="text-xs font-bold text-[#fc8019]">
                        +${a.price}
                      </span>
                      {a.cost && (
                        <span className="text-xs text-gray-400">
                          (cost: ${a.cost})
                        </span>
                      )}
                      {isEditing && (
                        <span className="text-[10px] bg-orange-200 text-[#fc8019] font-bold px-1 py-0.5 rounded">
                          Editing
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeAddOn(i)}
                        className="text-red-400 hover:text-red-500 transition-colors ml-1"
                        title="Delete"
                      >
                        <Trash2 size="13" />
                      </button>
                      <button
                        type="button"
                        onClick={() => editAddOn(i)}
                        className={`transition-colors ml-1 ${
                          isEditing
                            ? "text-[#fc8019]"
                            : "text-blue-500 hover:text-blue-600"
                        }`}
                        title="Edit"
                      >
                        <Edit size="13" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <input
                value={addOnInput.name}
                onChange={(e) =>
                  setAddOnInput((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Add-on name (e.g. Extra Cheese)"
                className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              />
              <input
                value={addOnInput.price}
                onChange={(e) =>
                  setAddOnInput((p) => ({ ...p, price: e.target.value }))
                }
                placeholder="Price ($)"
                type="number"
                min="0"
                className="w-full sm:w-28 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              />
              <input
                value={addOnInput.cost}
                onChange={(e) =>
                  setAddOnInput((p) => ({ ...p, cost: e.target.value }))
                }
                placeholder="Cost ($)"
                type="number"
                min="0"
                className="w-full sm:w-28 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
              />
              {editingAddOnIndex !== null && (
                <button
                  type="button"
                  onClick={cancelEditAddOn}
                  className="px-3 py-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={saveAddOn}
                disabled={!addOnInput.name.trim() || !addOnInput.price}
                className="flex justify-center gap-1.5 items-center px-4 py-2 rounded-md bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-40"
              >
                {editingAddOnIndex !== null ? (
                  <>
                    <Check size={16} /> Update
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Add
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-md border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <Trash size={16} /> Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-md bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center gap-1"
            >
              <Save size={16} /> {loading ? "Saving..." : "Save Dish"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DishForm;

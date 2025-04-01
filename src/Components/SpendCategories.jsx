import API_BASE_URL from "../app/utils/apiConfig";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useState, useEffect } from "react";

export default () => {

    const [categories, setCategories] = useState([
        { name: "Bills", icon: "💡" },
        { name: "Coffee & Snacks", icon: "☕" },
        { name: "Courier", icon: "📦" },
        { name: "Education", icon: "📚" },
        { name: "EMI", icon: "🏦" },
        { name: "Entertainment", icon: "🎬" },
        { name: "Food & Drinks", icon: "🍔" },
        { name: "Fuel", icon: "⛽" },
        { name: "Groceries", icon: "🛒" },
        { name: "Health", icon: "💊" },
        { name: "Investment", icon: "📈" },
        { name: "Other", icon: "❓" },
        { name: "Rent", icon: "🏠" },
        { name: "Shopping", icon: "🛍️" },
        { name: "Transfer", icon: "💸" },
        { name: "Travel", icon: "✈️" },
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const [newCategory, setNewCategory] = useState("");
    const [newIcon, setNewIcon] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Open Modal
    const openModal = () => setIsModalOpen(true);

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setNewCategory(""); // Reset input field
        setNewIcon(""); // Reset input field
    };

    // Add New Category
    const handleAddCategory = async () => {
        if (!newCategory.trim() || !newIcon.trim()) {
            alert("Both category name and icon are required!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/categories/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newCategory, icon: newIcon }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || "Failed to add category");
                return;
            }

            const addedCategory = await response.json();

            // Update local state to show new category instantly
            setCategories([...categories, addedCategory]);

            // Reset input fields & close modal
            setNewCategory("");
            setNewIcon("");
            closeModal();
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || "Failed to delete category");
                return;
            }

            // Remove category from local state
            setCategories(categories.filter(category => category._id !== categoryId));

            alert("Category deleted successfully!");
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    console.log(typeof categories);

    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Spend Categories</h2>
                    <p>
                        Create/Delete your spend categories.
                    </p>
                </div>
                <div>
                    <button className="bg-gray-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded cursor-pointer flex items-center gap-2" onClick={openModal}>
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add New
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h2>

                        {/* Input Field */}
                        <label htmlFor="categoryName" className="text-gray-900 font-semibold">Name</label>
                        <input
                            name="name"
                            id="categoryName"
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => { setNewCategory(e.target.value); }}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 mb-2"
                        />
                        <label htmlFor="categoryIcon" className="text-gray-900 font-semibold">Icon</label>
                        <input
                            name="icon"
                            id="categoryIcon"
                            type="text"
                            value={newCategory.icon}
                            onChange={(e) => { setNewIcon(e.target.value); }}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 mb-2"
                        />

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={closeModal} className="cursor-pointer px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded">Cancel</button>
                            <button onClick={handleAddCategory} className="cursor-pointer px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}

            <hr className="border-gray-300 my-4" />

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-gray-900">
                {categories && (categories.map != undefined) && categories.map(({ _id, name, icon }, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                    >
                        <span className="text-lg">{icon}</span>
                        <span className="font-medium">{name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-900 cursor-pointer" onClick={() => handleDeleteCategory(_id)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </li>
                ))}
            </ul>
        </>
    );
}
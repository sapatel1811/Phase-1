"use client";

export default function DeleteModal({
  open,
  onClose,
  onDelete,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80">
        <h2 className="text-xl font-bold">Delete User</h2>

        <p className="text-gray-500 mt-3">Are you sure?</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase/client";
export type Officer = {
  officer_id?: number;
  first_name: string;
  last_name: string;
  middle_initial: string;
  suffix: string;
  position: string;
  department: string;
  image: string;
  order_index?: number; // ADD THIS LINE
};

interface OfficerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void; // Function to tell page.tsx to reload the data
  existingOfficer?: Officer | null; // Pass data here if editing
}

export default function OfficerModal({ isOpen, onClose, onRefresh, existingOfficer }: OfficerModalProps) {
  // Pre-fill the form if we are editing, otherwise start blank
  const [formData, setFormData] = useState<Officer>(
    existingOfficer || {
      first_name: "", last_name: "", middle_initial: "", suffix: "", position: "", department: "", image: ""
    }
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ADD THIS NEW USE-EFFECT BLOCK:
  useEffect(() => {
    if (isOpen) {
      setFormData(
        existingOfficer || {
          first_name: "", last_name: "", middle_initial: "", suffix: "", position: "", department: "", image: ""
        }
      );
      setImageFile(null); // Clears out any file selected from a previous edit
    }
  }, [isOpen, existingOfficer]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = formData.image;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`; // Create a unique filename
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('officer-photos') // Make sure this bucket exists in your Supabase!
        .upload(`public/${fileName}`, imageFile);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setLoading(false);
        return;
      }

      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('officer-photos')
        .getPublicUrl(`public/${fileName}`);
        
      finalImageUrl = publicUrlData.publicUrl;
    }

    // Save the text data database
    const officerPayload = { ...formData, image: finalImageUrl };

    if (existingOfficer?.officer_id) {
      // UPDATE existing officer
      const { error } = await supabase
        .from('Officers')
        .update(officerPayload)
        .eq('officer_id', existingOfficer.officer_id);
      if (error) alert(error.message);
    } else {
      // INSERT new officer
      const { error } = await supabase
        .from('Officers')
        .insert([officerPayload]);
      if (error) alert(error.message);
    }

    setLoading(false);
    onRefresh(); // Tell the main page to fetch the fresh data
    onClose();   // Close the modal
  };

  const handleDelete = async () => {
    if (!existingOfficer?.officer_id) return;
    
    // Add a safety check so you don't delete someone by accident
    const confirmDelete = window.confirm(`Are you sure you want to remove ${existingOfficer.first_name}?`);
    if (!confirmDelete) return;

    setLoading(true);
    const { error } = await supabase
      .from('Officers')
      .delete()
      .eq('officer_id', existingOfficer.officer_id);

    if (error) alert("Error deleting: " + error.message);
    
    setLoading(false);
    onRefresh(); // Refresh the page data
    onClose();   // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-[30px] border-4 border-black w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">
          {existingOfficer ? "Edit Officer" : "Add New Officer"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grouping the name fields */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="first_name" placeholder="First Name" required value={formData.first_name} onChange={handleChange} className="border-2 border-black p-2 rounded-lg" />
            <input type="text" name="last_name" placeholder="Last Name" required value={formData.last_name} onChange={handleChange} className="border-2 border-black p-2 rounded-lg" />
            <input type="text" name="middle_initial" placeholder="M.I." value={formData.middle_initial} onChange={handleChange} className="border-2 border-black p-2 rounded-lg" />
            <input type="text" name="suffix" placeholder="Suffix (e.g. Jr.)" value={formData.suffix} onChange={handleChange} className="border-2 border-black p-2 rounded-lg" />
          </div>

          <input type="text" name="position" placeholder="Position (e.g. Creatives Head)" required value={formData.position} onChange={handleChange} className="w-full border-2 border-black p-2 rounded-lg" />
          
          <select name="department" required value={formData.department} onChange={handleChange} className="w-full border-2 border-black p-2 rounded-lg">
            <option value="">Select Department...</option>
            <option value="Chief Officers">Chief Officers</option>
            <option value="Operations">Operations</option>
            <option value="Communications">Communications</option>
            <option value="Technology">Technology</option>
            <option value="Community Development">Community Development</option>
          </select>

          <div>
            <label className="block font-bold mb-2">Upload Photo:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>

          <div className="flex justify-between items-center mt-8">
            {/* DELETE BUTTON*/}
            {existingOfficer ? (
              <button type="button" onClick={handleDelete} className="px-6 py-2 bg-red-500 text-white border-2 border-black rounded-lg font-bold hover:bg-red-600">
                Delete
              </button>
            ) : (
              <div></div> // Empty div to keep the flex spacing correct if no delete button
            )}

            <div className="flex gap-4">
              <button type="button" onClick={onClose} className="px-6 py-2 border-2 border-black rounded-lg hover:bg-gray-200">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-500 text-white border-2 border-black rounded-lg font-bold">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
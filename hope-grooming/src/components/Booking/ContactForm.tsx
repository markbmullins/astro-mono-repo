import React, { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
            placeholder="hello@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
            placeholder="How can we help?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-[1.02] shadow-md"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;

"use client";

import { FormEvent, useState } from "react";

export default function DemoForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Your name<input name="name" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Project type<select name="projectType" defaultValue="Residence"><option>Residence</option><option>Apartment interior</option><option>Workplace</option><option>Hospitality</option><option>Other</option></select></label>
      <label>Tell us about the space<textarea name="message" rows={4} /></label>
      <button type="submit">Preview enquiry</button>
      <p className="form-note">Demo only. This form does not send or store your details.</p>
      {sent && <p className="form-success" role="status">Preview complete. No enquiry was sent or saved.</p>}
    </form>
  );
}

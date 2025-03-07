import type { APIRoute } from "astro";
import sgMail from "@sendgrid/mail";

export const prerender = false; 
const email = "info@parkcirclewebdesign.com";
const apiKey = import.meta.env.SEND_GRID_KEY!;
console.log("apiKey", apiKey);
sgMail.setApiKey(apiKey);

// In-memory rate limiting store
const rateLimitCache = new Map<string, { count: number; startTime: number }>();
const MAX_REQUESTS = 5;
const TIME_WINDOW = 60_000; // 60 seconds

async function validateRecaptcha(token: string): Promise<boolean> {
  const SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;
  if (!SECRET_KEY) return true; // Or throw an error if you require reCAPTCHA
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("reCAPTCHA validation error:", error);
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  // Rate limiting based on IP
  const ip = request.headers.get("x-forwarded-for") ?? "unknown-ip";
  const now = Date.now();
  const rateData = rateLimitCache.get(ip) || { count: 0, startTime: now };
  if (now - rateData.startTime < TIME_WINDOW) {
    if (rateData.count >= MAX_REQUESTS) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    rateData.count += 1;
  } else {
    rateData.count = 1;
    rateData.startTime = now;
  }
  rateLimitCache.set(ip, rateData);

  // Parse incoming JSON data
  let body: any;
  try {
    body = await request.json();
    console.log("Received request with body: ", body);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email: userEmail, phone, message, recaptchaToken } = body;

  // Validate reCAPTCHA if token provided
  if (recaptchaToken) {
    const isHuman = await validateRecaptcha(recaptchaToken);
    if (!isHuman) {
      return new Response(
        JSON.stringify({ error: "reCAPTCHA failed. Are you a robot?" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  try {
    console.log(`Attempting to send email to ${email}`);
    const msg = {
      from: `${email}`,
      to: `${email}`,
      subject: "New Message from Contact Form",
      text: `
Name: ${name}
Email: ${userEmail}
Phone: ${phone}

Message:
${message}
      `,
    };

    console.log(msg);
    await sgMail.send(msg);
    console.log("Email sent!");
  } catch (error: any) {
    console.error(
      "Email sending error:",
      error,
      JSON.stringify(error.response.body)
    );
    return new Response(
      JSON.stringify({ error: "Failed to send email " + error.response.body }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({ success: true, message: "Form submitted successfully!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

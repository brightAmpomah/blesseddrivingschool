document.addEventListener("DOMContentLoaded", () => {
  const paragraphs = document.querySelectorAll("p");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  paragraphs.forEach(p => observer.observe(p));
});

document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const revealOnScroll = () => {
    headings.forEach((h) => {
      const rect = h.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        h.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  const revealOnScroll = () => {
    images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        img.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

const SUPABASE_URL = "https://efcwmrkfghuabgzituan.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmY3dtcmtmZ2h1YWJneml0dWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODkyNjEsImV4cCI6MjA3NDk2NTI2MX0.n8JHlaUDBF0hTZUgheiQ3tt1X8avvelcbmRzXBuKfpE"

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const service = formData.get("service");

      const { error } = await supabase.from("bookings").insert([{ name, phone, service }]);

      if (error) {
        alert("Error saving booking: " + error.message);
      } else {
        alert("Booking saved successfully! ✅");
        bookingForm.reset();

        // Close modal after submit
        const modal = bootstrap.Modal.getInstance(document.getElementById("bookingModal"));
        modal.hide();
      }
    });
  }
});

function showContactAlert(type, message) {
  const alertBox = document.getElementById("contactAlert");
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

// Contact form submit
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  const submitBtn = document.getElementById("contactSubmitBtn");
  const spinner = document.getElementById("contactSpinner");

  // Show spinner & disable button
  spinner.classList.remove("d-none");
  submitBtn.disabled = true;

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Error saving contact:", error.message);
      showContactAlert("danger", "Something went wrong: " + error.message);
    } else {
      showContactAlert("success", "Message sent successfully!");
      document.getElementById("contactForm").reset();
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    showContactAlert("danger", "Unexpected error occurred.");
  } finally {
    // Hide spinner & enable button again
    spinner.classList.add("d-none");
    submitBtn.disabled = false;
  }
});


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

const branchLocations = {
    winnebaRoadQR: "https://maps.google.com/?cid=17503686719587485162&entry=gps&g_st=ac",
    akweleyRoadQR: "https://maps.google.com/?cid=17503686719587485162&entry=gps&g_st=ac",
};

Object.keys(branchLocations).forEach((branchId) => {
    const element = document.getElementById(branchId);
    if (element) {
      new QRCode(element, {
        text: branchLocations[branchId],
        width: 100,
        height: 100,
        colorDark: "#000000",
        correctLevel: QRCode.CorrectLevel.H
      });
    } else {
      console.warn(`QR Element not found for: ${branchId}`)
    }
});
  
AOS.init({
    duration: 2000,
    once: true
});

document.querySelectorAll(".view-map-btn").forEach(button => {
  button.addEventListener("click", () => {
    const mapUrl = button.getAttribute("data-map");
    if (mapUrl) window.open(mapUrl, "_blank");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    [
      {
        title: "Three Weeks Intensive",
        auto: "1,600",
        manual: "1,800",
        desc: "No ideas about driving but needs driving skills for immediate assignment. 30 hours packed practicals and theory lessons.",
      },
      {
        title: "Six Weeks Special",
        auto: "1,500",
        manual: "1,700",
        desc: "Designed for students who have no knowledge about driving but want to learn within a short period. 48 hours of practical and theory lessons.",
      },
      {
        title: "Two Months Normal",
        auto: "1,400",
        manual: "1,600",
        desc: "Designed for fresh learners wishing to gain driving experience through structured lessons.",
      },
    ],
    [
      {
        title: "Brush Up",
        auto: "900",
        manual: "1,100",
        desc: "Intended for those who already drive a bit but want to upgrade their driving skills and confidence.",
      },
      {
        title: "Driving License",
        auto: "900",
        manual: "1,100",
        desc: "For individuals who can already drive but need a genuine and guided process to acquire their driving license.",
      },
    ],
  ];

  let currentSet = 0;
  const container = document.querySelector("#pricingModal .modal-body .row");
  const nextBtn = document.getElementById("nextCourseSet");
  const prevBtn = document.getElementById("prevCourseSet");

  function renderCourses() {
    container.innerHTML = "";

    courses[currentSet].forEach((c) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";

      col.innerHTML = `
        <div class="card h-100 shadow-sm" style="min-height: 360px; display: flex; flex-direction: column; justify-content: space-between;">
          <div class="card-body d-flex flex-column justify-content-between">
            <h6 class="fw-bold mt-3 text-center">${c.title}</h6>
            <p class="lead">Automatic - GH₵ ${c.auto}</p>
            <p class="lead">Manual - GH₵ ${c.manual}</p>
            <p class="small mb-5" style="min-height: 80px; color: #333;">${c.desc}</p>
            <button class="btn btn-success text-white btn-sm mt-2 purchase-btn">Purchase Form</button>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

    prevBtn.disabled = currentSet === 0;
    nextBtn.disabled = currentSet === courses.length - 1;
  }

  nextBtn.addEventListener("click", () => {
    if (currentSet < courses.length - 1) {
      currentSet++;
      renderCourses();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSet > 0) {
      currentSet--;
      renderCourses();
    }
  });

  renderCourses();
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

    if (error) throw new Error(error.message);
    const emailParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    await emailjs.send("service_thwpjwc", "template_n4v0e1n", emailParams);
  } catch (err) {
    console.error("Unexpected error:", err);
    showContactAlert("danger", "Something went wrong: " + err.message);;
  } finally {
    // Hide spinner & enable button again
    spinner.classList.add("d-none");
    submitBtn.disabled = false;
  }
});

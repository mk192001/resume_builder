// Function to add education input fields dynamically
function addEducation() {
    const educationInputs = document.getElementById('educationInputs');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control mb-2';
    input.placeholder = 'Education';
    educationInputs.appendChild(input);
  }
  
  // Function to add work experience input fields dynamically
  function addWorkExperience() {
    const workExperienceInputs = document.getElementById('workExperienceInputs');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control mb-2';
    input.placeholder = 'Work Experience';
    workExperienceInputs.appendChild(input);
  }
  
  // Function to generate and display the resume
  document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const skills = document.getElementById('skills').value;
    const education = getDynamicInputValues('educationInputs');
    const workExperience = getDynamicInputValues('workExperienceInputs');
  
    // Generate resume template
    const resumeTemplate = `
      <h2>${fullName}</h2>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Address: ${address}</p>
      <h3>Education</h3>
      <ul>${education}</ul>
      <h3>Work Experience</h3>
      <ul>${workExperience}</ul>
      <h3>Skills</h3>
      <p>${skills}</p>
    `;
    
    // Display resume template
    const resumeOutput = document.getElementById('resumeTemplate');
    resumeOutput.innerHTML = resumeTemplate;
    resumeOutput.classList.remove('hidden');
  });
  
  // Function to get values of dynamically added input fields
  function getDynamicInputValues(containerId) {
    const inputs = document.querySelectorAll(`#${containerId} input`);
    let values = '';
    inputs.forEach(input => {
      if (input.value.trim() !== '') {
        values += `<li>${input.value}</li>`;
      }
    });
    return values;
  }
  
  // Function to download the resume as PDF
  document.getElementById('downloadPDF').addEventListener('click', function() {
    const resumeContent = document.getElementById('resumeTemplate').innerHTML;
    const pdf = new jsPDF();
    pdf.fromHTML(resumeContent, 10, 10);
    pdf.save('resume.pdf');
  });
  
  // Function to download the resume as Word document
  document.getElementById('downloadWord').addEventListener('click', function() {
    const resumeContent = document.getElementById('resumeTemplate').innerText;
    const blob = new Blob([resumeContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.doc';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  });
  
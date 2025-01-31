document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses");
    const addCourseButton = document.getElementById("add-course");
    const calculateGpaButton = document.getElementById("calculate-gpa");
    const resultDiv = document.getElementById("result");
  
    // Grade options for the dropdown
    const gradeOptions = [
      "A+", "A", "A-",
      "B+", "B", "B-",
      "C+", "C", "C-",
      "D+", "D", "F"
    ];
  
    // Add a new course input row
    addCourseButton.addEventListener("click", () => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
  
      // Create input for course name
      const courseNameInput = document.createElement("input");
      courseNameInput.type = "text";
      courseNameInput.className = "course-name";
      courseNameInput.placeholder = "Course Name";
  
      // Create a dropdown for grades
      const gradeSelect = document.createElement("select");
      gradeSelect.className = "grade";
      gradeOptions.forEach(grade => {
        const option = document.createElement("option");
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
      });
  
      // Create input for credits
      const creditsInput = document.createElement("input");
      creditsInput.type = "number";
      creditsInput.className = "credits";
      creditsInput.step = "0.5";
      creditsInput.placeholder = "Credits";
  
      // Create remove button
      const removeButton = document.createElement("button");
      removeButton.className = "remove-course";
      removeButton.textContent = "Remove";
  
      // Append elements to the course div
      courseDiv.appendChild(courseNameInput);
      courseDiv.appendChild(gradeSelect);
      courseDiv.appendChild(creditsInput);
      courseDiv.appendChild(removeButton);
  
      // Add the course div to the container
      coursesContainer.appendChild(courseDiv);
  
      // Add remove functionality
      removeButton.addEventListener("click", () => {
        coursesContainer.removeChild(courseDiv);
      });
    });
  
    // Calculate GPA
    calculateGpaButton.addEventListener("click", () => {
      const currentGpa = parseFloat(document.getElementById("current-gpa").value) || 0;
      const totalCredits = parseFloat(document.getElementById("total-credits").value) || 0;
  
      let totalGradePoints = currentGpa * totalCredits;
      let newCredits = 0;
  
      // Loop through all courses
      document.querySelectorAll(".course").forEach((course) => {
        const courseName = course.querySelector(".course-name").value;
        const grade = course.querySelector(".grade").value;
        const credits = parseFloat(course.querySelector(".credits").value);
  
        if (courseName && grade && !isNaN(credits)) {
          const gradePoint = getGradePoint(grade);
          totalGradePoints += gradePoint * credits;
          newCredits += credits;
        }
      });
  
      // Calculate new GPA
      if (totalCredits + newCredits === 0) {
        resultDiv.textContent = "No courses entered. GPA remains unchanged.";
      } else {
        const newGpa = totalGradePoints / (totalCredits + newCredits);
        resultDiv.textContent = `Your new GPA is: ${newGpa.toFixed(2)}`;
      }
    });
  
    // Convert letter grade to grade points
    function getGradePoint(grade) {
      const gradePoints = {
        "A+": 4.0, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "F": 0.0
      };
      return gradePoints[grade] || 0.0;
    }
  });
document.getElementById('sem1').addEventListener('click', function() {
    showSubjects(1);
});

document.getElementById('sem2').addEventListener('click', function() {
    showSubjects(2);
});

function showSubjects(sem) {
    const subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';

    const sem1Subjects = [
        { name: 'Engineering Graphics', credits: 4 },
        { name: 'Matrix and Calculus', credits: 4 },
        { name: 'Physics for Information Science', credits: 3 },
        { name: 'Engineering Fundamentals Laboratory', credits: 1 },
        { name: 'Physics Laboratory', credits: 1 },
        { name: 'Heritage of Tamil', credits: 1 },
        { name: 'Problem Solving and C programming Laboratory', credits: 1 },
        { name: 'English for Technical Communication', credits: 2 },
        { name: 'Problem Solving and C programming', credits: 3 },
    ];

    const sem2Subjects = [
        { name: 'Digital Electronics', credits: 3 },
        { name: 'Applied Chemistry for Engineers', credits: 3 },
        { name: 'Applied Chemistry Laboratory', credits: 1 },
        { name: 'Communication Skills for Professionals (Integrated Course)', credits: 1.5 },
        { name: 'Tamils and Technology', credits: 1 },
        { name: 'Programming Fundamentals using Python', credits: 3 },
        { name: 'Programming Fundamentals using Python Laboratory', credits: 1.5 },
        { name: 'Differential Equations and Complex Analysis', credits: 4 },
    ];

    const subjects = sem === 1 ? sem1Subjects : sem2Subjects;
    const totalCredits = sem === 1 ? 20 : 18;

    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');
        subjectDiv.innerHTML = `
            <label for="subject${index}">${subject.name} - Credit Points: ${subject.credits}</label>
            <input type="text" id="subject${index}" data-credits="${subject.credits}" required>
        `;
        subjectsContainer.appendChild(subjectDiv);
    });

    document.getElementById('gradeForm').classList.remove('hidden');
    document.getElementById('calculateGPA').classList.remove('hidden');
    document.getElementById('calculateCGPA').classList.remove('hidden');

    document.getElementById('calculateGPA').onclick = function() {
        calculateGPA(totalCredits);
    };
}

function calculateGPA(totalCredits) {
    const gradePoints = {
        'O': 10,
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C': 5,
        'U': 0,
        'SA': 0,
        'W': 0
    };

    let totalPoints = 0;

    const inputs = document.querySelectorAll('#subjectsContainer input');
    inputs.forEach(input => {
        const grade = input.value.toUpperCase();
        const credits = parseFloat(input.dataset.credits);
        if (grade in gradePoints) {
            totalPoints += gradePoints[grade] * credits;
        } else {
            alert('Invalid grade entered! Please enter a valid grade (O, A+, A, B+, B, C, U, SA, W).');
            return;
        }
    });

    const gpa = totalPoints / totalCredits;
    document.getElementById('gpaResult').textContent = `Your GPA is: ${gpa.toFixed(2)}`;
    document.getElementById('gpaResult').classList.remove('hidden');
}

document.getElementById('calculateCGPA').addEventListener('click', function() {
    const cgpaInputs = document.getElementById('cgpaInputs');
    if (cgpaInputs.classList.contains('hidden')) {
        cgpaInputs.classList.remove('hidden');
    } else {
        cgpaInputs.classList.add('hidden');
    }
});

document.getElementById('submitCGPA').addEventListener('click', function() {
    const gpa1 = parseFloat(document.getElementById('gpa1').value);
    const gpa2 = parseFloat(document.getElementById('gpa2').value);

    if (isNaN(gpa1) || isNaN(gpa2)) {
        alert('Please enter valid numbers for both GPA fields.');
        return;
    }

    const totalcredssem1 = 20;
    const totalcredssem2 = 18;
    const cgpa = ((gpa1 * totalcredssem1) + (gpa2 * totalcredssem2)) / (totalcredssem1 + totalcredssem2);
    document.getElementById('cgpaResult').textContent = `Your CGPA is: ${cgpa.toFixed(3)}`;
    document.getElementById('cgpaResult').classList.remove('hidden');
});

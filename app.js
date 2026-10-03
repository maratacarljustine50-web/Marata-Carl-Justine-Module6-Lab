function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(String(value).trim());
}

function isValidPassword(value) {
    const password = String(value);
    return password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!]/.test(password) &&
        !/\s/.test(password);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("registrationForm");
        const fullName = document.getElementById("fullName");
        const studentNumber = document.getElementById("studentNumber");
        const email = document.getElementById("email");
        const mobileNumber = document.getElementById("mobileNumber");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const course = document.getElementById("course");
        const terms = document.getElementById("terms");

        const successMessage = document.getElementById("successMessage");
        const registrationSummary = document.getElementById("registrationSummary");

        const summaryName = document.getElementById("summaryName");
        const summaryStudentNumber = document.getElementById("summaryStudentNumber");
        const summaryEmail = document.getElementById("summaryEmail");
        const summaryMobileNumber = document.getElementById("summaryMobileNumber");
        const summaryCourse = document.getElementById("summaryCourse");

        const passwordFeedback = document.getElementById("passwordFeedback");

        const errorIds = {
            fullName: "fullNameError",
            studentNumber: "studentNumberError",
            email: "emailError",
            mobileNumber: "mobileNumberError",
            password: "passwordError",
            confirmPassword: "confirmPasswordError",
            course: "courseError",
            terms: "termsError"
        };

        function setError(field, message) {
            const errorElement = document.getElementById(errorIds[field]);
            const control = document.getElementById(field);

            errorElement.textContent = message;
            control.setAttribute("aria-invalid", message ? "true" : "false");
        }

        function clearError(field) {
            setError(field, "");
        }

        function validateFullName() {
            const value = fullName.value.trim();

            if (value.length === 0) {
                setError("fullName", "Full name is required.");
                return false;
            }

            if (value.length < 2) {
                setError("fullName", "Enter at least two characters for your full name.");
                return false;
            }

            clearError("fullName");
            return true;
        }

        function validateStudentNumber() {
            const value = studentNumber.value.trim();

            if (value === "") {
                setError("studentNumber", "Student number is required.");
                return false;
            }

            if (!isValidStudentNumber(value)) {
                setError("studentNumber", "Enter a student number in the format 24-1234-123.");
                return false;
            }

            clearError("studentNumber");
            return true;
        }

        function validateEmail() {
            const value = email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value === "") {
                setError("email", "Email address is required.");
                return false;
            }

            if (!emailPattern.test(value)) {
                setError("email", "Enter a valid email address with a domain and dot.");
                return false;
            }

            clearError("email");
            return true;
        }

        function validateMobileNumber() {
            const value = mobileNumber.value.trim();
            const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

            if (value === "") {
                setError("mobileNumber", "Mobile number is required.");
                return false;
            }

            if (!mobilePattern.test(value)) {
                setError("mobileNumber", "Enter 09 followed by nine digits or +639 followed by nine digits.");
                return false;
            }

            clearError("mobileNumber");
            return true;
        }

        function validatePassword() {
            const value = password.value;

            if (value === "") {
                setError("password", "Password is required.");
                return false;
            }

            if (!isValidPassword(value)) {
                setError(
                    "password",
                    "Password must be at least 8 characters, include an uppercase letter, a digit, and @, $, or !, with no spaces."
                );
                return false;
            }

            clearError("password");
            return true;
        }

        function updatePasswordFeedback() {
            const value = password.value;

            if (value === "") {
                passwordFeedback.textContent = "";
                return;
            }

            if (isValidPassword(value)) {
                passwordFeedback.textContent = "Password meets all requirements.";
            } else {
                passwordFeedback.textContent =
                    "Password needs 8+ characters, one uppercase letter, one digit, one of @, $, !, and no spaces.";
            }
        }

        function validateConfirmPassword() {
            const value = confirmPassword.value;

            if (value === "") {
                setError("confirmPassword", "Please confirm your password.");
                return false;
            }

            if (value !== password.value) {
                setError("confirmPassword", "Passwords do not match.");
                return false;
            }

            clearError("confirmPassword");
            return true;
        }

        function validateCourse() {
            if (course.value !== "BSIT" && course.value !== "BSCS") {
                setError("course", "Please select BSIT or BSCS.");
                return false;
            }

            clearError("course");
            return true;
        }

        function validateTerms() {
            if (!terms.checked) {
                setError("terms", "You must agree to the terms and conditions.");
                return false;
            }

            clearError("terms");
            return true;
        }

        function clearOutput() {
            successMessage.textContent = "";
            registrationSummary.hidden = true;

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";
        }

        function resetFeedback() {
            Object.keys(errorIds).forEach(clearError);
            passwordFeedback.textContent = "";

            [
                fullName,
                studentNumber,
                email,
                mobileNumber,
                password,
                confirmPassword,
                course,
                terms
            ].forEach(function (control) {
                control.setAttribute("aria-invalid", "false");
            });

            clearOutput();
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const validFullName = validateFullName();
            const validStudentNumber = validateStudentNumber();
            const validEmail = validateEmail();
            const validMobileNumber = validateMobileNumber();
            const validPassword = validatePassword();
            const validConfirmPassword = validateConfirmPassword();
            const validCourse = validateCourse();
            const validTerms = validateTerms();

            if (
                !validFullName ||
                !validStudentNumber ||
                !validEmail ||
                !validMobileNumber ||
                !validPassword ||
                !validConfirmPassword ||
                !validCourse ||
                !validTerms
            ) {
                successMessage.textContent = "";
                registrationSummary.hidden = true;
                return;
            }

            summaryName.textContent = fullName.value.trim();
            summaryStudentNumber.textContent = studentNumber.value.trim();
            summaryEmail.textContent = email.value.trim();
            summaryMobileNumber.textContent = mobileNumber.value.trim();
            summaryCourse.textContent = course.value;

            successMessage.textContent = "Registration details validated successfully!";
            registrationSummary.hidden = false;
        });

        password.addEventListener("input", function () {
            updatePasswordFeedback();
            if (password.value !== "") {
                validatePassword();
            } else {
                clearError("password");
            }

            if (confirmPassword.value !== "") {
                validateConfirmPassword();
            }
        });

        fullName.addEventListener("blur", validateFullName);

        course.addEventListener("change", validateCourse);

        terms.addEventListener("change", validateTerms);

        form.addEventListener("reset", function () {
            window.setTimeout(function () {
                resetFeedback();
            }, 0);
        });

        [
            [studentNumber, validateStudentNumber],
            [email, validateEmail],
            [mobileNumber, validateMobileNumber],
            [confirmPassword, validateConfirmPassword]
        ].forEach(function ([control, validator]) {
            control.addEventListener("blur", validator);
        });
    });
}
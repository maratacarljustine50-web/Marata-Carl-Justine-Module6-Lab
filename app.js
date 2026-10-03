// =====================================================
// PURE VALIDATION FUNCTIONS
// These functions do not access document or window.
// They are safe for automated Node.js tests.
// =====================================================

function isValidStudentNumber(value) {
    const trimmedValue = value.trim();

    return /^\d{2}-\d{4}-\d{3}$/.test(trimmedValue);
}


function isValidPassword(value) {
    const trimmedValue = value.trim();

    return (
        trimmedValue.length >= 8 &&
        /[A-Z]/.test(trimmedValue) &&
        /\d/.test(trimmedValue) &&
        /[@$!]/.test(trimmedValue) &&
        !/\s/.test(trimmedValue)
    );
}


// =====================================================
// DOM CODE
// Only runs when document is available.
// This keeps the file compatible with Node.js tests.
// =====================================================

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

        const fullNameError = document.getElementById("fullNameError");
        const studentNumberError = document.getElementById("studentNumberError");
        const emailError = document.getElementById("emailError");
        const mobileNumberError = document.getElementById("mobileNumberError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const courseError = document.getElementById("courseError");
        const termsError = document.getElementById("termsError");

        const passwordFeedback =
            document.getElementById("passwordFeedback");

        const successMessage =
            document.getElementById("successMessage");

        const registrationSummary =
            document.getElementById("registrationSummary");

        const summaryName =
            document.getElementById("summaryName");

        const summaryStudentNumber =
            document.getElementById("summaryStudentNumber");

        const summaryEmail =
            document.getElementById("summaryEmail");

        const summaryMobileNumber =
            document.getElementById("summaryMobileNumber");

        const summaryCourse =
            document.getElementById("summaryCourse");


        // =================================================
        // HELPER FUNCTIONS
        // =================================================

        function setError(field, errorElement, message) {

            errorElement.textContent = message;

            field.setAttribute("aria-invalid", "true");

            field.setAttribute(
                "aria-describedby",
                errorElement.id
            );
        }


        function clearError(field, errorElement) {

            errorElement.textContent = "";

            field.setAttribute("aria-invalid", "false");
        }


        function validateFullName() {

            const value = fullName.value.trim();

            if (value.length < 2) {

                setError(
                    fullName,
                    fullNameError,
                    "Enter your full name with at least two characters."
                );

                return false;
            }

            clearError(fullName, fullNameError);

            return true;
        }


        function validateStudentNumber() {

            const value = studentNumber.value.trim();

            if (!isValidStudentNumber(value)) {

                setError(
                    studentNumber,
                    studentNumberError,
                    "Enter a student number in the format 24-1234-123."
                );

                return false;
            }

            clearError(studentNumber, studentNumberError);

            return true;
        }


        function validateEmail() {

            const value = email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {

                setError(
                    email,
                    emailError,
                    "Enter a valid email address such as student@example.com."
                );

                return false;
            }

            clearError(email, emailError);

            return true;
        }


        function validateMobileNumber() {

            const value = mobileNumber.value.trim();

            const mobilePattern =
                /^(09\d{9}|\+639\d{9})$/;

            if (!mobilePattern.test(value)) {

                setError(
                    mobileNumber,
                    mobileNumberError,
                    "Enter 09 followed by nine digits or +639 followed by nine digits. No spaces or hyphens."
                );

                return false;
            }

            clearError(mobileNumber, mobileNumberError);

            return true;
        }


        function validatePassword() {

            const value = password.value;

            if (!isValidPassword(value)) {

                setError(
                    password,
                    passwordError,
                    "Password must have at least 8 characters, one uppercase letter, one digit, and one of @, $, or !, with no spaces."
                );

                return false;
            }

            clearError(password, passwordError);

            return true;
        }


        function validateConfirmPassword() {

            const value = confirmPassword.value;

            if (value !== password.value || value === "") {

                setError(
                    confirmPassword,
                    confirmPasswordError,
                    "Confirm password must match the password exactly."
                );

                return false;
            }

            clearError(
                confirmPassword,
                confirmPasswordError
            );

            return true;
        }


        function validateCourse() {

            if (
                course.value !== "BSIT" &&
                course.value !== "BSCS"
            ) {

                setError(
                    course,
                    courseError,
                    "Please select BSIT or BSCS."
                );

                return false;
            }

            clearError(course, courseError);

            return true;
        }


        function validateTerms() {

            if (!terms.checked) {

                setError(
                    terms,
                    termsError,
                    "You must agree to the terms and conditions."
                );

                return false;
            }

            clearError(terms, termsError);

            return true;
        }


        function updatePasswordFeedback() {

            const value = password.value;

            if (value === "") {

                passwordFeedback.textContent = "";

                return;
            }

            const requirements = [];

            if (value.length < 8) {
                requirements.push("at least 8 characters");
            }

            if (!/[A-Z]/.test(value)) {
                requirements.push("one uppercase letter");
            }

            if (!/\d/.test(value)) {
                requirements.push("one digit");
            }

            if (!/[@$!]/.test(value)) {
                requirements.push("one of @, $, or !");
            }

            if (/\s/.test(value)) {
                requirements.push("no spaces");
            }

            if (requirements.length === 0) {

                passwordFeedback.textContent =
                    "Password meets all requirements.";

            } else {

                passwordFeedback.textContent =
                    "Password needs: " +
                    requirements.join(", ") +
                    ".";
            }
        }


        function clearAllErrors() {

            clearError(fullName, fullNameError);
            clearError(studentNumber, studentNumberError);
            clearError(email, emailError);
            clearError(mobileNumber, mobileNumberError);
            clearError(password, passwordError);
            clearError(confirmPassword, confirmPasswordError);
            clearError(course, courseError);
            clearError(terms, termsError);
        }


        function clearOutput() {

            successMessage.textContent = "";
            successMessage.style.display = "none";

            registrationSummary.style.display = "none";

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";

            passwordFeedback.textContent = "";
        }


        // =================================================
        // FORM SUBMISSION
        // =================================================

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            clearOutput();

            const validFullName = validateFullName();
            const validStudentNumber = validateStudentNumber();
            const validEmail = validateEmail();
            const validMobileNumber = validateMobileNumber();
            const validPassword = validatePassword();
            const validConfirmPassword = validateConfirmPassword();
            const validCourse = validateCourse();
            const validTerms = validateTerms();

            const allValid =
                validFullName &&
                validStudentNumber &&
                validEmail &&
                validMobileNumber &&
                validPassword &&
                validConfirmPassword &&
                validCourse &&
                validTerms;


            if (!allValid) {

                return;
            }


            // =============================================
            // SUCCESS MESSAGE
            // =============================================

            successMessage.textContent =
                "Registration details validated successfully!";

            successMessage.style.display = "block";


            // =============================================
            // REGISTRATION SUMMARY
            // Password is intentionally NOT displayed.
            // =============================================

            summaryName.textContent =
                fullName.value.trim();

            summaryStudentNumber.textContent =
                studentNumber.value.trim();

            summaryEmail.textContent =
                email.value.trim();

            summaryMobileNumber.textContent =
                mobileNumber.value.trim();

            summaryCourse.textContent =
                course.value;

            registrationSummary.style.display = "block";
        });


        // =================================================
        // FULL NAME BLUR EVENT
        // =================================================

        fullName.addEventListener("blur", function () {

            fullName.value =
                fullName.value.trim();

            validateFullName();
        });


        // =================================================
        // PASSWORD INPUT EVENT
        // =================================================

        password.addEventListener("input", function () {

            updatePasswordFeedback();

            if (password.value !== "") {
                validatePassword();
            }
        });


        // =================================================
        // CONFIRM PASSWORD INPUT EVENT
        // =================================================

        confirmPassword.addEventListener("input", function () {

            if (confirmPassword.value !== "") {
                validateConfirmPassword();
            }
        });


        // =================================================
        // COURSE CHANGE EVENT
        // =================================================

        course.addEventListener("change", function () {

            validateCourse();
        });


        // =================================================
        // TERMS CHANGE EVENT
        // =================================================

        terms.addEventListener("change", function () {

            validateTerms();
        });


        // =================================================
        // OTHER INPUT EVENTS
        // =================================================

        studentNumber.addEventListener("blur", function () {

            studentNumber.value =
                studentNumber.value.trim();

            validateStudentNumber();
        });


        email.addEventListener("blur", function () {

            email.value =
                email.value.trim();

            validateEmail();
        });


        mobileNumber.addEventListener("blur", function () {

            mobileNumber.value =
                mobileNumber.value.trim();

            validateMobileNumber();
        });


        // =================================================
        // RESET EVENT
        // =================================================

        form.addEventListener("reset", function () {

            setTimeout(function () {

                clearAllErrors();

                clearOutput();

            }, 0);
        });

    });
}


// =====================================================
// NODE / AUTOGRADER EXPORT
// =====================================================

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}